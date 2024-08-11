export type ObservableSkeletonElement = HTMLSpanElement & {
  onIntersection: () => void;
};

export type ObservableImageElement = HTMLImageElement & {
  onMutation: () => void;
};
