import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";
import { Footer } from "@/components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "PNG から PDF: オンライン、無料、安全、高速",
  description: "PNG から PDF は、オンラインで無料かつ安全に、高速に変換できる便利なツールです。我々の簡単なインターフェースで、PNG 画像を瞬時にPDFに変換し、プライバシーとデータの安全を確保します",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="canonical" href="https://pngpdf.net" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Footer/>
      </body>
    </html>
  );
}
