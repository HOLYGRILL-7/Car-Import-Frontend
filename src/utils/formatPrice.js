// Prices are stored in Ghana cedis: 185000 -> "GH₵ 185,000".
export const formatPrice = (price) =>
  `GH₵ ${Number(price).toLocaleString("en-US")}`;
