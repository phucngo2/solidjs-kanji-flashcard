import { appConfig, supabase } from "@/configs";
import { Kanji } from "@/models/kanji";
import { AppConfig, SearchQuery as AppSearchQuery } from "@/shared/types";
import { calculateRange } from "@/shared/utils";

interface SearchQuery extends AppSearchQuery {
  levelFilter: string;
}

export const KanjiQuery = {
  list: async (searchQuery: SearchQuery) => {
    const limitvalue = searchQuery.perPage;
    const offsetvalue = (searchQuery.page - 1) * searchQuery.perPage;

    const res = await supabase
      .rpc("getkanjiswithkeyword", {
        searchkeyword: searchQuery.searchKeyword || "",
        limitvalue,
        offsetvalue,
        levelfilter: searchQuery.levelFilter || "",
      })
      .single();

    return res.data as {
      kanjis: Kanji[];
      kanji_count: number;
    };
  },
  get: async (kanjiId: string | number): Promise<Kanji> => {
    const { data } = await supabase
      .from("kanjis")
      .select(
        "id, character, meaning, level, kunyomi, onyomi, examples(id, word, furigana, meaning, meaning_alt)"
      )
      .eq("id", kanjiId)
      .limit(1)
      .single();

    return data as Kanji;
  },
  create: async (kanji: Kanji) => {
    const examples = kanji.examples;
    const insertKanji = await supabase
      .from("kanjis")
      .insert({ ...kanji, examples: undefined })
      .select();

    if (insertKanji.error) {
      console.error(insertKanji.error);
      return false;
    }

    if (insertKanji.data) {
      const responses = await Promise.all(
        examples.map((example) => {
          const exampleToInsert = {
            ...example,
            kanji_id: (insertKanji.data[0] as Kanji).id,
            id: undefined,
          };
          return supabase.from("examples").insert(exampleToInsert);
        })
      );

      responses.map((res) => {
        if (res.error) console.error(res.error);
      });
    }

    return true;
  },
  delete: async () => {},
  update: async () => {},
  random: async (): Promise<Kanji> => {
    const levelListArr = [];
    for (let key in appConfig) {
      if (appConfig[key as keyof AppConfig] === true) {
        levelListArr.push(key);
      }
    }

    const res = await supabase
      .rpc("getrandomkanjiwithlevel", { levellist: levelListArr })
      .single();
    return res.data as Kanji;
  },
};
