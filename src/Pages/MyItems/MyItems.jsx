import React from "react";
import MyItemsIntro from "./MyItemsIntro";
import ActionNotice from "../../Components/ActionNotice";
import AllMyItems from "./AllMyItem";

const MyItems = () => {
  return (
    <>
      <MyItemsIntro />
      <AllMyItems />
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
