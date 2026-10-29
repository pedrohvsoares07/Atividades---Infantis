// O site direciona a pagamentos externos na Cakto. Documentos revisados
// ainda dependem da confirmação do responsável e de revisão jurídica.
export const CURRENT_TERMS_VERSION = "2026-10-28.1";
export const LEGAL_DOCUMENT_APPROVED = false;
export const CHECKOUT_REQUIRES_EXPLICIT_ACCEPTANCE = true;

export const APPROVED_DISPLAY_PRICES_CENTS = Object.freeze({
  "kit-essencial": 990,
  "kit-completo": 1990,
});

// Estes valores informam os kits; a cobrança real é feita na Cakto.
// A API interna antiga permanece bloqueada por segurança.
