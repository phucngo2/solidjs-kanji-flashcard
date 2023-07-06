import { KanjiQuery } from "@/models/kanji";
import { createQuery } from "@tanstack/solid-query";

export const useKanjiRandomQuery = () => {
  return createQuery({
    queryKey: () => ["kanji-random"],
    queryFn: KanjiQuery.random,
  });
};
