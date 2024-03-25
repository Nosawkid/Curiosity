import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/Homeog.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container" id="home">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="" className="homeImage" />

        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Fuel Your Passion: Dive into Learning Adventures with Curiosity
          </h1>
          <p className="primary-text">
          Discover endless learning and career opportunities with Curiosity. Explore courses, expand knowledge, and unlock new paths through our hiring portal.
          </p>
         <a href="#signup" style={{textDecoration:"none"}}>
         <button className="secondary-button">
            Sign Up <FiArrowRight />{" "}
          </button>
         </a>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
