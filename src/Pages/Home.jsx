import React from "react";
import HeroHighlights from "../Components/HeroHighlights";
import HeroStory from "../Components/HeroStory";
import HeroSlider from "../Components/HeroSlider";

const Home = () => {
  return (
    <div>
      <HeroHighlights />
      <HeroStory />
      <HeroSlider />
      This is Home
    </div>
  );
};

export default Home;
