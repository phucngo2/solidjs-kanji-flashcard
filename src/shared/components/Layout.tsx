import { Outlet } from "@solidjs/router";
import { type Component } from "solid-js";

export const Layout: Component<{}> = () => {
  return (
    <div class="h-full w-full max-w-[640px] rounded-2xl bg-white">
      <Outlet />
    </div>
  );
};
