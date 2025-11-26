"use client";

import React from "react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { SlVolume2, SlVolumeOff } from "react-icons/sl";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";

import { Wrapper } from "./wrapper";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as Avatar from "@/components/ui/avatar";
import { siteConfig } from "@/config/site.config";
import { Skeleton } from "@/components/ui/skeleton";
import { useAudioContext } from "@/components/provider/audio.provider";
import { useAnimation } from "@/components/provider/animation.provider";

export const Header = () => {
  const { isAudioMuted, setIsAudioMuted } = useAudioContext();
  const { isAnimationEnabled, toggleAnimation } = useAnimation();

  const router = useRouter();
  const pathname = usePathname();

  const isHomeRoute = pathname === "/";

  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full py-3 sm:py-4">
      <Wrapper>
        {!isMounted ? (
          <Skeleton className="sticky top-0 h-16 w-full rounded-full" />
        ) : (
          <div className="bg-background/60 flex h-16 w-full items-center justify-between rounded-full border px-3 backdrop-blur-lg sm:px-3.5">
            <div className="flex items-center gap-2">
              {!isHomeRoute && (
                <Button
                  size={"icon-sm"}
                  variant={"secondary"}
                  className="relative rounded-full"
                  onClick={() => router.back()}
                >
                  <HiOutlineArrowSmLeft className="size-5" />
                  <span className="sr-only">Back</span>
                </Button>
              )}

              <div className="flex items-center gap-2.5">
                <div className="relative size-max rounded-full">
                  <Avatar.Avatar size="md">
                    <Avatar.AvatarImage src={siteConfig.owner.avatar} />
                    <Avatar.AvatarFallback>
                      {getInitials(siteConfig.owner.name)}
                    </Avatar.AvatarFallback>
                  </Avatar.Avatar>
                  <span className="border-background absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2 bg-green-500" />
                </div>

                <div className="flex flex-col sm:gap-0.5">
                  <p className="text-sm leading-none font-medium">
                    {siteConfig.owner.nickname}
                  </p>
                  <p className="text-muted-foreground hidden text-xs font-medium sm:block">
                    Active
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant={!isAudioMuted ? "secondary" : "ghost"}
                className="group/toggle pointer-events-auto rounded-full"
                onClick={() => setIsAudioMuted((prev) => !prev)}
                title="Volume"
              >
                {isAudioMuted ? (
                  <React.Fragment>
                    <SlVolumeOff className="size-4" />
                    <span className="sr-only">Volume Off</span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <SlVolume2 className="size-4" />
                    <span className="sr-only">Volume On</span>
                  </React.Fragment>
                )}
              </Button>
              <Button
                size="icon"
                variant={isAnimationEnabled ? "secondary" : "outline"}
                className="group/toggle pointer-events-auto rounded-full"
                onClick={toggleAnimation}
                title="Animation"
              >
                {!isAnimationEnabled ? (
                  <React.Fragment>
                    <BsToggle2Off className="size-5" />
                    <span className="sr-only">Animation Disable</span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <BsToggle2On className="size-5" />
                    <span className="sr-only">Animation Enable</span>
                  </React.Fragment>
                )}
              </Button>
            </div>
          </div>
        )}
      </Wrapper>
    </header>
  );
};
