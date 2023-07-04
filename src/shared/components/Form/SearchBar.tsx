import { Component } from "solid-js";

export const SearchBar: Component<{}> = (props) => {
  return (
    <form class="join">
      <input
        class="input input-bordered input-sm join-item"
        placeholder="Enter something to search..."
      />
      <button class="btn btn-sm join-item">Search</button>
    </form>
  );
};
