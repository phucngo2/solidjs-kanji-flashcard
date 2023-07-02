import { KanjiExampleType } from "@/models/kanji";
import { Component, Show, splitProps } from "solid-js";

export const KanjiExample: Component<{
  kanjiExample: KanjiExampleType;
}> = (props) => {
  const [local] = splitProps(props, ["kanjiExample"]);
  const { kanjiExample } = local;
  return (
    <div class="flex w-full flex-row justify-between">
      <div class="flex flex-col items-center">
        <div>{kanjiExample.word}</div>
        <div class="text-xs">({kanjiExample.furigana})</div>
      </div>
      <div class="flex flex-col items-end">
        <div class="max-w-[12rem] text-right">{kanjiExample.vi}</div>
        <Show when={!!kanjiExample.viKanji}>
          <div class="text-xs">({kanjiExample.viKanji})</div>
        </Show>
      </div>
    </div>
  );
};
