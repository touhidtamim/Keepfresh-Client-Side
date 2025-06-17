import React from "react";
import BMICalculator from "./BMICalculator";
import ProfileCard from "./ProfileCard";
import DashboardIntro from "./DashboardIntro";
import ActionNotice from "../../Components/ActionNotice";
import ExpiredItems from "../Home/ExpiredItems";

const Dashboard = () => {
  return (
    <>
      <DashboardIntro />
      <div id="profile">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-600 text-center py-4 md:py-6 lg:py-8">
          Your Profile
        </h1>
        <ProfileCard />
      </div>
      <ExpiredItems />
      <ActionNotice
        message="Want to reduce food waste in the future?"
        subMessage="Explore helpful tips and guides on our blog."
        linkText="Visit Blog"
        linkTo="/blog"
      />
      <div id="bmi">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-600 text-center py-4 md:py-6 lg:py-8 ">
          Track Your BMI
        </h1>
        <BMICalculator></BMICalculator>
      </div>
    </>
  );
};

export default Dashboard;
