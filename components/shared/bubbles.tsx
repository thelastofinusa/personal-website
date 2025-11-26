"use client";

import React from "react";
import { RiCheckDoubleFill } from "react-icons/ri";

import { Wrapper } from "./wrapper";
import { MessageType } from "@/lib/types";
import { AnimateBubble } from "./animate";
import { cn, getInitials, hasSpecialContent } from "@/lib/utils";
import * as Avatar from "@/components/ui/avatar";
import * as Bubble from "@/components/shared/bubbles/index";
import {
  getContentDelay,
  getContentLength,
  getNextMessageDelay,
  getTypingDelay,
} from "@/lib/bubble";
import { useAudioContext } from "../provider/audio.provider";
import { useAnimation } from "../provider/animation.provider";

interface Props {
  messages: Array<MessageType>;
}

export const Bubbles: React.FC<Props> = ({ messages }) => {
  const { isAnimationEnabled, animationKey } = useAnimation();
  const { isAudioReady, playAudio } = useAudioContext();

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

  //! -----------------------------------------------------
  //! Audio
  //! -----------------------------------------------------
  React.useEffect(() => {
    if (!isVisible) return;
    if (!isAudioReady) return;
    if (messageIndex >= messages.length) return;

    const msg = messages[messageIndex];
    const isFromAnonymous = msg.sender.from === "anonymous";

    if (!showTyping) {
      playAudio(isFromAnonymous);
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

  // Reset animation when animationKey changes
  React.useEffect(() => {
    setMessageIndex(0);
    setContentIndex(0);
    setShowTyping(true);
  }, [animationKey]);

  // Skip animation if disabled
  React.useEffect(() => {
    if (!isAnimationEnabled) {
      setMessageIndex(messages.length);
      setShowTyping(false);
      setContentIndex(messages[messages.length - 1]?.content.length || 0);
    }
  }, [isAnimationEnabled, messages]);

  //! -----------------------------------------------------
  //! Main animation orchestrator
  //! -----------------------------------------------------
  React.useEffect(() => {
    if (!isVisible) return;
    if (messageIndex >= messages.length) return;

    const msg = messages[messageIndex];
    const isFromAnonymous = msg.sender.from === "anonymous";

    // For anonymous messages - show typing, then all content at once
    if (isFromAnonymous) {
      // Step 1: Show typing indicator
      if (showTyping) {
        const firstContentLength = getContentLength(msg.content[0]);
        const typingDelay = getTypingDelay(firstContentLength);

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
        const delay = getTypingDelay(totalLength);

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
      const typingDelay = getTypingDelay(firstContentLength);

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
      const delay = getContentDelay(contentLength);

      const t = setTimeout(() => {
        setContentIndex((i) => i + 1);
      }, delay);

      return () => clearTimeout(t);
    }

    // Step 3: All content shown, move to next message
    if (contentIndex >= msg.content.length) {
      const lastContent = msg.content[msg.content.length - 1];
      const contentLength = getContentLength(lastContent);
      const delay = getNextMessageDelay(contentLength);

      const t = setTimeout(() => {
        setMessageIndex((i) => i + 1);
        setContentIndex(0);
        setShowTyping(true);
      }, delay);

      return () => clearTimeout(t);
    }
  }, [messageIndex, contentIndex, showTyping, isVisible, messages]);

  return (
    <Wrapper className="flex h-full flex-col gap-2 py-8 sm:gap-4 md:gap-6">
      {messages.slice(0, messageIndex + 1).map((msg, idx) => {
        const isActive = idx === messageIndex;
        const isFromAnonymous = msg.sender.from === "anonymous";

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
              isFromAnonymous && "items-end",
            )}
          >
            {!isFromAnonymous && (
              <Avatar.Avatar size="sm" className="ml-1">
                <Avatar.AvatarImage
                  src={
                    msg.sender.from === "holiday"
                      ? "/images/holiday.jpg"
                      : (msg.sender.avatar ?? "/images/dummy.png")
                  }
                />
                <Avatar.AvatarFallback>
                  {getInitials(msg.sender.name ?? msg.sender.from)}
                </Avatar.AvatarFallback>
              </Avatar.Avatar>
            )}

            <AnimateBubble
              className={cn(
                "relative flex max-w-[290px] origin-top-left flex-col gap-1.5 sm:max-w-[308px]",
                isFromAnonymous && "origin-top-right",
              )}
            >
              <svg
                className={cn(
                  "fill-card absolute -top-1.5 right-auto left-0 size-4 scale-x-[-1]",
                  {
                    "fill-primary right-0 left-auto scale-x-[1]":
                      isFromAnonymous,
                  },
                )}
              >
                <path d="M-2.70729e-07 6.19355C8 6.19355 12 4.12903 16 6.99382e-07C16 6.70968 16 13.5 10 16L-2.70729e-07 6.19355Z"></path>
              </svg>

              <div
                className={cn(
                  "flex flex-col gap-px",
                  isFromAnonymous && "items-end",
                )}
              >
                <div className="flex flex-col gap-[3px]">
                  {msg.content
                    .slice(0, visibleContentCount)
                    .map((content, idx) => {
                      const hasSpecial = hasSpecialContent(content);

                      return (
                        <AnimateBubble
                          key={idx}
                          className={cn(
                            "bg-card w-fit origin-top-left rounded-lg px-3 py-[7px] sm:py-1.5",
                            {
                              "bg-primary origin-top-right text-white":
                                isFromAnonymous,
                            },
                          )}
                        >
                          {hasSpecial ? (
                            <React.Fragment>
                              {content.route && (
                                <Bubble.RouteBubble message={content} />
                              )}
                              {content.link && (
                                <Bubble.LinkBubble message={content} />
                              )}
                              {content.project && (
                                <Bubble.ProjectBubble message={content} />
                              )}
                              {content.buttons &&
                                content.buttons.length > 0 && (
                                  <Bubble.ButtonBubble message={content} />
                                )}
                              {content.fields && content.fields.length > 0 && (
                                <Bubble.FormBubble message={content} />
                              )}
                            </React.Fragment>
                          ) : (
                            content.message && (
                              <Bubble.TextBubble message={content.message} />
                            )
                          )}
                        </AnimateBubble>
                      );
                    })}
                </div>

                <span className="mx-1 flex items-center gap-1">
                  <span className="text-muted-foreground text-[10px] font-normal sm:text-xs">
                    {isFromAnonymous
                      ? "Delivered"
                      : `From ${(msg.sender.name ?? msg.sender.from === "holiday") ? "Holiday" : msg.sender.name}`}
                  </span>
                  {isFromAnonymous && (
                    <RiCheckDoubleFill className="text-primary size-4" />
                  )}
                </span>
              </div>
            </AnimateBubble>
          </div>
        );
      })}

      {showTyping && messageIndex < messages.length && isVisible && (
        <Bubble.TypingBubble message={messages[messageIndex]} />
      )}
    </Wrapper>
  );
};
