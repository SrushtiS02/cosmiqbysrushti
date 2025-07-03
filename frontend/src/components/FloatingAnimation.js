import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/space-float.json";
import "./FloatingAnimation.css";

const FloatingAnimation = () => {
  return (
    <div className="floating-animation">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default FloatingAnimation;
