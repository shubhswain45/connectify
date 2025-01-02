import MainLayout from "@/layout/MainLayout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Toaster } from 'sonner'

// Create a QueryClient instance with staleTime set to 30 minutes
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1800000, // 30 minutes in milliseconds
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  // Define paths where MainLayout should not be displayed
  const noLayoutPaths = ["/login", "/signup", "/", "/theme"];

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {noLayoutPaths.includes(pathname) ? (
        <Component {...pageProps} />
      ) : (
        <MainLayout>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </MainLayout>
      )}
    </QueryClientProvider>
  );
}
