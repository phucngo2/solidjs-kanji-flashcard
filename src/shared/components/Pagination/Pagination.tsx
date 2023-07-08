import { usePagination } from "@/shared/hooks";
import { Accessor, Component, For, Match, Switch } from "solid-js";

export const Pagination: Component<{
  onPaginate: (page: number) => void;
  page: Accessor<number>;
  perPage: number;
  total: Accessor<number>;
}> = (props) => {
  const { totalPage, paginationRange } = usePagination({
    page: props.page,
    perPage: props.perPage,
    total: props.total,
  });
  return (
    <div class="join">
      <For each={paginationRange()}>
        {(pageNumber) => {
          let onClickGetter = () => {
            if (pageNumber == "Start") return () => props.onPaginate(1);
            if (pageNumber == "End") return () => props.onPaginate(totalPage());
            return () => props.onPaginate(pageNumber);
          };
          return (
            <button
              class={`join-item btn btn-sm ${
                props.page() == pageNumber ? "btn-active" : ""
              }`}
              onClick={onClickGetter()}
            >
              <Switch>
                <Match when={pageNumber == "Start"}>
                  <i class="fa-solid fa-backward"></i>
                </Match>
                <Match when={pageNumber == "End"}>
                  <i class="fa-solid fa-forward"></i>
                </Match>
                <Match when={pageNumber}>{pageNumber}</Match>
              </Switch>
            </button>
          );
        }}
      </For>
    </div>
  );
};
