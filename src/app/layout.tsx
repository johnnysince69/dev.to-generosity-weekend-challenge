import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WalletContextProvider } from "@/contexts/WalletContextProvider";

export const metadata: Metadata = {
  title: "Aura - Transparent Generosity",
  description: "Amplifying charitable causes with AI and Blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Sora:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className={`bg-background text-on-background antialiased min-h-screen flex flex-col overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container`}>
        <WalletContextProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
        </WalletContextProvider>
      </body>
    </html>
  );
}
