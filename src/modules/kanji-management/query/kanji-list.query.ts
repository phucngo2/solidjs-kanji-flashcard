import { KanjiQuery } from "@/models/kanji";
import { SearchQuery } from "@/shared/types";
import { createMutation } from "@tanstack/solid-query";

interface Query extends SearchQuery {
  levelFilter: string;
}

export const useKanjiListQuery = () => {
  return createMutation({
    mutationKey: ["query-list"],
    mutationFn: (query: Query) => KanjiQuery.list(query),
  });
};
