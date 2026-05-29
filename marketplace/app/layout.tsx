import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://idsvault.com"),
  title: {
    default: "IDsvault — Buy & Sell Instagram Usernames | Broker-Assisted",
    template: "%s | IDsvault",
  },
  description:
    "India's broker-assisted Instagram username marketplace. Browse verified handles, reserve safely, pay only after live transfer. Based in Hyderabad.",
  keywords: ["buy instagram username india", "sell instagram handle", "og instagram handles", "short instagram username"],
  openGraph: {
    type: "website",
    siteName: "IDsvault",
    locale: "en_IN",
  },
  colorScheme: "light",
  other: { "color-scheme": "light only" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body className={`${barlowCondensed.variable} ${dmSans.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
