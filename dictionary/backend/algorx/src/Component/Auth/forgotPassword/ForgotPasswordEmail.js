import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loginimg from "../Loginimg/Loginimg.js";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userProfile } from "../../../redux/reducer/patientAuthSclice";
import { ErrorToast, SuccessToast } from "../../Toaster/Toaster";
import { ApiPostNoAuth } from "../../../helpers/API/API_data";

// forgot password, enter email to reset
const ForgotPasswordEmail = () => {
  const [user, setUser] = useState("");
  const [loader, setloader] = useState(false);

  const { isAuth } = useSelector(userProfile);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  if (isAuth) {
    if (JSON.parse(localStorage.getItem("logindata"))?.isNewTreatment) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }

  // sent opt on email to reseat password
  const sendOtp = async (e) => {
    e.preventDefault();
    setloader(true);
    if (!user?.email) {
      ErrorToast("Email is Requried!");
    } else {
      localStorage.setItem("userEmail", user?.email);
      let body = {
        email: user?.email,
      };
      await ApiPostNoAuth("patient/forgot_password", body)
        .then((res) => {
          SuccessToast(res?.data?.message);
          navigate("/VerifyOTP");
          setloader(false);
        })
        .catch((e) => {
          console.log("eeee", e);
          ErrorToast(e?.message);
          setloader(false);
        });
    }
  };
  return (
    <>
      <section className="login forgot_password">
        <Row>
          <Col lg={6}>
            <Loginimg />
          </Col>
          <Col lg={6}>
            <div className="loginuserdetail">
              <h3>Forgot Password! </h3>
              <form className="inputdetail" onSubmit={sendOtp}>
                <div className="userinput">
                  {" "}
                  <span>Email address</span>
                  <input
                    autocomplete="off"
                    autoCorrect="false"
                    autoFocus="false"
                    type="text"
                    name="email"
                    value={user.name}
                    className="textWhite"
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btnred">
                  {loader ? "loading..." : " Send OTP"}
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default ForgotPasswordEmail;
