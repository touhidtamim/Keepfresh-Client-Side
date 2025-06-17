import React from "react";

const FoodImageExpiry = ({ foodImage, foodTitle, isExpired }) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      <img
        src={
          foodImage ||
          "https://i.postimg.cc/3xQgzDmK/800px-Image-not-available.png"
        }
        alt={foodTitle}
        className="w-full h-72 object-cover"
      />
      <div
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white font-semibold shadow ${
          isExpired ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isExpired ? "EXPIRED" : "FRESH"}
      </div>
    </div>
  );
};

export default FoodImageExpiry;
