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

## Integração Vercel realizada em 22/10/2026

- Projeto Vercel independente: `aprender-descobrir-api` (ID `prj_gleCFedIpz1M1gLC2ALTOWTtxZmL`).
- Variável `DATABASE_URL` do Neon `aprender-descobrir` / branch `development` cadastrada como **sensitive**, somente para **Preview** (o valor não é mantido neste repositório).
- API implantada a partir das funções nesta branch, usando deployment manual do Vercel (sem conexão Git automática).
- Staging URL: `https://aprender-descobrir-8t7tks0dl-donyxxj7s-projects.vercel.app` (build `READY`).
- Consultas manuais em `/api/health` e `/api/catalog` ainda precisam ser verificadas: a execução externa não conseguiu acessar o endpoint e não houve logs de requisição.
- Há também uma implantação inicial do projeto no alvo production **sem** `DATABASE_URL` de produção; não deve ser usada como ambiente operacional.
- **Bloqueio Git**: a integração GitHub no Vercel não está autorizada para `pedrohvsoares07/Atividades---Infantis`. O proprietário precisa conceder acesso a este repositório nas configurações da integração GitHub da Vercel. Após a autorização, vincular o repositório e configurar builds de Preview para a branch do backend; não mudar a demo Next.js preexistente.
- O frontend do Pedro continua sem consumir a API, propositalmente. Não foi ativado Stripe nem publicada a loja.

## Verificação de integração — 22/10/2026

Código da branch `teste-neon` reproduzido integralmente em ambiente Vercel de staging:
- Vite `npm run build` concluído; TypeScript e compilação sem erros.
- `GET /api/health`: HTTP 200, `{"status":"ok"}`.
- `GET /api/catalog`: HTTP 200, somente `kit-essencial` (100) e `kit-completo` (300), ambos `coming_soon`, preços nulos e checkout desativado.
- `GET /`: HTTP 200, frontend estático entregue.
- Validação de staging: `https://aprender-descobrir-r09eq61nc-donyxxj7s-projects.vercel.app`.

**Importante:** o workspace do projeto `backendinfantil` na Vercel é `venturini-group`, que não está autorizado na conexão Vercel atual do agente. Os resultados acima comprovam o funcionamento do código em staging independente; não substituem os testes no deployment de Venturini. Para o projeto `backendinfantil`, conferir que ele compila a branch `teste-neon` (não `main`), usa Framework Vite, Root Directory `./`, Build Command `npm run build`, Output Directory `dist`, e possui `DATABASE_URL` no ambiente Preview apontando ao banco Neon `aprender-descobrir` da branch `development`. Nunca expor credenciais no frontend.
