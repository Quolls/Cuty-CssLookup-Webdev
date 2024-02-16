import Loader from "../../Component/Loader/Loader";
import React from "react";
import { useEffect } from "react";
import { ApiPostNoAuth } from "../../helpers/API/API_data";
import { useNavigate } from "react-router";
import { ErrorToast, SuccessToast } from "../../Component/Toaster/Toaster";

const VerificationEmail = () => {
  const navigate = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");


  // verify user token
  const handleVerifyToken = () => {
    ApiPostNoAuth("patient/verify_user", { token: token })
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            navigate("/login");
            SuccessToast("Verified Successfully Please login into your account now")
          }, 2000);
        }
      })
      .catch((err) => {
        ErrorToast("Verification failed !");

        setTimeout(() => {
          navigate("/login");
        }, 2000);

        console.log("err", err);
      });
  };

  useEffect(() => {
    handleVerifyToken();
  }, []);

  return (
    <>
      <Loader />

      <div
        className="headinglogin"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="verify_email_text pt-5">Verifying...</div>
      </div>
    </>
  );
};

export default VerificationEmail;
