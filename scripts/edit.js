import { $, KEYS } from "./modules/constants.js";
import getAllAccounts from "./modules/getAllAccounts.js";
import addDraggableElement from "./dom/addDraggableElement.js";
import Storage from "./chrome/Storage.js";

(async () => {
  let accounts = await getAllAccounts();
  let shortcuts = await Storage.get(KEYS.shortcut);
  shortcuts = !shortcuts ? [] : (shortcuts = shortcuts[KEYS.shortcut].map((s) => s.name));

  let container = $(".draggable-list.d-accounts");
  accounts.shift();
  addDraggableElement(accounts, container, "accounts");

  container = $(".draggable-list.d-shortcuts");
  addDraggableElement(shortcuts, container, "shortcuts");
})();''
