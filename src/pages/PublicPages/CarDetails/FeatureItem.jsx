import React from 'react'

const FeatureItem = ({ feature }) => (
  <div className="flex items-center gap-3">
    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" aria-hidden="true"></div>
    <span className="text-gray-700">{feature}</span>
  </div>
);

export default FeatureItem