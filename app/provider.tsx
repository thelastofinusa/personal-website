"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/conversation";
import { AudioProvider } from "@/components/provider/audio.provider";
import { AnimationProvider } from "@/components/provider/animation.provider";

export default function Provider(props: { children: React.ReactNode }) {
  return (
    <Conversation>
      <ConversationContent>
        <AudioProvider>
          <AnimationProvider>{props.children}</AnimationProvider>
        </AudioProvider>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}
