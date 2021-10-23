chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(msg => {
    console.log(msg, "line 5")
  })
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  switch (request.name) {
    case 'window-location':
      const location = window.location.href;
      const title = document.title;
      return sendResponse({ location, title });

    default:
      return sendResponse(`${request.name} is not defined`);
  }
})