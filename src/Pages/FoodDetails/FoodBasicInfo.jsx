import React from "react";

const FoodBasicInfo = ({ category, quantity, expiryDate, userEmail }) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-gray-700">
      <p>
        <span className="font-semibold">Category:</span> {category}
      </p>
      <p>
        <span className="font-semibold">Quantity:</span> {quantity}
      </p>
      <p>
        <span className="font-semibold">Expiry Date:</span>{" "}
        {new Date(expiryDate).toLocaleDateString()}
      </p>
      <p className="truncate" title={userEmail}>
        <span className="font-semibold">Added By:</span> {userEmail}
      </p>
    </div>
  );
};

export default FoodBasicInfo;
