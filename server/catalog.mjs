// Contrato público de leitura. Nunca vazar dados internos de produtos ou
// liberar pagamento por causa de um status isolado no banco.
const officialSlugs = new Set(["kit-essencial", "kit-completo"]);

export function toPublicCatalogItem(product) {
  if (!product || !officialSlugs.has(product.slug)) return null;
  const isActive = product.status === "active";
  const price = product.price_cents;
  const hasValidPrice = Number.isSafeInteger(price) && price > 0 && product.currency === "BRL";
  return {
    slug: product.slug,
    name: product.name,
    description: product.description,
    ageMin: product.age_min,
    ageMax: product.age_max,
    activityCount: product.activity_count,
    currency: product.currency,
    // Não publicar preços do banco enquanto o produto estiver em draft.
    priceCents: isActive && hasValidPrice ? price : null,
    status: isActive ? "published" : "coming_soon",
    purchaseEnabled: false,
  };
}

export function toPublicCatalog(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map(toPublicCatalogItem).filter(Boolean);
}
