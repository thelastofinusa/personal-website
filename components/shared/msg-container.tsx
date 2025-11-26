import React from "react";

import { Bubbles } from "./bubbles";
import { MessageType } from "@/lib/types";

interface Props {
  messages: MessageType[];
}

export const MsgContainer: React.FC<Props> = ({ messages }) => {
  return <Bubbles messages={messages} />;
};
