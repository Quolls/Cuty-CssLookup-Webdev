import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import * as EmailValidator from "email-validator";
import { ErrorToast } from "../../Toaster/Toaster";
import { ApiPostAuth } from "../../../helpers/API/API_data";
import { encryptdata } from "../../../helpers/Encrypt.js";
import Auth from "../../../helpers/Auth.js";
import { appContext } from "../../../helpers/AppContext.js";
import NavBar from "../../../components/NavBar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-regular-svg-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState("");
  const [loader, setloader] = useState(false);
  const { connectSocket } = useContext(appContext);
  const isAuth = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // submit email and passowd to login system
  const submit = async (e) => {
    setloader(true);
    e.preventDefault();
    if (!user?.email && !user?.password) {
      ErrorToast("Email and Password are Requried!");
    } else if (!user?.email) {
      ErrorToast("Email is Requried!");
    } else if (!EmailValidator.validate(user?.email)) {
      ErrorToast("Invalid Email!");
    } else if (!user?.password) {
      ErrorToast("Password is Requried!");
    } else {
      localStorage.clear();
      const b = {
        email: user.email,
        password: user.password,
      };
      const encryptedLoginData = encryptdata(b);
      ApiPostAuth("patient/login", { encryptedLoginData })
        .then(async (res) => {
          Auth.setAuthToken(res?.data?.data?.token);
          localStorage.setItem("logindata", JSON.stringify(res?.data?.data));
          if (res.status === 200) {
            navigate("/dashboard");
            connectSocket();
          }
          return res;
        })
        .catch((e) => {
          console.log("eeee", e);
          ErrorToast(e?.message);
        });
      setloader(false);
    }
  };
  useEffect(() => {
    if (isAuth) {
      // new treatment
      if (JSON.parse(localStorage.getItem("logindata"))?.isNewTreatment) {
        navigate("/home");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuth]);

  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <>
      <NavBar />
      <section className="flex flex-col justify-center items-center min-h-screen bg-brand-100">
        <div className="flex flex-col items-center w-full max-w-2xl space-y-8 bg-transparent">
          <h3 className="text-2xl font-semibold text-center text-neutral-900">
            Welcome Back
          </h3>
          <form className="w-full max-w-sm px-2 space-y-4" onSubmit={submit}>
            {/* Login Email */}
            <div className="flex flex-col flex-start">
              <label
                className="block mb-1 text-sm font-semibold text-neutral-900"
                htmlFor="email"
              >
                Email
              </label>
              <input
                autocomplete="off"
                autoCorrect="false"
                autoFocus="false"
                type="text"
                name="email"
                value={user.name}
                className="w-full px-3 py-2 border border-brand-300 rounded-lg focus:outline-none focus:ring-none focus:border-black"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>

            {/* Login Password */}
            <div className="flex flex-col flex-start">
              <label
                className="block mb-1 text-sm font-semibold text-neutral-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className='relative'>
                <input
                  autocomplete="off"
                  autoCorrect="false"
                  autoFocus="false"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full px-3 py-2 border border-brand-300 rounded-lg focus:outline-none focus:ring-none focus:border-black"
                  value={user.password}
                  placeholder="Password"
                  onChange={handleChange}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {/* use awesomefont to change the symbol */}
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </div>
              </div>
            </div>
            {/* Login Forgot Password */}
            <div className="flex justify-end">
              <h6
                className="font-semibold"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </h6>
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 font-medium text-white rounded-lg bg-brand-900 hover:bg-brand-700 focus:outline-none focus:ring-none"
            >
              {" "}
              {loader ? "loading..." : "Login"}
            </button>
          </form>
        </div>
        <div className="mt-40">
          <p className="font-semibold text-sm text-neutral-900 mb-0">
            Don’t have an account?{" "}
            <Link to="/quizflow" className="text-neutral-600">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
