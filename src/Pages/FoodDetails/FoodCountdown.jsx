import React from "react";

const FoodCountdown = ({ isExpired, countdown }) => {
  return (
    <div
      className={`p-4 rounded-lg text-center font-semibold text-lg shadow-inner 
        ${
          isExpired
            ? "bg-red-50 text-red-600 dark:bg-red-100/10 dark:text-red-400"
            : "bg-blue-50 text-blue-700 dark:bg-blue-100/10 dark:text-blue-400"
        }`}
    >
      {isExpired ? (
        "This item has expired."
      ) : (
        <>
          Time left: {countdown.days}d : {countdown.hours}h :{" "}
          {countdown.minutes}m
        </>
      )}
    </div>
  );
};

export default FoodCountdown;
