function getStorage() {
  return JSON.parse(localStorage.getItem("kanji-flashcard") || "{}");
}

function getItem(path: string) {
  const appStorage = getStorage();
  return appStorage[path];
}

function setItem(path: string, value: any) {
  const appStorage = getStorage();
  appStorage[path] = value;
  localStorage.setItem("kanji-flashcard", JSON.stringify(appStorage));
}

export const StorageHelper = {
  getStorage,
  getItem,
  setItem,
};
