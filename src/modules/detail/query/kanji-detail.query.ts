import { Kanji, KanjiQuery } from "@/models/kanji";
import { createMutation } from "@tanstack/solid-query";

interface Options {
  onSuccess?: (data?: Kanji) => void;
}

export const useKanjiDetailQuery = (options?: Options) => {
  return createMutation({
    mutationKey: ["kanji-detail"],
    mutationFn: (kanjiId: string | number) => KanjiQuery.get(kanjiId),
    onSuccess: options?.onSuccess,
  });
};
