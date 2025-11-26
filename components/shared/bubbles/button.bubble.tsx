import React from "react";
import Link from "next/link";

import { MessageType } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  message: MessageType["content"][0];
}

export const ButtonBubble: React.FC<Props> = ({ message }) => {
  return (
    <div className="relative flex flex-col">
      {message.message && (
        <pre className="font-sans text-sm font-normal whitespace-pre-wrap sm:text-base">
          {message.message}
        </pre>
      )}

      <div className="my-1.5 flex flex-col gap-1">
        {message.buttons &&
          message.buttons.map((button, idx) => (
            <Link
              key={idx}
              href={{ pathname: button.url }}
              target={button.newTab ? "_blank" : "_self"}
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
              })}
            >
              <span>{button.label}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};
