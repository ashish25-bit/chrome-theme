import getElement from "../modules/getElement.js";
import {
  dragDrop,
  dragEnter,
  dragLeave,
  dragOver,
  dragStart,
} from "../modules/drag.js";
import { DELETE_ICON, KEYS } from "../modules/constants.js";
import Storage from "../chrome/Storage.js";

export default async function addDraggableElement(data, container, type) {
  data.forEach((value, index) => {
    const li = getElement({
      type: "li",
      attrs: [
        { key: "data-index", value: index },
        { key: "data-type", value: type },
      ],
    });
    const div = getElement({
      classes: ["draggable"],
      attrs: [{ key: "draggable", value: true }],
    });

    div.innerText = value;

    // delete btn
    const btn = getElement({
      type: 'button',
      attrs: [{ key: 'data-type-index', value: `${type}-${index}` }]
    });
    btn.innerHTML = DELETE_ICON;
    addListener(btn, 'click', deleteCurrentElement);

    // adding event listeners
    // li
    addListener(li, "dragover", dragOver);
    addListener(li, "drop", dragDrop);
    addListener(li, "dragenter", dragEnter);
    addListener(li, "dragleave", dragLeave);
    // div
    addListener(div, "dragstart", dragStart);

    li.appendChild(div);
    li.appendChild(btn);
    container.appendChild(li);

    DELETE_ICON
  });
}

function addListener(element, type, callback) {
  element.addEventListener(type, callback);
}

async function deleteCurrentElement() {
  if (!this.getAttribute('data-type-index'))
    return;

  const type = this.getAttribute('data-type-index').split('-')[0];
  const index = +this.getAttribute('data-type-index').split('-')[1];

  if (![KEYS.accounts, KEYS.shortcut].includes(type) || isNaN(index))
  return;

  let data = await Storage.get(type);
  if (!data)
    return;

  data = data[type]
  if (data[index] === undefined)
    return;

  const container = this.parentElement.parentElement;
  data.splice(index, 1);
  Storage.set(type, data);

  container.innerHTML = '';
  await addDraggableElement(data, container, type);
}
