import { Header } from "@/components/shared/header";
import { MessagesSection } from "./_components/messages";

export default function ProjectDetails() {
  return (
    <div className="flex flex-col">
      <Header />
      <MessagesSection />
    </div>
  );
}
