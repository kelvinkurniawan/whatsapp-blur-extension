chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-blur') {
    chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, { action: 'toggleBlur' });
      });
    });
  } else if (command === 'toggle-screen-share') {
    chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, { action: 'toggleScreenShare' });
      });
    });
  }
});
