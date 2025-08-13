import React from "react";
import { HashLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <HashLoader color="#2f8db5" size={80} />
    </div>
  );
};

export default Spinner;
