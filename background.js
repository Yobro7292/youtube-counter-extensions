async function getVideoId(tabId, tab) {
  try {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      const queryParameters = tab.url.split("?")[1];
      const urlParameters = new URLSearchParams(queryParameters);

      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        videoId: urlParameters.get("v"),
      });
    }
  } catch (error) {
    console.error(error);
  }
}

chrome.tabs.onUpdated.addListener(getVideoId);