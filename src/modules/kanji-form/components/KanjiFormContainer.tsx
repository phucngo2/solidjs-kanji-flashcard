import { Input } from "@/shared/components";
import { useForm } from "@/shared/hooks";
import { Component, For } from "solid-js";

export const KanjiFormContainer: Component<{}> = () => {
  const { onSubmit, register, values, setFormValues } = useForm({
    handleSubmit,
  });

  function handleSubmit(values: any) {
    console.log({ ...values });
  }

  function handleAdd() {}

  return (
    <form
      class="flex h-full w-full flex-col items-center overflow-auto p-4"
      onSubmit={onSubmit}
    >
      <h3 class="mb-4 text-2xl font-bold">Kanji</h3>
      <Input label="Kanji Character" {...register("character")} />
      <Input label="Meaning" {...register("meaning")} />
      <Input label="Onyomi" {...register("onyomi")} />
      <Input label="Kunyomi" {...register("kunyomi")} />
      <For each={values().examples || []}>
        {(example, index) => (
          <div>
            <Input
              label={`Example ${index() + 1}`}
              {...register(`examples.${index()}.word`)}
            />
          </div>
        )}
      </For>
      <button onClick={handleAdd}>Add</button>
      <button type="submit">Submit</button>
    </form>
  );
};
