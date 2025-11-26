/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { RiLink } from "react-icons/ri";

import { glimpse } from "@/lib/glimpse";
import { MessageType } from "@/lib/types";
import { extractDomain } from "@/lib/utils";

interface Props {
  message: MessageType["content"][0];
}

export const LinkBubble: React.FC<Props> = ({ message }) => {
  const [imgSrc, setImgSrc] = React.useState<string | null>(
    message?.link?.image || null,
  );

  const [metadata, setMetadata] = React.useState<{
    title: string | null;
    description: string | null;
    image: string | null;
  }>({
    title: message?.link?.title || null,
    description: message?.link?.description || null,
    image: message?.link?.image || null,
  });

  React.useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await glimpse(String(message?.link?.url));

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
      }
    };

    fetchMetadata();
  }, [message]);

  if (!message?.link) return null;

  return (
    <div className="relative flex flex-col">
      <pre className="font-sans text-sm font-normal whitespace-pre-wrap sm:text-base">
        {message.message}
      </pre>

      <Link
        target="_blank"
        href={{ pathname: message.link.url }}
        className="bg-secondary my-1.5 flex flex-col overflow-hidden rounded-sm"
      >
        {imgSrc && (
          <img
            alt={metadata.title ?? "preview"}
            src={imgSrc}
            onError={() => setImgSrc(null)}
            loading="eager"
            className="aspect-120/63 w-full object-cover"
          />
        )}

        <div className="flex flex-col p-3">
          <p className="line-clamp-1 text-sm leading-none sm:text-[15px]">
            {metadata.title}
          </p>

          <p className="text-muted-foreground mt-2 mb-1 line-clamp-2 text-xs">
            {metadata.description}
          </p>

          <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <RiLink className="mt-px size-3.5" />
            <span>{extractDomain(message.link.url)}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};
