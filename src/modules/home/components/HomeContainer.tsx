import { homeBtns } from "@/configs";
import { Header } from "@/shared/components";
import { A } from "@solidjs/router";
import { Component, For } from "solid-js";

export const HomeContainer: Component<{}> = () => {
  return (
    <div class="flex w-full h-full p-5 flex-col items-center pt-[36%] space-y-6">
      <Header>Kanji Flashcard</Header>
      <For each={homeBtns}>
        {(btn) => (
          <A
            href={btn.path}
            class="btn btn-wide bg-slate-200 font-semibold flex flex-row items-center py-3 px-12 rounded justify-between"
          >
            {btn.title}
            {btn.icon}
          </A>
        )}
      </For>
    </div>
  );
};
