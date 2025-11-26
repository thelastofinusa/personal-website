import React from "react";
import Link from "next/link";
import { RiShareForwardFill } from "react-icons/ri";

import { MessageType } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  message: MessageType["content"][0];
}

export const RouteBubble: React.FC<Props> = ({ message }) => {
  return (
    <div className="relative flex flex-col">
      {message.message && (
        <pre className="font-sans text-sm font-normal whitespace-pre-wrap sm:text-base">
          {message.message}
        </pre>
      )}

      {message?.route?.label ? (
        <div className="mt-1 ml-auto">
          <Link
            target={message?.route?.newTab ? "_blank" : "_self"}
            href={{ pathname: message?.route?.path }}
            className="text-primary w-max font-sans text-xs font-semibold whitespace-pre-wrap uppercase underline"
          >
            {message?.route?.label}
          </Link>
        </div>
      ) : (
        message?.route?.path && (
          <Link
            target={message?.route?.newTab ? "_blank" : "_self"}
            href={{ pathname: message?.route?.path }}
            className={buttonVariants({
              size: "icon-sm",
              variant: "secondary",
              className:
                "absolute top-1/2 -right-12 size-7! -translate-y-1/2 transition-opacity duration-300 ease-out group-hover:opacity-100 md:opacity-30",
            })}
          >
            <RiShareForwardFill className="size-4" />
          </Link>
        )
      )}
    </div>
  );
};
