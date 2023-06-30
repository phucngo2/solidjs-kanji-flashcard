import { Component } from "solid-js";

export const KanjiFormContainer: Component<{}> = () => {
  return (
    <form class="flex h-full w-full flex-col items-center overflow-auto p-6">
      <h3>Kanji</h3>
      <input
        type="text"
        placeholder="Type here"
        class="input-bordered input input-md w-full"
      />
    </form>
  );
};
