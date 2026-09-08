import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://herbalvarez.com"),
  title: {
    default: "Herbalvarez — Nutrición y recuperación natural para peleadores",
    template: "%s · Herbalvarez",
  },
  description:
    "Herbolaria mexicana 100% natural para boxeadores y deportistas de combate: energía limpia, recuperación más rápida y soporte articular. Diez años probados en Hialuroniz.",
  keywords: [
    "nutrición deportiva natural",
    "recuperación muscular",
    "boxeo",
    "deportes de combate",
    "soporte articular",
    "herbolaria",
    "Herbalvarez",
  ],
  openGraph: {
    title: "Herbalvarez — Nutrición y recuperación natural para peleadores",
    description:
      "Herbolaria mexicana 100% natural para boxeadores y peleadores: energía limpia, recuperación y soporte articular.",
    locale: "es_MX",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
