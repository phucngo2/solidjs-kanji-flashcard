import { KanjiDetailRender, useKanjiRandomQuery } from "@/modules/detail";
import { useSwipe } from "@/shared/hooks";
import { useNavigate } from "@solidjs/router";
import { Component, onMount } from "solid-js";

export const KanjiRandomContainer: Component<{}> = () => {
  const navigate = useNavigate();
  const kanjiRandomQuery = useKanjiRandomQuery({
    onSuccess: (data) => {
      if (!data) navigate("/setting");
    },
  });
  onMount(() => kanjiRandomQuery.mutate());
  const swipeHanlers = useSwipe({
    handleSwipe: kanjiRandomQuery.mutate,
  });
  return (
    <KanjiDetailRender query={kanjiRandomQuery} swipeHanlers={swipeHanlers} />
  );
};
