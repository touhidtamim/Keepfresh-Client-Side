import React from "react";
import BlogPreviewCard from "./BlogPreviewCard";
import HowItWorks from "./../../Components/HowItWorks/HowItWorks";
import BMIPreviewCard from "./BMIPreviewCard";
import ExpiredItems from "./ExpiredItems";
import NearlyExpiryItems from "./NearlyExpiryItems";
import Carousel from "../../Components/Slider/Carousel";

const Home = () => {
  return (
    <div>
      {/* <HeroHighlights /> */}
      <Carousel />

      <NearlyExpiryItems />
      <ExpiredItems />
      <BlogPreviewCard />
      <HowItWorks />
      <BMIPreviewCard />
    </div>
  );
};

export default Home;
