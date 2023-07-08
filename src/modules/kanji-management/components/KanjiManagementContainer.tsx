import { Component, Match, Switch } from "solid-js";
import { useKanjiListQuery } from "@/modules/kanji-management";
import { Header, Loading, SearchBar } from "@/shared/components";
import { useListManagement } from "@/shared/hooks/use-list-management";

export const KanjiManagementContainer: Component<{}> = () => {
  // const kanjiListQuery = useKanjiListQuery();
  const { page, searchKeyword, onPaginate, onSearch } = useListManagement();
  return (
    <Switch>
      <Match when={false}>
        <Loading />
      </Match>
      <Match when={true}>
        <div class="w-full h-full flex flex-col p-5">
          <div class="w-full flex flex-row justify-between items-center">
            <Header>Kanji</Header>
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
