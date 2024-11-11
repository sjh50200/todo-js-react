export const getLocalStorageItem = (key) => {
  return window.localStorage.getItem(key) ?? undefined;
};

export const setLocalStorageItem = (key, item) =>
  window.localStorage.setItem(key, item);
