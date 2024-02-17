import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loginimg from "../Loginimg/Loginimg.js";
import { Row, Col } from "react-bootstrap";
import { ErrorToast } from "../../Toaster/Toaster";
import { useDispatch } from "react-redux";
import {
  patientSignUp,
} from "../../../redux/reducer/patientAuthSclice";
import * as EmailValidator from "email-validator";

const Signup = () => {
  const [user, setUser] = useState("");
  const [loader, setloader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle change inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    const userSignUpData = JSON.parse(localStorage.getItem("logindata"));
    setLoginData(userSignUpData);
    setUser({ email: userSignUpData.email });
  }, []);

  // submit user detail for signup
  const submit = async (e) => {
    setloader(true);
    e.preventDefault();
    if (!user?.email && !user?.password && !user.c_password) {
      ErrorToast(" Email, Password and Current Password are Requried!");
      setloader(false);
    } else if (!user?.email && !user?.password) {
      ErrorToast("Email and Password are Requried!");
      setloader(false);
    } else if (!user?.email) {
      ErrorToast("Email is Requried!");
      setloader(false);
    } else if (!EmailValidator.validate(user?.email)) {
      ErrorToast("Invalid Email!");
      setloader(false);
    } else if (!user?.password) {
      ErrorToast("Password is Requried!");
      setloader(false);
    } else if (!user.c_password) {
      ErrorToast("Confirm Password is Requried!");
      setloader(false);
    } else if (user.password !== user.c_password) {
      ErrorToast("password and confirm password does not match");
      setloader(false);
    } else {
      localStorage.setItem("userEmail", user?.email);
      await dispatch(patientSignUp({ data: user, navigate }));
      setloader(false);
    }
  };

  return (
    <>
      <section className="login">
        <Row>
          <Col lg={6}>
            <Loginimg />
            <p className="welcometext">
              Welcome Back! Enter your email and password below to sign in.
            </p>
          </Col>
          <Col lg={6}>
            <div className="loginuserdetail">
              <h3>Welcome </h3>
              <form className="inputdetail" onSubmit={submit}>
                <div className="userinput">
                  {" "}
                  <span>Email address</span>
                  <input
                    autoComplete="off"
                    autoCorrect="false"
                    autoFocus="false"
                    type="text"
                    name="email"
                    value={user.email}
                    disabled
                    className="textWhite"
                    onChange={handleChange}
                  />
                </div>
                <div className="userinput">
                  {" "}
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
                  {" "}
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
                  {loader ? "loading..." : "Sign up"}
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Signup;
