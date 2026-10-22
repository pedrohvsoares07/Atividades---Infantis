const OFFICIAL_KITS = new Set(["kit-essencial", "kit-completo"]);

export function toPublicCatalogItem(row) {
  if (!row || !OFFICIAL_KITS.has(row.slug)) return null;
  const published = row.status === "active";
  const priced = published && Number.isInteger(row.price_cents) && row.price_cents > 0;
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    ageMin: row.age_min,
    ageMax: row.age_max,
    activityCount: row.activity_count,
    currency: row.currency,
    priceCents: priced ? row.price_cents : null,
    status: published ? "published" : "coming_soon",
    purchaseEnabled: false,
  };
}

export function toPublicCatalog(rows) {
  return rows.map(toPublicCatalogItem).filter(Boolean);
}
