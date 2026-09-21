import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_AREA,
  getGeneralWhatsAppLink,
} from "../../constants/contact";

// Sales happen by phone and WhatsApp, so this page is direct Call / WhatsApp
// buttons rather than a form that would need somewhere to send its messages.
const Contact = () => {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header (the navbar is fixed, so it starts below it) */}
      <div className="bg-linear-to-br from-primary via-[#1e3a5f] to-primary-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-14 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Contact <span className="text-accent">Us</span>
          </h1>
          <p className="text-lg text-neutral-cream">
            The quickest way to reach us is to call or message us on WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <section className="flex flex-col rounded-2xl bg-white p-6 sm:p-8 shadow-lg">
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
              <Phone className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 className="text-2xl font-bold text-primary">Call us</h2>
            <p className="mt-2 text-2xl font-semibold text-primary">
              {PHONE_DISPLAY}
            </p>
            <p className="mt-2 mb-6 text-neutral">
              Speak to us about a car, a viewing or an import.
            </p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-light"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call now
            </a>
          </section>

          <section className="flex flex-col rounded-2xl bg-white p-6 sm:p-8 shadow-lg">
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white">
              <MessageCircle className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 className="text-2xl font-bold text-primary">WhatsApp</h2>
            <p className="mt-2 text-2xl font-semibold text-primary">
              {PHONE_DISPLAY}
            </p>
            <p className="mt-2 mb-6 text-neutral">
              Send us a message, or photos of a car you're asking about, and
              we'll reply as soon as we can.
            </p>
            <a
              href={getGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#128C7E] px-6 py-3 font-semibold text-white hover:bg-[#0f766b]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </section>
        </div>

        <section className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-dark">
              <MapPin className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-primary">Where we serve</h2>
              <p className="text-lg font-semibold text-primary">
                {SERVICE_AREA}
              </p>
              <p className="text-neutral">
                Want to see a car in person? Tell us which one and we'll arrange
                the details of the viewing with you.
              </p>
            </div>
          </div>
        </section>

        <p className="text-center text-neutral">
          Have a question first? Read our{" "}
          <Link
            to="/faq"
            className="font-semibold text-primary underline underline-offset-2 hover:text-primary-light"
          >
            frequently asked questions
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Contact;
