import { createSignal } from "solid-js";

export const useListManagement = () => {
  const [page, setPage] = createSignal<number>(1);
  const [searchKeyword, setSearchKeyword] = createSignal<string>("");
  const [filter, setFilter] = createSignal<string>("");
  const [total, setTotal] = createSignal<number>(1);
  const onPaginate = (newPage: number) => setPage(newPage);
  const onSearch = (value: string) => {
    setPage(1);
    setSearchKeyword(value);
  };
  const onTotal = (newTotal?: number) => {
    if (newTotal && newTotal > 0) setTotal(newTotal);
  };
  const onFilter = (newFilter: string) => {
    setPage(1);
    setFilter(newFilter);
  };

  return {
    page,
    searchKeyword,
    total,
    filter,
    onPaginate,
    onSearch,
    onTotal,
    onFilter,
  };
};
