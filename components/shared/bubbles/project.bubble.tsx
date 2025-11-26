import React from "react";
import Link from "next/link";
import { TbArrowUpRight, TbFavicon } from "react-icons/tb";
import { FaGithub } from "react-icons/fa6";

import { cn, formatSanityDate } from "@/lib/utils";
import { MessageType } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface Props {
  message: MessageType["content"][0];
}

export const ProjectBubble: React.FC<Props> = ({ message }) => {
  const pathname = usePathname();
  const isHomeRoute = pathname === "/";

  return (
    <div className="my-1.5 flex w-[284px] flex-col gap-2">
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-secondary flex size-11 items-center justify-center rounded-sm">
            <TbFavicon className="size-6" />
          </div>

          <div className="flex flex-col gap-px">
            <p className="text-sm font-medium">{message?.project?.title}</p>
            <span className="text-muted-foreground text-xs font-normal">
              {formatSanityDate(String(message?.project?.createdAt))}
            </span>
          </div>
        </div>

        {message?.project?.slug && (
          <Link
            href={`/projects/${message?.project?.slug}`}
            className={buttonVariants({
              variant: "secondary",
              size: "icon-sm",
              className: "ml-auto",
            })}
          >
            <TbArrowUpRight />
          </Link>
        )}
      </div>

      {message?.project?.description && (
        <pre className="font-sans text-sm font-normal whitespace-pre-wrap sm:text-base">
          {message?.project?.description}
        </pre>
      )}

      {!isHomeRoute &&
        message?.project?.urls &&
        message?.project?.urls?.length > 0 && (
          <div
            className={cn(
              "grid grid-cols-2 gap-2",
              message?.project?.urls.length === 1 && "grid-cols-1",
            )}
          >
            {message?.project?.urls?.map((url, idx) => (
              <Link
                target="_blank"
                href={{ pathname: url.url }}
                key={idx}
                className={buttonVariants({
                  variant: "secondary",
                  className: "flex-1",
                  size: "lg",
                })}
              >
                {url.label === "github" ? (
                  <>
                    <FaGithub className="size-4" />
                    <span>Repository</span>
                  </>
                ) : (
                  <>
                    <span>Live Site</span>
                  </>
                )}
              </Link>
            ))}
          </div>
        )}
    </div>
  );
};
