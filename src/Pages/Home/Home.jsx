import React from "react";
import BlogPreview from "./BlogPreview";
import HowItWorks from "./../../Components/HowItWorks/HowItWorks";
import ExpiredItems from "./ExpiredItems";
import NearlyExpiryItems from "./NearlyExpiryItems";
import Carousel from "../../Components/Slider/Carousel";
import ConsultationBooking from "./ConsultationBooking";
import WhyKeepFresh from "../../Components/WhyKeepFresh/WhykeepFresh";
import FeatureTimeline from "../../Components/FeatureTimeLine/FeatureTimeLine";
import ResourcesAndImpact from "../../Components/ResourcesAndImpact/ResourcesAndImpact";

const Home = () => {
  return (
    <>
      <div className="pt-5 md:pt-0">
        <Carousel />
      </div>
      <WhyKeepFresh />
      <HowItWorks />
      <FeatureTimeline />
      <ResourcesAndImpact />
      {/* <NearlyExpiryItems />
      <ExpiredItems /> */}
      <BlogPreview />
      <ConsultationBooking />
    </>
  );
};

export default Home;
