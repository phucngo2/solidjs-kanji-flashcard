import { createSignal } from "solid-js";

interface ConfirmationHookProps {
  title?: string;
  content?: string;
  btnTitle?: string;
  btnHandler?: (data: any) => void;
}

export const useConfirmation = (props?: ConfirmationHookProps) => {
  const [data, setData] = createSignal<any>();
  const open = (params: any) => {
    setData(params);
    (window as any).customed_modal.showModal();
  };
  const contentProvider = (
    <dialog id="customed_modal" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="text-lg font-bold">{props?.title || "Warning!"}</h3>
        <p class="py-2">{props?.content || ""}</p>
        <div class="modal-action mt-3">
          <button
            class="btn btn-sm"
            onClick={() => props?.btnHandler?.(data())}
          >
            {props?.btnTitle || "Ok"}
          </button>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );

  return { open, contentProvider };
};
