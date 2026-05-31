import "./globals.css";

export const metadata = {
  title: "MediVault | Pharmacy Inventory",
  description: "Smart pharmacy inventory and prescription availability checker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
