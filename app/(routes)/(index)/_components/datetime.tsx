"use client";

import { formatDateTime } from "@/lib/utils";

export const Datetime = () => {
  return (
    <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
      {formatDateTime()}
    </p>
  );
};
