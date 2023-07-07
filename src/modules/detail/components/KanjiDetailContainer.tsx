import { KanjiDetailRender, useKanjiDetailQuery } from "@/modules/detail";
import { useSwipe } from "@/shared/hooks";
import { useNavigate, useParams } from "@solidjs/router";
import { Component } from "solid-js";

export const KanjiDetailContainer: Component<{}> = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const kanjiDetailQuery = useKanjiDetailQuery(params.id, {
    onSuccess: (data) => {
      if (!data) navigate("/kanji");
    },
  });
  const swipeHanlers = useSwipe({
    handleLeftSwipe: () => navigate(`/kanji/${parseInt(params.id) + 1}`),
    handleRightSwipe: () => navigate(`/kanji/${parseInt(params.id) - 1}`),
  });
  return (
    <KanjiDetailRender query={kanjiDetailQuery} swipeHanlers={swipeHanlers} />
  );
};
