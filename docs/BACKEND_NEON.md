# Backend Neon — Aprender & Descobrir

## Escopo
Integração inicial **somente backend** para o frontend Vite + TypeScript, sem alterar arquivos de interface em `src/`.
Usa o projeto Neon existente `aprender-descobrir` e as tabelas já criadas. Nenhuma alteração de schema foi feita.

## Endpoints Vercel
- `GET /api/health`: testa SELECT 1 no Neon; 200 com status ok ou 503 sem detalhes internos.
- `GET /api/catalog`: apresenta somente `kit-essencial` e `kit-completo`; itens em draft ficam como coming_soon e sem preço. Nunca devolve arquivos privados, IDs internos ou o produto de testes.
- `POST /api/checkout`: **sempre 503**, compras desabilitadas.

## Implantar Preview
1. Publicar esta branch no Vercel Preview usando o diretório raiz do repositório e framework Vite.
2. No painel do projeto Vercel, definir `DATABASE_URL` **somente** nas variáveis do ambiente Preview, usando a connection string **pooled** da branch Neon `development`. Não usar prefixo `VITE_`.
3. Verificar `/api/health` e `/api/catalog` no Preview. Esperado: 2 kits sem preço, com `checkoutEnabled: false`.
4. Fazer testes com `npm ci`, `npm run typecheck`, `npm run build`, `npm test` e `node --test tests/catalog.test.mjs`.

**Atenção:** `npm run dev` do Vite serve apenas o frontend; para executar as APIs localmente use `vercel dev` configurado corretamente ou uma implantação Preview.
Nunca commitar `.env` real ou credenciais do Neon. Para migrações futuras, usar conexão direta; o app usa pooled.

## Pendências comerciais
O frontend do Pedro mantém preços demonstrativos e compras em breve. A API **não** autoriza compras.
Antes de implementar checkout: aprovar preços verdadeiros, publicação dos termos, Stripe TEST, webhook autenticado, idempotência e entrega privada dos PDFs. Nunca publicar PDFs pagos em `public/`.
Não conectar esta API ao frontend automaticamente sem revisão conjunta do formato de dados.
