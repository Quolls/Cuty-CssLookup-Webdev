import React, { useContext } from "react";
import "./App.css";
import "./Assets/css/index.js";
import { Route, Routes } from "react-router-dom";
import Login from "./Component/Auth/Login/Login.js";
import Otp from "./Component/Auth/Otp/Otp.js";
import Condition from "./Page/Condition/Main";
import Dashboard from "./Page/Dashboard/Dashboard.js";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./PrivateRoutes";
import ErectileDysfunctionFlow from "./Page/ErectileDysfunctionFlow/ErectileDysfunctionFlow";
import ChatScreen from "./Page/ChatScreen/ChatScreen";
import ForgotPasswordEmail from "./Component/Auth/forgotPassword/ForgotPasswordEmail";
import ChangePassword from "./Component/Auth/forgotPassword/ChangePassword";
import Payment from "./Page/Payment/Payment";
import Home from "./Page/Home/Home";
import TermsCondition from "./Page/TermsCondition/TermsCondition";
import PrivacyPolicy from "./Page/PrivacyPolicy/PrivacyPolicy";
import ContactUs from "./Page/ContactUs/ContactUs";
import ManageTreatment from "./Page/ManageTreatment/ManageTreatment";
import TreatmentDetail from "./Page/ManageTreatment/TreatmentDetail";

// 420 Medical QuizFlow ----------------
import QuizFlow from "./Page/QuizFlow/QuizFlow";

import { Nomatch } from "./Page/Nomatch";
import PublicRoutes from "./PublicRoutes";
import PaymentSummary from "./Page/Payment/PaymentSummary";
import VerifyEmail from "./Page/VerifyEmail/VerifyEmail";
import VerificationEmail from "./Page/VerificationEmail/VerificationEmail";
import ChatScreenListMobile from "./Page/ChatScreen/ChatScreenListMobile";
import ChatScreenMobile from "./Page/ChatScreen/ChatScreenMobile";
import Video from "./Page/Video/Video";
import Consult from "./Page/Consult/Consult";
import Payment1 from "./Page/Payment/Payment1";
import ThrushBaceterialVaginosisFlow from "./Page/ThrushBaceterialVaginosis/ThrushBaceterialVaginosisFlow";
import UrinaryTrackInfectionFlow from "./Page/UrinanryTractInfection/UrinaryTrackInfectionFlow";
import PrematureEjeculationFlow from "./Component/PrematureEjaculation/PrematureEjeculationFlow.js";
import CustomerSupport from "./Page/Dashboard/CustomerSupport";
import { appContext } from "./helpers/AppContext";
import StiStdFlow from "./Page/StiStdFlow/StiStdFlow.js";

function App() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth > 991);

  const { isCostpmerSupportOpen, setIsCostpmerSupportOpen } =
    useContext(appContext);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      const mobile = window.innerWidth > 991;
      if (mobile !== isMobile) setIsMobile(mobile);
    });
  }, [isMobile]);

  return (
    <>
      <Routes>
        {/* 420Medical */}
        <Route exact path="/quizflow" element={<QuizFlow />} />
        {/* FrenchidMD */}
        <Route exact path="/TermsCondition" element={<TermsCondition />} />
        <Route exact path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route exact path="/video" element={<Video />} />
        <Route element={<PublicRoutes />}>
          <Route exact path="/verifyUser" element={<VerificationEmail />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/verify-email" element={<VerifyEmail />} />
          <Route exact path="/login" element={<Login />} />

          <Route
            exact
            path="/forgot-password"
            element={<ForgotPasswordEmail />}
          />
          <Route exact path="/change-password" element={<ChangePassword />} />
          <Route exact path="/VerifyOTP" element={<Otp />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route exact path="/paymentSummary" element={<PaymentSummary />} />
          <Route exact path="/editPatient" element={<Home />} />
          <Route exact path="/condition" element={<Condition />} />
          <Route
            exact
            path="/erectileDysfunction"
            element={<ErectileDysfunctionFlow />}
          />
          <Route
            exact
            path="/PrematureEjaculation"
            element={<PrematureEjeculationFlow />}
          />
          <Route exact path="/STISTD" element={<StiStdFlow />} />
          <Route
            exact
            path="/thrushBaceterialVaginosis"
            element={<ThrushBaceterialVaginosisFlow />}
          />
          <Route
            exact
            path="/urinanryTractInfection"
            element={<UrinaryTrackInfectionFlow />}
          />
          <Route exact path="/Payment" element={<Payment />} />
          <Route exact path="/Payment1" element={<Payment1 />} />
          <Route exact path="/Consult" element={<Consult />} />
          <Route exact path="/ContactUs" element={<ContactUs />} />
          <Route exact path="/TreatmentDetail" element={<TreatmentDetail />} />

          <Route exact path="/ManageTreatment" element={<ManageTreatment />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route
            exact
            path="/ChatScreen"
            element={isMobile ? <ChatScreen /> : <ChatScreenListMobile />}
          />
          <Route exact path="/video" element={<Video />} />
          <Route
            exact
            path="/ChatScreenListMobile"
            element={<ChatScreenListMobile />}
          />
          <Route
            exact
            path="/ChatScreenMobile/:id/:id"
            element={<ChatScreenMobile />}
          />
          <Route exact path="*" element={<Nomatch />} />
        </Route>
      </Routes>
      {isCostpmerSupportOpen ? (
        <CustomerSupport
          isCostpmerSupportOpen={isCostpmerSupportOpen}
          setIsCostpmerSupportOpen={setIsCostpmerSupportOpen}
        />
      ) : (
        ""
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
export default App;
