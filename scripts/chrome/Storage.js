export default class Storage {
  static async get(key) {
    return new Promise(resolve => {
      chrome.storage.local.get([key], (res) => {
        if (Object.entries(res).length === 0)
          return resolve(null);

        resolve(res);
      })
    })
  }

  static set(key, value) {
    chrome.storage.local.set({ [key]: value });
  }

  static remove(key) {
    chrome.storage.local.remove(key);
  }
}
