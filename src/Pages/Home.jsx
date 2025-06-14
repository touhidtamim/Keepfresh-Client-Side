import React from "react";
import HeroHighlights from "../Components/HeroHighlights";
import HeroSlider from "../Components/Slider/HeroSlider";

const Home = () => {
  return (
    <div>
      <HeroHighlights />
      <HeroSlider />
      <div className="text-center text-4xl">This is Home</div>
    </div>
  );
};

export default Home;
