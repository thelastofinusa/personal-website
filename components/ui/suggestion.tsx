"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export type SuggestionsProps = ComponentProps<typeof ScrollArea>;

export const Suggestions = ({
  className,
  children,
  ...props
}: SuggestionsProps) => (
  <ScrollArea className="w-full overflow-x-auto whitespace-nowrap" {...props}>
    <div
      className={cn(
        "flex w-max flex-nowrap items-center gap-1 sm:gap-2",
        className,
      )}
    >
      {children}
    </div>
    <ScrollBar className="hidden" orientation="horizontal" />
  </ScrollArea>
);

export type SuggestionProps = Omit<ComponentProps<typeof Badge>, "onClick"> & {
  suggestion: string;
  onClick?: (suggestion: string) => void;
};

export const Suggestion = ({
  suggestion,
  onClick,
  className,
  variant = "outline",
  children,
  ...props
}: SuggestionProps) => {
  const handleClick = () => {
    onClick?.(suggestion);
  };

  return (
    <Badge
      className={cn(
        "bg-background/50 cursor-pointer rounded-full backdrop-blur-3xl sm:backdrop-blur-xl",
        className,
      )}
      onClick={handleClick}
      variant={variant}
      {...props}
    >
      {children || suggestion}
    </Badge>
  );
};
