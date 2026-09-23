import { services, whyChooseUs } from "../../data/carsData";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react"; // make sure lucide-react is installed
import { getServiceWhatsAppLink } from "../../constants/contact";

const Services = () => {
  return (
    <div className="min-h-screen bg-(--color-neutral-light)">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-primary via-[#1e3a5f] to bg-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <span className="bg-secondary text-white px-6 py-2 rounded-full text-sm font-semibold">
                OUR SERVICES
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              Everything You Need
              <br />
              <span className="bg-linear-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Under One Roof
              </span>
            </h1>
            <p className="text-xl text-neutral-cream max-w-2xl mx-auto">
              From buying to selling to maintenance, we have you covered with
              comprehensive automotive solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id} // changed from index to unique id
              className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className={`h-2 bg-linear-to-r ${service.color}`}></div>

              <div className="flex flex-1 flex-col gap-6 p-8">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-r ${service.color} text-white`}
                >
                  <service.icon className="w-12 h-12" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#0a1f44] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-[#0a1f44]"
                    >
                      <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={getServiceWhatsAppLink(service.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto w-full py-3 px-6 rounded-xl bg-linear-to-r ${service.color} text-white font-semibold flex items-center justify-center gap-2`}
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1f44] mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-neutral">
              Your trusted partner in every step of your automotive journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item) => (
              <div
                key={item.id} // use a unique id if available
                className="text-center space-y-4 p-6 rounded-2xl hover:bg-neutral-cream transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-r from-[#f59e0b] to-[#fbbf24] text-white">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                <p className="text-neutral">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-br from-[#0a1f44] to-[#1e3a5f] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-neutral-light">
            Browse our inventory or reach out — we're happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/usedCars"
              className="px-8 py-4 bg-accent hover:bg-accent-light text-primary-dark font-bold rounded-xl hover:scale-105 transition-transform shadow-lg"
            >
              Browse Inventory
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-primary rounded-xl hover:scale-105 transition-transform shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
