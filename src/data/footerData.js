import { PHONE_DISPLAY, SERVICE_AREA } from "../constants/contact";

// The phone number and area come from constants/contact.js. TODO: the email is
// temporary (a personal address); swap in a dedicated business email later.
export const footerData = {
  quickLinks: [
    { id: 1, name: "Home", to: "/" },
    { id: 2, name: "New Arrivals", to: "/#new-arrivals" },
    { id: 3, name: "Used Cars", to: "/usedCars" },
    { id: 4, name: "Services", to: "/services" },
    { id: 5, name: "FAQ", to: "/faq" },
    { id: 6, name: "Contact", to: "/contact" },
  ],
  contact: {
    email: "bismarkjonesoduro@gmail.com",
    phone: PHONE_DISPLAY,
    address: SERVICE_AREA,
  },
  copyright: "2026 Xtra Motors. All rights reserved.",
};
