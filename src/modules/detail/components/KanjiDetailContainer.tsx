import { KanjiDetailRender, useKanjiDetailQuery } from "@/modules/detail";
import { useSwipe } from "@/shared/hooks";
import { useNavigate, useParams } from "@solidjs/router";
import { Component, onMount } from "solid-js";

export const KanjiDetailContainer: Component<{}> = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const kanjiDetailQuery = useKanjiDetailQuery({
    onSuccess: (data) => {
      if (!data) navigate("/kanji");
    },
  });
  onMount(() => kanjiDetailQuery.mutate(params.id));
  const handleLeft = () => navigate(`/kanji/${parseInt(params.id) + 1}`);
  const handleRight = () => navigate(`/kanji/${parseInt(params.id) - 1}`);
  const swipeHanlers = useSwipe({
    handleLeftSwipe: handleLeft,
    handleRightSwipe: handleRight,
  });
  return (
    <KanjiDetailRender
      query={kanjiDetailQuery}
      swipeHanlers={swipeHanlers}
      handleLeft={handleRight}
      handleRight={handleLeft}
    />
  );
};
