// data/carData.js
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
  Trophy,
  Star,
  Calendar,
  ArrowRight,
} from "lucide-react";

// Import images
import audi_silver from "../assets/New Arrivals/Audi-silver.jpg";
import audi_white from "../assets/New Arrivals/Audi-white.jpg";
import audi_dark from "../assets/New Arrivals/audi-dark.jpg";
import benz_black from "../assets/New Arrivals/benz-black.jpg";
import bmw_white from "../assets/New Arrivals/bmw-white.jpg";
import ram_black from "../assets/New Arrivals/Ram-black.jpg";
import romeo_black from "../assets/New Arrivals/romeo-black.jpg";
import rover_black from "../assets/New Arrivals/rover-black.jpg";
import range_silver from "../assets/New Arrivals/range-silver.jpg";

import suv from "../assets/CarTypes/suv1.png";
import hatch from "../assets/CarTypes/hatch.png";
import saloon from "../assets/CarTypes/saloon-hand.png";
import mini_truck from "../assets/CarTypes/mini-truck.png";
import big_truck from "../assets/CarTypes/big-truck.png";

import Toyota from "../assets/CarLogo/toyota.png";
import Kia from "../assets/CarLogo/KIA.png";
import Nissan from "../assets/CarLogo/Nissan.png";
import Daewoo from "../assets/CarLogo/Daewoo.png";
import Chev from "../assets/CarLogo/chev.png";

import Lexus from "../assets/CarOfTheYear/Lexus.jpg";
import Mazda from "../assets/CarOfTheYear/Mazda.jpg";
import Tahoe from "../assets/CarOfTheYear/ChevTahoe.jpg";

import fire_flame from "../assets/Icons/fire-flame.png";

// New Arrivals
export const newArrivals = [
  {
    id: 1,
    image: audi_silver,
    name: "Audi A8",
    price: "$85,000",
    year: "2024",
  },
  { id: 2, image: audi_white, name: "Audi Q7", price: "$72,000", year: "2024" },
  {
    id: 3,
    image: benz_black,
    name: "Mercedes-Benz S-Class",
    price: "$95,000",
    year: "2024",
  },
  { id: 4, image: bmw_white, name: "BMW X5", price: "$78,000", year: "2024" },
  { id: 5, image: audi_dark, name: "Audi A6", price: "$68,000", year: "2024" },
  {
    id: 6,
    image: ram_black,
    name: "RAM 1500 Limited",
    price: "$72,000",
    year: "2024",
  },
  {
    id: 7,
    image: romeo_black,
    name: "Alfa Romeo Giulia",
    price: "$65,000",
    year: "2024",
  },
  {
    id: 8,
    image: rover_black,
    name: "Range Rover Sport",
    price: "$98,000",
    year: "2024",
  },
  {
    id: 9,
    image: range_silver,
    name: "Range Rover Evoque",
    price: "$82,000",
    year: "2024",
  },
];

// Car Types
export const carTypes = [
  { id: 1, image: suv, name: "SUVs", link: "/cars/suv" },
  { id: 2, image: hatch, name: "Hatchback", link: "/cars/hatchback" },
  { id: 3, image: saloon, name: "Saloon", link: "/cars/saloon" },
  { id: 4, image: mini_truck, name: "Mini Truck", link: "/cars/mini-truck" },
  { id: 5, image: big_truck, name: "Big Truck", link: "/cars/big-truck" },
];

// Car Brands
export const carBrands = [
  { id: 1, logo: Toyota, name: "Toyota" },
  { id: 2, logo: Kia, name: "Kia" },
  { id: 3, logo: Daewoo, name: "Daewoo" },
  { id: 4, logo: Nissan, name: "Nissan" },
  { id: 5, logo: Chev, name: "Chevrolet" },
];

// Popular Used Cars
export const popularUsedBrands = [
  { id: 1, name: "Used Toyota Corolla" },
  { id: 2, name: "Used Kia Sportage" },
  { id: 3, name: "Used Honda Civic" },
  { id: 4, name: "Used Nissan Rogue" },
  { id: 5, name: "Used Chevrolet Equinox" },
  { id: 6, name: "Used Toyota RAV4" },
  { id: 7, name: "Used Honda CR-V" },
  { id: 8, name: "Used Ford F-150" },
  { id: 9, name: "Used Toyota Camry" },
  { id: 10, name: "Used Mazda CX-5" },
  { id: 11, name: "Used Hyundai Tucson" },
  { id: 12, name: "Used Nissan Altima" },
  { id: 13, name: "Used Subaru Outback" },
  { id: 14, name: "Used Kia Sorento" },
  { id: 15, name: "Used Jeep Wrangler" },
  { id: 16, name: "Used BMW 3 Series" },
  { id: 17, name: "Used Mercedes-Benz C-Class" },
  { id: 18, name: "Used Audi Q5" },
  { id: 19, name: "Used Tesla Model 3" },
  { id: 20, name: "Used Chevrolet Silverado" },
];

