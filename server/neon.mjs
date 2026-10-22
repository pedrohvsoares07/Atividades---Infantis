import { neon } from "@neondatabase/serverless";

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url || !url.startsWith("postgresql://")) {
    throw new Error("DATABASE_URL ausente ou inválida");
  }
  return neon(url);
}
