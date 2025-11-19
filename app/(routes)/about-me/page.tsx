import { Metadata } from "next";
import { Header } from "@/components/shared/header";
import { MessagesSection } from "./_components/messages";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: siteConfig.about.title,
  description: siteConfig.about.description,
  openGraph: {
    title: siteConfig.about.title,
    description: siteConfig.about.description,
    url: siteConfig.url,
    type: "website",
    siteName: siteConfig.about.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.about.title,
    description: siteConfig.about.description,
    creator: siteConfig.handle,
    site: siteConfig.handle,
  },
};

export default function About() {
  return (
    <div className="flex flex-col">
      <Header />
      <MessagesSection />
    </div>
  );
}
