import addBookmarks from "../dom/addBookmarks.js";

export default function bookmarkListeners() {
  chrome.bookmarks.onRemoved.addListener(() => {
    addBookmarks();
  })

  chrome.bookmarks.onChanged.addListener(() => {
    addBookmarks();
  })

  chrome.bookmarks.onCreated.addListener(() => {
    addBookmarks();
  })

  chrome.bookmarks.onMoved.addListener(() => {
    addBookmarks();
  })
}