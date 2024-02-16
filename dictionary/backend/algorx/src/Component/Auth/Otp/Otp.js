import "./otp.css";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import Loginimg from "../Loginimg/Loginimg.js";
import Timer from "otp-timer";
import { Row, Col } from "react-bootstrap";
import { ApiPostNoAuth } from "../../../helpers/API/API_data";
import { ErrorToast, SuccessToast } from "../../Toaster/Toaster";

const Otp = () => {
  const [otp, setOtp] = useState("");

  const [loader, setloader] = useState(false);
  let email = localStorage.getItem("userEmail");

  const handleChange = (e) => setOtp(e);
  const navigate = useNavigate();
  // submit otp reseat password
  const submit = (e) => {
    setloader(true);
    e.preventDefault();
    ApiPostNoAuth("patient/otp_verification", { otp })
      .then((res) => {
        SuccessToast(res.data.message);
        if (res.data.data?.email) {
          localStorage.setItem("id", JSON.stringify(res.data.data));
          navigate("/change-password");
        } else {
          localStorage.setItem("id", JSON.stringify(res.data.data));
          navigate("/change-password");
        }
        setloader(false);
      })
      .catch((err) => {
        ErrorToast(err.message);
        setloader(false);
      });
  };

  // resent opt on email
  const handleClick = async () => {
    let body = {
      email: localStorage.getItem("userEmail"),
    };
    await ApiPostNoAuth("patient/forgot_password", body)
      .then((res) => {
        SuccessToast(res?.data?.message);
        navigate("/VerifyOTP");
      })
      .catch((e) => {
        console.log("eeee", e);
        ErrorToast(e?.message);
      });
  };

  return (
    <>
      <section className="login forgot_password">
        <Row>
          <Col lg={6}>
            <Loginimg />
          </Col>
          <Col lg={6}>
            <div className="loginuserdetail otp">
              <h3>2 Step Verification </h3>
              <p>
                An 6-digit code has been sent to Your Email: .....
                {email?.split("@")[0]?.slice(-2) + "@" + email?.split("@")[1]}
              </p>
              <form className="inputdetail" onSubmit={submit}>
                <div class="userInput">
                  <OtpInput
                    value={otp}
                    onChange={handleChange}
                    numInputs={6}
                    separator={<span>-</span>}
                    inputStyle="inputClass"
                    isInputNum={true}
                  />
                </div>
                <Timer
                  seconds={60}
                  minutes={0}
                  resend={handleClick}
                  ButtonText="Didn't get otp? Resend"
                  text="Resend OTP in"
                />

                <button
                  type="submit"
                  className={`  ${otp.length == "6" ? "btnred" : "btnwhite"}`}
                >
                  {loader ? "loading..." : "Verify"}
                </button>
              </form>
              <div className="signuplink">
                <p>
                  I need help getting my verification code.
                  <Link to="/login" className="">
                    Help Center
                  </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Otp;
