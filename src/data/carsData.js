import {
  Car,
  DollarSign,
  Truck,
  Wrench,
  Package,
  Award,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";

// Car brand logos
import Toyota from "../assets/CarLogo/Toyota.png";
import Kia from "../assets/CarLogo/KIA.png";
import Nissan from "../assets/CarLogo/Nissan.png";
import Daewoo from "../assets/CarLogo/Daewoo.png";
import Chev from "../assets/CarLogo/chev.png";

// Car Brands
export const carBrands = [
  { id: 1, logo: Toyota, name: "Toyota" },
  { id: 2, logo: Kia, name: "Kia" },
  { id: 3, logo: Daewoo, name: "Daewoo" },
  { id: 4, logo: Nissan, name: "Nissan" },
  { id: 5, logo: Chev, name: "Chevrolet" },
];

// Services page cards
export const services = [
  {
    id: 1,
    icon: Car,
    title: "Buy Your Dream Car",
    whatsappMessage:
      "Hi, I'm interested in buying a car. What do you have available?",
    description:
      "Browse the new and used cars we have in stock, each with photos and full details. Found one you like? Contact us by phone or WhatsApp to buy it.",
    features: [
      "New and used cars, updated as stock arrives",
      "Photos and full details on every listing",
      "Save your favourites to a wishlist",
      "Buy by phone or WhatsApp, no online checkout",
    ],
    color: "from-bg-accent to bg-accent-light",
  },
  {
    id: 2,
    icon: DollarSign,
    title: "Sell Through Us",
    whatsappMessage:
      "Hi, I'd like to know more about selling my car through you.",
    description:
      "We don't buy your car ourselves. Instead we act as a trusted middleman, connecting sellers with interested buyers. It's a brokering service, and we focus especially on Korean-make cars.",
    features: [
      "We connect you with interested buyers",
      "A trusted middleman between seller and buyer",
      "Especially suited to Korean-make cars",
      "A brokering service, not an instant cash offer",
    ],
    color: "from-bg-secondary to bg-secondary-light",
  },
  {
    id: 3,
    icon: Truck,
    title: "Vehicle Sourcing & Import",
    whatsappMessage: "Hi, I'm looking to import a vehicle. Can you help?",
    description:
      "Can't find the car you want in our stock? Tell us the make, model and budget, and we'll source it and bring it in for you through our import process.",
    features: [
      "Sourced to your make, model and budget",
      "Overseas shipping arranged for you",
      "Guidance through import paperwork and customs",
      "Room for household goods in the same container, when available",
    ],
    color: "from-bg-primary-dark to bg-primary",
  },
  {
    id: 4,
    icon: Wrench,
    title: "Service & Maintenance",
    whatsappMessage:
      "Hi, I'd like to know more about your service and maintenance.",
    description:
      "We have our own mechanics and a garage, so servicing and repairs can be handled in one place. Get in touch to book your vehicle in.",
    features: [
      "Our own in-house mechanics",
      "Our own garage",
      "Routine servicing and repairs",
      "Book by phone or WhatsApp",
    ],
    color: "from-bg-neutral to bg-neutral-dark",
  },
  {
    id: 5,
    icon: Package,
    title: "Container Space Available",
    whatsappMessage:
      "Hi, I have a question about shipping household items in a container.",
    description:
      "When we ship a vehicle, its container sometimes has room to spare. If it does, household goods such as furniture and mattresses can travel in it alongside the car. This isn't a freight or cargo business, just spare space when there is some.",
    features: [
      "Furniture, mattresses and other household goods",
      "Only when there's spare room in a vehicle's container",
      "Availability varies with each shipment",
      "Ask us about space when a vehicle is shipping",
    ],
    color: "from-bg-accent to bg-accent-dark",
  },
  {
    id: 6,
    icon: Truck,
    title: "Home Delivery",
    whatsappMessage: "Hi, I'd like to know more about home delivery.",
    description:
      "We plan to deliver purchased cars straight to your door. It's a planned service that isn't fully available yet, so ask us what we can arrange for your purchase.",
    features: [
      "Delivered to your address instead of you collecting",
      "A planned service, not yet standard",
      "Ask us what can be arranged today",
      "Talk to us before you buy",
    ],
    color: "from-bg-secondary to bg-secondary-light",
  },
];

// Why Choose Us
export const whyChooseUs = [
  {
    id: 1,
    icon: Award,
    title: "10+ Years Experience",
    desc: "Industry-leading expertise",
  },
  {
    id: 2,
    icon: Shield,
    title: "100% Certified Cars",
    desc: "Rigorous quality checks",
  },
  {
    id: 3,
    icon: Clock,
    title: "Open Daily, 8am-8pm",
    desc: "Always here to help",
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Best Price Guarantee",
    desc: "Unbeatable value",
  },
];
