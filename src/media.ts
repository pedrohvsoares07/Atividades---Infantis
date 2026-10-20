export function mediaMarkup(
  src: string | null,
  label: string,
  alt: string,
  className = "",
): string {
  if (src) {
    return `<img class="media-image ${className}" src="${src}" alt="${alt}" loading="lazy" />`;
  }

  return `<div class="media-placeholder ${className}" role="img" aria-label="${alt}. Imagem temporária: arquivo original ainda não fornecido.">
    <span class="placeholder-spark" aria-hidden="true">✳</span>
    <span class="placeholder-paper placeholder-paper-back" aria-hidden="true"></span>
    <span class="placeholder-paper placeholder-paper-front" aria-hidden="true"><span></span><span></span><span></span></span>
    <span class="placeholder-label">${label}</span>
    <span class="placeholder-note">Imagem temporária · original pendente</span>
  </div>`;
}
