import { Suspense } from "react";
import { gadaMessages } from "@/lib/messages";
import { MsgContainer } from "@/components/shared/msg-container";

async function ProjectContent(props: PageProps<"/projects/[slug]">) {
  const params = await props.params;
  const slug = params.slug;

  console.log(slug);

  return (
    <div className="flex flex-col pt-22">
      <MsgContainer messages={gadaMessages} />
    </div>
  );
}

export default function ProjectDetails(props: PageProps<"/projects/[slug]">) {
  return (
    <Suspense
      fallback={<div className="flex flex-col pt-22">Support me 🥹...</div>}
    >
      <ProjectContent {...props} />
    </Suspense>
  );
}
