export default function getBookmarks() {
  return new Promise(resolve => {
    chrome.bookmarks.getTree().then(bookmarks => {
      let resultBookmarks = [];
      process_bookmark(bookmarks, resultBookmarks);
      resolve(resultBookmarks);
    })
  })
}

function process_bookmark(bookmarks, resultBookmarks, prop="Others") {
  for (const bookmark of bookmarks) {
    if (bookmark.url) {
      if (!resultBookmarks.hasOwnProperty(prop))
        resultBookmarks[prop] = [bookmark];
      else
        resultBookmarks[prop].push(bookmark);
    }

    if (bookmark.children) {
      if (bookmark.title)
        process_bookmark(bookmark.children, resultBookmarks, bookmark.title);
      else
        process_bookmark(bookmark.children, resultBookmarks);
    }
  }
}
