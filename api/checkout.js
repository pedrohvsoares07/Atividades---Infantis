// Falha fechada: preços, termos, webhook Stripe e entrega privada
// ainda não foram liberados para venda.
export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Allow", "POST");
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  return res.status(503).json({ error: "checkout_disabled" });
}
