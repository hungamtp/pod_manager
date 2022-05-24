import type { AppProps } from "next/app";
import { AppPropsWithLayout } from "@/models/common";
import { EmptyLayout } from "@/components/layouts";
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
