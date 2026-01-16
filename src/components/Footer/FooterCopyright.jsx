import React from "react";

const FooterCopyright = ({ text }) => {
  return (
    <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
      <p>&copy; {text}</p>
    </div>
  );
};

export default FooterCopyright;
