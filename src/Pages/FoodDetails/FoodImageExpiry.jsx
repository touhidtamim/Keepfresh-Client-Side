import React from "react";

const FoodImageExpiry = ({ foodImage, foodTitle, isExpired }) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      <img
        src={
          foodImage ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
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
