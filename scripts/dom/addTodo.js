import { $, DELETE_ICON, EDIT_TODO_ICON, KEYS } from "../modules/constants.js";
import getElement from "../modules/getElement.js";
import sleep from "../modules/sleep.js";
import Storage from '../chrome/Storage.js';
import shiftElements from "../modules/shiftElements.js";

let startIndex = null;

function add(text, completed = false, index) {
  const parent = $(".todo .content");
  const element = getElement({
    attrs: [
      { key: "data-index", value: index },
      { key: "draggable", value: true },
    ],
    classes: ["list"],
  });

  if (!completed) element.innerHTML = `<p>${text}</p>`;
  else element.innerHTML = `<p class="completed">${text}</p>`;
  element.innerHTML += `<button data-delete>${DELETE_ICON}</button>`;
  element.innerHTML += `<button data-edit>${EDIT_TODO_ICON}</button>`;

  addListener(element, "click", clickOnTodo);
  addListener(element, "dragstart", dragStart);
  addListener(element, "dragover", dragOver);
  addListener(element, "drop", dragDrop);

  parent.appendChild(element);
}

async function clickOnTodo(e) {
  const elementName = e.target.localName;

  if (elementName === "p") {
    const index = e.target.parentElement.getAttribute('data-index');
    changeCompleteStatus(index);
  }

  else if (elementName === 'button') {
    const index = e.target.parentElement.getAttribute('data-index');

    if (e.target.hasAttribute('data-delete')) {
      const element = e.target.parentElement;
      element.classList.add('remove');

      await sleep(700);
      deleteTodo(index);
    }
    else if (e.target.hasAttribute('data-edit')) {
      await editCurrentElement(e.target, index);
    }

  }
}

async function editCurrentElement(btn, index) {
  const mainElement = btn.previousElementSibling?.previousElementSibling;
  const parent = btn.parentElement;

  if (!mainElement || !parent)
    return;

  let data = await Storage.get(KEYS.todos);
  if (!data)
    return;

  data = data[KEYS.todos];
  if (index >= data.length)
    return;

  const inputElement = getElement({
    type: "input",
    attrs: [
      { key: "type", value: "text" },
    ],
  });

  mainElement.remove();

  inputElement.value = data[index].text;
  addListener(inputElement, 'keyup', onKeyupHandler);

  parent.prepend(inputElement);
  inputElement.focus();
}

async function onKeyupHandler(e) {
  const parent = e.target.parentElement;
  if (!parent)
    return;

  const index = +parent.getAttribute('data-index');
  if (index === undefined || isNaN(index))
    return;

  let data = await Storage.get(KEYS.todos);
  if (!data)
    return;

  data = data[KEYS.todos];
  if (index >= data.length)
    return;

  if (e.code === 'Escape') {
    addTodo(data);
  }
  else if (e.code === 'Enter') {
    let value = e.target.value.trim();

    if (value.length === 0)
      return;

    data[index].text = value;
    Storage.set(KEYS.todos, data);
  }
}

async function changeCompleteStatus(index) {
  let data = await Storage.get(KEYS.todos);

  if (!data)
    return;

  data = data[KEYS.todos];
  if (data[index] === undefined)
    return;

  data[index].completed = !data[index].completed;
  Storage.set(KEYS.todos, data);
}

async function deleteTodo(index) {
  let data = await Storage.get(KEYS.todos);

  if (!data)
    return;

  data = data[KEYS.todos];
  if (data[index] === undefined)
    return;

  data.splice(index, 1);
  Storage.set(KEYS.todos, data);
}

export default function addTodo(data) {
  const parent = $(".todo .content");
  if (!data) return;

  parent.innerHTML = "";
  if (data.length === 0) {
    const div = getElement( {classes: ['list']} );
    div.innerText = "No todos";

    parent.appendChild(div);
    return;
  }

  let index = 0;
  for (const { text, completed } of data) {
    add(text, completed, index);
    index++;
  }
}

function addListener(element, type, callback) {
  element.addEventListener(type, callback);
}

function dragStart() {
  startIndex = +this.getAttribute('data-index');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  let endIndex = +this.getAttribute('data-index');
  reorder(startIndex, endIndex);
  startIndex = null;
}

async function reorder(startIndex, endIndex) {
  if (startIndex === undefined || endIndex === undefined)
    return;

  if (startIndex === null || endIndex === null)
    return;

  if (isNaN(startIndex) || isNaN(endIndex))
    return;

  if (startIndex === endIndex)
    return;

  let data = await Storage.get(KEYS.todos);

  if (!data)
    return;

  data = data[KEYS.todos];

  if (data[startIndex] === undefined || data[endIndex] === endIndex)
    return;

  data = shiftElements(data, startIndex, endIndex);
  Storage.set(KEYS.todos, data);
}
