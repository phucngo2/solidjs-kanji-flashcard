import { BaseModel } from "@/shared/types";

export interface KanjiExampleType extends BaseModel {
  word: string;
  furigana: string;
  meaning: string;
  meaningKanji: string;
}

export interface Kanji extends BaseModel {
  index: number;
  character: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  level: number;
  examples: KanjiExampleType[];
}
