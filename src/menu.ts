export function setupMenu(): void {
  const button = document.querySelector<HTMLButtonElement>("#menu-toggle");
  const nav = document.querySelector<HTMLElement>("#site-nav");
  if (!button || !nav) return;

  const close = () => {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Abrir menu");
    nav.classList.remove("is-open");
  };

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    button.setAttribute("aria-label", expanded ? "Abrir menu" : "Fechar menu");
    nav.classList.toggle("is-open", !expanded);
  });
  nav
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
  window.matchMedia("(min-width: 801px)").addEventListener("change", close);
}
