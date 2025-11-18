"use client";

import * as React from "react";
import NextjsToploader from "nextjs-toploader";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <Header />
      <NextjsToploader showSpinner={false} color={"var(--primary)"} />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextThemesProvider>
  );
}
