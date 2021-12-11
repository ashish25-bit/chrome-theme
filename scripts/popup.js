import { $, $$, KEYS } from "./modules/constants.js";
import Storage from "./chrome/Storage.js";

const todoInput = $(".input-todo input");
const shortcutInput = $$(".input-shortcut input");
const emailInput = $(".input-account input");

(() => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { name: "window-location" },
      (response) => {
        if (!chrome.runtime.lastError) {
          shortcutInput[0].value = response.title;
          shortcutInput[1].value = response.location;
        }
      }
    );
  });

  todoInput.focus();
})();

$(".edit").addEventListener("click", () => {
  chrome.tabs.create({ active: true, url: "../views/edit.html" })
});

$(".input-todo").addEventListener("submit", async (e) => {
  e.preventDefault();

  const value = todoInput.value.trim();
  if (value === "") return;

  todoInput.value = "";

  let data = await Storage.get(KEYS.todos);
  const obj = {
    completed: false,
    text: value,
  };

  if (!data) {
    Storage.set(KEYS.todos, [obj]);
  }
  else {
    data = [...data[KEYS.todos], obj];
    Storage.set(KEYS.todos, data);
  }
});

$(".input-shortcut").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = shortcutInput[0].value.trim();
  const link = shortcutInput[1].value.trim();

  if (name === "" || link === "") return;

  let data = await Storage.get(KEYS.shortcut);
  const obj = { name, link };

  if (!data) {
    Storage.set(KEYS.shortcut, [obj]);
  }
  else {
    data = [...data[KEYS.shortcut], obj];
    Storage.set(KEYS.shortcut, data);
  }

  shortcutInput[0].value = "";
  shortcutInput[1].value = "";
});

$('.input-account').addEventListener('submit', async e => {
  e.preventDefault();

  const value = emailInput.value.trim();

  if (value === "")
    return;

  let data = await Storage.get(KEYS.accounts);

  if (!data) {
    Storage.set(KEYS.accounts, [value]);
  }
  else {
    data = [...data[KEYS.accounts], value];
    Storage.set(KEYS.accounts, data);
  }

  emailInput.value = "";
})
