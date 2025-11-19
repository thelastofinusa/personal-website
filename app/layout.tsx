import type { Metadata } from "next";
import { Albert_Sans, Geist_Mono } from "next/font/google";

import "./globals.css";
import Provider from "./provider";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site.config";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const fontVariables = cn(albertSans.variable, geistMono.variable);

export const metadata: Metadata = {
  title: {
    template: `%s • ${siteConfig.default.title}`,
    default: siteConfig.default.title,
  },
  description: siteConfig.default.description,
  openGraph: {
    title: siteConfig.default.title,
    description: siteConfig.default.description,
    url: siteConfig.url,
    type: "website",
    siteName: siteConfig.default.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.default.title,
    description: siteConfig.default.description,
    creator: siteConfig.handle,
    site: siteConfig.handle,
  },
  icons: {
    icon: {
      url: siteConfig.favicon,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={cn("flex min-h-dvh flex-col antialiased", fontVariables)}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
