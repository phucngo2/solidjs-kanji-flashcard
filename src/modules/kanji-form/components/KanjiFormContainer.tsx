import { Kanji } from "@/models/kanji";
import { Input } from "@/shared/components";
import { FormValidation, required, useForm } from "@/shared/hooks";
import { Component } from "solid-js";
import { KanjiExamples, KanjiInputGroupWrapper } from ".";

export const KanjiFormContainer: Component<{}> = () => {
  const { onSubmit, register, values, handleAdd, handleDelete } =
    useForm<Kanji>({
      handleSubmit,
      validation,
    });

  function handleSubmit(values: any) {
    console.log(values);
  }

  return (
    <form
      class="flex h-full w-full flex-col items-center space-y-5 overflow-auto p-5"
      onSubmit={onSubmit}
    >
      <h3 class="text-2xl font-bold">Kanji</h3>
      <KanjiInputGroupWrapper>
        <Input
          label="Kanji Character"
          {...register("character")}
          className="w-1/3"
        />
        <Input label="Meaning" {...register("meaning")} className="w-1/3" />
        <Input label="Level" {...register("level")} className="w-1/3" />
      </KanjiInputGroupWrapper>
      <KanjiInputGroupWrapper>
        <Input label="Onyomi" {...register("onyomi")} className="w-1/2" />
        <Input label="Kunyomi" {...register("kunyomi")} className="w-1/2" />
      </KanjiInputGroupWrapper>
      <KanjiExamples
        register={register}
        values={values}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
      />
      <div class="flex w-full flex-row items-center justify-end space-x-4">
        <button class="btn btn-sm" type="button">
          Cancel
        </button>
        <button class="btn btn-primary btn-sm" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

const validation: FormValidation<Kanji> = {
  character: {
    validator: required,
    errorMessage: "Character is required!",
  },
};
