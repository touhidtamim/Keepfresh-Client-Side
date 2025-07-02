import React from "react";
import FridgeIntro from "./FridgeIntro";
import ActionNotice from "../../Components/ActionNotice";
import ShowAllItems from "./ShowAllItems";

const Fridge = () => {
  return (
    <>
      <FridgeIntro />

      <ShowAllItems />

      <ActionNotice
        message="Want to review your expired food items?"
        subMessage="Go to your dashboard to see what's no longer fresh."
        linkText="Check Expired"
        linkTo="/dashboard/expired-items"
      />
    </>
  );
};

export default Fridge;
