import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loginimg from "../Loginimg/Loginimg.js";
import { Row, Col } from "react-bootstrap";
import { ErrorToast, SuccessToast } from "../../Toaster/Toaster";
import {  useSelector } from "react-redux";
import { userProfile } from "../../../redux/reducer/patientAuthSclice";
import { ApiPostNoAuth } from "../../../helpers/API/API_data.js";

// reset new password
const ChangePassword = () => {
  const [user, setUser] = useState("");
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  const { isSignUp } = useSelector(userProfile);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // submit new password and email to update passows
  const submit = (e) => {
    e.preventDefault();
    if (!user?.password) {
      ErrorToast("Password is Requried!");
    } else if (!user.c_password) {
      ErrorToast("Confirm Password is Requried!");
    } else if (user.password !== user.c_password) {
      ErrorToast("password and confirm password does not match");
    } else {
      setloader(true);
      let email = localStorage.getItem("userEmail");


      let body = {
        id: email,
        password: user?.password,
      };
      ApiPostNoAuth("patient/reset_password", body)
        .then((res) => {
          SuccessToast(res.data.message);
          navigate("/login");
          localStorage.clear();
          setloader(false);
        })
        .catch((err) => {
          ErrorToast(err.message);
          setloader(false);
        });
    }
  };
  if (isSignUp) {
    navigate("/VerifyOTP");
  }
  return (
    <>
      <section className="login forgot_password">
        <Row>
          <Col lg={6}>
            <Loginimg />
          </Col>
          <Col lg={6}>
            <div className="loginuserdetail">
              <h3>Change Password </h3>
              <form className="inputdetail" onSubmit={submit}>
                <div className="userinput">
                  <span>Password</span>
                  <input
                    autoComplete="off"
                    autoCorrect="false"
                    autoFocus="false"
                    type="password"
                    name="password"
                    className="textWhite"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="userinput">
                  <span>Confirm Password</span>
                  <input
                    autoComplete="off"
                    autoCorrect="false"
                    autoFocus="false"
                    type="password"
                    name="c_password"
                    className="textWhite"
                    value={user.c_password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btnred">
                  {loader ? "loading..." : "Change Password"}
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default ChangePassword;
