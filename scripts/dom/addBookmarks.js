import { $, BOOKMARK_LINK_LENGTH, FAVICON_BASE_URL } from "../modules/constants.js";
import getBookmarks from "../chrome/getBookmarks.js";
import getElement from "../modules/getElement.js";

export default async function addBookmarks() {
  const bookmarks = await getBookmarks();
  const bookmarkContainer = $('.bookmarks');
  bookmarkContainer.innerHTML = "";

  for (const [key, value] of Object.entries(bookmarks)) {
    const heading = getElement({ type: 'h2' });
    heading.innerText = key;

    const parent = getElement({ classes: ['content'] });

    for (const { title, url } of value) {
      let text = title;
      if (text.length > BOOKMARK_LINK_LENGTH) {
        text = text.substr(0, BOOKMARK_LINK_LENGTH - 3);
        text = text + "...";
      }

      const attrs = [
        {
          key: 'href',
          value: url
        },
        {
          key: 'title',
          value: title
        },
        {
          key: 'style',
          value: `background-image: url(${FAVICON_BASE_URL}=${url})`
        }
      ];

      const classes = ['bookmark'];
      const element = getElement({ type: 'a', attrs, classes });
      element.innerText = text;

      parent.appendChild(element);
    }

    bookmarkContainer.appendChild(heading);
    bookmarkContainer.appendChild(parent);
  }
}
