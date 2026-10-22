import { cp, copyFile, mkdir, rm, stat } from "node:fs/promises";
import { resolve, join } from "node:path";

// A main é a fonte da verdade do frontend. Copiar arquivos byte a byte,
// sem transformar HTML, CSS, JavaScript, imagens ou a amostra PDF.
const root = process.cwd();
const output = resolve(root, "dist");
const staticFiles = ["index.html", "style.css", "script.js"];
for (const name of [...staticFiles, "assets"]) {
  const metadata = await stat(join(root, name));
  if (!metadata) throw new Error(`Arquivo obrigatório ausente: ${name}`);
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of staticFiles) {
  await copyFile(join(root, name), join(output, name));
}
await cp(join(root, "assets"), join(output, "assets"), { recursive: true });
console.log("Site da main copiado integralmente para dist/ (sem alterações visuais).");
