import { DEFAULT_PEGINATION_PERPAGE } from "@/configs";
import {
  KanjiManagementDataList,
  KanjiManagementHeader,
  useKanjiListQuery,
} from "@/modules/kanji-management";
import { Pagination } from "@/shared/components";
import { useListManagement } from "@/shared/hooks";
import { Component, createEffect } from "solid-js";

export const KanjiManagementContainer: Component<{}> = () => {
  const {
    page,
    searchKeyword,
    filter,
    total,
    onPaginate,
    onSearch,
    onTotal,
    onFilter,
  } = useListManagement();
  const kanjiListQuery = useKanjiListQuery();
  createEffect(() => {
    kanjiListQuery.mutate({
      page: page(),
      perPage: DEFAULT_PEGINATION_PERPAGE,
      levelFilter: filter(),
      searchKeyword: searchKeyword(),
    });
  });
  createEffect(() => {
    onTotal(kanjiListQuery.data?.kanji_count);
  });
  return (
    <div class="w-full h-full flex flex-col p-5 space-y-6 justify-between overflow-y-auto">
      <div class="w-full flex flex-col space-y-6">
        <KanjiManagementHeader
          filter={filter}
          onSearch={onSearch}
          onFilter={onFilter}
        />
        <KanjiManagementDataList kanjiListQuery={kanjiListQuery} />
      </div>
      <div class="w-full flex flex-row justify-center">
        <Pagination
          onPaginate={onPaginate}
          page={page}
          perPage={DEFAULT_PEGINATION_PERPAGE}
          total={total}
        />
      </div>
    </div>
  );
};
