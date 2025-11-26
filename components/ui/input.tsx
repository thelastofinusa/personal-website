import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground selection:bg-primary selection:text-primary-foreground bg-secondary/50 h-11 w-full min-w-0 rounded-full border border-transparent px-[18px] py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sm! placeholder:opacity-80 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",
        "aria-invalid:ring-destructive/20 aria-invalid:placeholder:text-destructive aria-invalid:border-destructive aria-invalid:bg-destructive/5",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
