import { Show, createEffect, createSignal, onCleanup } from "solid-js";

export const useToast = () => {
  const [toastMessage, setToastMessage] = createSignal<string>("");
  let timeOut: ReturnType<typeof setTimeout>;
  createEffect(() => {
    if (!!toastMessage()) {
      timeOut = setTimeout(() => setToastMessage(""), 7000);
    }
  });
  onCleanup(() => clearTimeout(timeOut));
  const open = (message: string) => setToastMessage(message);
  const contentProvider = (
    <Show when={!!toastMessage()}>
      <div class="toast toast-top toast-end">
        <div class="alert alert-info">
          <span>{toastMessage()}</span>
        </div>
      </div>
    </Show>
  );

  return { contentProvider, open };
};
