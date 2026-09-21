import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const ICON = "mt-0.5 h-4 w-4 shrink-0 text-primary-light";
const LINK = "hover:text-white transition-colors";

const FooterContact = ({ email, phone, address }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
      <ul className="space-y-3 text-gray-300 text-sm">
        <li className="flex items-start gap-3">
          <Mail className={ICON} aria-hidden="true" />
          <a href={`mailto:${email}`} className={LINK}>
            {email}
          </a>
        </li>
        <li className="flex items-start gap-3">
          <Phone className={ICON} aria-hidden="true" />
          <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={LINK}>
            {phone}
          </a>
        </li>
        <li className="flex items-start gap-3">
          <MapPin className={ICON} aria-hidden="true" />
          <span>{address}</span>
        </li>
      </ul>
    </div>
  );
};

export default FooterContact;
