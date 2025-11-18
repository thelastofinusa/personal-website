import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

import { Wrapper } from "@/components/wrapper";
import { Heading } from "@/components/heading";

export const HeroSection = () => {
  return (
    <div className="py-12 sm:py-16 md:py-[100px]">
      <div className="flex flex-col gap-6 md:gap-10 lg:gap-16">
        <Wrapper>
          <Heading
            title="About Myself"
            description="Designing Seamless & Scalable Interfaces for Web2 & Web3."
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
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            <h2 className="text-lg font-medium md:text-xl">
              Morbi leo risus, porta ac <br className="hidden md:flex" />{" "}
              consectetur ac, vestibulum at eros.
            </h2>

            <div className="flex flex-col gap-1 md:gap-4">
              <p className="text-muted-foreground text-sm md:text-base md:leading-6">
                A deeper look into my technical background, tools of choice, and
                the mindset I bring to Frontend Development in the Blockchain
                ecosystem and beyond.
              </p>
              <p className="text-muted-foreground text-sm md:text-base md:leading-6">
                Designing Seamless & Scalable Interfaces for Web2 & Web3.
              </p>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};
