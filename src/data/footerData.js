import { PHONE_DISPLAY, SERVICE_AREA } from "../constants/contact";

// The phone number and area come from constants/contact.js.
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
    email: "extramotors.gh@gmail.com",
    phone: PHONE_DISPLAY,
    address: SERVICE_AREA,
  },
  copyright: "2026 Extra Motors. All rights reserved.",
};
