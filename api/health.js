import { getSql } from "../server/neon.mjs";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Allow", "GET");
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const sql = getSql();
    // Além da conexão, valida que o banco selecionado possui o catálogo oficial.
    // Isso evita um falso "ok" ao apontar para a branch main vazia do Neon.
    const [result] = await sql`
      SELECT COUNT(*)::int AS kits_found
      FROM public.products
      WHERE slug IN ('kit-essencial', 'kit-completo')
    `;
    if (result?.kits_found !== 2) {
      return res.status(503).json({ status: "unavailable" });
    }
    return res.status(200).json({ status: "ok" });
  } catch (error) {
    // Nunca incluir a connection string ou detalhes privados na resposta pública.
    console.error("Database readiness check failed:", error instanceof Error ? error.name : "unknown");
    return res.status(503).json({ status: "unavailable" });
  }
}
