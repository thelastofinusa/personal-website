import React from "react";

import { HeroSection } from "./_components/hero";
import { MsgContainer } from "@/components/shared/msg-container";
import { homeMsgQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { MessageType } from "@/lib/types";

const options = { next: { revalidate: 30 } };

export default async function Home(): Promise<React.JSX.Element> {
  const { messages } = await client.fetch<{
    _id: string;
    page: string;
    messages: Array<MessageType>;
  }>(homeMsgQuery("home"), {}, options);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <MsgContainer messages={messages} />
    </div>
  );
}
