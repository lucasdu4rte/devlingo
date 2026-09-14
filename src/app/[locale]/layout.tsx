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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt-BR";
  return {
    title: {
      template: "%s · devlingo",
      default: "devlingo",
    },
    description: isPt
      ? "Aprenda React com lições curtas no estilo Duolingo e prepare-se para entrevistas técnicas."
      : "Learn React with bite-sized Duolingo-style lessons and prepare for tech interviews.",
    metadataBase: new URL("https://devlingo-blue.vercel.app"),
    openGraph: {
      title: "devlingo",
      description: isPt
        ? "Lições interativas estilo Duolingo focadas em perguntas reais de entrevistas técnicas."
        : "Duolingo-style lessons for learning technologies and passing technical interviews.",
      url: `/${locale}`,
      siteName: "devlingo",
      images: [
        {
          url: "/apple-icon.png",
          width: 180,
          height: 180,
          alt: "devlingo preview",
        },
      ],
      locale: isPt ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "devlingo",
      description: isPt
        ? "Aprenda React e passe em entrevistas técnicas com lições curtas."
        : "Learn React and pass tech interviews with bite-sized lessons.",
      images: ["/apple-icon.png"],
    },
  };
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f1117" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
  ],
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const themeScript = `(function(){try{var t=localStorage.getItem("devlingo:theme");var light=t==="light"||(t==="system"&&matchMedia("(prefers-color-scheme: light)").matches);if(light)document.documentElement.classList.add("light")}catch(e){}})()`;
const swScript = `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})})}`;

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
        {process.env.NODE_ENV === "production" && (
          <script dangerouslySetInnerHTML={{ __html: swScript }} />
        )}
      </head>
      <body className="min-h-dvh bg-canvas font-sans text-text">
        <ViewTransition default="screen">{children}</ViewTransition>
      </body>
    </html>
  );
}
