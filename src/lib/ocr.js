import { matchMedicines } from "./medicines";

let workerPromise;

function loadTesseract() {
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@6/dist/tesseract.min.js";
    script.onload = () => resolve(window.Tesseract);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function getWorker() {
  if (!workerPromise) {
    workerPromise = loadTesseract().then(async (Tesseract) => {
      const worker = await Tesseract.createWorker("eng");
      await worker.setParameters({ tessedit_pageseg_mode: "6" });
      return worker;
    });
  }
  return workerPromise;
}

async function resizeImage(file) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  for (let index = 0; index < image.data.length; index += 4) {
    const gray = image.data[index] * .299 + image.data[index + 1] * .587 + image.data[index + 2] * .114;
    const contrast = gray > 170 ? 255 : gray < 95 ? 0 : Math.round((gray - 95) * 3.4);
    image.data[index] = contrast;
    image.data[index + 1] = contrast;
    image.data[index + 2] = contrast;
  }
  context.putImageData(image, 0, 0);
  return canvas;
}

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function similarity(left, right) {
  const a = normalize(left);
  const b = normalize(right);
  if (!a || !b) return 0;
  const matrix = Array.from({ length: b.length + 1 }, (_, row) => [row]);
  for (let column = 0; column <= a.length; column += 1) matrix[0][column] = column;
  for (let row = 1; row <= b.length; row += 1) {
    for (let column = 1; column <= a.length; column += 1) {
      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + (a[column - 1] === b[row - 1] ? 0 : 1)
      );
    }
  }
  return 1 - matrix[b.length][a.length] / Math.max(a.length, b.length);
}

function findMedicineNames(text, medicines) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  return medicines.filter((medicine) => {
    const names = [medicine.name, medicine.generic, medicine.brand].filter(Boolean);
    return lines.some((line) => names.some((name) => normalize(line).includes(normalize(name)) || similarity(line.split(/\s+/)[0], name) >= .72));
  });
}

export async function readMedicineNames(file, medicines) {
  const worker = await getWorker();
  const image = await resizeImage(file);
  const { data } = await worker.recognize(image);
  const exactMatches = matchMedicines(data.text, medicines).map(({ medicine }) => medicine);
  const fuzzyMatches = findMedicineNames(data.text, medicines);
  return [...new Map([...exactMatches, ...fuzzyMatches].map((medicine) => [medicine.id, `${medicine.name} ${medicine.strength}`])).values()].join("\n");
}
