import React from "react";
import PickMeals from "../Assets/User.png";
import ChooseMeals from "../Assets/Ins.png";
import DeliveryMeals from "../Assets/Hirer.webp";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Work = () => {
  const navigate = useNavigate()
 
  return (
    <div className="work-section-wrapper" id="signup">
      <div className="work-section-top">
        <p className="primary-subheading">Join Us</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        Find Top Talent at Curiosity: Connect with skilled professionals ready to contribute to your team's success
        </p>
      </div>
      <div className="work-section-bottom">
        
          <div  className="work-section-info">
            <div style={{height:"100px"}} className="info-boxes-img-container">
              <img style={{width:"100px",height:"100px"}} src={PickMeals} alt="" />
            </div>
            <h2>User</h2>
            <p>Join Curiosity: Explore, Learn, Thrive. Dive into a world of endless knowledge and opportunities tailored just for you.</p>
            <a href="#user">
            <Button onClick={()=>navigate("/userreg")} variant="outlined">Sign Up</Button>
            </a>
          </div>
          <div   className="work-section-info">
            <div style={{height:"100px"}} className="info-boxes-img-container">
              <img style={{width:"100px",height:"100px"}} src={ChooseMeals} alt="" />
            </div>
            <h2>Instructor</h2>
            <p>Inspire at Curiosity: Teach, Empower, Earn. Join us to share your expertise, inspire others, and earn rewards.</p>
            <a href="#ins">
            <Button onClick={()=>navigate("/instructorreg")} variant="outlined">Sign Up</Button>
            </a>
          </div>
          <div  className="work-section-info">
            <div style={{height:"100px"}} className="info-boxes-img-container">
              <img style={{width:"100px",height:"100px"}} src={DeliveryMeals} alt="" />
            </div>
            <h2>Hirer</h2>
            <p>Discover Top Talent: Connect with skilled professionals at Curiosity.</p>
            <a href="#hirer">
            <Button onClick={()=>navigate("/hirerreg")} variant="outlined">Sign Up</Button>
            </a>
          </div>
       
      </div>
    </div>
  );
};

export default Work;
