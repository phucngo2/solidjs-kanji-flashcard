import { DEFAULT_NOTIFICATION_TIME } from "@/configs";
import { Show, createEffect, createSignal, onCleanup } from "solid-js";

interface ToastType {
  type: "info" | "alert" | "warning" | "success";
  message?: string;
}

export const useToast = () => {
  const [toast, setToast] = createSignal<ToastType>({
    type: "info",
    message: "",
  });

  createEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (!!toast().message) {
      timeout = setTimeout(
        () =>
          setToast((prev) => ({
            ...prev,
            message: "",
          })),
        DEFAULT_NOTIFICATION_TIME
      );
    }
    onCleanup(() => {
      if (timeout) {
        clearTimeout(timeout);
      }
    });
  }, [toast().message]);

  const open = (newToast: ToastType) => setToast(newToast);

  const contentProvider = (
    <Show when={!!toast().message}>
      <div class="toast toast-bottom toast-center">
        <div class={`alert rounded shadow alert-${toast().type}`}>
          <span>{toast().message}</span>
        </div>
      </div>
    </Show>
  );

  return { contentProvider, open };
};
