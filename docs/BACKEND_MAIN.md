# Aprender & Descobrir — backend alinhado à main oficial

## Fonte oficial do site

O backend inicial nasceu diretamente da `main` no commit
`0b6ba184fd999a8dc3f287352ab66ae52bc2e5d6`.
A `main` é a fonte oficial de visual e funcionalidades; a branch de
desenvolvimento contínuo do servidor passa a ser apenas `backend-dev`.

Nenhuma alteração nos arquivos de frontend `index.html`, `style.css`,
`script.js` ou `assets/` (11 imagens WebP e a amostra gratuita em PDF).
`frontend/ajustes-site-kits`, `teste-neon` e
`backend/integracao-neon` não serão usadas para novas alterações nem mescladas
diretamente. As branches antigas permanecem temporariamente no GitHub apenas como
histórico, sem participação nas integrações futuras. A exclusão definitiva
requer acesso de manutenção e conferência com Pedro.

### Preços exibidos — preservados da main

- Kit Essencial: R$ 9,90; referência visual R$ 14,90.
- Kit Completo: R$ 19,90; referência visual R$ 29,90.

**Preços comerciais aprovados por Pedro e pelo responsável técnico em
22/10/2026: R$ 9,90 (Essencial), R$ 19,90 (Completo).** Os valores
correspondem a 990 e 1990 centavos na futura integração Stripe TEST.
Os preços de referência da vitrine NÃO são preços a cobrar. No Neon
`development`, os produtos ainda permanecem em `draft` e sem preço
de cobrança registrado. Não ativar Stripe nem pagamentos reais sem
termos efetivamente publicados, aceite versionado, webhooks e entrega
privada validada.

**Avaliação dos PDFs:** foi relatada revisão positiva por uma pedagoga.
Isso não equivale a certificação profissional assinada nem comprova,
por si só, titularidade de direitos autorais sobre todos os conteúdos.

## Estrutura

- `/api/health`: GET; exige consulta funcional e presença dos dois kits
  oficiais para retornar `{"status":"ok"}`. Isso evita falso positivo
  quando a conexão aponta para uma branch sem tabelas do Neon.
- `/api/catalog`: GET; retorna somente os kits oficiais e não expõe dados
  privados nem preços de produtos em rascunho.
- `/api/checkout`: sempre bloqueado; POST retorna HTTP 503.
- `server/`: acesso ao Neon e serialização de dados públicos.
- `scripts/build.mjs`: copia site oficial da `main` byte a byte para
  `dist/`, inclusive mídia pública.
- `tests/`: valida preservação visual e regras de acesso.
- `.github/workflows/validate.yml`: `npm test` e `npm run build` em cada
  PR contra `main` e pushes relevantes.

## Deploy na Vercel

- Projeto Git conectado: `backendinfantil` em `venturini-group` (ao
  qual a conexão Vercel do assistente pode não ter acesso).
- Depois do merge aprovado, `main` é a branch de produção e `backend-dev`
  permanece como a branch exclusiva de desenvolvimento servidor.
- Framework: `Other` (site HTML/CSS/JS estático); Root Directory `./`.
- `vercel.json` configura build `npm run build` e saída `dist`.
- Variável privada `DATABASE_URL`, usando a conexão Neon do ambiente certo:
  Preview → Neon `development`; Production → conexão aprovada para produção
  apenas quando o schema e os dados estiverem preparados.
- Não colocar credenciais no código, HTML ou variáveis expostas no browser.
- Após alterações de variáveis, fazer redeploy para que a função as carregue.

**Atenção:** o Neon `main` anteriormente foi observado sem `public.products`.
Um deployment de produção sem `DATABASE_URL` correta mantém o site estático
funcionando, mas os endpoints retornam HTTP 503. Nunca apontar para o Neon
`main` sem preparar o banco.

## Validação

```sh
npm install
npm test
npm run build
```

Testes de fumaça após deploy: `GET /`, `GET /api/health`,
`GET /api/catalog` e `POST /api/checkout` (deve ser 503).

Nenhuma lógica no `script.js` da vitrine foi alterada. A ligação da
interface ao catálogo real será feita somente após revisão conjunta com
Pedro, preservando visual, planos e preços.

## Próximas etapas

- Stripe TEST, termos versionados, entrega privada e autenticação deverão ser
  implementados e auditados em `backend-dev`.
- Evitar merges automáticos das branches legadas.
- Rotacionar a senha PostgreSQL compartilhada anteriormente na conversa.

## Etapa de termos — 22/10/2026

- `termos.html`: versão de revisão `2026-10-22.1` de Termos de Compra e Licença,
  adicionada SEM alterar `index.html`, `style.css`, `script.js` ou `assets/`.
  Disponível no Preview em `/termos.html`; ainda não habilitada para compras.
- `server/legal.mjs`: metadados imutáveis desta versão e
  `LEGAL_DOCUMENT_APPROVED = false` até completar os dados do vendedor.
- Campos obrigatórios pendentes: nome/razão social responsável, CPF/CNPJ
  aplicável, endereço físico, contato de suporte, prazo e modo de entrega.
- `tests/legal.test.mjs`: testa versionamento, campos e preservação
  do checkout bloqueado.
- O CDC (art. 49) e Decreto 7.962/2013 impõem regras de arrependimento,
  identificação do fornecedor, transparência e atendimento.
- O aceite será checkbox desmarcado por padrão, com termo/version/hash/data
  vinculados à sessão de checkout apenas após aprovação do conteúdo.
- Próxima etapa: completar os dados, revisão comercial/jurídica do texto,
  implementar aceite auditável em ambiente de teste e somente depois
  Stripe TEST com chaves fornecidas via variáveis secretas.
