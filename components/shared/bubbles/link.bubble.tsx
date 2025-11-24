/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { RiLink } from "react-icons/ri";

import { glimpse } from "@/lib/glimpse";
import { LinkType } from "@/lib/messages";
import { TextBubble } from "./text.bubble";
import { cn, extractDomain } from "@/lib/utils";

interface Props {
  message: LinkType;
}

export const LinkBubble: React.FC<Props> = ({ message }) => {
  const [imgSrc, setImgSrc] = React.useState<string | null>(
    message.image || null,
  );

  const [metadata, setMetadata] = React.useState<{
    title: string | null;
    description: string | null;
    image: string | null;
  }>({
    title: message.title || null,
    description: message.description || null,
    image: message.image || null,
  });

  React.useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await glimpse(message.url);

        setMetadata((prev) => ({
          title: data.title || prev.title,
          description: data.description || prev.description,
          image: data.image || prev.image,
        }));

        if (data.image) {
          setImgSrc(data.image);
        }
      } catch (error) {
        console.log("Error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Oops! Something went wrong.",
        );
      }
    };

    fetchMetadata();
  }, [message]);

  return (
    <div className="flex flex-col gap-2">
      <TextBubble message={message} />

      <Link
        target="_blank"
        href={{ pathname: message.url }}
        className="bg-secondary my-1.5 flex flex-col rounded-lg"
      >
        {imgSrc && (
          <img
            alt={metadata.title ?? "preview"}
            src={imgSrc}
            onError={() => setImgSrc(null)}
            loading="eager"
            className={cn("aspect-120/63 w-full rounded-t-md object-cover")}
          />
        )}

        <div className="flex flex-col p-3">
          <p className="line-clamp-1 text-sm leading-none sm:text-base">
            {metadata.title}
          </p>

          <p className="text-muted-foreground mt-2 mb-1 line-clamp-2 text-xs">
            {metadata.description}
          </p>

          <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <RiLink className="mt-px size-3.5" />
            <span>{extractDomain(message.url)}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};
