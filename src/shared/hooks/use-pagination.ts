import { DEFAULT_PAGINATION_SIBLINGS } from "@/configs";
import { Accessor, createMemo } from "solid-js";

interface PaginationHookProps {
  total: Accessor<number>;
  perPage: number;
  page: Accessor<number>;
}

export const usePagination = (props: PaginationHookProps) => {
  const totalPage = createMemo(() => {
    return Math.ceil(props.total() / props.perPage);
  });

  const paginationRange = createMemo(() => {
    //Create an array containing numbers from start to end
    const range = (start: number, end: number) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, index) => index + start);
    };

    const numberOfSibling = DEFAULT_PAGINATION_SIBLINGS;
    var numberOfPageItem = 2 * numberOfSibling + 1;
    var leftSiblingIndex = Math.max(props.page() - numberOfSibling, 1);
    var rightSiblingIndex = Math.min(
      props.page() + numberOfSibling,
      totalPage()
    );

    if (rightSiblingIndex - leftSiblingIndex < numberOfPageItem) {
      const diff =
        numberOfPageItem - (rightSiblingIndex - leftSiblingIndex) - 1;

      if (leftSiblingIndex - diff > 0) {
        leftSiblingIndex -= diff;
      } else {
        leftSiblingIndex = 1;
        rightSiblingIndex += diff - (leftSiblingIndex - 1);
      }

      if (rightSiblingIndex > totalPage()) {
        rightSiblingIndex = totalPage();
        leftSiblingIndex = Math.max(
          1,
          rightSiblingIndex - numberOfPageItem + 1
        );
      }
    }

    const res: (number | "Start" | "End")[] = range(
      leftSiblingIndex,
      rightSiblingIndex
    );

    res.unshift("Start");
    res.push("End");

    return res;
  });

  return {
    totalPage,
    paginationRange,
  };
};
