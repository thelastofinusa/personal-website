import React from "react";
import Link from "next/link";
import { RiShareForwardFill } from "react-icons/ri";

import { TextBubble } from "./text.bubble";
import { buttonVariants } from "@/components/ui/button";
import { RouteType } from "@/lib/messages";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  message: RouteType;
}

export const RouteBubble: React.FC<Props> = ({ message }) => {
  return (
    <div className="relative flex flex-col gap-2">
      <TextBubble message={message} />

      {message.images && message.images?.length > 0 && (
        <div
          className={cn("mb-1.5 grid grid-cols-2 gap-2", {
            "grid-cols-1": message.images.length <= 1,
          })}
        >
          {message.images.slice(0, 2).map((img, imgIdx) => {
            const total = (message.images as string[]).length;
            const lastVisible = Math.min(1, total - 1);
            const remaining = total - imgIdx - 1;
            const showOverlay = imgIdx === lastVisible && remaining > 0;

            return (
              <div
                key={imgIdx}
                className="bg-secondary group relative w-full rounded-md"
              >
                <Image
                  src={img}
                  alt={message.message}
                  width={4000}
                  height={2250}
                  priority
                  quality={100}
                  className="aspect-[1.4] h-auto w-[380px] rounded-md object-cover"
                />

                {showOverlay && (
                  <div className="absolute top-0 left-0 flex size-full items-center justify-center rounded-md bg-black/30 backdrop-blur-sm dark:bg-black/70">
                    <p className="text-lg font-semibold text-white">
                      +{remaining}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {message.path && message.label ? (
        <div className="mr-1 mb-1 flex justify-end">
          <Link
            target={message.newTab ? "_blank" : "_self"}
            href={{ pathname: message.path }}
            className="text-primary font-sans text-xs font-medium whitespace-pre-wrap underline sm:text-sm"
          >
            {message.label}
          </Link>
        </div>
      ) : (
        message.path && (
          <Link
            target={message.newTab ? "_blank" : "_self"}
            href={{ pathname: message.path }}
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
