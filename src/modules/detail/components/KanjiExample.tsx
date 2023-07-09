import { appConfig } from "@/configs";
import { KanjiExampleType } from "@/models/kanji";
import { Component, Show, splitProps } from "solid-js";

export const KanjiExample: Component<{
  kanjiExample: KanjiExampleType;
}> = (props) => {
  const [local] = splitProps(props, ["kanjiExample"]);
  const { kanjiExample } = local;
  return (
    <div class="flex w-full flex-row justify-between space-x-2">
      <div class="max-w-[50%] flex flex-col items-start">
        <div>{kanjiExample.word}</div>
        <Show when={!!appConfig?.showFurigana}>
          <div class="text-xs">({kanjiExample.furigana})</div>
        </Show>
      </div>
      <div class="max-w-[50%] flex flex-col items-end">
        <div class="text-right">{kanjiExample.meaning}</div>
        <Show when={!!kanjiExample.meaning_alt}>
          <div class="text-xs">({kanjiExample.meaning_alt})</div>
        </Show>
      </div>
    </div>
  );
};
