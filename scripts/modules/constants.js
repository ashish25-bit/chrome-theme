export const BACKGROUND_IMAGE_CHANGE = 10000;

export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const BOOKMARK_LINK_LENGTH = 12;

export const FAVICON_BASE_URL = "http://www.google.com/s2/favicons?domain";

export const CRYPTO_PRICE_API = "https://api.coinbase.com/v2";
export const CRYPTO_NAME = {
  bitcoin: "BTC-INR",
  ethereum: "ETH-INR",
  'doge Coin': "DOGE-INR"
};
Object.freeze(CRYPTO_NAME);

export const DELETE_TODO_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 8.59L13.59 5L15 6.41L11.41 10L15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59Z" fill="black" fill-opacity="0.54"/>
</svg>`;

export const DELETE_SHORTCUT_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" rx="12" fill="none"/>
<path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
</svg>`;

export const KEYS = {
  todos: "todos",
  explicit: "explicit",
  shortcut: 'shortcuts',
  accounts: 'accounts'
};
Object.freeze(KEYS);

export const JOKES_API_URL = "https://v2.jokeapi.dev/joke/Any";
export const JOKES_API_URL_SAFE ="https://v2.jokeapi.dev/joke/Any?blacklistFlags=explicit";
export const FALLBACK_JOKE = [
  "What's the difference between a feminist and a grenade?",
  "The grenade actually accomplishes something when it triggers.",
];

export const LOGOS = {
  calendar: { src: "Calendar.png", link: "https://www.youtube.com/" },
  chat: { src: "Chat.png", link: "https://www.youtube.com/" },
  classroom: { src: "CLassroom.png", link: "https://www.youtube.com/" },
  cloud: { src: "Cloud.png", link: "https://www.youtube.com/" },
  contacts: { src: "Contacts.png", link: "https://www.youtube.com/" },
  docs: { src: "Docs.png", link: "https://www.youtube.com/" },
  drive: { src: "Drive.png", link: "https://www.youtube.com/" },
  earth: { src: "Earth.png", link: "https://www.youtube.com/" },
  firebase: { src: "Firebase.png", link: "https://www.youtube.com/" },
  forms: { src: "Forms.png", link: "https://www.youtube.com/" },
  gmail: { src: "Gmail.png", link: "https://www.youtube.com/" },
  maps: { src: "Maps.png", link: "https://www.youtube.com/" },
  meet: { src: "Meet.png", link: "https://www.youtube.com/" },
  news: { src: "News.png", link: "https://www.youtube.com/" },
  photos: { src: "Photos.png", link: "https://www.youtube.com/" },
  play: { src: "Play.png", link: "https://www.youtube.com/" },
  search: { src: "Search.png", link: "https://www.youtube.com/" },
  sheets: { src: "Sheets.png", link: "https://www.youtube.com/" },
  shopping: { src: "Shopping.png", link: "https://www.youtube.com/" },
  slides: { src: "Slides.png", link: "https://www.youtube.com/" },
  translate: { src: "Translate.png", link: "https://www.youtube.com/" },
  youtube: { src: "Youtube.png", link: "https://www.youtube.com/" },
};
Object.freeze(LOGOS);

export const LINKS = {
  email: "https://mail.google.com/mail/u/%s/#inbox",
  account: "https://www.google.com/webhp?authuser=%s"
}
Object.freeze(LINKS);
