"use client";

import React from "react";
import { useTheme } from "next-themes";
import { SlVolume2, SlVolumeOff } from "react-icons/sl";

import { Button } from "../ui/button";
import { useGlobalContext } from "@/components/provider/global";

export const Settings = () => {
  const { isMuted, setIsMuted } = useGlobalContext();
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <div className="pointer-events-none fixed top-0 left-1/2 z-999 flex w-full max-w-[564px] -translate-x-1/2 items-center px-6 py-4">
      <div className="flex w-full items-center justify-end gap-1">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            className="group/toggle extend-touch-target pointer-events-auto rounded-full"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4.5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 3l0 18" />
              <path d="M12 9l4.65 -4.65" />
              <path d="M12 14.3l7.37 -7.37" />
              <path d="M12 19.6l8.85 -8.85" />
            </svg>
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            className="group/toggle pointer-events-auto rounded-full"
            onClick={() => setIsMuted((prev) => !prev)}
            title="Volume"
          >
            {isMuted ? (
              <React.Fragment>
                <SlVolumeOff className="size-4" />
                <span className="sr-only">Volume Off</span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <SlVolume2 className="size-4" />
                <span className="sr-only">Volume On</span>
              </React.Fragment>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
