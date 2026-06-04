let enabled = true;
let screenShareMode = false;
let blurRadius = 8;

function showToast(message) {
  const existing = document.getElementById('wa-blur-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'wa-blur-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '88px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(28, 28, 30, 0.88)',
    backdropFilter: 'blur(20px) saturate(180%)',
    webkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.10)',
    color: 'rgba(255,255,255,0.90)',
    padding: '7px 18px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500',
    letterSpacing: '0.01em',
    zIndex: '99999',
    opacity: '1',
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  });
  document.body.appendChild(toast);

  setTimeout(() => { toast.style.opacity = '0'; }, 1600);
  setTimeout(() => toast.remove(), 1950);
}

function applyBlurRadius() {
  let styleEl = document.getElementById('wa-blur-radius-override');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'wa-blur-radius-override';
    (document.head || document.documentElement).appendChild(styleEl);
  }
  styleEl.textContent = `:root { --wa-blur-radius: ${blurRadius}px !important; }`;
}

function toggleBlur() {
  enabled = !enabled;
  document.body.classList.toggle('wa-unblur', !enabled);
  chrome.storage.sync.set({ enabled });
  showToast(enabled ? '🔒 Privacy blur: ON' : '👁 Privacy blur: OFF');
  chrome.runtime.sendMessage({ action: 'updatePopup', enabled, screenShareMode });
}

function toggleScreenShare() {
  screenShareMode = !screenShareMode;
  document.body.classList.toggle('wa-screenShare', screenShareMode);
  chrome.storage.sync.set({ screenShareMode });
  showToast(screenShareMode ? '🎬 Screen share mode: ON' : '🎬 Screen share mode: OFF');
  chrome.runtime.sendMessage({ action: 'updatePopup', enabled, screenShareMode });
}

function applyBodyClasses() {
  if (!document.body) return;
  document.body.classList.toggle('wa-unblur', !enabled);
  document.body.classList.toggle('wa-screenShare', screenShareMode);
}

function loadSettings() {
  chrome.storage.sync.get(['enabled', 'screenShareMode', 'blurRadius'], (result) => {
    enabled = result.enabled !== false;
    screenShareMode = result.screenShareMode || false;
    blurRadius = result.blurRadius || 8;

    applyBlurRadius();

    if (document.body) {
      applyBodyClasses();
    } else {
      document.addEventListener('DOMContentLoaded', applyBodyClasses);
    }
  });
}

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '0') {
    e.preventDefault();
    toggleBlur();
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '9') {
    e.preventDefault();
    toggleScreenShare();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleBlur') {
    toggleBlur();
    sendResponse({ success: true });
  } else if (request.action === 'toggleScreenShare') {
    toggleScreenShare();
    sendResponse({ success: true });
  } else if (request.action === 'updateBlurRadius') {
    blurRadius = request.value;
    applyBlurRadius();
    chrome.storage.sync.set({ blurRadius });
    sendResponse({ success: true });
  } else if (request.action === 'getStatus') {
    sendResponse({ enabled, screenShareMode, blurRadius });
  }
});

loadSettings();
