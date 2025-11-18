import { siteConfig } from "@/config/site.config";
import { Wrapper } from "./wrapper";

export const Footer = () => {
  return (
    <footer className="border-t-border/30 text-muted-foreground mt-12 border-t pt-10 pb-16 sm:mt-16 md:mt-[100px]">
      <Wrapper className="flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
        <span className="text-sm font-normal">
          iBuild Onchain • Nigeria 05:23 pm{" "}
        </span>

        <span className="text-sm font-normal">
          © 2025 Portfolio Website by{" "}
          <a
            target="_blank"
            href={`https://x.com/${siteConfig.handle}`}
            className="text-foreground sm:text-muted-foreground hover:text-foreground transition duration-200 ease-out hover:underline"
          >
            @{siteConfig.handle}
          </a>
        </span>
      </Wrapper>
    </footer>
  );
};
