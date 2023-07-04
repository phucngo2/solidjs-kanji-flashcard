import { RouteConfig } from "@/configs";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import type { Component } from "solid-js";

const queryClient = new QueryClient();

const App: Component = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div class="flex h-screen items-center justify-center bg-slate-900 p-5">
        <RouteConfig />
      </div>
    </QueryClientProvider>
  );
};

export default App;
