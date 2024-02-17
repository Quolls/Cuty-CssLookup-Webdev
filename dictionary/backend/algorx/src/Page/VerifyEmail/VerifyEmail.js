import React from "react";
import Logo from "../../Assets/images/logo.png";
import Verify_Email from "../../Assets/images/Verify_Email.png";
import { useNavigate } from "react-router-dom";

// veryfy email screen
const VerifyEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="loginimg">
      <div className="loginimglogo">
        <img src={Logo} alt="" />
      </div>
      <div
        className="headinglogin verify_login"
        style={{
          height: "90.5vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img src={Verify_Email} alt="" style={{ width: "400px" }} />
        <h1 className="verify_email_text text-center mx-5">
          Thank you for registering your account, we’ve sent you an email to
          verify your account. Once verified you’ll be able to access your user
          dashboard for updates.
        </h1>
        <button
          className="verify_email_button"
          onClick={() => navigate("/login")}
        >
          Back to login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
