import * as React from "react";

import SoundProvider from "@/components/provider/sound.provider";
import { Toggle } from "@/components/shared/toggle";
import { Footer } from "@/components/shared/footer";
import { Toaster } from "@/components/ui/sonner";

export default function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SoundProvider>
      <Toggle />
      <Toaster richColors theme="dark" />
      <main className="flex-1">{children}</main>
      <Footer />
    </SoundProvider>
  );
}
