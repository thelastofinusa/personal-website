"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AnimationDefinition, motion, useAnimation } from "motion/react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";

import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site.config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  isHomeRoute?: boolean;
}

export const Header: React.FC<Props> = ({ isHomeRoute = false }) => {
  const router = useRouter();
  const controls = useAnimation();

  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    setIsMounted(true);

    const safeStart = (values: AnimationDefinition) => {
      if (!isMounted) return;
      controls.start(values);
    };

    const onScroll = () => {
      if (window.scrollY > 100) {
        safeStart({ y: 0, opacity: 1 });
      } else {
        safeStart({ y: -80, opacity: 0 });
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [controls, isMounted, isHomeRoute]);

  if (!isMounted) {
    return null;
  }

  return !isHomeRoute ? (
    <header className="bg-background/80 sm:bg-background/40 border-border/30 sticky top-0 z-50 h-[123px] w-full border-b backdrop-blur-3xl sm:backdrop-blur-xl">
      <div className="flex size-full flex-col items-center justify-center gap-2">
        <Button
          size={"icon"}
          variant={"secondary"}
          className="relative rounded-full"
          onClick={() => router.back()}
        >
          <HiOutlineArrowSmLeft className="size-5!" />
          <span className="sr-only">Back</span>
        </Button>
      </div>
    </header>
  ) : (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.25 }}
      className="bg-background/80 sm:bg-background/40 border-border/30 fixed top-0 z-50 h-[123px] w-full border-b backdrop-blur-3xl sm:backdrop-blur-xl"
    >
      <div className="flex size-full flex-col items-center justify-center gap-2">
        <div className="relative size-max rounded-full">
          <Avatar size="default">
            <AvatarImage src={siteConfig.owner.avatar} />
            <AvatarFallback>
              {getInitials(siteConfig.owner.name)}
            </AvatarFallback>
          </Avatar>
          <span className="border-background absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2 bg-green-500" />
        </div>
        <p className="text-base font-semibold">{siteConfig.owner.nickname}</p>
      </div>
    </motion.header>
  );
};
