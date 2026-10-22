import { getSql } from "../server/neon.mjs";
import { toPublicCatalog } from "../server/catalog.mjs";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Allow", "GET");
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const sql = getSql();
    const rows = await sql`
      SELECT slug, name, description, age_min, age_max, activity_count,
             currency, status::text AS status, price_cents
      FROM public.products
      WHERE slug IN ('kit-essencial', 'kit-completo')
      ORDER BY activity_count ASC
    `;
    return res.status(200).json({ kits: toPublicCatalog(rows), checkoutEnabled: false });
  } catch (error) {
    console.error("Catalog database request failed:", error instanceof Error ? error.name : "unknown");
    return res.status(503).json({ error: "catalog_unavailable" });
  }
}
