import getUserProfile from "../chrome/getUserProfile.js";
import Storage from "../chrome/Storage.js";
import { KEYS } from "./constants.js";

export default async function getAllAccounts() {
  let accounts = [];

  let user = await getUserProfile();
  if (user && user.hasOwnProperty('email'))
    accounts.push(user.email);

  user = await Storage.get(KEYS.accounts);

  if (user) {
    for (const u of user[KEYS.accounts])
      accounts.push(u);
  }

  return accounts;
}