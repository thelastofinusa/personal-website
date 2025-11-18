import React from "react";
import { FiGithub } from "react-icons/fi";

import { buttonVariants } from "./ui/button";
import Link from "next/link";

interface Props {
  title: string;
  description?: string;
  github?: string;
  liveUrl?: string;
  label?: string;
  newTab?: boolean;
}

export const Heading: React.FC<Props> = ({
  title,
  description,
  github,
  liveUrl,
  label = "View Project",
  newTab = true,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div className="flex flex-1 flex-col gap-1">
        <h1 className="text-2xl leading-[1.3] font-semibold sm:text-3xl md:text-[32px]">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground text-sm sm:max-w-md">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {liveUrl && (
          <Link
            href={liveUrl}
            target={newTab ? "_blank" : "_self"}
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "rounded-lg",
            })}
          >
            <span>{label}</span>
          </Link>
        )}
        {github && (
          <Link
            href={github}
            target="_blank"
            className={buttonVariants({
              variant: "outline",
              size: "icon-sm",
              className: "rounded-lg",
            })}
          >
            <span className="sr-only">Repository</span>
            <FiGithub className="size-4" />
          </Link>
        )}
      </div>
    </div>
  );
};
