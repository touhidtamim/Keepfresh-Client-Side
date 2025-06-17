import React from "react";
import AddFoodIntro from "./AddFoodIntro";
import ActionNotice from "./../../Components/ActionNotice";
import CreateNewItem from "./CreateNewItem";

const AddFood = () => {
  return (
    <>
      <AddFoodIntro />
      <CreateNewItem />
      <ActionNotice
        message="Want to check or update your saved foods?"
        subMessage="Click the button to view your food list."
        linkText="View All"
        linkTo="/my-items"
      />
    </>
  );
};

export default AddFood;
