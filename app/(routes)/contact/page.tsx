import { Metadata } from "next";
import { Header } from "@/components/shared/header";
import { MessagesSection } from "./_components/messages";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: siteConfig.contact.title,
  description: siteConfig.contact.description,
  openGraph: {
    title: siteConfig.contact.title,
    description: siteConfig.contact.description,
    url: siteConfig.url,
    type: "website",
    siteName: siteConfig.contact.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.contact.title,
    description: siteConfig.contact.description,
    creator: siteConfig.handle,
    site: siteConfig.handle,
  },
};

export default function Contact() {
  return (
    <div className="flex flex-col">
      <Header />
      <MessagesSection />
    </div>
  );
}
