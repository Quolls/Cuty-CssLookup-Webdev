import React, { useEffect, useState } from "react";
import "./Payment.css";
import Logo from "../../Assets/images/logo.png";
import Box from "@mui/material/Box";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import PaymentSummaryComponent from "./PaymentSummaryComponent/PaymentSummaryComponent";
import CardStuff from "./PaymentSummaryComponent/CardStuff";
import { useNavigate } from "react-router-dom";
import { Stepper, Step } from "react-mui-stepper";

const steps = [
  "Questions",
  "Checkout",
  "Doctor review",
  "Treatment Plan Shared",
  "Treatment Confirmed and Paid",
  "Pharmacy Dispensing",
  "Shipped",
];

const PaymentSummary = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [stripeData, setStripeData] = useState();
  const [skipped, setSkipped] = React.useState(new Set());
  const [questionTypes, setQuestionTypes] = useState();
  const [logindata, setLogindata] = useState();
  const navigate = useNavigate();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // handle next steps
  const handleNext = (data) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };


  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    const stripeData = localStorage.getItem("stripePaymentData");
    setStripeData(JSON.parse(stripeData));
    const questionTypes = localStorage.getItem("questionTypes");
    const logindata = localStorage.getItem("logindata");
    questionTypes && setQuestionTypes(JSON.parse(questionTypes));
    logindata && setLogindata(JSON.parse(logindata));
  }, []);

  return (
    <section
      className="condition payment_summary"
      style={{ padding: "50px", overflow: "auto" }}
    >
      <div className="payment_summary_logo">
        <img alt="" src={Logo} style={{ width: "100px" }} />
      </div>
      <div className="payment_summary_staps">
        <Container>
          {/* stepper */}
          <Stepper withNumbers activeStep={1}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you're finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {activeStep + 1 === 1 ? (
                  <PaymentSummaryComponent
                    questionTypes={questionTypes}
                    userData={logindata}
                    handleNext={handleNext}
                  />
                ) : activeStep + 1 === 2 ? (
                  <CardStuff stripeData={stripeData?.paymentIntent} />
                ) : (
                  navigate("/dashboard")
                )}
              </Typography>
              <Box
                className="btnnext align mt-0"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  pt: 2,
                  gap: "20px",
                }}
              ></Box>
            </React.Fragment>
          )}
        </Container>
      </div>
    </section>
  );
};

export default PaymentSummary;
