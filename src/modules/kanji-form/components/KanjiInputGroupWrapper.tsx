import { Component, JSXElement, children } from "solid-js";

export const KanjiInputGroupWrapper: Component<{
  children: JSXElement;
}> = (props) => {
  const c = children(() => props.children);
  return <div class="flex flex-row space-x-4 w-full">{c()}</div>;
};
