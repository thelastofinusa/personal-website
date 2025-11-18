"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import { Wrapper } from "./wrapper";
import { ModeSwitcher } from "./mode-switcher";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, isActivePath } from "@/lib/utils";
import { useIsMobile } from "@/hooks/mobile";
import Image from "next/image";

const navRoutes = {
  default: [
    { name: "About", href: "/about" },
    { name: "Works", href: "/works" },
    { name: "Contact", href: "/contact" },
  ],
  dropdown: [
    { name: "Blog", href: "/blog" },
    { name: "Stack", href: "/stack" },
    { name: "Services", href: "/services" },
  ],
};
export const Header = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile(640);

  const isActive = (href: string) => isActivePath(href, pathname);

  return (
    <header className="bg-background/80 sticky top-0 left-0 z-50 w-full backdrop-blur-3xl">
      <nav className="size-full py-6">
        <Wrapper className="flex items-center gap-4">
          {isActive("/") ? (
            <div className="bg-secondary group size-9 cursor-pointer overflow-hidden rounded-full">
              <Image
                src="/img.avif"
                alt="img"
                width={60}
                height={60}
                priority
                quality={100}
                className="size-full object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
          ) : (
            <Link
              href="/"
              className="bg-secondary group size-9 cursor-pointer overflow-hidden rounded-full"
            >
              <Image
                src="/img.avif"
                alt="img"
                width={60}
                height={60}
                priority
                quality={100}
                className="size-full object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3"
              />
            </Link>
          )}

          <div className="flex flex-1 items-center justify-end gap-2 md:justify-between">
            <div className="flex items-center gap-1">
              <div className="hidden items-center gap-1 sm:flex">
                {navRoutes.default.map((route, index) => {
                  const Comp = isActive(route.href) ? "div" : Link;

                  return (
                    <Comp
                      key={route.href ?? index}
                      href={route.href}
                      className={buttonVariants({
                        variant: isActive(route.href) ? "secondary" : "ghost",
                        size: "sm",
                        className: cn(
                          "text-muted-foreground",
                          isActive(route.href) &&
                            "text-foreground dark:hover:bg-secondary/70 dark:bg-secondary/40",
                        ),
                      })}
                    >
                      <span className="select-none">{route.name}</span>
                    </Comp>
                  );
                })}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={"icon-xs"} variant={"ghost"}>
                    <BiDotsHorizontalRounded className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="mr-5 grid w-60 grid-cols-2 sm:w-36 sm:grid-cols-1 md:mr-0"
                >
                  {isMobile &&
                    navRoutes.default.map((route, index) => {
                      const Comp = isActive(route.href) ? "div" : Link;

                      return (
                        <DropdownMenuItem
                          asChild
                          key={"mobile-" + (route.href ?? index)}
                          className={cn(
                            "text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 transition-all ease-out!",
                            isActive(route.href) &&
                              "text-foreground dark:focus:bg-secondary/70 dark:bg-secondary/40",
                          )}
                        >
                          <Comp href={route.href}>{route.name}</Comp>
                        </DropdownMenuItem>
                      );
                    })}

                  {navRoutes.dropdown.map((route, index) => {
                    const Comp = isActive(route.href) ? "div" : Link;

                    return (
                      <DropdownMenuItem
                        asChild
                        key={route.href ?? index}
                        className={cn(
                          "text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 transition-all ease-out!",
                          isActive(route.href) &&
                            "text-foreground dark:focus:bg-secondary/70 dark:bg-secondary/40",
                        )}
                      >
                        <Comp href={route.href}>{route.name}</Comp>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ModeSwitcher />
          </div>
        </Wrapper>
      </nav>
    </header>
  );
};
