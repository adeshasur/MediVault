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
  const scale = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas;
}

export async function readMedicineNames(file, medicines) {
  const worker = await getWorker();
  const image = await resizeImage(file);
  const { data } = await worker.recognize(image);
  const matches = matchMedicines(data.text, medicines);
  return [...new Map(matches.map(({ medicine }) => [medicine.id, `${medicine.name} ${medicine.strength}`])).values()].join("\n");
}
