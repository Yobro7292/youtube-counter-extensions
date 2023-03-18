(async () => {
  const tokenScript = chrome.runtime.getURL("content-scripts/token.js");
  const token = await import(tokenScript);

  //   //if there are no storage then create videocount array for storing id
  //   chrome.storage.sync.get(["videoCount"]).then((result) => {
  //     if (!result || !result.length) {
  //       const videoCount = [];
  //       chrome.storage.sync.set({ videoCount }).then(() => {
  //         console.log("New data creted in chrome storage");
  //       });
  //     }
  //   });

  //   const claims = {
  //     sub: ["name", "4546q3fafd"],
  //     name: "John Doe",
  //     iat: 1516239022,
  //   };

  //   const token = parseJwt.encoding(claims);
  //   console.log(token);

  //   const decoded = parseJwt.decoding(token);
  //   console.log(decoded);

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { videoId } = obj;
    chrome.storage.sync.get(["videoCount"]).then((result) => {
      if (!result || !result.videoCount) {
        const videoCount = [videoId];
        chrome.storage.sync
          .set({ videoCount })
          .then(() => {})
          .catch((e) => {
            console.log(e);
          });
      } else {
        let videoCount = result.videoCount;
        const isExist = videoCount.find((id) => {
          return id == videoId;
        });
        if (!isExist) {
          videoCount.push(videoId);
        }
        chrome.storage.sync
          .set({ videoCount })
          .then(() => {})
          .catch((e) => {
            console.log(e);
          });
      }
    });
  });
})();
