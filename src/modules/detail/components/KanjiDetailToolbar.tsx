import { A } from "@solidjs/router";
import { Component } from "solid-js";

export const KanjiDetailToolbar: Component<{}> = (props) => {
  return (
    <div class="join join-horizontal fixed bottom-10 right-10">
      <A href="/" class="btn join-item">
        <i class="fa-solid fa-house"></i>
      </A>
      <A href="/setting" class="btn join-item ">
        <i class="fa-solid fa-cog"></i>
      </A>
    </div>
  );
};