// Icons/Assets
export const icons = {
  fireFlame: fire_flame,
};

// New Cars
export const usedCars = [
  {
    id: 1,
    image: audi_silver,
    name: "Audi A8",
    price: "$85,000",
    year: "2024",
    mileage: "5,000 km",
    description: "Luxury sedan...",
  },
  {
    id: 2,
    image: audi_white,
    name: "Audi Q7",
    price: "$72,000",
    year: "2024",
    mileage: "3,200 km",
    description: "Spacious 7-seater SUV...",
  },
  {
    id: 3,
    image: benz_black,
    name: "Mercedes-Benz S-Class",
    price: "$95,000",
    year: "2024",
    mileage: "2,800 km",
    description: "The pinnacle of luxury...",
  },
  {
    id: 4,
    image: bmw_white,
    name: "BMW X5",
    price: "$78,000",
    year: "2024",
    mileage: "4,500 km",
    description: "Dynamic SUV combining sporty...",
  },
  {
    id: 5,
    image: audi_dark,
    name: "Audi A6",
    price: "$68,000",
    year: "2024",
    mileage: "6,200 km",
    description: "Executive sedan with sleek design...",
  },
  {
    id: 6,
    image: ram_black,
    name: "RAM 1500 Limited",
    price: "$72,000",
    year: "2024",
    mileage: "7,800 km",
    description: "Premium full-size pickup...",
  },
  {
    id: 7,
    image: romeo_black,
    name: "Alfa Romeo Giulia",
    price: "$65,000",
    year: "2024",
    mileage: "3,500 km",
    description: "Italian sports sedan delivering...",
  },
  {
    id: 8,
    image: rover_black,
    name: "Range Rover Sport",
    price: "$98,000",
    year: "2024",
    mileage: "2,100 km",
    description: "Luxury performance SUV...",
  },
  {
    id: 9,
    image: range_silver,
    name: "Range Rover Evoque",
    price: "$82,000",
    year: "2024",
    mileage: "4,800 km",
    description: "Compact luxury SUV with distinctive design...",
  },
];

export const newCars = [
  {
    id: 1,
    image: audi_silver,
    name: "Audi A8",
    price: "$85,000",
    year: "2024",
    mileage: "5,000 km",
    description:
      "Luxury sedan with premium leather interior, advanced driver assistance, and powerful V6 engine. Experience ultimate comfort and performance.",
  },
  {
    id: 2,
    image: audi_white,
    name: "Audi Q7",
    price: "$72,000",
    year: "2024",
    mileage: "3,200 km",
    description:
      "Spacious 7-seater SUV with Quattro all-wheel drive, panoramic sunroof, and cutting-edge technology. Perfect for families seeking luxury.",
  },
  {
    id: 3,
    image: benz_black,
    name: "Mercedes-Benz S-Class",
    price: "$95,000",
    year: "2024",
    mileage: "2,800 km",
    description:
      "The pinnacle of automotive luxury. Features massage seats, ambient lighting, and a sophisticated hybrid powertrain for effortless driving.",
  },
  {
    id: 4,
    image: bmw_white,
    name: "BMW X5",
    price: "$78,000",
    year: "2024",
    mileage: "4,500 km",
    description:
      "Dynamic SUV combining sporty handling with premium comfort. Equipped with xDrive, gesture control, and adaptive suspension.",
  },
  {
    id: 5,
    image: audi_dark,
    name: "Audi A6",
    price: "$68,000",
    year: "2024",
    mileage: "6,200 km",
    description:
      "Executive sedan with sleek design, virtual cockpit, and mild-hybrid technology. Refined performance meets exceptional efficiency.",
  },
  {
    id: 6,
    image: ram_black,
    name: "RAM 1500 Limited",
    price: "$72,000",
    year: "2024",
    mileage: "7,800 km",
    description:
      "Premium full-size pickup with best-in-class towing capacity, luxurious cabin, and advanced air suspension for smooth rides.",
  },
  {
    id: 7,
    image: romeo_black,
    name: "Alfa Romeo Giulia",
    price: "$65,000",
    year: "2024",
    mileage: "3,500 km",
    description:
      "Italian sports sedan delivering thrilling performance with rear-wheel drive, turbocharged engine, and race-inspired handling dynamics.",
  },
  {
    id: 8,
    image: rover_black,
    name: "Range Rover Sport",
    price: "$98,000",
    year: "2024",
    mileage: "2,100 km",
    description:
      "Luxury performance SUV with terrain response system, premium Meridian audio, and commanding presence on any road.",
  },
  {
    id: 9,
    image: range_silver,
    name: "Range Rover Evoque",
    price: "$82,000",
    year: "2024",
    mileage: "4,800 km",
    description:
      "Compact luxury SUV with distinctive design, innovative ClearSight technology, and efficient mild-hybrid powertrain.",
  },
];

