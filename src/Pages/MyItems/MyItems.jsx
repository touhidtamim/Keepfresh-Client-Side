import React from "react";
import MyItemsIntro from "./MyItemsIntro";
import ActionNotice from "../../Components/ActionNotice";

const MyItems = () => {
  return (
    <>
      <MyItemsIntro />
      <ActionNotice
        message="Don't forget to check your fridge items!"
        subMessage="Make sure nothing goes to waste."
        linkText="Go to Fridge"
        linkTo="/fridge"
      />
    </>
  );
};

export default MyItems;
