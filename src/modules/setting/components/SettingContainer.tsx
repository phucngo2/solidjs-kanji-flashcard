import { DEFAULT_SWIPE_DISTANCE, appConfig, levelList } from "@/configs";
import { LevelSwitch } from "@/modules/setting";
import { Header, Input, Toggle } from "@/shared/components";
import { FormValidation, required, useForm, useToast } from "@/shared/hooks";
import { AppConfig } from "@/shared/types";
import { StorageHelper } from "@/shared/utils";
import { useNavigate } from "@solidjs/router";
import { Component, For } from "solid-js";

const initialValues: AppConfig = {
  ...appConfig,
  swipeDistance: DEFAULT_SWIPE_DISTANCE,
};

export const SettingContainer: Component<{}> = () => {
  const navigate = useNavigate();
  const { contentProvider, open } = useToast();

  const { register, onSubmit } = useForm<AppConfig>({
    handleSubmit,
    validation,
    initialValues,
  });

  function handleSubmit(values: AppConfig) {
    StorageHelper.setItem("appConfig", values);
    StorageHelper.setItem("swipeDistance", parseInt(`${values.swipeDistance}`));
  }

  function handleCancel() {
    navigate("/");
  }

  function handleSave() {
    onSubmit();
    open({
      type: "success",
      message: "Saved successfully!",
    });
    window.location.reload();
  }

  function handleSaveAndStart() {
    handleSave();
    window.location.assign("/random");
  }

  return (
    <form
      class="flex w-full h-full p-5 flex-col items-center space-y-6 overflow-y-auto"
      onSubmit={onSubmit}
    >
      <Header>Settings</Header>
      <For each={levelList}>
        {(level) => <LevelSwitch level={level} register={register} />}
      </For>
      <div class="w-full flex flex-row space-x-6">
        <Input
          label="App swipe distance detect"
          {...register("swipeDistance")}
          type="number"
          class="w-1/3"
          inputClass="input-md"
        />
        <div class="w-1/3 flex flex-col">
          <label class="text-sm font-semibold">Show furigana</label>
          <Toggle {...register("showFurigana")} type="primary" class="my-0.5" />
        </div>
        <div class="w-1/3 flex flex-col">
          <label class="text-sm font-semibold">Show alternative meaning</label>
          <Toggle
            {...register("showMeaningAlt")}
            type="primary"
            class="my-0.5"
          />
        </div>
      </div>
      <div class="flex flex-row items-center rounded w-full justify-between">
        <button type="button" class="btn" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" class="btn btn-secondary" onClick={handleSave}>
          Save
        </button>
        <button
          type="button"
          class="btn btn-primary"
          onClick={handleSaveAndStart}
        >
          Start
        </button>
      </div>
      {contentProvider}
    </form>
  );
};

const validation: FormValidation<any> = {
  swipeDistance: [
    {
      validator: required,
      errorMessage: "Swipe distance is required!",
    },
    {
      validator: (value: number) => value > 0,
      errorMessage: "Swipe distance must be bigger than 0!",
    },
  ],
};
