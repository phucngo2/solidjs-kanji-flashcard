import { Kanji, KanjiQuery } from "@/models/kanji";
import { createMutation } from "@tanstack/solid-query";

interface Options {
  onSuccess?: (data?: Kanji) => void;
}

export const useKanjiRandomQuery = (options?: Options) => {
  return createMutation({
    mutationKey: ["kanji-random"],
    mutationFn: () => KanjiQuery.random(),
    onSuccess: options?.onSuccess,
  });
};
