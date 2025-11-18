import { cn } from "@/lib/utils";
import { Albert_Sans, Geist_Mono, Rock_Salt } from "next/font/google";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const rockSalt = Rock_Salt({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

export const fontVariables = cn(
  albertSans.variable,
  rockSalt.variable,
  geistMono.variable,
);
