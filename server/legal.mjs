// Metadados de termos em elaboração: este sinalizador DEVE permanecer false
// até todos os campos comerciais serem preenchidos e aprovados para publicação.
export const CURRENT_TERMS_VERSION = "2026-10-22.2";
export const LEGAL_DOCUMENT_APPROVED = false;
export const CHECKOUT_REQUIRES_EXPLICIT_ACCEPTANCE = true;

export const APPROVED_DISPLAY_PRICES_CENTS = Object.freeze({
  "kit-essencial": 990,
  "kit-completo": 1990,
});

// Esses valores são somente referência comercial aprovada. O checkout futuro
// deve buscar preço no banco e validar o valor da sessão do Stripe no backend.
