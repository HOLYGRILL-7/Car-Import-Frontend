import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Gauge,
  Calendar,
  Fuel,
  Cog,
  Car,
  Palette,
  Wrench,
  Zap,
  ChevronLeft,
  Share2,
  Phone,
  MessageSquare,
} from "lucide-react";
import { useCar } from "../../../hooks/useCar";
import { formatPrice } from "../../../utils/formatPrice";
import { WHATSAPP_NUMBER, openWhatsApp } from "../../../constants/contact";
import SpecCard from "./SpecCard";
import ImageThumbnail from "./ImageThumbnail";
import SaveButton from "../../../components/Cars/SaveButton";
import CarDetailsSkeleton from "../../../components/Skeleton/CarDetailsSkeleton";

const hasValue = (value) =>
  value !== undefined && value !== null && String(value).trim() !== "";

const CarDetailsContent = ({ id, onShare }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const { car, loading, error } = useCar(id);

  if (loading) {
    return <CarDetailsSkeleton />;
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600">
          {error
            ? "Couldn't load this car right now. Please try again later."
            : "This car could not be found."}
        </p>
        <Link
          to="/newCars"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Listings
        </Link>
      </div>
    );
  }

  const imageUrls = car.imageUrls ?? [];
  const price = formatPrice(car.price);
  const listingsPath = car.type === "used" ? "/usedCars" : "/newCars";

  const handleImageError = (index) => {
    console.error(`Failed to load image at index ${index}`);
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const handleShare = () => {
    if (onShare) {
      onShare(car);
    } else if (navigator.share) {
      navigator
        .share({
          title: car.name,
          text: `Check out this ${car.name} for ${price}`,
          url: window.location.href,
        })
        .catch(() => console.log("Share cancelled"));
    }
  };

  const handleCallSeller = () => {
    window.location.href = `tel:+${WHATSAPP_NUMBER}`;
  };

  // Specs a car doesn't have are left out rather than shown blank.
  const specs = [
    { icon: Gauge, iconColor: "blue", label: "Mileage", value: car.mileage },
    { icon: Calendar, iconColor: "green", label: "Year", value: car.year },
    { icon: Fuel, iconColor: "orange", label: "Fuel Type", value: car.fuelType },
    { icon: Cog, iconColor: "purple", label: "Transmission", value: car.transmission },
    { icon: Car, iconColor: "blue", label: "Body Type", value: car.bodyType },
    { icon: Palette, iconColor: "green", label: "Color", value: car.color },
    { icon: Wrench, iconColor: "orange", label: "Engine Size", value: car.engineSize },
    { icon: Zap, iconColor: "purple", label: "Horsepower", value: car.horsepower },
  ].filter((spec) => hasValue(spec.value));

  return (
    <div className="min-h-screen bg-gray-50 pt-20 fade-in">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          to={listingsPath}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Listings
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg mb-4 h-96">
              {imageErrors[selectedImage] || !imageUrls[selectedImage] ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-400">Image unavailable</p>
                </div>
              ) : (
                <img
                  src={imageUrls[selectedImage]}
                  alt={`${car.name} - Main view`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(selectedImage)}
                />
              )}

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                {car.type === "new" ? "New" : "Used"}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <SaveButton carId={car.id} variant="details" />
                <button
                  onClick={handleShare}
                  className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-all"
                  aria-label="Share this car"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images (a single photo needs no thumbnail strip) */}
            {imageUrls.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {imageUrls.map((image, index) => (
                  <ImageThumbnail
                    key={`thumbnail-${index}`}
                    src={image}
                    alt={`${car.name} view ${index + 1}`}
                    index={index}
                    isSelected={selectedImage === index}
                    onClick={setSelectedImage}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              {/* Title & Price */}
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {car.name}
              </h1>

              <div className="text-5xl font-bold text-blue-600 mb-8">
                {price}
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {specs.map((spec) => (
                  <SpecCard key={spec.label} {...spec} />
                ))}
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCallSeller}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Seller
                </button>
                <button
                  onClick={() => openWhatsApp(car.name)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed">{car.description}</p>
        </div>
      </div>
    </div>
  );
};

// Keyed by the route id so gallery state (selected photo, failed images)
// never carries over from one car to the next.
const CarDetails = (props) => {
  const { id } = useParams();
  return <CarDetailsContent key={id} id={id} {...props} />;
};

export default CarDetails;
