import { Albert_Sans, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fontVariables = cn(albertSans.variable, geistMono.variable);

export default fontVariables;
