import { Metadata } from "next";
import { Header } from "@/components/shared/header";
import { MessagesSection } from "./_components/messages";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: siteConfig.projects.title,
  description: siteConfig.projects.description,
  openGraph: {
    title: siteConfig.projects.title,
    description: siteConfig.projects.description,
    url: siteConfig.url,
    type: "website",
    siteName: siteConfig.projects.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.projects.title,
    description: siteConfig.projects.description,
    creator: siteConfig.handle,
    site: siteConfig.handle,
  },
};

export default function Work() {
  return (
    <div className="flex flex-col">
      <Header />
      <MessagesSection />
    </div>
  );
}
