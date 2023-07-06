import { KanjiExample, useKanjiRandomQuery } from "@/modules/detail";
import { Loading } from "@/shared/components";
import { useSwipe } from "@/shared/hooks";
import { shuffle } from "lodash";
import { Component, For, Match, Show, Switch } from "solid-js";

export const KanjiDetailContainer: Component<{}> = () => {
  const kanjiRandomQuery = useKanjiRandomQuery();
  const swipeHanlers = useSwipe({
    handleSwipe: kanjiRandomQuery.refetch,
  });
  return (
    <Switch>
      <Match when={kanjiRandomQuery.isFetching}>
        <Loading />
      </Match>
      <Match when={!!kanjiRandomQuery.data}>
        <div {...swipeHanlers} class="flex h-full w-full flex-col divide-y">
          {/* Top Content */}
          <div class="flex flex-row p-6">
            {/* Kanji */}
            <div class="flex w-1/2 flex-col items-center justify-center space-y-2">
              <div class="text-8xl">{kanjiRandomQuery.data?.character}</div>
              <div class="text-lg">{kanjiRandomQuery.data?.meaning}</div>
            </div>
            {/* 意味 & 読み方 */}
            <div class="flex w-1/2 flex-col items-center justify-center">
              <div class="space-y-2">
                <Show when={kanjiRandomQuery.data?.level}>
                  <div>
                    <div class="font-bold">JLPT Level</div>
                    <div>{kanjiRandomQuery.data?.level}</div>
                  </div>
                </Show>
                <Show when={kanjiRandomQuery.data?.onyomi}>
                  <div>
                    <div class="font-bold">音読み</div>
                    <div>{kanjiRandomQuery.data?.onyomi}</div>
                  </div>
                </Show>
                <Show when={kanjiRandomQuery.data?.kunyomi}>
                  <div>
                    <div class="font-bold">訓読み</div>
                    <div>{kanjiRandomQuery.data?.kunyomi}</div>
                  </div>
                </Show>
              </div>
            </div>
          </div>
          {/* Bottom Content */}
          <div class="flex w-full flex-col space-y-5 p-6">
            <For each={shuffle(kanjiRandomQuery.data?.examples)}>
              {(item, _) => <KanjiExample kanjiExample={item} />}
            </For>
          </div>
        </div>
      </Match>
    </Switch>
  );
};
