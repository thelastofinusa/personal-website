"use client";

import { HiOutlineArrowSmLeft } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const HeaderSection = () => {
  const router = useRouter();

  return (
    <header className="bg-background/80 sm:bg-background/40 border-border/30 fixed top-0 z-50 h-[123px] w-full border-b backdrop-blur-3xl sm:backdrop-blur-xl">
      <div className="flex size-full flex-col items-center justify-center gap-2">
        <Button
          size={"sm"}
          variant={"outline"}
          className="relative rounded-full"
          onClick={() => router.back()}
        >
          <HiOutlineArrowSmLeft className="size-5!" />
          <span>Back</span>
        </Button>
      </div>
    </header>
  );
};
