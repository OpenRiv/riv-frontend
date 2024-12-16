import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainRouter from "./route/route";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { APIResponseError } from "endpoint-client";
import ScrollToTop from "./route/ScollToTop";

function App() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof APIResponseError) {
          if (error.body.code === "invalid_token") {
            localStorage.removeItem("accessToken");
            window.location.href = "/";
          }
        }
      },
    }),
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 * 5,
      },
    },
  });
  return (
    <RecoilRoot>
      <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
        <ScrollToTop />
        <QueryClientProvider client={queryClient}>
          <MainRouter />
        </QueryClientProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
