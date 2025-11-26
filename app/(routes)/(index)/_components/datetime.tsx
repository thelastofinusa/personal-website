"use client";

import { formatDateTime } from "@/lib/utils";

export const Datetime = () => {
  return (
    <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase sm:text-xs">
      {formatDateTime()}
    </p>
  );
};
