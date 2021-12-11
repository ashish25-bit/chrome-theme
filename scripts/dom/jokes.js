import {
  $,
  JOKES_API_URL,
  FALLBACK_JOKE,
  KEYS,
  JOKES_API_URL_SAFE,
  JOKES_API_URL_EXTRA
} from '../modules/constants.js';
import getElement from '../modules/getElement.js';
import Storage from '../chrome/Storage.js';

export async function addJokes() {
  let joke = FALLBACK_JOKE;
  let parent = $('.section.jokes .content');
  const explicit = await Storage.get(KEYS.explicit);
  let url = JOKES_API_URL_EXTRA;

  if (!explicit || !explicit[KEYS.explicit])
    url = JOKES_API_URL_SAFE;
  else
    url = JOKES_API_URL;

  try {
    const res = await get(url);

    if (res.type === "twopart") {
      joke = [res.setup, res.delivery];
    }
    else if (res.type === "single") {
      joke = [res.joke]
    }

    if (res.flags.explicit)
      joke.push('(Explicit)');
    else if (res.flags.racist)
      joke.push('(Racist)');
    else if (res.flags.sexist)
      joke.push('(Sexist)');
  }
  catch (err) {
    console.log(err);
  }

  parent.innerHTML = '';
  for (const text of joke) {
    const element = getElement({ type: 'p' });
    element.innerText = text;
    parent.appendChild(element);
  }
}

function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (isJSONString(res)) return res.json();
        else return res.text();
      })
      .then((res) => {
        if (isJSONString(res))
          resolve(JSON.parse(res))
        else
          resolve(res);
      })
      .catch((err) => reject(err.message));
  });
}

function isJSONString(data) {
  try {
    JSON.parse(data);
    return true;
  } catch (_err) {
    return false;
  }
}

export async function changeSafeStatus(e) {
  const explicit = await Storage.get(KEYS.explicit);
  let res;

  if (!explicit)
    res = false;

  else
    res = !explicit[KEYS.explicit];

  e.target.removeEventListener('click', changeSafeStatus);
  e.target.remove();
  Storage.set(KEYS.explicit, res);
}
