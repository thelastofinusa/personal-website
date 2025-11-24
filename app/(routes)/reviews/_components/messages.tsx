"use client";

import React from "react";
import { useGlobalContext } from "@/components/provider/global";
import { Bubble } from "@/components/shared/bubble";
import { reviewsMessages } from "@/lib/messages";

export const MessagesSection = () => {
  const { fetchSuggestions } = useGlobalContext();

  React.useEffect(() => {
    fetchSuggestions(reviewsMessages);
  }, [fetchSuggestions]);

  return <Bubble messages={reviewsMessages} />;
};
