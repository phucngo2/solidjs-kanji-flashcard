import { KanjiQuery } from "@/models/kanji";
import { createQuery } from "@tanstack/solid-query";

export const useKanjiListQuery = () => {
  return createQuery({
    queryKey: () => ["query-list"],
    queryFn: KanjiQuery.list,
  });
};
