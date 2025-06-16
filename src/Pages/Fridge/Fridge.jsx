import React from "react";
import FridgeIntro from "./FridgeIntro";
import ActionNotice from "../../Components/ActionNotice";

const Fridge = () => {
  return (
    <>
      <FridgeIntro />
      <h1>Fridge</h1>
      <ActionNotice
        message="Want to review your expired food items?"
        subMessage="Go to your dashboard to see what's no longer fresh."
        linkText="Check Expired"
        linkTo="/dashboard"
      />
    </>
  );
};

export default Fridge;
