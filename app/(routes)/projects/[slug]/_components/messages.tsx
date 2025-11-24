"use client";

import React from "react";
import { useGlobalContext } from "@/components/provider/global";
import { Bubble } from "@/components/shared/bubble";
import { Wrapper } from "@/components/shared/wrapper";
import { projectDetailsMessages } from "@/lib/messages";

interface Props {
  slug: string;
}

export const MessagesSection: React.FC<Props> = ({ slug }) => {
  const { fetchSuggestions } = useGlobalContext();

  React.useEffect(() => {
    fetchSuggestions(projectDetailsMessages);
  }, [fetchSuggestions]);

  return (
    <div className="w-full pt-8 pb-24! sm:py-12">
      <Wrapper>
        <Bubble messages={projectDetailsMessages} />
      </Wrapper>
    </div>
  );
};
