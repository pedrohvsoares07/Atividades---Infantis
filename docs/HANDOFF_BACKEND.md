# Handoff técnico para backend — Aprender & Descobrir

## Estado atual
Landing page em **Vite + TypeScript**. O GitHub contém o frontend e recursos provisórios de mídia (não contém os arquivos reais). O projeto não processa pagamentos.

## Produtos (valores do protótipo, confirmar antes de publicar)
- Kit Essencial: 100 atividades em PDF; preço exibido R$ 9,90, referência riscada R$ 14,90.
- Kit Completo: 300 atividades em PDF, incluindo as 100 do Essencial; preço exibido R$ 19,90, referência riscada R$ 29,90.
- A apresentação de desconto requer validação comercial dos preços anteriores.

## Recomendações para a fase de backend
1. Definir produtos e IDs de preço reais no provedor de pagamento, somente após aprovação.
2. Usar variáveis de ambiente e funções de servidor para credenciais e operações sensíveis; nunca expor uma chave secreta em frontend.
3. Confirmar pagamento por webhook autenticado no backend e tratar eventos repetidos (idempotência).
4. Liberar download protegido e temporário apenas para o produto efetivamente pago. **Não hospedar os PDFs completos em `public/`**.
5. Validar o fluxo de ponta a ponta em ambiente de testes antes de habilitar compras.
6. Definir tratamento de reembolsos, proteção de dados e política de acesso com o responsável pelo negócio.

## Arquivos de mídia pendentes
Adicionar apenas recursos autorizados de marketing, em `public/media/`, e atualizar os `null` em `src/data.ts`.
Não adicionar produtos pagos ao repositório ou artefato estático.

## Comandos
```sh
npm ci
npm run typecheck
npm run build
npm test
```

O frontend mantém a compra indisponível até a implementação aprovada de checkout e entrega.
