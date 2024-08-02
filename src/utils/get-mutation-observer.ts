import type { ObservableImageElement } from "../types";

const MutationObserver =
  window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserver;

const handleAttributeMutate = (entries: MutationRecord[]) => {
  entries.forEach((entry) => {
    if (entry.type === "attributes") {
      const target = entry.target as ObservableImageElement;
      target.onMutation?.();
    }
  });
};

let IMG_SRC_OBSERVER: MutationObserver;

export function getMutationObserver() {
  IMG_SRC_OBSERVER ??= new MutationObserver(handleAttributeMutate);

  return IMG_SRC_OBSERVER;
}
