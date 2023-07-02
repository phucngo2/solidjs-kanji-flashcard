import { Component, JSX } from "solid-js";

export const Input: Component<{
  name: string;
  type?: string;
  label: string;
  onChange?: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
  value: string;
}> = (props) => {
  return (
    <div class="mb-4 w-full">
      <label>{props.label}</label>
      <input
        type={props.type || "text"}
        name={props.name}
        placeholder={`Enter ${props.label}`}
        value={props.value || ""}
        onChange={props.onChange}
        class="input-bordered input input-md mt-1 w-full"
      />
    </div>
  );
};
