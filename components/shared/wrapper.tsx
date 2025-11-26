import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const wrapperVariants = cva("mx-auto w-full px-3 sm:px-5", {
  variants: {
    size: {
      default: "max-w-[564px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function Wrapper({
  className,
  size,
  asChild = false,
  ...props
}: React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof wrapperVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "section";

  return (
    <Comp
      data-slot="section"
      className={cn(wrapperVariants({ size, className }))}
      {...props}
    />
  );
}

export { Wrapper, wrapperVariants };
