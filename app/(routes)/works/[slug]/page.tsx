"use client";

import Image from "next/image";
import Link from "next/link";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

import { Wrapper } from "@/components/wrapper";
import { Heading } from "@/components/heading";

export default function ProjectDetail() {
  return (
    <div>
      <div className="py-12 sm:py-16 md:py-[100px]">
        <div className="flex flex-col gap-6 md:gap-10 lg:gap-16">
          <Wrapper>
            <Heading
              title="Project Name"
              description="Designing Seamless & Scalable Interfaces for Web2 & Web3."
              github="/"
              liveUrl="/"
            />
          </Wrapper>

          <Wrapper size={"lg"}>
            <div className="bg-secondary group relative aspect-[1.6] w-full overflow-hidden rounded-2xl md:aspect-video">
              <Image
                src="/img.avif"
                alt="img"
                fill
                priority
                quality={100}
                className="size-full object-cover transition-all duration-500 ease-out group-hover:scale-[118%] group-hover:rotate-3"
              />

              <div className="absolute bottom-0 left-0 flex w-full items-center justify-between gap-6 px-4 py-2 sm:px-6 sm:py-4">
                <p className="font-serif text-sm font-medium sm:text-base">
                  Abdullahi Salihu
                </p>

                <div className="flex items-center gap-2">
                  <Link
                    href="/"
                    className="flex size-8 items-center justify-center rounded-lg border border-white/30 bg-white/10"
                  >
                    <FaXTwitter className="size-4" />
                  </Link>
                  <Link
                    href="/"
                    className="flex size-8 items-center justify-center rounded-lg border border-white/30 bg-white/10"
                  >
                    <FaInstagram className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Wrapper>

          <Wrapper className="md:mt-6">
            <div className="flex max-w-[640px] flex-col gap-4">
              <p className="text-muted-foreground text-sm md:text-base md:leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempora, atque. Quia iste id fugiat eius accusamus reiciendis
                qui excepturi aspernatur deleniti distinctio recusandae quam,
                aut, eaque dolorem saepe, laboriosam adipisci?
              </p>
              <p className="text-muted-foreground text-sm md:text-base md:leading-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Exercitationem velit animi accusantium vero repellat facere, sed
                aut labore sequi consectetur?
              </p>
            </div>
          </Wrapper>

          <Wrapper>
            <PhotoProvider loop maskOpacity={0.8}>
              <div className="grid gap-6">
                {Array.from({ length: 3 }).map((item, index) => (
                  <div
                    key={index}
                    className="bg-secondary group relative aspect-[1.6] w-full overflow-hidden rounded-2xl md:aspect-video"
                  >
                    <PhotoView src="/img.avif">
                      <Image
                        src="/img.avif"
                        alt="img"
                        fill
                        priority
                        quality={100}
                        className="size-full object-cover transition-all duration-500 ease-out group-hover:scale-[118%] group-hover:rotate-3"
                      />
                    </PhotoView>
                  </div>
                ))}
              </div>
            </PhotoProvider>
          </Wrapper>
        </div>
      </div>
    </div>
  );
}
