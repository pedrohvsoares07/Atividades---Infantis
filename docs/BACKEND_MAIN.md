# Aprender & Descobrir — backend isolado a partir da main

## Fonte da verdade

Esta branch `backend/main-neon-seguro` nasceu diretamente do commit
`0b6ba184fd999a8dc3f287352ab66ae52bc2e5d6` da branch `main`.

**A `main` determina o visual e as funcionalidades do site.**
Não foram editados `index.html`, `style.css`, `script.js` nem
`assets/` (11 imagens WebP + amostra gratuita em PDF).

Na `main`, os preços exibidos são:
- Essencial: R$ 9,90; referência visual R$ 14,90;
- Completo: R$ 19,90; referência visual R$ 29,90.

Foram preservados **literalmente** no HTML, sem convertê-los em valores
oficiais de cobrança: no Neon os kits estão em `draft` e sem preços
persistidos. O administrador do negócio deve aprovar e registrar
separadamente os preços reais de venda antes de ativar pagamento.

## Estrutura adicional

- `api/health.js`: testa conexão com Neon, GET.
- `api/catalog.js`: lê apenas dois kits oficiais em `public.products`, GET.
- `api/checkout.js`: POST deliberadamente retorna HTTP 503.
- `server/`: adaptadores de banco e serialização segura.
- `scripts/build.mjs`: copia **sem alterações** os arquivos estáticos da
  `main` para `dist/`. Não transpila ou substitui o frontend.
- `tests/`: protege catálogo e fidelidade das cópias de HTML, CSS,
  JS, imagens e PDF.
- `vercel.json`: força Framework Other, `npm run build` e saída `dist`,
  substituindo eventual configuração Vite mantida na Vercel.

## Vercel / Neon

- Git: selecionar `backend/main-neon-seguro` para Preview; não apontar a
  produção para esta branch sem revisão.
- Environment: `Preview`.
- Variável secreta: `DATABASE_URL` (server-side, **nunca** `VITE_DATABASE_URL`).
- Banco: Neon `aprender-descobrir`, branch `development`, banco
  `aprender_descobrir`, preferencialmente com URL pooled.
- Após atualizar env vars, criar novo deployment (Redeploy).
- Não adicionar credenciais ao repositório.

## Validação

```sh
npm install
npm test
npm run build
```

Testar `GET /api/health`, `GET /api/catalog` e que o botão de compra
continua abrindo o modal demonstrativo. O código não integra o catálogo
à interface neste estágio para evitar regressões de visual e de preços.

## Regras para próximas etapas

1. Reaproveitar **apenas** módulos pontuais da
   `frontend/ajustes-site-kits` após análise e adaptação.
2. Nunca mesclar diretamente as branches com estruturas diferentes.
3. Nenhum checkout ou webhook real até validar preços, termos versionados,
   assinatura Stripe, autorização de acesso e entrega segura dos PDFs.
4. Não hospedar PDFs comerciais em `assets/` ou `dist/`. A amostra
   gratuita já presente na `main` permanece pública.
5. Manter Pull Request para `main` em **draft** até revisão do Pedro.
