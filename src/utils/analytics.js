// Google Analytics events, sent through the gtag snippet in index.html.
// Each is a no-op when gtag isn't there (an ad blocker, or local dev).

// A tap on a Call or WhatsApp button. `method` is "call" or "whatsapp";
// `carName` is sent when the button belongs to a particular car.
export const trackContactClick = (method, carName) => {
  window.gtag?.("event", "contact_click", {
    method,
    ...(carName ? { car_name: carName } : {}),
  });
};
