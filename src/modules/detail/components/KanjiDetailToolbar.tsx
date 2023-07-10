import { A } from "@solidjs/router";
import { Component } from "solid-js";

export const KanjiDetailToolbar: Component<{
  handleLeft: () => void;
  handleRight: () => void;
}> = (props) => {
  return (
    <div class="join join-horizontal fixed bottom-10 left-1/2 -translate-x-1/2">
      <button class="btn join-item" onClick={props.handleLeft}>
        <i class="fa-solid fa-backward"></i>
      </button>
      <A href="/" class="btn join-item">
        <i class="fa-solid fa-house"></i>
      </A>
      <A href="/setting" class="btn join-item">
        <i class="fa-solid fa-cog"></i>
      </A>
      <button class="btn join-item" onClick={props.handleRight}>
        <i class="fa-solid fa-forward"></i>
      </button>
    </div>
  );
};
