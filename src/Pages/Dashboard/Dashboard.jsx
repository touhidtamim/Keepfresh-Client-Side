import React from "react";
import BMICalculator from "./BMICalculator";
import ProfileCard from "./ProfileCard";
import DashboardIntro from "./DashboardIntro";

const Dashboard = () => {
  return (
    <div>
      <DashboardIntro />
      <ProfileCard />
      <BMICalculator></BMICalculator>
    </div>
  );
};

export default Dashboard;
