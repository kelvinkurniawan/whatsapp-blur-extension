const blurToggle = document.getElementById('blur-toggle');
const blurRadius = document.getElementById('blur-radius');
const blurValue = document.getElementById('blur-value');
const screenShareToggle = document.getElementById('screenShare-toggle');

let debounceTimer;

function updateBlurValue(value) {
  blurValue.textContent = `${value}px`;
}

function debounce(callback, delay = 500) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(callback, delay);
}

function updateUI(status) {
  blurToggle.checked = status.enabled;
  blurRadius.value = status.blurRadius;
  screenShareToggle.checked = status.screenShareMode;
  updateBlurValue(status.blurRadius);
}

function getActiveTab() {
  return chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
    return tabs[0];
  });
}

blurToggle.addEventListener('change', () => {
  chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleBlur' }, (response) => {
        if (response && response.success) {
          chrome.storage.sync.set({ enabled: !blurToggle.checked }, () => {
            if (chrome.runtime.lastError) {
              console.warn('Storage quota warning:', chrome.runtime.lastError);
            }
          });
          getStatus();
        }
      });
    }
  });
});

blurRadius.addEventListener('input', (e) => {
  const value = parseInt(e.target.value);
  updateBlurValue(value);

  chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'updateBlurRadius', value });
    }
  });

  debounce(() => {
    chrome.storage.sync.set({ blurRadius: value });
  }, 300);
});

screenShareToggle.addEventListener('change', () => {
  chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleScreenShare' }, (response) => {
        if (response && response.success) {
          chrome.storage.sync.set({ screenShareMode: !screenShareToggle.checked }, () => {
            if (chrome.runtime.lastError) {
              console.warn('Storage quota warning:', chrome.runtime.lastError);
            }
          });
          getStatus();
        }
      });
    }
  });
});

function getStatus() {
  chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getStatus' }, (response) => {
        if (response) {
          updateUI(response);
        }
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', getStatus);
