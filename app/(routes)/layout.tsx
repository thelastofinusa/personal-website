import NextTopLoader from "nextjs-toploader";

import { GlobalProvider } from "../../components/provider/global";
import { Toaster } from "@/components/ui/sonner";
import { Settings } from "@/components/shared/settings";

export default function RoutesLayout(
  props: LayoutProps<"/">,
): React.JSX.Element {
  return (
    <GlobalProvider>
      <Settings />
      <Toaster richColors />
      <NextTopLoader color="var(--primary)" showSpinner={false} />
      <main className="flex-1">{props.children}</main>
      {/* <Footer /> */}
    </GlobalProvider>
  );
}
