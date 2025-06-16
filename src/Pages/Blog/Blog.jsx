import React from "react";
import BlogList from "./BlogList";
import BlogIntro from "./BlogIntro";
import ActionNotice from "../../Components/ActionNotice";

const Blog = () => {
  return (
    <div>
      <BlogIntro />
      <BlogList />
      <ActionNotice
        message="Ready to take action?"
        subMessage="Use what you learned — start tracking your food now."
        linkText="Add Your Food"
        linkTo="/add-food"
      />
    </div>
  );
};

export default Blog;
