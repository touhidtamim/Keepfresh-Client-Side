import React from "react";

const FoodBasicInfo = ({ category, quantity, expiryDate, userEmail }) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
      <p>
        <span className="font-semibold text-gray-800 dark:text-gray-100">
          Category:
        </span>{" "}
        {category}
      </p>
      <p>
        <span className="font-semibold text-gray-800 dark:text-gray-100">
          Quantity:
        </span>{" "}
        {quantity}
      </p>
      <p>
        <span className="font-semibold text-gray-800 dark:text-gray-100">
          Expiry Date:
        </span>{" "}
        {new Date(expiryDate).toLocaleDateString()}
      </p>
      <p className="truncate" title={userEmail}>
        <span className="font-semibold text-gray-800 dark:text-gray-100">
          Added By:
        </span>{" "}
        {userEmail}
      </p>
    </div>
  );
};

export default FoodBasicInfo;
