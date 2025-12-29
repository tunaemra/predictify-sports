import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Predictify Sports - Profesyonel İddaa Tahmin Platformu",
  description: "Maç tahminleri yapın, canlı skorları takip edin ve premium üyelik ile gelişmiş özelliklere erişin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
