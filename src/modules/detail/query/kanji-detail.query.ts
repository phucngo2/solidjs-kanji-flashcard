import { KanjiQuery } from "@/models/kanji";
import { createQuery } from "@tanstack/solid-query";

export const useKanjiDetailQuery = (kanjiId: string | number) => {
  return createQuery({
    queryKey: () => ["kanji-detail", kanjiId],
    queryFn: ({ queryKey }) => KanjiQuery.get(queryKey[1]),
  });
};
