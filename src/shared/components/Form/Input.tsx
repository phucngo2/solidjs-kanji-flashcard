import classNames from "classnames";
import { Component, JSX, Show } from "solid-js";

export const Input: Component<{
  name: string;
  type?: string;
  label: string;
  onChange?: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
  value: string;
  class?: string;
  error?: string;
  min?: number;
  max?: number;
  inputClass?: string;
}> = (props) => {
  const classes = classNames(props.class || "");
  const inputClasses = classNames(
    "input-bordered input my-0.5 w-full",
    props.inputClass || ""
  );
  return (
    <div class={classes}>
      <label class="text-sm font-semibold" for={props.name}>
        {props.label}
      </label>
      <input
        type={props.type || "text"}
        name={props.name}
        placeholder={`Enter ${props.label}`}
        value={props.value || ""}
        onChange={props.onChange}
        min={props.min}
        max={props.max}
        class={inputClasses}
      />
      <Show fallback={undefined} when={!!props.error}>
        <span class="text-red-500 text-xs">{props.error}</span>
      </Show>
    </div>
  );
};
