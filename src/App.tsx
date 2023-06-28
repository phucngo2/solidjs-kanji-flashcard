import { RouteConfig } from "@/configs";
import type { Component } from "solid-js";

const App: Component = () => {
  return (
    <div class="flex h-screen items-center justify-center bg-slate-900 p-6">
      <RouteConfig />
    </div>
  );
};

export default App;
