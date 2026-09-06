import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Sora } from "next/font/google";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { isLocale, locales } from "@/i18n";
import "../globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-sora" });
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-dm-sans",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "devlingo",
  description: "Learn React one lesson at a time.",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const themeScript = `(function(){try{var t=localStorage.getItem("devlingo:theme");var light=t==="light"||(t==="system"&&matchMedia("(prefers-color-scheme: light)").matches);if(light)document.documentElement.classList.add("light")}catch(e){}})()`;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={`${sora.variable} ${dmSans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-canvas font-sans text-text">
        <ViewTransition default="screen">{children}</ViewTransition>
      </body>
    </html>
  );
}
