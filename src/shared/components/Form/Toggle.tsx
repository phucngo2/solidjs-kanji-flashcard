import { Component, JSX } from "solid-js";

export const Toggle: Component<{
  name: string;
  type?: string;
  onChange?: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
  value: string;
}> = (props) => {
  return (
    <input
      type="checkbox"
      class="toggle toggle-primary"
      name={props.name}
      onChange={props.onChange}
      checked={!!props.value}
    />
  );
};
