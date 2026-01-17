import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://hialarm.app";
const siteName = "Hilarm";
const siteDescription = "Hilarm is an accountability-based alarm app. Instead of allowing you to turn off your own alarm, a trusted person must stop it for you remotely.";

export const metadata: Metadata = {
  title: {
    default: `${siteName} – Wake Up With Accountability`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "alarm app",
    "accountability",
    "wake up",
    "morning routine",
    "productivity",
    "habit building",
    "sleep",
    "accountability partner",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} – Wake Up With Accountability`,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteName} - Accountability-based alarm app`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} – Wake Up With Accountability`,
    description: siteDescription,
    images: ["/og-image.png"],
    creator: "@hilarmapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
