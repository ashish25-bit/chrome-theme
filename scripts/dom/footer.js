import { LOGOS, $, LINKS, ADD_ACCOUNT, SIGNOUT_ALL_ACCOUNTS } from '../modules/constants.js';
import getElement from '../modules/getElement.js';
import getAllAccounts from '../modules/getAllAccounts.js';

export const overlayModal = $('.overlay-modal');

export async function openContentForFooter(e) {
  const type = e.target.getAttribute('data-btn-type');
  overlayModal.innerHTML = "";

  if (overlayModal.style.display === "grid") {
    const activeTab = overlayModal.getAttribute('data-active-tab');

    if (!activeTab || activeTab === type) {
      overlayModal.style.display = 'none';
      return;
    }
  }

  overlayModal.style.display = 'grid';
  overlayModal.setAttribute('data-active-tab', type);

  const section = getElement({ type: 'section', classes: ['footer-content'] });
  section.innerHTML = `<h2>${type}</h2>`;

  const content = getElement({});
  if (type === 'apps') {
    addApps(content, ['content', 'apps']);
  }
  else if (type === "accounts") {
    await addAccounts(content, ['content', 'accounts']);
  }

  section.appendChild(content);
  overlayModal.appendChild(section);

  if (type === "accounts") {
    const div = getElement({ classes: ['additional-links'] });
    div.innerHTML = `<a href=${ADD_ACCOUNT} target='_blank'>Add account</a><a href=${SIGNOUT_ALL_ACCOUNTS} target='_blank'>Sign out of all accounts</a>`;
    section.appendChild(div);
  }
}

function addApps(parent, classes) {
  for (const c of classes)
    parent.classList.add(c);

  for (const [name, { src, link }] of Object.entries(LOGOS)) {
    const attrs = [
      {
        key: 'href',
        value: link
      },
      {
        key: 'title',
        value: name
      }
    ];
    const a = getElement({ type: 'a', attrs });
    a.innerHTML = `<img src="../icons/${src}" /><p>${name}</p>`;

    parent.appendChild(a);
  }
}

export async function addAccounts(parent, classes) {
  for (const c of classes)
    parent.classList.add(c);

  const accounts = await getAllAccounts();

  let index = 0;
  for (const email of accounts) {
    const element = getElement({ classes: ['account'] });

    const emailLink = LINKS.email.format(index);
    const accountLink = LINKS.account.format(index);

    element.innerHTML = `<a href=${accountLink}>${email}</a><a href=${emailLink}>mail</a>`

    parent.appendChild(element);
    index++;
  }
}
