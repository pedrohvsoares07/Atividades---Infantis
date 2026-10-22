# Aprender & Descobrir

Landing page estática para apresentar dois kits de atividades educativas digitais. Esta versão **não vende, cobra nem entrega** arquivos pagos.

## Começar no VS Code

Requisitos: Node.js 20.19+ e npm. Abra esta pasta no VS Code e execute no terminal:

```bash
npm ci
npm run dev
```

Abra o endereço `Local` mostrado pelo Vite (normalmente `http://localhost:5173/`). Para validar e visualizar o build:

```bash
npm run typecheck
npm run build
npm test
npm run preview
```

Abra o endereço informado por `npm run preview`. O site não deve ser aberto por `file://`.

## Estrutura

- `index.html`: entrada HTML e metadados.
- `src/main.ts`: seções e conteúdo principal da página.
- `src/data.ts`: matérias, planos e caminhos das mídias.
- `src/gallery.ts`: abas, miniaturas e modal das matérias.
- `src/menu.ts`: navegação móvel.
- `src/media.ts`: imagem ou espaço temporário identificado.
- `src/style.css`: visual e responsividade.
- `scripts/audit-public.mjs`: impede pacotes e PDFs indevidos no site público.
- `public/`: reservada para arquivos públicos selecionados. Está vazia até receber as mídias originais.

## Inventário e substituição das mídias

No início deste projeto, **não havia arquivos de mídia nem PDFs** no checkout. Todos os espaços abaixo exibem uma arte temporária identificada. Nenhuma imagem de atividade foi inventada.

| Seção | Chave em `src/data.ts` | Origem esperada |
| --- | --- | --- |
| Hero: mãe e filha | `media.heroFamily` | Foto selecionada de `01_IMAGENS_SITE/` ou `02_IMAGENS_ORIGINAIS/` |
| Como funciona: adulto e criança | `media.secondFamily` | Foto selecionada das mesmas pastas |
| Banner familiar | `media.bannerFamily` | Foto selecionada das mesmas pastas |
| Kits: capas | `media.essentialCover`, `media.completeCover` | Capas públicas selecionadas das mesmas pastas |
| Galeria: cinco áreas | `subjects[*].preview` | Cinco imagens selecionadas de `01_IMAGENS_SITE/` |
| Prévia gratuita | `media.freeSamplePdf` | Somente o PDF público de `04_PDF_PUBLICO_AMOSTRA/` |

Quando os arquivos chegarem, copie **apenas os arquivos aprovados para publicação** para `public/media/familias/`, `public/media/capas/`, `public/media/materias/` e `public/media/amostra/`, conforme a seção. Em `src/data.ts`, troque cada `null` pelo caminho correspondente, como `/media/familias/hero.webp` ou `/media/amostra/previa.pdf`. O Vite manterá esses caminhos em desenvolvimento, build e preview. Confira cada imagem individualmente no navegador e rode novamente o build e a auditoria.

**Nunca copie `05_PRODUTOS_PAGOS_NAO_PUBLICAR/`, seus ZIPs, gabaritos ou livros completos para `public/`, `src/` ou `dist/`.** A auditoria recusa ZIPs e PDFs fora de `media/amostra/`. A seleção e procedência dos arquivos também precisam de revisão humana; a auditoria não consegue provar que uma imagem veio da pasta permitida.

## Conteúdo pendente

- Fotos, capas e prévias reais das cinco matérias.
- O PDF público de amostra. O botão permanece indisponível até a inclusão dele.
- Confirmação dos preços provisórios de R$ 14,90 e R$ 29,90.
- Definição futura de compra e entrega digital. Os botões mostram “Compras em breve”; não há checkout, Stripe, banco de dados ou coleta financeira.

O conteúdo comercial e pedagógico deve ser revisado antes da publicação. Não há depoimentos, avaliações, certificações ou promessas de resultados.

## Atualização do frontend (22/10/2026)

- O Kit Essencial está indicado a **R$ 9,90** com **R$ 14,90** riscado; o Completo a **R$ 19,90** com **R$ 29,90** riscado, **somente como protótipo**. Não divulgue desconto sem comprovar que o valor de referência era realmente praticado.
- A apresentação dos kits, os tamanhos dos valores e a marca com estrela foram atualizados.
- **As fotos, capas e PDFs não foram adicionados ao GitHub**. A conta não possuía esses arquivos no repositório, então mantivemos os espaços de mídia identificados para não inventar imagens.
- Os kits de PDFs pagos não podem ser incluídos em `public/` ou no build público. As únicas mídias publicáveis são fotos e capas aprovadas, cinco imagens de amostra e o PDF gratuito.
- Checkout, backend, autenticação e entrega protegida continuam fora do frontend.
- Handoff para o desenvolvedor: `docs/HANDOFF_BACKEND.md`.
