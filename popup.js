const blurToggle = document.getElementById('blur-toggle');
const blurRadius = document.getElementById('blur-radius');
const blurValue = document.getElementById('blur-value');
const screenShareToggle = document.getElementById('screenShare-toggle');

function updateBlurValue(value) {
  blurValue.textContent = `${value}px`;
}

function updateUI(status) {
  blurToggle.checked = status.enabled;
  blurRadius.value = status.blurRadius;
  screenShareToggle.checked = status.screenShareMode;
  updateBlurValue(status.blurRadius);
}

blurToggle.addEventListener('change', () => {
  chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleBlur' }, (response) => {
        if (response && response.success) {
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
});

blurRadius.addEventListener('change', (e) => {
  chrome.storage.sync.set({ blurRadius: parseInt(e.target.value) });
});

screenShareToggle.addEventListener('change', () => {
  chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleScreenShare' }, (response) => {
        if (response && response.success) {
          getStatus();
        }
      });
    }
  });
});

function getStatus() {
  chrome.storage.sync.get(['enabled', 'screenShareMode', 'blurRadius'], (result) => {
    updateUI({
      enabled: result.enabled !== false,
      screenShareMode: result.screenShareMode || false,
      blurRadius: result.blurRadius || 8,
    });
  });
}

document.addEventListener('DOMContentLoaded', getStatus);
