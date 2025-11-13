let blockedList = [];

fetch(chrome.runtime.getURL("blocklist.json"))
  .then(r => r.json())
  .then(data => {
    blockedList = data.blocked;
  });

// Block logic
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const url = new URL(details.url);
    const domain = url.hostname.replace("www.", "");

    if (blockedList.includes(domain)) {
      return {
        redirectUrl: chrome.runtime.getURL("blocked.html")
      };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
