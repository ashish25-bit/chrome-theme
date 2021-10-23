import { $, LINKS } from '../modules/constants.js';
import getUserProfile from "../chrome/getUserProfile.js"; 
import getElement from '../modules/getElement.js';

export default async function addGmail() {
  const user = await getUserProfile();

  if (!user)
    return;

  if (!user.hasOwnProperty('email'))
    return;

  const attrs = [
    {
      key: 'href',
      value: LINKS.email.format(0)
    }
  ];

  const element = getElement({ type: 'a', attrs });
  element.innerText = 'gmail';
  $('.time .account').appendChild(element);
}