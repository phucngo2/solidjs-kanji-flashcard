import classNames from "classnames";
import { Component, JSX, Show } from "solid-js";

export const Input: Component<{
  name: string;
  type?: string;
  label: string;
  onChange?: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
  value: string;
  className?: string;
  error?: string;
}> = (props) => {
  const classes = classNames(props.className || "");
  return (
    <div class={classes}>
      <label class="text-sm font-semibold">{props.label}</label>
      <input
        type={props.type || "text"}
        name={props.name}
        placeholder={`Enter ${props.label}`}
        value={props.value || ""}
        onChange={props.onChange}
        class="input-bordered input my-0.5 w-full input-sm"
      />
      <Show fallback={undefined} when={!!props.error}>
        <span class="text-red-500 text-xs">{props.error}</span>
      </Show>
    </div>
  );
};
