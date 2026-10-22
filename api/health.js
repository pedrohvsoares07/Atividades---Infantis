import { getSql } from "../server/neon.mjs";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Allow", "GET");
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const sql = getSql();
    await sql`SELECT 1 AS healthy`;
    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Database health check failed:", error instanceof Error ? error.name : "unknown");
    return res.status(503).json({ status: "unavailable" });
  }
}
