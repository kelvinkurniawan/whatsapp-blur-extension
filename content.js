let enabled = true;

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === "B") {
    enabled = !enabled;

    document.body.classList.toggle("wa-unblur", !enabled);
  }
});
