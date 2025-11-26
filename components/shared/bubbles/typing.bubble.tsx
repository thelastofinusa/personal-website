"use client";

import React from "react";
import { motion } from "motion/react";

import { MessageType } from "@/lib/types";
import { cn, getInitials } from "@/lib/utils";
import * as Avatar from "@/components/ui/avatar";
import { AnimateBubble } from "../animate";

interface Props {
  message: MessageType;
}

export const TypingBubble: React.FC<Props> = ({ message }) => {
  const isAnonymous = message.sender.from === "anonymous";

  return (
    <div
      className={cn("flex flex-col gap-2", {
        "ml-auto items-end": isAnonymous,
      })}
    >
      {!isAnonymous && (
        <Avatar.Avatar size="sm" className="ml-1">
          <Avatar.AvatarImage
            src={message.sender.avatar ?? "/images/dummy.png"}
          />
          <Avatar.AvatarFallback>
            {getInitials(message.sender.name ?? "")}
          </Avatar.AvatarFallback>
        </Avatar.Avatar>
      )}

      <AnimateBubble
        className={cn(
          "relative flex max-w-[280px] origin-top-left flex-col gap-1.5 sm:max-w-[308px]",
          isAnonymous && "origin-top-right",
        )}
      >
        <svg
          width="16"
          height="16"
          className={cn(
            "fill-card absolute -top-1.5 right-auto left-0 scale-x-[-1]",
            {
              "fill-primary right-0 left-auto scale-x-[1]": isAnonymous,
            },
          )}
        >
          <path d="M-2.70729e-07 6.19355C8 6.19355 12 4.12903 16 6.99382e-07C16 6.70968 16 13.5 10 16L-2.70729e-07 6.19355Z"></path>
        </svg>

        <div
          className={cn("bg-card w-fit origin-top-left rounded-xl", {
            "bg-primary origin-top-right text-white!": isAnonymous,
          })}
        >
          <div className="flex items-center gap-1 p-3.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className={cn(
                  "bg-foreground size-[7px] rounded-full",
                  isAnonymous && "bg-white",
                )}
                animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </AnimateBubble>
    </div>
  );
};
