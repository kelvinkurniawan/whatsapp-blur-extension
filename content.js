let enabled = true;

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

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '0') {
    enabled = !enabled;
    document.body.classList.toggle('wa-unblur', !enabled);
    showToast(enabled ? '🔒 Privacy blur: ON' : '👁 Privacy blur: OFF');
  }
});
