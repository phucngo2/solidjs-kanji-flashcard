import { useKanjiListQuery } from "@/modules/kanji-management";
import { Loading } from "@/shared/components";
import { A } from "@solidjs/router";
import { Component, For, Match, Switch } from "solid-js";
export const KanjiManagementDataList: Component<{
  kanjiListQuery: ReturnType<typeof useKanjiListQuery>;
}> = (props) => {
  return (
    <Switch>
      <Match when={props.kanjiListQuery.isLoading}>
        <Loading />
      </Match>
      <Match when={!!props.kanjiListQuery.data}>
        <div class="w-full flex flex-row flex-wrap items-start justify-between md:justify-center gap-4">
          <For each={props.kanjiListQuery.data?.kanjis}>
            {(kanji) => (
              <A
                href={`/kanji/${kanji.id}`}
                class="indicator w-20 h-20 border rounded flex justify-center items-center text-4xl reletive"
              >
                {kanji.character}
                <span class="absolute top-[4px] left-[6px] rounded text-xs">
                  {kanji.id}
                </span>
              </A>
            )}
          </For>
        </div>
      </Match>
    </Switch>
  );
};
