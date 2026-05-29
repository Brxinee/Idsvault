import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import Script from "next/script";
import "../globals.css";

const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: ["900"], variable: "--font-heading", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "IDsvault — Browse Handles",
  robots: { index: false, follow: false },
};

export default function MiniAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${barlowCondensed.variable} ${dmSans.variable}`} style={{ margin: 0, background: "#fff", overscrollBehavior: "none" }}>
        {/* Telegram Mini App SDK — must load before app code */}
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
