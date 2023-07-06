import { BaseModel } from "@/shared/types";

export interface KanjiExampleType extends BaseModel {
  word: string;
  furigana: string;
  meaning: string;
  meaning_alt: string;
}

export interface Kanji extends BaseModel {
  character: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  level: number;
  examples: KanjiExampleType[];
}
