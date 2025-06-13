import React from "react";
import { HashLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <HashLoader color="#1aa588" size={80} />
    </div>
  );
};

export default Spinner;
