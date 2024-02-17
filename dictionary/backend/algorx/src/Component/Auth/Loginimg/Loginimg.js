import React from "react";
import Logo from "../../../Assets/images/logo.png";
import Loginimage from "../../../Assets/images/loginimg.png";

const Loginimg = () => {
  return (
    <>
      <div className="loginimg">
        <div className="loginimglogo">
          <img src={Logo} alt="" />
        </div>
        <div className="headinglogin">
          <h3>FRICTION FREE HEALTHCARE</h3>
        </div>
        <div className="logindetails">
          <img src={Loginimage} alt="" />
          <p>Sign up and get treated today</p>
        </div>
      </div>
    </>
  );
};

export default Loginimg;
