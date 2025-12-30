import "./index.css";
import ReactDOM from "react-dom/client";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError(error, _variables, _onMutateResult, _mutation, context) {
      console.log("👉 ~ error:", {
        error,

        context,
      });
    },
  }),
});
export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster richColors position="top-right" />
  </QueryClientProvider>
);
