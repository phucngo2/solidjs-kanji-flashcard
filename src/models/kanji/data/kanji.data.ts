import { BaseQuery } from "@/models/base/data";
import { Kanji } from "@/models/kanji";

const searchFields = ["character", "meaning", "onyomi", "kunyomi", "level"];

export const KanjiQuery = BaseQuery<Kanji>({
  colection: "kanjis",
  searchFields,
});
