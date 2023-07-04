import { Component, Match, Switch } from "solid-js";
import { useKanjiListQuery } from "@/modules/kanji-management";
import { Loading, SearchBar } from "@/shared/components";

export const KanjiManagementContainer: Component<{}> = () => {
  const kanjiListQuery = useKanjiListQuery();
  return (
    <Switch>
      <Match when={kanjiListQuery.isLoading}>
        <Loading />
      </Match>
      <Match when={kanjiListQuery.isSuccess}>
        <div class="w-full h-full flex flex-col p-5">
          <div class="w-full flex flex-row justify-between items-center">
            <h3 class="font-bold">Kanji</h3>
            <SearchBar />
          </div>
          <div class="flex flex-row flex-1"></div>
          <div class="w-full flex flex-row justify-center">
            <div class="join">
              <button class="join-item btn btn-sm">1</button>
              <button class="join-item btn btn-sm btn-active">2</button>
              <button class="join-item btn btn-sm">3</button>
              <button class="join-item btn btn-sm">4</button>
            </div>
          </div>
        </div>
      </Match>
    </Switch>
  );
};
