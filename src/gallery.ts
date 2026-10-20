import { subjects, type Subject } from "./data";
import { mediaMarkup } from "./media";

export function setupGallery(): void {
  const tablist = document.querySelector<HTMLElement>("#subject-tabs");
  const panel = document.querySelector<HTMLElement>("#subject-panel");
  const thumbnails = document.querySelector<HTMLElement>("#subject-thumbnails");
  const dialog = document.querySelector<HTMLDialogElement>("#preview-dialog");
  const dialogContent = document.querySelector<HTMLElement>(
    "#preview-dialog-content",
  );
  const closeButton =
    document.querySelector<HTMLButtonElement>("#preview-close");
  if (
    !tablist ||
    !panel ||
    !thumbnails ||
    !dialog ||
    !dialogContent ||
    !closeButton
  )
    return;

  let selected = 0;
  let opener: HTMLElement | null = null;

  function render(subject: Subject): void {
    if (!panel || !thumbnails) return;
    panel.innerHTML = `<div class="subject-preview tone-${subject.tone}">
      ${mediaMarkup(subject.preview, `Prévia de ${subject.shortName}`, `Prévia de atividade de ${subject.name}`, "subject-media")}
      <button class="expand-button" id="expand-preview" type="button" aria-label="Ampliar prévia de ${subject.name}">Ampliar <span aria-hidden="true">↗</span></button>
    </div>
    <div class="subject-detail">
      <span class="eyebrow">Explore por área</span>
      <h3>${subject.name}</h3>
      <p>${subject.summary}</p>
      <div class="tag-list" aria-label="Características">${subject.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      ${subject.preview ? "" : '<p class="pending-note">A imagem da atividade será adicionada após o envio dos arquivos originais.</p>'}
    </div>`;
    panel.setAttribute("aria-labelledby", `tab-${subject.id}`);
    panel
      .querySelector<HTMLButtonElement>("#expand-preview")
      ?.addEventListener("click", (event) => {
        opener = event.currentTarget as HTMLElement;
        if (!dialog || !dialogContent) return;
        dialogContent.innerHTML = `<h2 id="preview-title">${subject.name}</h2><div class="dialog-media tone-${subject.tone}">${mediaMarkup(subject.preview, `Prévia de ${subject.shortName}`, `Prévia ampliada de atividade de ${subject.name}`)}</div>${subject.preview ? "" : "<p>Prévia temporária. A imagem real ainda não foi fornecida.</p>"}`;
        dialog.showModal();
        closeButton?.focus();
      });
    thumbnails
      .querySelectorAll<HTMLButtonElement>("[data-subject]")
      .forEach((button, index) => {
        button.setAttribute("aria-current", String(index === selected));
      });
  }

  function select(index: number, focus = false): void {
    selected = (index + subjects.length) % subjects.length;
    const tabs = Array.from(
      tablist!.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
    );
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === selected));
      tab.tabIndex = i === selected ? 0 : -1;
    });
    render(subjects[selected]);
    if (focus) tabs[selected]?.focus();
  }

  tablist.addEventListener("click", (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>(
      '[role="tab"]',
    );
    if (button) select(Number(button.dataset.index));
  });
  tablist.addEventListener("keydown", (event) => {
    const next =
      event.key === "ArrowRight"
        ? selected + 1
        : event.key === "ArrowLeft"
          ? selected - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? subjects.length - 1
              : null;
    if (next !== null) {
      event.preventDefault();
      select(next, true);
    }
  });
  thumbnails.addEventListener("click", (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>(
      "[data-subject]",
    );
    if (button) select(Number(button.dataset.subject));
  });
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => opener?.focus());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  select(0);
}
