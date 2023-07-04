import { Kanji, KanjiQuery } from "@/models/kanji";
import { createMutation } from "@tanstack/solid-query";

export const useKanjiCreateMutation = () => {
  return createMutation({
    mutationKey: ["kanji-create"],
    mutationFn: (values: Kanji) => KanjiQuery.create(values),
  });
};
