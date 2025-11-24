import React from "react";
import { MessageContentType } from "@/lib/messages";

interface Props {
  message: MessageContentType;
}

export const TextBubble: React.FC<Props> = ({ message }) => {
  return (
    <pre className="font-sans text-sm font-normal whitespace-pre-wrap sm:text-base">
      {message.message}
    </pre>
  );
};
