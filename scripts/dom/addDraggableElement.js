import getElement from "../modules/getElement.js";
import {
  dragDrop,
  dragEnter,
  dragLeave,
  dragOver,
  dragStart,
  dragEnd
} from "../modules/drag.js";
import { KEYS, DELETE_SHORTCUT_ICON, EDIT_ICON, $ } from "../modules/constants.js";
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
    const deleteBtn = getElement({
      type: 'button',
      attrs: [{ key: 'data-type-index', value: `${type}-${index}` }]
    });
    deleteBtn.innerHTML = DELETE_SHORTCUT_ICON;
    addListener(deleteBtn, 'click', deleteCurrentElement);

    const editBtn = getElement({
      type: 'button',
      attrs: [{ key: 'data-type-index', value: `${type}-${index}` }]
    });
    editBtn.innerHTML = EDIT_ICON;
    addListener(editBtn, 'click', editCurrentElementData);

    // adding event listeners
    // li
    addListener(li, "dragover", dragOver);
    addListener(li, "drop", dragDrop);
    addListener(li, "dragenter", dragEnter);
    addListener(li, "dragleave", dragLeave);
    addListener(li, "dragend", dragEnd);
    // div
    addListener(div, "dragstart", dragStart);

    li.appendChild(div);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    container.appendChild(li);
  });
}

function addListener(element, type, callback) {
  element.addEventListener(type, callback);
}

async function editCurrentElementData() {
  try {
    const { type, index, data } = await getIndexTypeHelper(this);
    const element = this.previousElementSibling?.previousElementSibling;
    if (!element)
      return;

    const parent = element.parentElement;
    const inputElement = getElement({
      type: "input",
      attrs: [
        { key: "type", value: "text" },
        { key: "data-type-index", value: this.getAttribute("data-type-index") },
      ],
    });
    inputElement.value = type === "shortcuts" ? data[index].name : data[index];
    addListener(inputElement, 'keyup', onKeyupHandler);

    element.removeEventListener("dragover", dragOver);
    element.removeEventListener("drop", dragDrop);
    element.removeEventListener("dragenter", dragEnter);
    element.removeEventListener("dragleave", dragLeave);
    element.removeEventListener("dragend", dragEnd);
    element.remove();

    parent.prepend(inputElement);
    inputElement.focus();
  }
  catch (err) {
    console.log(err);
  }
}

async function onKeyupHandler(e) {
  if (e.code === 'Enter') {
    try {
      let { type, index, data } = await getIndexTypeHelper(this);
      const parent = $(`.${type} ul`);
      if (!parent) {
        window.location.reload();
      }

      if (type === "shortcuts") {
        data[index].name = this.value;
        Storage.set(type, data);
        data = data.map(d => d.name);
      }
      else if (type === "accounts") {
        data[index] = this.value;
        Storage.set(type, data);
      }
      parent.innerHTML = "";
      await addDraggableElement(data, parent, type);
    }
    catch (err) {
      console.log(err);
    }
  }
  else if (e.code === 'Escape') {
    try {
      let { type, data } = await getIndexTypeHelper(this);
      const parent = $(`.${type} ul`);

      if (!parent) {
        window.location.reload();
      }

      if (type === "shortcuts") {
        data = data.map(d => d.name);
      }
      parent.innerHTML = "";
      await addDraggableElement(data, parent, type);
    }
    catch (err) {
      console.log(err)
    }
  }
}

async function deleteCurrentElement() {
  try {
    let { type, index, data } = await getIndexTypeHelper(this);
    const container = this.parentElement.parentElement;
    data.splice(index, 1);
    Storage.set(type, data);

    if (type === "shortcuts") {
      data = data.map(d => d.name);
    }

    container.innerHTML = '';
    await addDraggableElement(data, container, type);
  }
  catch (err) {
    console.log(err);
  }
}

async function getIndexTypeHelper(element) {
  if (!element.getAttribute('data-type-index'))
    throw new Error('data-type-index attribute is not present');

  const type = element.getAttribute('data-type-index').split('-')[0];
  const index = +element.getAttribute('data-type-index').split('-')[1];

  if (![KEYS.accounts, KEYS.shortcut].includes(type) || isNaN(index))
    throw new Error('values in the attribute are incorrect');

  let data = await Storage.get(type);
  if (!data)
    throw new Error(`data for type ${type} is not found in the local Storage`);

  data = data[type];
  if (data[index] === undefined)
    throw new Error(`index : ${index} is out of bound`);

  return { type, index, data };
}
