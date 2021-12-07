export const BACKGROUND_IMAGE_CHANGE = 10000;

export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const BOOKMARK_LINK_LENGTH = 12;

export const FAVICON_BASE_URL = "http://www.google.com/s2/favicons?domain";

export const CRYPTO_PRICE_API = "https://api.coinbase.com/v2";
export const CRYPTO_NAME = {
  bitcoin: "BTC-INR",
  ethereum: "ETH-INR",
  "doge Coin": "DOGE-INR",
};
Object.freeze(CRYPTO_NAME);

export const DELETE_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 8.59L13.59 5L15 6.41L11.41 10L15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59Z" fill="black" fill-opacity="0.54"/>
</svg>`;

export const DELETE_SHORTCUT_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" rx="12" fill="none"/>
<path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
</svg>`;

export const EDIT_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.6587 3C17.4087 3 17.1487 3.1 16.9587 3.29L15.1287 5.12L18.8787 8.87L20.7087 7.04C21.0987 6.65 21.0987 6.02 20.7087 5.63L18.3687 3.29C18.1687 3.09 17.9187 3 17.6587 3ZM14.0587 9.02L14.9787 9.94L5.91875 19H4.99875V18.08L14.0587 9.02ZM2.99875 17.25L14.0587 6.19L17.8087 9.94L6.74875 21H2.99875V17.25Z" fill="white"/>
</svg>`;

export const KEYS = {
  todos: "todos",
  explicit: "explicit",
  shortcut: "shortcuts",
  accounts: "accounts",
};
Object.freeze(KEYS);

export const JOKES_API_URL = "https://v2.jokeapi.dev/joke/Any";
export const JOKES_API_URL_SAFE =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=explicit";
export const JOKES_API_URL_EXTRA = "https://geek-jokes.sameerkumar.website/api?format=json";
export const FALLBACK_JOKE = [
  "What's the difference between a feminist and a grenade?",
  "The grenade actually accomplishes something when it triggers.",
];

export const LOGOS = {
  drive: { src: "Drive.png", link: "https://drive.google.com/drive/my-drive" },
  docs: { src: "Docs.png", link: "https://docs.google.com/document/u/0/" },
  sheets: {
    src: "Sheets.png",
    link: "https://docs.google.com/spreadsheets/u/0/",
  },
  slides: {
    src: "Slides.png",
    link: "https://docs.google.com/presentation/u/0/",
  },
  photos: { src: "Photos.png", link: "https://photos.google.com/" },
  classroom: {
    src: "CLassroom.png", 
    link: "https://classroom.google.com/u/0/h",
  },
  gmail: { src: "Gmail.png", link: "https://mail.google.com/mail/u/0/" },
  meet: { src: "Meet.png", link: "https://meet.google.com/" },
  youtube: { src: "Youtube.png", link: "https://www.youtube.com/" },
  search: { src: "Search.png", link: "https://www.google.co.in/webhp" },
  chat: { src: "Chat.png", link: "https://mail.google.com/chat/u/0/" },
  calendar: {
    src: "Calendar.png",
    link: "https://calendar.google.com/calendar/u/0/r",
  },
  cloud: { src: "Cloud.png", link: "https://cloud.google.com/" },
  contacts: { src: "Contacts.png", link: "https://contacts.google.com/" },
  earth: { src: "Earth.png", link: "https://earth.google.com/web/" },
  firebase: { src: "Firebase.png", link: "https://firebase.google.com/" },
  forms: { src: "Forms.png", link: "https://docs.google.com/forms/u/0/" },
  maps: { src: "Maps.png", link: "https://www.google.co.in/maps" },
  news: {
    src: "News.png",
    link: "https://news.google.com/topstories?hl=en-IN&gl=IN&ceid=IN:en",
  },
  play: { src: "Play.png", link: "https://play.google.com/store" },
  shopping: { src: "Shopping.png", link: "https://shopping.google.co.in/" },
  translate: { src: "Translate.png", link: "https://translate.google.co.in/" },
};
Object.freeze(LOGOS);

export const LINKS = {
  email: "https://mail.google.com/mail/u/%s/#inbox",
  account: "https://www.google.com/webhp?authuser=%s",
};
Object.freeze(LINKS);

export const ADD_ACCOUNT = "https://accounts.google.com/AddSession/signinchooser?hl=en&continue=https%3A%2F%2Fwww.google.com%3Fhl%3Den-US&ec=GAlA8wE&flowName=GlifWebSignIn&flowEntry=AddSession";
export const SIGNOUT_ALL_ACCOUNTS = "https://accounts.google.com/Logout?hl=en&amp;continue=https://www.google.com%3Fhl%3Den-US&amp;timeStmp=1635072090&amp;secTok=.AG5fkS9R6Q-LjO3FK83ljfYZc-R8kqQzFQ&amp;ec=GAdA8wE";
