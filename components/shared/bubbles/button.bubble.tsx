import React from "react";
import { TextBubble } from "./text.bubble";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ButtonType } from "@/lib/messages";

interface Props {
  message: ButtonType;
}

export const ButtonBubble: React.FC<Props> = ({ message }) => {
  return (
    <div className="relative flex flex-col gap-2">
      <TextBubble message={message} />

      <div className="mb-1.5 flex flex-col gap-1.5">
        {message.buttons.map((button, idx) => (
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
