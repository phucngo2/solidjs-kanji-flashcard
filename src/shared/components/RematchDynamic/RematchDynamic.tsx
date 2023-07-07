import { Params, useParams } from "@solidjs/router";
import {
  Component,
  JSXElement,
  createEffect,
  createSignal,
  on,
} from "solid-js";

/** Re-renders when contents of `useParams()` update. */
export const RematchDynamic: Component<{
  component: Component;
  on?: (params: Params) => any;
}> = (props) => {
  const params = useParams();
  const [page, setPage] = createSignal<JSXElement>(props.component({}));

  const paramSignal = () =>
    props.on ? props.on(params) : Object.values(params);

  createEffect(
    on(paramSignal, () => {
      setPage(() => props.component({}));
    })
  );

  return page as unknown as Element;
};
