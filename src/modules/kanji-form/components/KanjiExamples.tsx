import { Kanji } from "@/models/kanji";
import { FormRegister, useConfirmation } from "@/shared/hooks";
import { Accessor, Component, For } from "solid-js";
import { KanjiExampleInputGroup } from ".";

export const KanjiExamples: Component<{
  values: Accessor<Kanji>;
  register: FormRegister;
  handleAdd: (path: string) => void;
  handleDelete: (path: string, id: number) => void;
}> = (props) => {
  const formPath = "examples";

  const { open, contentProvider } = useConfirmation({
    btnHandler: (id) => props.handleDelete(formPath, id),
    content: "Are you sure you want to delete this item?",
    btnTitle: "Delete",
  });

  return (
    <>
      <For each={props.values().examples}>
        {(example, index) => (
          <KanjiExampleInputGroup
            index={index}
            register={props.register}
            onDeleteClick={open}
            id={example.id}
            formPath={formPath}
          />
        )}
      </For>
      <button
        class="btn btn-secondary btn-sm btn-outline btn-block"
        type="button"
        onClick={() => props.handleAdd(formPath)}
      >
        Add
      </button>
      {contentProvider}
    </>
  );
};
