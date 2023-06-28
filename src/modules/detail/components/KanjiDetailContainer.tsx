import { KanjiExample, KanjiExampleType } from "@/modules/detail";
import { useSwipe } from "@/shared/hooks";
import { Component, For } from "solid-js";

export const KanjiDetailContainer: Component<{}> = () => {
  const swipeHanlers = useSwipe();
  return (
    <div {...swipeHanlers} class="flex h-full w-full flex-col divide-y">
      {/* Top Content */}
      <div class="flex flex-row p-6">
        {/* Kanji */}
        <div class="flex w-1/2 flex-col items-center justify-center space-y-2">
          <div class="text-8xl">夜</div>
          <div class="text-lg">Dạ</div>
        </div>
        {/* 意味 & 読み方 */}
        <div class="flex w-1/2 flex-col items-center justify-center">
          <div class="space-y-2">
            <div>
              <div class="font-bold">音読み</div>
              <div>ヤ</div>
            </div>
            <div>
              <div class="font-bold">訓読み</div>
              <div>よ, よる</div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Content */}
      <div class="flex w-full flex-col space-y-5 p-6">
        <For each={mockData}>
          {(item, _) => <KanjiExample kanjiExample={item} />}
        </For>
      </div>
    </div>
  );
};

const mockData: KanjiExampleType[] = [
  {
    word: "今夜",
    furigana: "こんや",
    vi: "Đêm nay",
    viKanji: "Kim Dạ",
  },
  {
    word: "夜間",
    furigana: "やかん",
    vi: "Đêm hôm, thời gian vào buổi tối",
    viKanji: "Dạ Gian",
  },
  {
    word: "夜中",
    furigana: "よなか",
    vi: "Nửa đêm",
    viKanji: "Dạ Trung",
  },
];
