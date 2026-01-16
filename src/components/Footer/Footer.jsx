// src/components/Footer.jsx
import FooterLogo from "../Footer/FooterLogo";
import FooterLinkSection from "../Footer/FooterLinkSection";
import FooterContact from "../Footer/FooterContact";
import FooterCopyright from "../Footer/FooterCopyright";
import { footerData } from "../../data/footerData";
import logoWhite from "../../assets/Logo/logoWhite.png";

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterLogo
            logo={logoWhite}
            description={footerData.company.description}
          />
          <FooterLinkSection
            title="Quick Links"
            links={footerData.quickLinks}
          />
          <FooterLinkSection title="Support" links={footerData.supportLinks} />
          <FooterContact {...footerData.contact} />
        </div>
        <FooterCopyright text={footerData.copyright} />
      </div>
    </footer>
  );
};

export default Footer;
