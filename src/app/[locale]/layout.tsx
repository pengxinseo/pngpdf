import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { notFound } from 'next/navigation';
import { Footer } from "@/components/Footer";
import { unstable_setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { locales } from '@/config';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "PNG から PDF: オンライン、無料、安全、高速",
  description: "PNG から PDF は、オンラインで無料かつ安全に、高速に変換できる便利なツールです。我々の簡単なインターフェースで、PNG 画像を瞬時にPDFに変換し、プライバシーとデータの安全を確保します",
  keywords:"png, to, pdf, 変換する, pngpdf"
};

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale }
}: Props) {
  if (!locales.includes(locale as any)) notFound();
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <head>
        <link rel="canonical" href="https://pngpdf.net" />
        <script defer data-domain="pngpdf.net" src="https://stat.re/js/script.js"></script>
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
