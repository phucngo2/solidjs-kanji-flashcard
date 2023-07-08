import { Component, JSXElement, children } from "solid-js";

export const Header: Component<{ children: JSXElement }> = (props) => {
  const c = children(() => props.children);
  return <h3 class="font-bold text-2xl">{c()}</h3>;
};
