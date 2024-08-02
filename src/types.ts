export interface ObservableSkeletonElement extends HTMLSpanElement {
  onIntersection?: () => void;
}

export interface ObservableImageElement extends HTMLImageElement {
  onMutation?: () => void;
}
