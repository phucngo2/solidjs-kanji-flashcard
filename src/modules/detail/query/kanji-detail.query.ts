import { Kanji, KanjiQuery } from "@/models/kanji";
import { createQuery } from "@tanstack/solid-query";

interface Options {
  onSuccess?: (data?: Kanji) => void;
}

export const useKanjiDetailQuery = (
  kanjiId: string | number,
  options?: Options
) => {
  return createQuery({
    queryKey: () => ["kanji-detail", kanjiId],
    queryFn: ({ queryKey }) => KanjiQuery.get(queryKey[1]),
    onSuccess: options?.onSuccess,
  });
};
