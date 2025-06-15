import React from "react";
import BMICalculator from "./BMICalculator";
import ProfileCard from "./ProfileCard";

const Dashboard = () => {
  return (
    <div>
      <ProfileCard />
      <BMICalculator></BMICalculator>
    </div>
  );
};

export default Dashboard;
