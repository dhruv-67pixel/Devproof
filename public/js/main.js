document.addEventListener("submit", (event) => {
  const form = event.target.closest("form[data-confirm]");
  if (!form) return;
  const message = form.getAttribute("data-confirm") || "Are you sure?";
  if (!window.confirm(message)) event.preventDefault();
});
