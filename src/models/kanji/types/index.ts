import { BaseModel } from "@/shared/types";

export interface KanjiExampleType {
  word: string;
  furigana: string;
  vi: string;
  viKanji: string;
}

export interface Kanji extends BaseModel {
  index: number;
  character: string;
  onyomi: string;
  kunyomi: string;
  level: number;
  examples: KanjiExampleType[];
}
