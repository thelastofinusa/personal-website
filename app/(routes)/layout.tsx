import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";

import Provider from "../provider";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/shared/header";

export default function RoutesLayout(props: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <Provider>
      <NextTopLoader color="var(--primary)" showSpinner={false} />
      <Suspense fallback={<div style={{ height: 64 }} />}> {/* header height placeholder */}
        <Header />
      </Suspense>
      <main>{props.children}</main>
      <Toaster richColors />
    </Provider>
  );
}
