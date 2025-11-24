"use client";

import React from "react";

import * as Bubbles from "./bubbles";
import { AnimateBubble } from "./animate";
import { cn, getInitials } from "@/lib/utils";
import * as Avatar from "@/components/ui/avatar";
import { useGlobalContext } from "@/components/provider/global";
import { MessageContentType, MessageType } from "@/lib/messages";
import { Wrapper } from "./wrapper";

interface Props {
  messages: Array<MessageType>;
}

export function getContentLength(content: MessageContentType): number {
  if (content.message && content.message.length > 0) {
    return content.message.length;
  }
  return 80; // default for non-text content
}

export const Bubble: React.FC<Props> = ({ messages }) => {
  const { isAudioReady, playAudio } = useGlobalContext();

  const containerRef = React.useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const [showTyping, setShowTyping] = React.useState<boolean>(true);
  const [messageIndex, setMessageIndex] = React.useState<number>(0);
  const [contentIndex, setContentIndex] = React.useState<number>(0);

  React.useEffect(() => {
    function handle() {
      setIsVisible(!document.hidden);
    }
    document.addEventListener("visibilitychange", handle);
    handle();
    return () => document.removeEventListener("visibilitychange", handle);
  }, []);

  // -----------------------------------------------------
  // Scroll
  // -----------------------------------------------------
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messageIndex, contentIndex, showTyping]);

  // -----------------------------------------------------
  // Audio
  // -----------------------------------------------------
  React.useEffect(() => {
    if (!isVisible) return;
    if (!isAudioReady) return;
    if (messageIndex >= messages.length) return;

    const msg = messages[messageIndex];
    const isAnonymous = msg.sender.from === "anonymous";

    if (!showTyping) {
      playAudio(isAnonymous);
    }
  }, [
    isAudioReady,
    messageIndex,
    contentIndex,
    showTyping,
    messages,
    isVisible,
    playAudio,
  ]);

  // -----------------------------------------------------
  // Main animation orchestrator
  // -----------------------------------------------------
  React.useEffect(() => {
    if (!isVisible) return;
    if (messageIndex >= messages.length) return;

    const msg = messages[messageIndex];
    const isAnonymous = msg.sender.from === "anonymous";

    // For anonymous messages - show typing, then all content at once
    if (isAnonymous) {
      // Step 1: Show typing indicator
      if (showTyping) {
        const firstContentLength = getContentLength(msg.content[0]);
        const typingDelay = Math.min(
          800,
          Math.max(600, 400 + firstContentLength * 10),
        );

        const t = setTimeout(() => {
          setShowTyping(false);
          setContentIndex(msg.content.length); // Show all content at once
        }, typingDelay);

        return () => clearTimeout(t);
      }

      // Step 2: Content is shown, wait before next message
      if (contentIndex >= msg.content.length) {
        const totalLength = msg.content.reduce(
          (sum, c) => sum + getContentLength(c),
          0,
        );
        const delay = Math.min(800, Math.max(600, 400 + totalLength * 10));

        const t = setTimeout(() => {
          setMessageIndex((i) => i + 1);
          setContentIndex(0);
          setShowTyping(true);
        }, delay);

        return () => clearTimeout(t);
      }
    }

    // For non-anonymous messages
    // Step 1: Show typing indicator
    if (showTyping) {
      const firstContentLength = getContentLength(msg.content[0]);
      const typingDelay = Math.min(
        800,
        Math.max(600, 400 + firstContentLength * 10),
      );

      const t = setTimeout(() => {
        setShowTyping(false);
        setContentIndex(1); // Show first content item
      }, typingDelay);

      return () => clearTimeout(t);
    }

    // Step 2: Show content items one by one
    if (contentIndex < msg.content.length) {
      const currentContent = msg.content[contentIndex];
      const contentLength = getContentLength(currentContent);
      const delay = Math.min(1000, Math.max(500, 400 + contentLength * 8));

      const t = setTimeout(() => {
        setContentIndex((i) => i + 1);
      }, delay);

      return () => clearTimeout(t);
    }

    // Step 3: All content shown, move to next message
    if (contentIndex >= msg.content.length) {
      const lastContent = msg.content[msg.content.length - 1];
      const contentLength = getContentLength(lastContent);
      const delay = Math.min(1000, Math.max(400, 300 + contentLength * 5));

      const t = setTimeout(() => {
        setMessageIndex((i) => i + 1);
        setContentIndex(0);
        setShowTyping(true);
      }, delay);

      return () => clearTimeout(t);
    }
  }, [messageIndex, contentIndex, showTyping, isVisible, messages]);

  return (
    <Wrapper className="flex h-full flex-col gap-6 py-8">
      {messages.slice(0, messageIndex + 1).map((msg, idx) => {
        const isActive = idx === messageIndex;
        const isAnonymous = msg.sender.from === "anonymous";

        // Determine how many content items to show
        const visibleContentCount = isActive
          ? showTyping
            ? 0
            : contentIndex
          : msg.content.length;

        // Don't render if typing is showing for this message
        if (isActive && showTyping) {
          return null;
        }

        return (
          <div
            key={idx}
            className={cn(
              "group flex flex-col gap-2",
              isAnonymous && "items-end",
            )}
          >
            {!isAnonymous && (
              <Avatar.Avatar size="sm" className="ml-1">
                <Avatar.AvatarImage
                  src={msg.sender.avatar ?? "/images/dummy.png"}
                />
                <Avatar.AvatarFallback>
                  {getInitials(msg.sender.name ?? "")}
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
                className={cn(
                  "fill-card absolute -top-1.5 right-auto left-0 size-4 scale-x-[-1]",
                  {
                    "fill-primary right-0 left-auto scale-x-[1]": isAnonymous,
                  },
                )}
              >
                <path d="M-2.70729e-07 6.19355C8 6.19355 12 4.12903 16 6.99382e-07C16 6.70968 16 13.5 10 16L-2.70729e-07 6.19355Z"></path>
              </svg>

              <div
                className={cn(
                  "flex flex-col gap-1",
                  isAnonymous && "items-end",
                )}
              >
                {msg.content
                  .slice(0, visibleContentCount)
                  .map((message, idx) => {
                    const renderBubble = () => {
                      switch (message.type) {
                        case "text":
                          return <Bubbles.TextBubble message={message} />;
                        case "link":
                          return <Bubbles.LinkBubble message={message} />;
                        case "route":
                          return <Bubbles.RouteBubble message={message} />;
                        case "button":
                          return <Bubbles.ButtonBubble message={message} />;
                        case "form":
                          return <Bubbles.FormBubble message={message} />;
                        default:
                          return null;
                      }
                    };

                    return (
                      <AnimateBubble
                        key={idx}
                        className={cn(
                          "bg-card w-fit origin-top-left rounded-lg px-3 py-2 sm:py-1.5",
                          {
                            "bg-primary origin-top-right text-white":
                              isAnonymous,
                          },
                        )}
                      >
                        {renderBubble()}
                      </AnimateBubble>
                    );
                  })}
                {!isAnonymous && !isActive && (
                  <span className="text-muted-foreground -mt-0.5 mr-0 ml-2 text-[10px] font-medium sm:mt-0 sm:text-xs">
                    From {msg.sender.name}
                  </span>
                )}
              </div>
            </AnimateBubble>
          </div>
        );
      })}
      {showTyping && messageIndex < messages.length && isVisible && (
        <Bubbles.TypingBubble message={messages[messageIndex]} />
      )}
    </Wrapper>
  );
};
