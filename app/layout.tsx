import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Witze für Kinder",
  description: "Täglich neue Witze für Kinder – Fritzchen, Tiere, Schule, Magie und Harry Potter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="h-full">
      <body className="min-h-full flex flex-col">
        <header className="bg-teal-500 text-white px-4 py-4 shadow-sm">
          <div className="max-w-lg mx-auto flex items-center gap-2">
            <span className="text-2xl">🤣</span>
            <div>
              <h1 className="text-xl font-extrabold leading-none">Witze für Kinder</h1>
              <p className="text-teal-100 text-xs">Täglich neue Witze</p>
            </div>
          </div>
        </header>
        <main className="flex-1 max-w-lg mx-auto w-full px-4 py-5">
          {children}
        </main>
        <footer className="text-center text-xs text-teal-600 py-4 bg-teal-50 border-t border-teal-100">
          Jeden Tag zwei neue Witze ☀️ Morgens &amp; 🌙 Abends
        </footer>
      </body>
    </html>
  );
}
