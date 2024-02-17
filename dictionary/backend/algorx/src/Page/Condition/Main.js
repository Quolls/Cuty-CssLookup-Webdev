import React from "react";
import Logo from "../../Assets/images/logo.png";
import Condition from "./Condition";
// condition main screen
const Main = () => {
  return (
    <>
      <section className="condition">
        <div className="loginimglogo conlogo btn_logout">
          <img src={Logo} alt="" />
          <div className="btnlogout">
            <button
              className="outBtn"
              onClick={() => {
                localStorage.clear();
                window.location.pathname = "/login";
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="conditionmain">
          <div className="borderdiv">
            <div className="conditioninfo">
              <Condition />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
