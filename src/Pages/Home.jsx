import React from "react";
import HeroHighlights from "../Components/Banner/HeroHighlights";
import HeroSlider from "../Components/Slider/HeroSlider";
import HowItWorks from "../Components/HowItWorks/HowItWorks";
import BMIPreviewCard from "../Components/BMIPreviewCard";
import BlogPreviewCard from "../Components/BlogPreviewCard";

const Home = () => {
  return (
    <div>
      <HeroHighlights />
      <HeroSlider />
      <div className="text-center text-4xl">This is Home</div>
      <BlogPreviewCard />
      <HowItWorks />
      <BMIPreviewCard />
    </div>
  );
};

export default Home;
