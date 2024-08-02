declare global {
  interface Window {
    WebKitMutationObserver?: {
      new (callback: MutationCallback): MutationObserver;
      prototype: MutationObserver;
    };
    MozMutationObserver?: {
      new (callback: MutationCallback): MutationObserver;
      prototype: MutationObserver;
    };
  }
}

export default global;
