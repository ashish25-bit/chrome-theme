import { $, CRYPTO_NAME, CRYPTO_PRICE_API } from '../modules/constants.js';

export default async function addCrytoPrice() {
  const parent = $('.cryptoprice .content');

  for (const [key, value] of Object.entries(CRYPTO_NAME)) {
    const data = await getPrice(value);

    if (data)
      parent.innerHTML += `<h3>${key}</h3><p>₹ ${data}</p>`;
  }
}

async function getPrice(currency_pair) {
  const url = `${CRYPTO_PRICE_API}/prices/${currency_pair}/spot`;

  try {
    const { data } = await (await fetch(url)).json();
    const num = parseFloat(data.amount);
    return num;
  }
  catch (err) {
    console.log(err);
    return null;
  }
}
