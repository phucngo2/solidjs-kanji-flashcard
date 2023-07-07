import { Toggle } from "@/shared/components";
import { Component } from "solid-js";

export const HomeContainer: Component<{}> = () => {
  return (
    <div class="flex w-full h-full p-5">
      <Toggle name="5" value="true" />
    </div>
  );
};
