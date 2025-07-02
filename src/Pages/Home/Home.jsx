import React from "react";
import BlogPreview from "./BlogPreview";
import HowItWorks from "./../../Components/HowItWorks/HowItWorks";
import ExpiredItems from "./ExpiredItems";
import NearlyExpiryItems from "./NearlyExpiryItems";
import Carousel from "../../Components/Slider/Carousel";
import ImpactHighlights from "./ImpactHighlights";
import ResourceCenter from "./ResourceCenter";
import ConsultationBooking from "./ConsultationBooking";

const Home = () => {
  return (
    <div>
      <Carousel />
      <NearlyExpiryItems />
      <ExpiredItems />
      <BlogPreview />
      <HowItWorks />
      <ImpactHighlights />
      <ResourceCenter />
      <ConsultationBooking />
    </div>
  );
};

export default Home;
