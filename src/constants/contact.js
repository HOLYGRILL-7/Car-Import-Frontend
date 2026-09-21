// How customers reach the dealer. Everything on the site that shows or links a
// phone number, WhatsApp chat or service area reads from here.

// Shown on the site.
export const PHONE_DISPLAY = "+233 243170816";
// For tel: links: international format, digits only after the "+".
export const PHONE_TEL = "+233243170816";

// WhatsApp: digits only, international format, no "+" or spaces
// (e.g. "233241234567").
export const WHATSAPP_NUMBER = "233243170816";

// The area we serve. Deliberately not a street address.
export const SERVICE_AREA = "Achimota, Accra";

const whatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const getWhatsAppLink = (carName) =>
  whatsAppLink(`Hello, I'm interested in the ${carName}.`);

export const getGeneralWhatsAppLink = () =>
  whatsAppLink("Hello, I'd like to know more about Xtra Motors.");

// A chat opened from a service card, pre-filled with that service's name.
export const getServiceWhatsAppLink = (serviceTitle) =>
  whatsAppLink(`Hi, I'm interested in ${serviceTitle}`);

export const openWhatsApp = (carName) =>
  window.open(getWhatsAppLink(carName), "_blank", "noopener,noreferrer");
