import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { dummyProjects } from "@/lib/constants";

export const ProjectCard: React.FC<(typeof dummyProjects)[number]> = ({
  name,
  slug,
  imageUrl,
  category,
}) => {
  return (
    <Link
      href={`/works/${slug}`}
      className="group relative flex flex-col gap-2 sm:first-of-type:col-span-2 lg:first-of-type:col-span-1"
    >
      <div className="bg-background dark:bg-secondary/30 border-border/50 dark:border-border/30 aspect-[1.5] overflow-hidden rounded-[14px] border">
        <Image
          src={imageUrl}
          alt="img"
          width={950}
          height={950}
          priority
          quality={100}
          className="size-full object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3"
        />
      </div>

      <div className="relative mx-auto flex w-[calc(100%-1.5rem)] items-center justify-between gap-4">
        <p className="text-muted-foreground truncate text-sm font-medium">
          {name}
        </p>
        <p className="bg-secondary/50 text-primary flex h-[22px] items-center justify-center rounded-md px-2 text-[10px]">
          {category}
        </p>
      </div>
    </Link>
  );
};
