// TODO: replace with the real WhatsApp number — digits only, international
// format, no "+" or spaces (e.g. "233241234567").
export const WHATSAPP_NUMBER = "233XXXXXXXXX";

export const getWhatsAppLink = (carName) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello, I'm interested in the ${carName}.`,
  )}`;

export const openWhatsApp = (carName) =>
  window.open(getWhatsAppLink(carName), "_blank", "noopener,noreferrer");
