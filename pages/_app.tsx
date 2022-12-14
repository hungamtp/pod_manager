import type { AppProps } from "next/app";
import { AppPropsWithLayout } from "@/models/common";
import { EmptyLayout } from "@/components/layouts";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { persistor, store } from "@/redux/store";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <SnackbarProvider
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              maxSnack={1}
            >
              <Component {...pageProps} />
            </SnackbarProvider>
          </Layout>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
