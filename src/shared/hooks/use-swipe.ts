import { DEFAULT_SWIPE_DISTANCE } from "@/configs";
import { createSignal } from "solid-js";

interface SwipeHookProps {
  minDistance?: number;
  handleLeftSwipe?: () => void;
  handleRightSwipe?: () => void;
  handleSwipe?: () => void;
}

export function useSwipe(props?: SwipeHookProps) {
  const [touchStart, setTouchStart] = createSignal<number | null>(null);
  const [touchEnd, setTouchEnd] = createSignal<number | null>(null);

  const onTouchStart = (e: any) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    const touchStartValue = touchStart();
    const touchEndValue = touchEnd();
    const minDistanceValue = props?.minDistance || DEFAULT_SWIPE_DISTANCE;

    if (!touchStartValue || !touchEndValue) return;

    const distance = touchStartValue - touchEndValue;
    const isLeftSwipe = distance > minDistanceValue;
    const isRightSwipe = distance < -minDistanceValue;

    if (isLeftSwipe) {
      props?.handleLeftSwipe?.();
      props?.handleSwipe?.();
    }

    if (isRightSwipe) {
      props?.handleRightSwipe?.();
      props?.handleSwipe?.();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