// Services (icon as component, not JSX)
export const services = [
  {
    id: 1,
    icon: Car,
    title: "Buy Your Dream Car",
    description: "Browse our extensive inventory...",
    features: [
      "1000+ vehicles in stock",
      "Competitive pricing",
      "Quality guaranteed",
      "Virtual showroom tours",
    ],
    color: "from-bg-accent to bg-accent-light",
  },
  {
    id: 2,
    icon: DollarSign,
    title: "Sell Your Car Fast",
    description: "Get the best value...",
    features: [
      "Free instant valuation",
      "Same-day payment",
      "No hidden fees",
      "Pickup service available",
    ],
    color: "from-bg-secondary to bg-secondary-light",
  },
  {
    id: 3,
    icon: Truck,
    title: "Vehicle Sourcing & Import",
    description: "Can't find your dream car...",
    features: [
      "Global vehicle sourcing",
      "International shipping handled",
      "Full import documentation",
      "Door-to-door delivery",
    ],
    color: "from-bg-primary-dark to bg-primary",
  },
  {
    id: 4,
    icon: Wrench,
    title: "Service & Maintenance",
    description: "Keep your vehicle running...",
    features: [
      "Certified technicians",
      "Genuine parts",
      "Flexible scheduling",
      "Loaner vehicles available",
    ],
    color: "from-bg-neutral to bg-neutral-dark",
  },
  {
    id: 5,
    icon: Package,
    title: "General Cargo Shipping",
    description: "Beyond vehicles—we ship machinery...",
    features: [
      "Heavy machinery transport",
      "Container shipping options",
      "Customs clearance assistance",
      "Competitive freight rates",
    ],
    color: "from-bg-accent to bg-accent-dark",
  },
  {
    id: 6,
    icon: Truck,
    title: "Home Delivery",
    description: "Your dream car delivered...",
    features: [
      "Free local delivery",
      "Contactless process",
      "Complete documentation",
      "Virtual handover available",
    ],
    color: "from-bg-secondary to bg-secondary-light",
  },
];

// Why Choose Us
export const whyChooseUs = [
  {
    id: 1,
    icon: Award,
    title: "20+ Years Experience",
    desc: "Industry-leading expertise",
  },
  {
    id: 2,
    icon: Shield,
    title: "100% Certified Cars",
    desc: "Rigorous quality checks",
  },
  { id: 3, icon: Clock, title: "24/7 Support", desc: "Always here to help" },
  {
    id: 4,
    icon: CheckCircle,
    title: "Best Price Guarantee",
    desc: "Unbeatable value",
  },
];

export const winners = [
  {
    category: "Best Overall",
    car: "Lexus ES 350",
    image: Lexus,
    icon: Trophy,
    description: "Unmatched reliability and luxury combined",
  },
  {
    category: "Best Design",
    car: "Mazda CX-90",
    image: Mazda,
    icon: Star,
    description: "Stunning aesthetics meet exceptional performance",
  },
  {
    category: "Best SUV",
    car: "Chevrolet Tahoe",
    image: Tahoe,
    icon: Award,
    description: "Power, space, and capability redefined",
  },
];

export const latestReviews = [
  {
    image: Lexus,
    title: "2025 Lexus ES 350 Full Review Feedback",
    excerpt:
      "The Lexus ES 350 continues to set the standard for midsize luxury sedans with refined comfort and cutting-edge technology.",
    date: "Nov 25, 2024",
    rating: 9.2,
  },
  {
    image: Mazda,
    title: "Mazda CX-90: The Premium SUV Surprise",
    excerpt:
      "Mazda's flagship SUV impresses with upscale materials, smooth powertrain options, and that signature driving feel.",
    date: "Nov 22, 2024",
    rating: 8.8,
  },
  {
    image: Tahoe,
    title: "Chevrolet Tahoe: Family Adventure Champion",
    excerpt:
      "With massive cargo space and powerful engine options, the Tahoe remains the king of full-size SUVs for families.",
    date: "Nov 20, 2024",
    rating: 8.5,
  },
  {
    image: Lexus,
    title: "Luxury Sedan Shootout 2025",
    excerpt:
      "We compare the top luxury sedans to find which offers the best value, performance, and prestige.",
    date: "Nov 18, 2024",
    rating: 9.0,
  },
  {
    image: Mazda,
    title: "Best Three-Row SUVs of 2025",
    excerpt:
      "From budget-friendly to luxury, we rank the top three-row SUVs for families who need space without compromise.",
    date: "Nov 15, 2024",
    rating: 8.7,
  },
  {
    image: Tahoe,
    title: "Off-Road Capability Test: Full-Size SUVs",
    excerpt:
      "Taking America's largest SUVs off the beaten path to see which handles tough terrain with confidence.",
    date: "Nov 12, 2024",
    rating: 9.1,
  },
];
