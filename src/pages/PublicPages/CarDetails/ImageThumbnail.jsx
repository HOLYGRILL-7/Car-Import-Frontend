import React from 'react'

const ImageThumbnail = ({ src, alt, index, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(index)}
      className={`rounded-lg overflow-hidden h-24 transition-all ${
        isSelected
          ? "ring-4 ring-blue-600 scale-105"
          : "ring-2 ring-gray-200 hover:ring-gray-300"
      }`}
      aria-label={`View image ${index + 1}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </button>
  );
};

export default ImageThumbnail