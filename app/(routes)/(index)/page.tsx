import { AboutSection } from "./_components/about";
import { FeaturedProjects } from "./_components/featured";
import { HeroSection } from "./_components/hero";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedProjects />
      <AboutSection />
    </div>
  );
}
