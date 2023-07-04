import { Component } from "solid-js";

export const Loading: Component<{}> = () => {
  return (
    <div class="h-full w-full flex items-center justify-center">
      <span class="loading loading-spinner text-primary"></span>
    </div>
  );
};
