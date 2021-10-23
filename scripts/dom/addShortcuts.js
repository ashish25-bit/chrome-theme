import { $, DELETE_SHORTCUT_ICON, FAVICON_BASE_URL, KEYS } from '../modules/constants.js';
import getElement from '../modules/getElement.js';
import Storage from '../chrome/Storage.js';
import sleep from '../modules/sleep.js';

export default async function addShortcuts() {
  let data = await Storage.get(KEYS.shortcut);

  if (!data)
    return;

  data = data[KEYS.shortcut];
  const parent = $('.shortcuts .content');
  parent.innerHTML = "";

  let index = 0;
  for (const { link, name } of data) {
    const attrs = [
      {
        key: 'data-shortcut-index',
        value: index
      }
    ];
    const element = getElement({ attrs, classes: ["shortcut"] });
    element.addEventListener('click', deleteShortcut);

    const btn = getElement({ type: 'button' });
    btn.innerHTML = DELETE_SHORTCUT_ICON;

    element.appendChild(btn);
    element.innerHTML += `<a href=${link}>
    <img src="${FAVICON_BASE_URL}=${link}" alt="${name}" />
    <p>${name}</p>
    </a>`;

    parent.appendChild(element);
    index++;
  }
}

async function deleteShortcut(e) {
  if (e.target.localName === "button") {

    const parent = e.target.parentElement;
    const index = Number(parent.getAttribute('data-shortcut-index'));

    if (index === NaN)
      return;

    parent.classList.add('deleted');
    await sleep(600);
    let data = await Storage.get(KEYS.shortcut);

    if (!data)
      return;

    data = data[KEYS.shortcut];
    if (data[index] === undefined)
      return;

    data.splice(index, 1);
    Storage.set(KEYS.shortcut, data);
  }
}
