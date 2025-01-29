import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Importe o BottomNavigation
import BottomNavigation from "@/components/navigation/bottomNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "J&E Transportes",
  description: "serviço de rastreamento de transporte",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-white shadow-sm fixed top-0 w-full z-10">
          <div className="flex items-center justify-between p-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Atualizar
            </button>
            <h1 className="text-lg font-semibold">J&E Transportes</h1>
            <div className="w-8"></div>
          </div>
        </header>
        <main className="pt-16 pb-20">{children}</main>
        <BottomNavigation />
      </body>
    </html>
  );
}
