import React from "react";

import { Datetime } from "./datetime";
import { getInitials } from "@/lib/utils";
import * as Profile from "@/components/ui/avatar";
import { siteConfig } from "@/config/site.config";
import { Wrapper } from "@/components/shared/wrapper";

export const HeroSection = () => {
  return (
    <div className="pt-12">
      <Wrapper className="flex flex-col gap-4 sm:gap-6">
        <div className="flex size-full flex-col items-center justify-center gap-4">
          <div className="relative size-max rounded-full">
            <Profile.Avatar size="lg">
              <Profile.AvatarImage src={siteConfig.owner.avatar} />
              <Profile.AvatarFallback>
                {getInitials(siteConfig.owner.name)}
              </Profile.AvatarFallback>
            </Profile.Avatar>
            <span className="border-background absolute right-0 bottom-0 size-3.5 rounded-full border-2 bg-green-500" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-base leading-none font-semibold sm:text-lg">
              {siteConfig.owner.name}
            </p>
            <p className="text-muted-foreground hover:text-foreground cursor-pointer font-mono text-xs font-medium transition duration-200 ease-out sm:text-[13px]">
              @{siteConfig.owner.username}
            </p>
          </div>
        </div>

        <div className="mx-auto flex max-w-sm flex-col gap-1 text-center">
          <pre className="text-foreground font-sans text-sm font-normal whitespace-pre-wrap sm:text-base">
            {siteConfig.owner.bio}
          </pre>
        </div>

        <div className="mx-auto flex max-w-sm flex-col gap-1 text-center">
          <p className="text-muted-foreground text-[13px] font-medium sm:text-sm">
            Est. {siteConfig.owner.est} · {siteConfig.owner.location} ·{" "}
            {siteConfig.owner.pronounce}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="bg-border/60 h-px flex-1" />
          <React.Suspense fallback="...">
            <Datetime />
          </React.Suspense>
          <span className="bg-border/60 h-px flex-1" />
        </div>
      </Wrapper>
    </div>
  );
};
