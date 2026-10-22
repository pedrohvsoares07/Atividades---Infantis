import { neon } from "@neondatabase/serverless";

// Credencial somente no servidor. Não usar VITE_ ou embutir DATABASE_URL no HTML.
export function getSql() {
  const connection = process.env.DATABASE_URL;
  if (typeof connection !== "string" || !connection.trim()) {
    throw new Error("DATABASE_URL_NOT_CONFIGURED");
  }
  let parsed;
  try {
    parsed = new URL(connection);
  } catch {
    throw new Error("DATABASE_URL_INVALID");
  }
  if (!["postgresql:", "postgres:"].includes(parsed.protocol) || !parsed.hostname || !parsed.pathname) {
    throw new Error("DATABASE_URL_INVALID");
  }
  return neon(connection);
}
