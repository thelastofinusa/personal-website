import { formatDateTime } from "@/lib/utils";
import { Wrapper } from "@/components/shared/wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const HeroSection = () => {
  return (
    <div className="pt-12">
      <Wrapper className="flex flex-col gap-4 sm:gap-6">
        <div className="flex size-full flex-col items-center justify-center gap-4">
          <div className="relative size-max rounded-full">
            <Avatar size="lg">
              <AvatarImage src="img.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="border-background absolute right-0 bottom-0 size-3.5 rounded-full border-2 bg-green-500" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-base leading-none font-medium sm:text-lg">
              Abdullahi Inusa Salihu
            </p>
            <p className="text-muted-foreground hover:text-foreground cursor-pointer font-mono text-xs font-medium transition duration-200 ease-out sm:text-[13px] dark:opacity-50 dark:hover:opacity-100">
              @thelastofinusa
            </p>
          </div>
        </div>

        <div className="mx-auto flex max-w-sm flex-col gap-1 text-center">
          <p className="text-foreground text-sm font-normal sm:text-base">
            Web3 Frontend Engineer. iBuild Onchain. <br />{" "}
            <span className="text-primary font-bold">Open Source</span>{" "}
            Contributor.
          </p>
        </div>

        <div className="mx-auto flex max-w-sm flex-col gap-1 text-center">
          <p className="text-muted-foreground text-[13px] font-medium sm:text-sm dark:opacity-50">
            Est. 2003 · Kaduna, Nigeria · he/him
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="bg-border/60 h-px flex-1" />
          <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase sm:text-xs dark:opacity-50">
            {formatDateTime()}
          </p>
          <span className="bg-border/60 h-px flex-1" />
        </div>
      </Wrapper>
    </div>
  );
};
