import { ThemeType } from "@/shared/types";
import { Component, JSX } from "solid-js";

export const Toggle: Component<{
  name: string;
  type?: ThemeType | "";
  onChange?: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
  value: string;
}> = (props) => {
  return (
    <input
      type="checkbox"
      class={`toggle toggle-${props.type}`}
      name={props.name}
      onChange={props.onChange}
      checked={!!props.value}
    />
  );
};
