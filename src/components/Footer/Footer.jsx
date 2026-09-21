// src/components/Footer.jsx
import FooterLogo from "../Footer/FooterLogo";
import FooterLinkSection from "../Footer/FooterLinkSection";
import FooterContact from "../Footer/FooterContact";
import FooterCopyright from "../Footer/FooterCopyright";
import { footerData } from "../../data/footerData";

// Deliberately small: the brand, Quick Links, how to reach us, and the
// copyright line.
const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <FooterLogo />
          <FooterLinkSection
            title="Quick Links"
            links={footerData.quickLinks}
          />
          <FooterContact {...footerData.contact} />
        </div>
        <FooterCopyright text={footerData.copyright} />
      </div>
    </footer>
  );
};

export default Footer;
