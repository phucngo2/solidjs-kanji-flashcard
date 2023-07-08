import { Component } from "solid-js";

export const SearchBar: Component<{
  onSearch: (value: string) => void;
}> = (props) => {
  let ref!: HTMLInputElement;
  return (
    <form
      class="join"
      onSubmit={(e) => {
        e.preventDefault();
        if (ref) props.onSearch(ref.value);
      }}
    >
      <input
        class="input input-bordered input-sm join-item max-w-[5.2rem]"
        placeholder="Search..."
        //@ts-ignore
        ref={ref}
      />
      <button class="btn btn-sm join-item" type="submit">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};
