"use client";

import React from "react";
import { GrSend } from "react-icons/gr";

import { Wrapper } from "./wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Suggestion, Suggestions } from "@/components/ui/suggestion";
import { useGlobalContext } from "@/components/provider/global";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

export const Footer = () => {
  const {
    suggestions: { data, isLoading },
  } = useGlobalContext();

  const [selectedSuggestion, setSelectedSuggestion] = React.useState<
    string | null
  >(null);

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
  };

  function sendSuggestion() {
    if (selectedSuggestion) {
      toast.info(selectedSuggestion);
      setSelectedSuggestion(null);
    }
  }

  return (
    <footer className="bg-background/50 fixed bottom-0 z-50 w-full backdrop-blur-3xl sm:backdrop-blur-sm">
      <Wrapper className="flex flex-col gap-2 py-4">
        <div className="flex flex-wrap gap-2">
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="bg-muted h-5 w-[200px] rounded-full"
                />
              ))
            : data.map((suggestion) => (
                <Badge
                  key={suggestion}
                  className="cursor-pointer"
                  variant={"secondary"}
                  aria-disabled={
                    String(selectedSuggestion).toLowerCase() ===
                    String(suggestion).toLowerCase()
                  }
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
        </div>
        {/* <Suggestions>
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="bg-muted h-5 w-[200px] rounded-full"
                />
              ))
            : data.map((suggestion) => (
                <Suggestion
                  key={suggestion}
                  onClick={handleSuggestionClick}
                  suggestion={suggestion}
                />
              ))}
        </Suggestions> */}
        {/* <div className="flex items-center gap-1 sm:gap-2">
          <Input
            className="bg-background/50 pointer-events-none flex-1 text-sm! backdrop-blur-3xl sm:backdrop-blur-xl"
            placeholder="Pick a suggestion from above..."
            defaultValue={selectedSuggestion || ""}
          />
          <Button
            size={"icon"}
            onClick={sendSuggestion}
            disabled={!selectedSuggestion || data.length === 0}
          >
            <GrSend className="size-4" />
          </Button>
        </div> */}
      </Wrapper>
    </footer>
  );
};
