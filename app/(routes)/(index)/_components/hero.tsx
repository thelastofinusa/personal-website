"use client";

import Link from "next/link";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import { Wrapper } from "@/components/wrapper";
import Image from "next/image";

const heroRoutes = [
  {
    path: "https://cal.com",
    newTab: true,
    label: "Available",
    description: "Schedule a call",
  },
  { path: "/blog", label: "Blog", description: "Read my blog" },
  { path: "/contact", label: "Contact", description: "Get in touch" },
];

export const HeroSection = () => {
  return (
    <div className="py-12 sm:py-16 md:py-[100px]">
      <Wrapper className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4 sm:max-w-[400px] sm:items-start">
          <PhotoProvider loop={1}>
            <PhotoView src="/img.avif">
              <div className="bg-secondary group size-24 overflow-hidden rounded-3xl sm:size-16 sm:rounded-2xl">
                <Image
                  src="/img.avif"
                  alt="img"
                  width={96}
                  height={96}
                  priority
                  quality={100}
                  className="size-full object-cover transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-3"
                />
              </div>
            </PhotoView>
          </PhotoProvider>

          <h1 className="text-center text-2xl leading-[1.3] font-medium sm:text-start sm:text-3xl md:text-[32px]">
            iBuild Onchain <br />
            iEducate the next wave
          </h1>
        </div>

        <div className="grid grid-cols-2 flex-col items-center gap-3 sm:grid-cols-3 sm:flex-row md:flex">
          {heroRoutes.map((route, index) => (
            <Link
              href={route.path}
              key={route.path ?? index}
              target={route.newTab ? "_blank" : "_self"}
              className="bg-background dark:bg-secondary/30 border-border/50 dark:border-border/30 flex w-full flex-col gap-0.5 rounded-[14px] border px-4 py-3 shadow-xs first-of-type:col-span-2 sm:first-of-type:col-span-1 md:max-w-[200px]"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium opacity-60">{route.label}</p>
                <BiDotsHorizontalRounded className="size-4 opacity-40" />
              </div>

              <p className="text-foreground text-base font-medium sm:text-sm">
                {route.description}
              </p>
            </Link>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};
