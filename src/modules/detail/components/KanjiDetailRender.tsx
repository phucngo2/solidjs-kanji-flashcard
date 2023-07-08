import {
  KanjiDetailToolbar,
  KanjiExample,
  useKanjiDetailQuery,
  useKanjiRandomQuery,
} from "@/modules/detail";
import { Loading } from "@/shared/components";
import { useSwipe } from "@/shared/hooks";
import { shuffle } from "lodash";
import { Component, For, Match, Show, Switch } from "solid-js";

export const KanjiDetailRender: Component<{
  query:
    | ReturnType<typeof useKanjiRandomQuery>
    | ReturnType<typeof useKanjiDetailQuery>;
  swipeHanlers: ReturnType<typeof useSwipe>;
}> = (props) => {
  return (
    <Switch>
      <Match when={props.query.isLoading}>
        <Loading />
      </Match>
      <Match when={!!props.query.data}>
        <div
          {...props.swipeHanlers}
          class="flex h-full w-full flex-col divide-y"
        >
          {/* Top Content */}
          <div class="flex flex-row p-6">
            {/* Kanji */}
            <div class="flex w-1/2 flex-col items-center justify-center space-y-2">
              <div class="text-8xl">{props.query.data?.character}</div>
              <div class="text-lg">{props.query.data?.meaning}</div>
            </div>
            {/* 意味 & 読み方 */}
            <div class="flex w-1/2 flex-col items-center justify-center">
              <div class="space-y-2">
                <Show when={props.query.data?.level}>
                  <div>
                    <div class="font-bold">JLPT Level</div>
                    <div>{props.query.data?.level}</div>
                  </div>
                </Show>
                <Show when={props.query.data?.onyomi}>
                  <div>
                    <div class="font-bold">音読み</div>
                    <div>{props.query.data?.onyomi}</div>
                  </div>
                </Show>
                <Show when={props.query.data?.kunyomi}>
                  <div>
                    <div class="font-bold">訓読み</div>
                    <div>{props.query.data?.kunyomi}</div>
                  </div>
                </Show>
              </div>
            </div>
          </div>
          {/* Bottom Content */}
          <div class="flex w-full flex-col space-y-5 p-6 overflow-y-auto pb-24">
            <For each={shuffle(props.query.data?.examples)}>
              {(item, _) => <KanjiExample kanjiExample={item} />}
            </For>
          </div>
        </div>
        <KanjiDetailToolbar />
      </Match>
    </Switch>
  );
};
