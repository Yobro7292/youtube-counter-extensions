chrome.storage.sync.get(["videoCount"]).then((result) => {
    if (!result || !result.videoCount) {
     document.getElementById('counterInfo').innerHTML = 'There are no videos you have watched.';
    } else {
      const count = result.videoCount.length;
      document.getElementById('counterInfo').innerHTML = 'You watched <span class="counter">'+count+'</span> videos.';
    }
  });