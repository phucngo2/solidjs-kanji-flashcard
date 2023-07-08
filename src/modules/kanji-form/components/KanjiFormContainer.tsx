import { Kanji } from "@/models/kanji";
import { useKanjiCreateMutation } from "@/modules/kanji-form";
import { Input } from "@/shared/components";
import { FormValidation, required, useForm } from "@/shared/hooks";
import { capitalize } from "lodash";
import { Component } from "solid-js";
import { KanjiExamples, KanjiInputGroupWrapper } from ".";

export const KanjiFormContainer: Component<{}> = () => {
  const { onSubmit, register, values, handleAdd, handleDelete, clearForm } =
    useForm<Kanji>({
      handleSubmit,
      validation: validation(),
    });

  const kanjiCreateMutation = useKanjiCreateMutation();

  function handleSubmit(values: any) {
    kanjiCreateMutation.mutate(values as Kanji, {
      onSuccess: (data) => {
        if (data) clearForm();
      },
    });
  }

  return (
    <form
      class="flex h-full w-full flex-col items-center space-y-5 overflow-auto p-5"
      onSubmit={onSubmit}
    >
      <h3 class="text-2xl font-bold">Kanji</h3>
      <KanjiInputGroupWrapper>
        {/* <Input
          label="Id"
          {...register("id")}
          class="w-1/3"
          inputClass="input-sm"
        /> */}
        <Input
          label="Kanji Character"
          {...register("character")}
          class="w-1/3"
          inputClass="input-sm"
        />
        <Input
          label="Level"
          type="number"
          {...register("level")}
          class="w-1/3"
          inputClass="input-sm"
        />
        <Input
          label="Meaning"
          {...register("meaning")}
          class="w-1/3"
          inputClass="input-sm"
        />
      </KanjiInputGroupWrapper>
      <KanjiInputGroupWrapper>
        <Input
          label="Onyomi"
          {...register("onyomi")}
          class="w-1/2"
          inputClass="input-sm"
        />
        <Input
          label="Kunyomi"
          {...register("kunyomi")}
          class="w-1/2"
          inputClass="input-sm"
        />
      </KanjiInputGroupWrapper>
      <KanjiExamples
        register={register}
        values={values}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
      />
      <div class="flex w-full flex-row items-center justify-end space-x-4">
        <button
          class="btn btn-sm"
          type="button"
          disabled={kanjiCreateMutation.isLoading}
        >
          Cancel
        </button>
        <button
          class="btn btn-primary btn-sm"
          type="submit"
          disabled={kanjiCreateMutation.isLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

function validation(): FormValidation<any> {
  var fields: string[] = [
    "character",
    "level",
    "meaning",
    "examples.word",
    "examples.furigana",
    "examples.meaning",
  ];

  const obj: FormValidation<any> = {};
  fields.forEach((item) => {
    let validators = [
      {
        validator: required,
        errorMessage: `${capitalize(item)} is required!`,
      },
    ];
    if (item == "level") {
      validators.push({
        validator: (level: number) => level > 0 && level < 6,
        errorMessage: `Level must be from 1 - 5!!`,
      });
    }
    obj[item] = validators;
  });

  return obj;
}
