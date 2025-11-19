"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import { HiOutlineArrowSmUp } from "react-icons/hi";

import { Wrapper } from "./wrapper";
import { Button } from "../ui/button";
import { footerRoutes } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { cn, isActivePath } from "@/lib/utils";

export const Footer = () => {
  const controls = useAnimation();
  const pathname = usePathname();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        controls.start({ opacity: 1 });
      } else {
        controls.start({ opacity: 0 });
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [controls]);

  return (
    <footer className="pt-4 pb-8">
      <Wrapper className="flex size-full flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.15 }}
        >
          <Button
            size="icon"
            variant={"secondary"}
            className="relative size-10 rounded-full"
            onClick={scrollTop}
          >
            <HiOutlineArrowSmUp className="size-5!" />
            <span className="sr-only">Back to top</span>
          </Button>
        </motion.div>

        <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm">
          {footerRoutes.routes.map((link, index) => {
            const isActive = isActivePath(link.href, pathname);

            return (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "text-muted-foreground hover:text-primary block duration-150",
                  {
                    "text-primary": isActive,
                  },
                )}
              >
                <span>{link.title}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {footerRoutes.socials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-muted-foreground hover:text-primary block"
              >
                <social.icon className="size-5" />
              </Link>
            ))}
          </div>
          <span className="text-muted-foreground dark:text-foreground block text-center text-sm dark:opacity-50">
            © {new Date().getFullYear()} All rights reserved
          </span>
        </div>
      </Wrapper>
    </footer>
  );
};
