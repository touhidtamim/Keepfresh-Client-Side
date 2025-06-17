import React from "react";

const FoodCountdown = ({ isExpired, countdown }) => {
  return (
    <div
      className={`p-4 rounded-lg text-center font-semibold text-lg shadow-inner ${
        isExpired ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-700"
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
