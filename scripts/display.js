import {
  $, $$, KEYS,
  BACKGROUND_IMAGE_CHANGE,
} from "./modules/constants.js";
import { FILENAMES } from "./modules/names.js";

import random from "./modules/random.js";

import addBookmarks from "./dom/addBookmarks.js";
import bookmarksListeners from "./chrome/bookmarksListeners.js";
import addTodo from "./dom/addTodo.js";
import { addJokes, changeSafeStatus } from "./dom/jokes.js";
import Storage from './chrome/Storage.js';
import getElement from "./modules/getElement.js";
import addGmail from "./dom/addGmail.js";
import addShortcuts from "./dom/addShortcuts.js";
import addCrytoPrice from "./dom/addCryptoPrice.js";

import { openContentForFooter, overlayModal, addAccounts } from './dom/footer.js';

(async () => {

  // image background animation
  const images = $$(".img-container img");
  let currIndex = random(0, FILENAMES.length);
  let imageIndex = 0;

  images[imageIndex].src = FILENAMES[currIndex];
  images[imageIndex].classList.add("active");

  setInterval(() => {
    currIndex = random(0, FILENAMES.length);
    images[imageIndex].removeAttribute("class");

    imageIndex = imageIndex === 0 ? 1 : 0;

    images[imageIndex].src = FILENAMES[currIndex];
    images[imageIndex].classList.add("active");
  }, BACKGROUND_IMAGE_CHANGE);

  // add is safe joke property to local storage is not present
  const explicit = await Storage.get(KEYS.explicit)
  if (!explicit)
    Storage.set(KEYS.explicit, true);

  // adding gmail
  addGmail();

  // adding bookmarks to the DOM
  addBookmarks();

  // adding shortcuts
  addShortcuts();

  // adding listeners for the bookmarks
  bookmarksListeners();

  // adding stored todos in the DOM
  let data = await Storage.get(KEYS.todos);
  if (data)
    addTodo(data[KEYS.todos]);

  // add jokes
  addJokes();

  // add crypto price
  addCrytoPrice();

  chrome.storage.onChanged.addListener(changes => {
    if (changes.hasOwnProperty(KEYS.todos)) {
      addTodo(changes[KEYS.todos].newValue);
    }

    else if (changes.hasOwnProperty(KEYS.explicit)) {
      addJokes();
    }

    else if (changes.hasOwnProperty(KEYS.shortcut)) {
      addShortcuts();
    }

    else if (changes.hasOwnProperty(KEYS.accounts)) {
      if (overlayModal.style.display === "grid") {
        let activeTab = overlayModal.getAttribute('data-active-tab');

        if (activeTab === "accounts") {
          const content = overlayModal.childNodes[0].childNodes[1];
          content.innerHTML = "";
          addAccounts(content, []);
        }
      }
    }
  })

})();

// options for adding or removing explicit jokes
// event is fired when there is a right click on the jokes container
$('.section.jokes').addEventListener('contextmenu', changeExplictStatus);

async function changeExplictStatus(e) {
  e.preventDefault();

  const prev = $('.is-safe-container');
  if (prev)
    prev.remove();

  const x = e.pageX;
  const y = e.pageY;

  const data = await Storage.get(KEYS.explicit);
  let c;
  let text;

  if (!data || !data[KEYS.explicit]) {
    c = 'safe';
    text = 'Safe';
  }
  else if (data[KEYS.explicit]) {
    c = 'not-safe';
    text = 'not-safe';
  }

  const element = getElement({ classes: ['is-safe-container', c] });
  element.innerText = text;

  element.addEventListener('click', changeSafeStatus);

  element.style.top = `${y}px`;
  element.style.left = `${x}px`;

  document.body.appendChild(element);
} 

// add a new joke when user double click on the container
$('.section.jokes').addEventListener('dblclick', changeJoke);

function changeJoke() {
  addJokes();
}

// removing the custom menu if opened
$('.section.jokes').addEventListener('click', removeContextMenu);
function removeContextMenu() {
  const prev = $('.is-safe-container');
  if (prev) {
    prev.removeEventListener('click', changeSafeStatus);
    prev.remove();
  }
}

$('.apps').addEventListener('click', openContentForFooter);
$('.accounts').addEventListener('click', openContentForFooter);

// removing the overlay when the user clicks on it
overlayModal.addEventListener('click', removeOverlayModal);
function removeOverlayModal(e) {
  if (e.target.classList.contains('overlay-modal'))
    e.target.style.display = 'none';
}

// preventing right click on the overlay modal
overlayModal.addEventListener('contextmenu', (e) => {
  e.preventDefault();
})

// toggling between full and normal size screen
const toggleBtn = $('footer .toggle input');
toggleBtn.addEventListener('change', toggleBtnFunction);
function toggleBtnFunction(e) {
  const checked = e.target.checked;
  console.log(checked)
  if (checked) {
    $('.main-container').style.opacity = 0;
    $('.img-container .overlay').style.opacity = 0;
    $('.main-container').style.pointerEvents = 'none';
  }
  else {
    $('.main-container').style.opacity = 1;
    $('.img-container .overlay').style.opacity = 1;
    $('.main-container').style.pointerEvents = 'auto';
  }
}
