import { Kanji, KanjiQuery } from "@/models/kanji";
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
      onSuccess: () => {
        clearForm();
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
        <Input
          label="Kanji Character"
          {...register("character")}
          className="w-1/3"
        />
        <Input label="Index" {...register("index")} className="w-1/3" />
        <Input label="Level" {...register("level")} className="w-1/3" />
      </KanjiInputGroupWrapper>
      <KanjiInputGroupWrapper>
        <Input label="Meaning" {...register("meaning")} className="w-1/3" />
        <Input label="Onyomi" {...register("onyomi")} className="w-1/3" />
        <Input label="Kunyomi" {...register("kunyomi")} className="w-1/3" />
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
          onClick={async () => {
            var x = await KanjiQuery.search({
              page: 1,
              perPage: 3,
              searchKeyword: "si",
            });

            console.log(x);
          }}
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
    "index",
    "level",
    "meaning",
    "examples.word",
    "examples.furigana",
    "examples.meaning",
  ];

  const obj: FormValidation<any> = {};
  fields.forEach(
    (item) =>
      (obj[item] = {
        validator: required,
        errorMessage: `${capitalize(item)} is required!`,
      })
  );

  return obj;
}
