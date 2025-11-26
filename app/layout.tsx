import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import fontVariables from "@/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
};

export default function RootLayout(props: LayoutProps<"/">): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={fontVariables}>
        <Analytics />
        <SpeedInsights />
        {props.children}
      </body>
    </html>
  );
}
