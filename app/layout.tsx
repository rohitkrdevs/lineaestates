import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../public/fonts/LineaFonts-Sans-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/LineaFonts-Sans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LineaFonts-Sans-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = localFont({
  src: [
    {
      path: "../public/fonts/LineaFonts-Serif-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/LineaFonts-Serif-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LineaFonts-Serif-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LINEA Estates | Cinematic Luxury Portfolio",
  description:
    "An immersive portfolio of modern architectural spaces told through scroll-driven property films."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#080807"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
