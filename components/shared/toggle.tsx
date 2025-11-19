"use client";

import * as React from "react";
import { IoVolumeMediumOutline, IoVolumeMuteOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import { useSound } from "../provider/sound.provider";
import { Skeleton } from "../ui/skeleton";

export function Toggle() {
  const { isMuted, toggleMute } = useSound();

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-1/2 z-999 flex w-full max-w-[564px] -translate-x-1/2 items-center p-4">
      <div className="flex w-full items-center justify-end gap-1">
        {!isMounted ? (
          <Skeleton className="size-9 rounded-full" />
        ) : (
          <Button
            variant="secondary"
            size="icon"
            className="group/toggle extend-touch-target pointer-events-auto rounded-full"
            onClick={toggleMute}
            title="Toggle sound"
          >
            {!isMuted ? (
              <IoVolumeMediumOutline className="size-5!" />
            ) : (
              <IoVolumeMuteOutline className="size-5!" />
            )}
            <span className="sr-only">Toggle sound</span>
          </Button>
        )}
      </div>
    </div>
  );
}
