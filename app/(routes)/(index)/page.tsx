import { Header } from "@/components/shared/header";
import { HeroSection } from "./_components/hero";
import { MessagesSection } from "./_components/messages";

export default function Home() {
  return (
    <div className="h-full">
      <Header isHomeRoute={true} />
      <HeroSection />
      <MessagesSection />
    </div>
  );
}
