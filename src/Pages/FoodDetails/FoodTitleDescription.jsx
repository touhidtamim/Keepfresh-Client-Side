import React from "react";

const FoodTitleDescription = ({ foodTitle, description }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">{foodTitle}</h2>
      <p className="text-gray-700 mt-1">
        {description || "No description available."}
      </p>
    </div>
  );
};

export default FoodTitleDescription;
