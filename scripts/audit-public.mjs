import { existsSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const errors = [];
const imageExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".svg",
]);

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

for (const folder of ["public", "dist"]) {
  for (const file of walk(join(root, folder))) {
    const path = relative(join(root, folder), file).replaceAll("\\", "/");
    const lower = path.toLowerCase();
    if (
      lower.includes("05_produtos_pagos_nao_publicar") ||
      /\.(zip|rar|7z)$/i.test(path)
    ) {
      errors.push(`${folder}/${path}: arquivo pago ou pacote proibido`);
    }
    if (lower.endsWith(".pdf") && !lower.startsWith("media/amostra/")) {
      errors.push(`${folder}/${path}: PDF fora da pasta de amostra pública`);
    }
    if (
      folder === "public" &&
      !lower.endsWith(".pdf") &&
      ![...imageExtensions].some((extension) => lower.endsWith(extension))
    ) {
      errors.push(
        `${folder}/${path}: somente imagens selecionadas e o PDF público podem entrar em public/`,
      );
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    "Auditoria pública aprovada: nenhum pacote pago, ZIP ou PDF indevido em public/ ou dist/.",
  );
}
