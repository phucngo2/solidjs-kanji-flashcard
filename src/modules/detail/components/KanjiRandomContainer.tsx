import { KanjiDetailRender, useKanjiRandomQuery } from "@/modules/detail";
import { useSwipe } from "@/shared/hooks";
import { Component } from "solid-js";

export const KanjiRandomContainer: Component<{}> = () => {
  const kanjiRandomQuery = useKanjiRandomQuery();
  const swipeHanlers = useSwipe({
    handleSwipe: kanjiRandomQuery.refetch,
  });
  return (
    <KanjiDetailRender query={kanjiRandomQuery} swipeHanlers={swipeHanlers} />
  );
};
