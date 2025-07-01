import React from "react";
import HeroHighlights from "./../../Components/Banner/HeroHighlights";
import HeroSlider from "./../../Components/Slider/HeroSlider";
import BlogPreviewCard from "./BlogPreviewCard";
import HowItWorks from "./../../Components/HowItWorks/HowItWorks";
import BMIPreviewCard from "./BMIPreviewCard";
import ExpiredItems from "./ExpiredItems";
import NearlyExpiryItems from "./NearlyExpiryItems";

const Home = () => {
  return (
    <div>
      {/* <HeroHighlights /> */}
      <HeroSlider />
      <NearlyExpiryItems />
      <ExpiredItems />
      <BlogPreviewCard />
      <HowItWorks />
      <BMIPreviewCard />
    </div>
  );
};

export default Home;
