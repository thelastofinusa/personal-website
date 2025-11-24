import { Header } from "@/components/shared/header";
import { MessagesSection } from "./_components/messages";

export default async function ProjectDetails(
  props: PageProps<"/projects/[slug]">,
) {
  const params = await props.params;
  const slug = params.slug;

  return (
    <div className="flex flex-col">
      <Header />
      <MessagesSection slug={slug} />
    </div>
  );
}
