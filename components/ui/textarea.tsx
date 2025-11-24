import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:bg-destructive/5 aria-invalid:ring-destructive/20 aria-invalid:placeholder:text-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary/50 flex field-sizing-content min-h-32 w-full resize-none rounded-lg border border-transparent px-4 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-sm! placeholder:opacity-80 focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
