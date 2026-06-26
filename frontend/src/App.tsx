import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";
import { applyInitialTheme } from "./store/app-store";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    applyInitialTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
