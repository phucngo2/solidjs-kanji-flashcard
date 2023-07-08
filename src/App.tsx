import { RouteConfig } from "@/configs";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
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
