chrome.action.onClicked.addListener(_tab => {
  chrome.tabs.create({ active: true, url: "../views/popup.html" })
});
