import { $, DELETE_ICON, KEYS } from "../modules/constants.js";
import getElement from "../modules/getElement.js";
import sleep from "../modules/sleep.js";
import Storage from '../chrome/Storage.js';

const parent = $(".todo .content");

function add(text, completed = false, index) {
  const element = getElement({
    attrs: [{ key: "data-index", value: index }],
    classes: ["list"],
  });

  if (!completed) element.innerHTML = `<p>${text}</p>`;
  else element.innerHTML = `<p class="completed">${text}</p>`;
  element.innerHTML += `<button>${DELETE_ICON}</button>`;

  element.addEventListener("click", async (e) => {
    const elementName = e.target.localName;

    if (elementName === "p") {
      const index = e.target.parentElement.getAttribute('data-index');
      changeCompleteStatus(index);
    }

    else if (elementName === 'button') {
      const index = e.target.parentElement.getAttribute('data-index');
      element.classList.add('remove')

      await sleep(700);
      deleteTodo(index);
    }

  });

  parent.appendChild(element);
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
  if (!data || data.length === 0) return;

  parent.innerHTML = "";
  let index = 0;
  for (const { text, completed } of data) {
    add(text, completed, index);
    index++;
  }
}

