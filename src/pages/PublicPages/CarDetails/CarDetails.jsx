import {React,useState} from "react";
import { Link } from "react-router-dom";
import { useParams} from "react-router-dom";
import { Gauge,Calendar,Fuel,Settings,ChevronLeft, Heart, Share2, Phone, MessageSquare, MapPin } from "lucide-react"; 
import {SAMPLE_CAR_DATA} from "../../../data/carDetailsData"
import SpecCard from "./SpecCard";
import ImageThumbnail from "./ImageThumbnail";
import FeatureItem from "./FeatureItem";

const CarDetails = ({ 
  carData = SAMPLE_CAR_DATA,
  onCallSeller,
  onWhatsApp,
  onTestDrive,
  onShare,
  onToggleFavorite
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const { id } = useParams(); // Gets the ID from URL
  console.log("Car ID from URL:", id); // Debug

  const handleImageError = (index) => {
    console.error(`Failed to load image at index ${index}`);
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const handleFavoriteToggle = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    console.log(`Favorite toggled: ${newFavoriteState}`);
    if (onToggleFavorite) onToggleFavorite(carData.id, newFavoriteState);
  };

  const handleShare = () => {
    console.log(`Share car: ${carData.name}`);
    if (onShare) {
      onShare(carData);
    } else if (navigator.share) {
      navigator.share({
        title: carData.name,
        text: `Check out this ${carData.name} for ${carData.price}`,
        url: window.location.href,
      }).catch(() => console.log('Share cancelled'));
    }
  };

  const handleCallSeller = () => {
    console.log(`Calling seller: ${carData.seller.phone}`);
    if (onCallSeller) {
      onCallSeller(carData.seller);
    } else {
      window.location.href = `tel:${carData.seller.phone}`;
    }
  };

  const handleWhatsApp = () => {
    console.log(`WhatsApp seller: ${carData.seller.whatsapp}`);
    if (onWhatsApp) {
      onWhatsApp(carData.seller);
    } else {
      window.open(`https://wa.me/${carData.seller.whatsapp.replace(/\D/g, '')}`, '_blank');
    }
  };

  const handleTestDrive = () => {
    console.log(`Test drive requested for: ${carData.name}`);
    if (onTestDrive) onTestDrive(carData);
  };

  const specs = [
    { icon: Gauge, iconColor: "blue", label: "Mileage", value: carData.mileage },
    { icon: Calendar, iconColor: "green", label: "Year", value: carData.year },
    { icon: Fuel, iconColor: "orange", label: "Fuel Type", value: carData.fuelType },
    { icon: Settings, iconColor: "purple", label: "Transmission", value: carData.transmission },
  ];

  const specifications = [
    { label: "Body Type", value: carData.bodyType },
    { label: "Color", value: carData.color },
    { label: "Engine Size", value: carData.engineSize },
    { label: "Horsepower", value: carData.horsepower },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          to="/newCars"
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
              {imageErrors[selectedImage] ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-400">Image unavailable</p>
                </div>
              ) : (
                <img
                  src={carData.images[selectedImage]}
                  alt={`${carData.name} - Main view`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(selectedImage)}
                />
              )}

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                {carData.condition}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleFavoriteToggle}
                  className={`p-3 rounded-full backdrop-blur-sm transition-all ${
                    isFavorite
                      ? "bg-red-500 text-white"
                      : "bg-white/80 text-gray-700 hover:bg-white"
                  }`}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-all"
                  aria-label="Share this car"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {carData.images.map((image, index) => (
                <ImageThumbnail
                  key={`thumbnail-${index}`}
                  src={image}
                  alt={`${carData.name} view ${index + 1}`}
                  index={index}
                  isSelected={selectedImage === index}
                  onClick={setSelectedImage}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              {/* Title & Price */}
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {carData.name}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin className="w-4 h-4" />
                <span>{carData.location}</span>
              </div>

              <div className="text-5xl font-bold text-blue-600 mb-8">
                {carData.price}
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {specs.map((spec, index) => (
                  <SpecCard key={`spec-${index}`} {...spec} />
                ))}
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3 mb-8">
                <button 
                  onClick={handleCallSeller}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Seller
                </button>
                <button 
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp
                </button>
                <button 
                  onClick={handleTestDrive}
                  className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 rounded-xl transition-colors"
                >
                  Request Test Drive
                </button>
              </div>

              {/* Seller Info */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Sold by</p>
                <p className="font-semibold text-gray-900 text-lg">
                  {carData.seller.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Description */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {carData.description}
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {specifications.map((spec, index) => (
                <div 
                  key={`specification-${index}`}
                  className="flex justify-between py-3 border-b border-gray-200"
                >
                  <span className="text-gray-600">{spec.label}</span>
                  <span className="font-semibold text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <div className="space-y-3">
              {carData.features.map((feature, index) => (
                <FeatureItem key={`feature-${index}`} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;