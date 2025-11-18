import { Wrapper } from "@/components/wrapper";
import Link from "next/link";

export const AboutSection = () => {
  return (
    <div className="py-12 sm:py-16 md:py-[100px]">
      <Wrapper>
        <div className="bg-secondary/30 border-border/30 rounded-3xl border p-10">
          <div className="max-w-[640px]">
            <p className="text-lg leading-[1.8]">
              I&apos;m{" "}
              <Link href="/about" className="font-serif">
                Holiday
              </Link>
              , a Humble Optimistic Learner Inspiring Dreams And Youth
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
