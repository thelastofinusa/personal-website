import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import fontVariables from "@/fonts";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Sanity",
    "shadcn",
    "Framer Motion",
    "Typescript",
  ],
  authors: [
    {
      name: "holiday",
      url: "https://linktr.ee/thelastofinusa",
    },
  ],
  creator: "thelastofinusa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL!,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.png`],
    creator: "@thelastofinusa",
  },
};

export default function RootLayout(props: LayoutProps<"/">): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={fontVariables}>
        <Analytics />
        <SpeedInsights />
        {props.children}
      </body>
    </html>
  );
}
