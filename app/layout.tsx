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
  metadataBase: new URL("https://herbalvarez.mx"),
  title: {
    default: "Herbalvarez — Recuperación de nivel profesional para peleadores",
    template: "%s · Herbalvarez",
  },
  description:
    "Aceites de hierbas medicinales 100% naturales para boxeadores y deportistas de combate. Diez años de tradición mexicana, formulados para el ring.",
  keywords: [
    "aceites de hierbas",
    "recuperación muscular",
    "boxeo",
    "deportes de combate",
    "alivio del dolor natural",
    "Herbalvarez",
  ],
  openGraph: {
    title: "Herbalvarez — Recuperación de nivel profesional",
    description:
      "Aceites de hierbas medicinales 100% naturales para boxeadores y peleadores.",
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
