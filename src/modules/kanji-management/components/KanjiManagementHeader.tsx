import { levelList } from "@/configs";
import { Header, SearchBar } from "@/shared/components";
import { Accessor, Component, For } from "solid-js";

export const KanjiManagementHeader: Component<{
  onSearch: (value: string) => void;
  onFilter: (value: string) => void;
  filter: Accessor<string>;
}> = (props) => {
  return (
    <div class="w-full flex flex-row justify-between items-center">
      <Header>Kanji</Header>
      <form class="flex flex-row space-x-2">
        <select
          class="max-w-[4.2rem] select select-bordered select-sm"
          value={props.filter()}
          onChange={(e) => props.onFilter(e.currentTarget.value)}
        >
          <option selected value="">
            All
          </option>
          <For each={levelList}>
            {(level) => <option value={level.level}>N{level.level}</option>}
          </For>
        </select>
        <SearchBar onSearch={props.onSearch} />
      </form>
    </div>
  );
};
