import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about.png";

const About = () => {
  return (
    <div id="about" className="about-section-container">
      <div className="about-background-image-container">
        <img className="homeImage" src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        Unveiling Curiosity: Our Story, Mission, and Values
        </h1>
        <p className="primary-text">
        Curiosity: Where knowledge unlocks potential. Learn at your own pace with our accessible, engaging learning experiences, all at an affordable price             </p>
        <p className="primary-text">
        Explore our story, mission, and values as we continue to innovate and empower individuals to thrive in a rapidly changing world.
        </p>
        {/* <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default About;
