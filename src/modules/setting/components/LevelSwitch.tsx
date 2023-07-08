import { LevelItem } from "@/configs";
import { Toggle } from "@/shared/components";
import { FormRegister } from "@/shared/hooks";
import { Component } from "solid-js";

export const LevelSwitch: Component<{
  level: LevelItem;
  register: FormRegister;
}> = (props) => {
  return (
    <div class="bg-slate-200 flex flex-row items-center p-3 rounded w-full justify-between">
      <h5 class="font-semibold">JLPT N{props.level.level}</h5>
      <Toggle {...props.register(props.level.level)} type={props.level.theme} />
    </div>
  );
};
