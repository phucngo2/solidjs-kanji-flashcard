import { createSignal } from "solid-js";

export const useListManagement = () => {
  const [page, setPage] = createSignal<number>(1);
  const [searchKeyword, setSearchKeyword] = createSignal<string>("");
  const onPaginate = (newPage: number) => setPage(newPage);
  const onSearch = (value: string) => setSearchKeyword(value);

  return {
    page,
    searchKeyword,
    onPaginate,
    onSearch,
  };
};
