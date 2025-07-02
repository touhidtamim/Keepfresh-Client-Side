import React from "react";
import BlogList from "./BlogList";
import ActionNotice from "../../Components/ActionNotice";

const Blog = () => {
  return (
    <div>
      <BlogList />
      <ActionNotice
        message="Ready to take action?"
        subMessage="Use what you learned — start tracking your food now."
        linkText="Add Your Food"
        linkTo="/dashboard/add-foods"
      />
    </div>
  );
};

export default Blog;
