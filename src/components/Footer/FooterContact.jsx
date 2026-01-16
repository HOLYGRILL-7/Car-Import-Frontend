import React from "react";

const FooterContact = ({ email, phone, address }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
      <ul className="space-y-2 text-gray-400 text-sm">
        <li>📧 {email}</li>
        <li>📞 {phone}</li>
        <li>📍 {address}</li>
      </ul>
    </div>
  );
};

export default FooterContact;
("");
