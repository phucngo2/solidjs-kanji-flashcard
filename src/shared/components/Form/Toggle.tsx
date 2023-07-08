import { ThemeType } from "@/shared/types";
import classNames from "classnames";
import { Component, JSX } from "solid-js";

export const Toggle: Component<{
  name: string;
  type?: ThemeType | "";
  onChange?: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
  value: string;
  class?: string;
}> = (props) => {
  const classes = classNames(`toggle toggle-${props.type}`, props.class || "")
  return (
    <input
      type="checkbox"
      class={classes}
      name={props.name}
      onChange={props.onChange}
      checked={!!props.value}
    />
  );
};
