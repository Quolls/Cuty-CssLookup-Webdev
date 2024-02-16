import "./ManageTreatment.css";
import React, { useEffect, useState } from "react";
import user from "../../Assets/images/darkuser.png";
import tickmain from "../../Assets/images/tickmain.png";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Modal, Container, Button } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import SideDrawer from "../SideDrawer/SideDrawer";
import { ApiPost } from "../../helpers/API/API_data";
import Header from "../Header/Header";
import { RxCross1 } from "react-icons/rx";
import { Box, Grid, StepLabel, Typography, useMediaQuery } from "@mui/material";
import TreatmentDetailSummary from "./TreatmentDetailSummary";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import moment from "moment";
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

const TreatmentDetail = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const subscriptionId = localStorage?.getItem("payid")

  const [treatnentData, setTreatnentData] = useState();
  const [nextPaymentDate, setNextPaymentdate] = useState("")

  const [totalPrice, setTotalPrice] = useState();
  const myData = JSON.parse(localStorage.getItem("myData"));
  const [treatnentids, setTreatnentids] = useState();
  const [resumeData, setResumeData] = useState();
  const [show, setShow] = useState();
  const [showMain, setShowMain] = useState();
  const [modal, setModal] = useState();
  const [isPaymentDone, setIsPaymentDone] = useState(true);
  const [isPayment, setIsPayment] = useState(false);
  const [ModelShow, setmodelShow] = useState({ open: false, data: "" });
  const searchParams = new URLSearchParams(window.location.search);
  const isMobile = useMediaQuery('(max-width:600px)');
  const name = searchParams.get("name")
    ? searchParams.get("name").split("+").join(" ")
    : "";
  const navigate = useNavigate();

  // get treatment detail that assign by doctor
  const manageTreatment = () => {
    const body = {
      condition: myData?.label,
      subscriptionId
    }
    ApiPost(`patient/treatments/get`, body).then((res) => {
      const data = res?.data?.data?.[name];
      data.map((res) => {
        if (res.paymentStatus !== 1) {
          setIsPaymentDone(false);
        }
      });
      let priceTotal = 0;
      data?.map((val) => {
        if (val?.price) {
          priceTotal = priceTotal + Number(val?.monthly_subscription_cost);
        }
      });
      setTreatnentData(data);
      setNextPaymentdate(res?.data?.data?.nextpayment)
      setTotalPrice(priceTotal);
      setTreatnentids(
        data?.filter((ele) => ele?.status === 0).map((ele) => ele._id)
      );
      setResumeData(data?.filter((ele) => ele?.status === 0));
    });
  };

  useEffect(() => {
    manageTreatment();
  }, []);



  var total = 0;
  for (var i = 0; i < resumeData?.length; i++) {
    total = total + resumeData[i].price;
  }

  // cancel treatment
  const treatnentcancel = (status) => {
    let ids = [];
    treatnentData?.filter((val) => {
      if (val?._id) {
        ids?.push(val?._id);
      }
    });
    const body = {
      subscriptionStatus: status,
      treatmentIds: ids,
    };
    ApiPost(`patient/change_subscription_status`, body)
      .then((res) => {
        manageTreatment();
        if (status === 1) {
          setModal(true);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

 
// set active step
  const handleReset = () => {
    setActiveStep(0);
  };




  return (
    <>
      <div className="chatscreen admindashboard  treatment_details_main_sec">
        <Row>
          <Col lg={2}>
            <SideDrawer />
          </Col>
          <Col lg={10}>
            <Header />
            <div className="inner_div_dashboard">
              {isPaymentDone && treatnentData && (
                <div
                  style={{
                    overflow: "auto",
                    background: "#F4F4F5",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                  className="treatscreen mt-5 resp treatresponsive"
                >
                  <div className="treatmentdetailtitle text-center mt-5">
                    <span>
                      Hey {treatnentData[0]?.patient?.[0]?.firstName}!
                    </span>
                    <h4>
                      Here’s what{" "}
                      {`${treatnentData[0]?.doctor?.[0]?.firstName} ${treatnentData[0]?.doctor?.[0]?.lastName}`}{" "}
                      Recommended
                    </h4>
                    <a
                      onClick={() =>
                        setmodelShow({
                          open: true,
                          data: treatnentData[0]?.cards[0]?.summery,
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <img src={user} alt="" />
                      Read Doctor Note
                    </a>
                  </div>
                  <Row>
                    <Col lg={6}>
                      {isPaymentDone &&
                        treatnentData &&
                        treatnentData.map((ele, index) => {
                          return (
                            <div
                              className="p-3 rounded-3 mt-2 resalltreat"
                              style={{
                                background: "#F4F4F5",
                                color: "#18181B",
                              }}
                            >
                              <div className=" w-100">
                                <div className="treatmentmaindetails">
                                  <div className="treatmenttitle">
                                    <p className="d-flex align-items-center">
                                      {ele?.treatmentName
                                        ? ele?.treatmentName
                                        : "-"}{" "}
                                      <div className="mx-2">
                                        {" "}
                                        <RxCross1 />{" "}
                                      </div>{" "}
                                      {ele?.quantity_of_unit_per_subscription}
                                    </p>
                                    <div className="valueres">
                                      <input
                                        type="text"
                                        className="rounded-3"
                                        style={{ opacity: "0.9" }}
                                        disabled
                                      />
                                      <span className="value" style={{ display: "inline-block" }}>{`${ele?.active_drug} ${ele?.quantity} ${ele?.form}`}</span>
                                      <span>
                                        <img
                                          src={ele?.image}
                                          style={{
                                            height: "90px",
                                            width: "90px",
                                          }}
                                        ></img>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={`sprayprofile mt-2 ${ele?.detail_information?.length - 1 === i &&
                                    "mb-1"
                                    }`}
                                >
                                  <div className="numberoftreatment">
                                    <span>
                                      <p className="text-white">{1}</p>
                                    </span>
                                  </div>
                                  <div className="profilemain w-100">
                                    <div className="d-flex justify-content-between">
                                      <h4>
                                        {ele?.detail_information[0]?.title}
                                      </h4>
                                    </div>
                                    <p>
                                      {ele?.detail_information[0]?.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2 ">
                                  <h4></h4>
                                  <div
                                    className="text-black fw-semibold"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {showMain !== index ? (
                                      <AiOutlinePlus
                                        className="cursor-pointer ms-2"
                                        onClick={() => setShowMain(index)}
                                      />
                                    ) : (
                                      <AiOutlineMinus
                                        className="cursor-pointer ms-2"
                                        onClick={() => setShowMain()}
                                      />
                                    )}
                                  </div>
                                </div>
                                {showMain === index && (
                                  <div
                                    className="treatmentdetail p-0"
                                    style={{ margin: "0px" }}
                                  >
                                    <div className="treatmentmaindetails mt-3">
                                      <div className="numberoftreatmentque">
                                        {ele?.detail_information &&
                                          ele?.detail_information.map(
                                            (e, i) => {
                                              if (i !== 0) {
                                                return (
                                                  <div
                                                    className={`sprayprofile mt-2 ${ele?.detail_information
                                                      ?.length -
                                                      1 ===
                                                      i && "mb-1"
                                                      }`}
                                                  >
                                                    <div className="numberoftreatment">
                                                      <span>
                                                        <p>{i + 1}</p>
                                                      </span>
                                                    </div>
                                                    <div className="profilemain w-100">
                                                      <div className="d-flex justify-content-between">
                                                        <h4>{e.title}</h4>
                                                        <div>
                                                          {show !== i ? (
                                                            <AiOutlinePlus
                                                              className="cursor-pointer"
                                                              onClick={() =>
                                                                setShow(i)
                                                              }
                                                            />
                                                          ) : (
                                                            <AiOutlineMinus
                                                              className="cursor-pointer"
                                                              onClick={() =>
                                                                setShow()
                                                              }
                                                            />
                                                          )}
                                                        </div>
                                                      </div>
                                                      {show === i && (
                                                        <p>{e.description}</p>
                                                      )}
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            }
                                          )}
                                      </div>
                                    </div>

                                    {ModelShow.open && (
                                      <Modal
                                        title="Basic Modal"
                                        show={ModelShow.open}
                                        onHide={() =>
                                          setmodelShow({
                                            open: false,
                                            data: "",
                                          })
                                        }
                                      >
                                        <h3 style={{ color: "white" }}>
                                          Summary
                                        </h3>
                                        <p>{ModelShow.data}</p>
                                      </Modal>
                                    )}
                                    {modal && (
                                      <Modal
                                        title="Basic Modal"
                                        centered
                                        show={modal}
                                        onHide={() => setModal(false)}
                                      >
                                        <h3
                                          style={{ color: "white" }}
                                          className="text-center"
                                        >
                                          Confirmation
                                        </h3>
                                        <p
                                          className="text-center"
                                          style={{ marginTop: "20px" }}
                                        >
                                          Please note, you subscription will be
                                          paused until further notice. If you
                                          have a prescription that is due to be
                                          shipped in the next 7 days the pause
                                          will take effect after that date.
                                        </p>
                                        <div className="text-center">
                                          <button
                                            className="btnreds text-center"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setModal(false)}
                                          >
                                            Confirm
                                          </button>
                                        </div>
                                      </Modal>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </Col>
                    {isPaymentDone && treatnentData && (
                      <Col lg={6}>
                        <div
                          className="treatmentdis p-5 rounded m-0 mt-2"
                          style={{ background: "#F4F4F5", color: "#18181B" }}
                        >
                          <h4 className="text-center">
                            {totalPrice === 0 ? (
                              <>
                                {treatnentData?.map((val, i) => {
                                  return (
                                    <div key={i}>
                                    </div>
                                  );
                                })}
                                <h4>${treatnentData.reduce((total, item) => total + (item?.price || 0), 0)}</h4>
                              </>
                            ) : (
                              <>
                                ${totalPrice}
                                {treatnentData[0]?.actual_frequency > 0 && "/month"}
                              </>
                            )}

                          </h4>
                          {treatnentData?.length > 1 ? (
                            <div className="text-center mb-2">
                              {treatnentData?.map((val, i) => {
                                return (
                                  <span>
                                    ${val?.monthly_subscription_cost === 0 ? val?.price : val?.monthly_subscription_cost}{" "}

                                    {val?.actual_frequency ? `(${val?.treatmentName}/${treatnentData?.length > 0 &&
                                      val?.actual_frequency
                                      } months)` : `(${val?.treatmentName})`}
                                    {treatnentData?.length - 1 > i && "+"}
                                  </span>
                                );
                              })}
                            </div>
                          ) : (
                            <>
                              {treatnentData[0]?.actual_frequency ?
                                <p className="text-center">
                                  When you sign up for a{" "}
                                  {treatnentData?.length > 0 &&
                                    treatnentData[0]?.actual_frequency}{" "}
                                  months supply
                                </p>
                                : ""
                              }
                            </>
                          )}
                          <ul>
                            <li className="rounded-3">
                              <img src={tickmain} alt="" />
                              <span>No Contracts cancel anytime</span>
                            </li>
                            <li className="rounded-3">
                              <img src={tickmain} alt="" />
                              <span>Unlimited doctor consults</span>
                            </li>
                            <li className="rounded-3">
                              <img src={tickmain} alt="" />
                              <span>Delivery in 4-5 days</span>
                            </li>
                            <li className="rounded-3">
                              <img src={tickmain} alt="" />
                              <span>Delivery Renewals</span>
                            </li>
                          </ul>

                          {treatnentData &&
                            treatnentData.map((res, i) => {
                              if (
                                i === 0 &&
                                treatnentData[0]?.frequencyDate !== 0
                              ) {
                                if (
                                  treatnentData[0]?.paymentStatus !== 1 ||
                                  treatnentData[0]?.frequencyDate !== 0
                                ) {
                                  const date1 = new Date();
                                  const date2 = new Date(
                                    treatnentData[0]?.frequencyDate
                                  );
                                  const diffTime = Math.abs(date2 - date1);
                                  const diffDays = Math.ceil(
                                    diffTime / (1000 * 60 * 60 * 24)
                                  );
                                  return (
                                    <div className="card_detail my-4 w-100 text-center">
                                      <div className="text-center w-100">
                                        <div
                                          style={{ color: "#18181B" }}
                                        >{`Your next payment is due ${moment(
                                          nextPaymentDate
                                        ).format("DD-MM-YYYY")}`}</div>
                                      </div>
                                    </div>
                                  );
                                }
                              }
                            })}
                          <div className="d-flex justify-content-center">
                            <button
                              className="btnreds"
                              style={{ cursor: "pointer" }}
                              onClick={() => treatnentcancel(2)}
                            >
                              cancel
                            </button>
                            <button
                              className="btnreds"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                treatnentcancel(
                                  treatnentData?.length > 0 &&
                                    treatnentData[0]?.status === 0
                                    ? 1
                                    : 0
                                )
                              }
                            >
                              {treatnentData?.length > 0 &&
                                treatnentData[0]?.status === 0
                                ? "Pause"
                                : "Resume"}
                            </button>
                          </div>
                        </div>
                      </Col>
                    )}
                  </Row>
                </div>
              )}
              {treatnentData?.length > 0 && isPayment && !isPaymentDone && (
                <div style={{ textAlign: "center" }}>
                  <section
                    className="condition payment_summary_staps"
                    style={{
                      padding: "50px",
                      overflow: "auto",
                      backgroundColor: "transparent",
                      height: "100%",
                    }}
                  >
                    <Container>
                      <div className="panel-container">
                        <div className="panel">
                          <Stepper withNumbers activeStep={4}>
                            {steps.map((label) => (
                              <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                              </Step>
                            ))}
                          </Stepper>
                        </div>
                      </div>

                      


                      {activeStep === steps.length ? (
                        <React.Fragment>
                          <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you're finished
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              pt: 2,
                            }}
                          >
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={handleReset}>Reset</Button>
                          </Box>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <Typography sx={{ mt: 2, mb: 1 }}>
                            {activeStep + 1 === 1 ? (
                              <TreatmentDetailSummary
                                treatnentData={treatnentData}
                                paymenttype={{
                                  type: name,
                                  isDoctorAssigned: true,
                                  id: treatnentids,
                                }}
                                nextPaymentDate={nextPaymentDate}
                              />
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
                          >
                            <button
                              onClick={() => {
                                navigate("/ManageTreatment");
                              }}
                              className="prev me-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-arrow-left-long"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                                />
                              </svg>
                              &nbsp;Back
                            </button>
                          </Box>
                        </React.Fragment>
                      )}
                    </Container>
                  </section>
                </div>
              )}
              {treatnentData?.length === undefined &&
                !isPayment &&
                isPaymentDone && (
                  <div
                    className="treatmentdis text-center p-5 rounded m-0 d-flex align-items-center"
                    style={{
                      background: "#F4F4F5",
                      color: "#18181B",
                      height: "89vh",
                      fontSize: "20px",
                    }}
                  >
                    {`You're treating doctor is assessing your info and will diagnose and share your treatment shortly. While you wait please take look around and familiarise yourself.`}
                  </div>
                )}
              {treatnentData?.length > 0 && !isPayment && !isPaymentDone && (
                <div
                  style={{
                    overflow: "auto",
                    background: "#F4F4F5",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                  className="treatscreen mt-3 treatresponsive"
                >
                  <div className="treatmentdetailtitle text-center mt-5">
                    <span>
                      Hey {treatnentData[0]?.patient?.[0]?.firstName}!
                    </span>
                    <h4>
                      Here’s what{" "}
                      {`${treatnentData[0]?.doctor?.[0]?.firstName} ${treatnentData[0]?.doctor?.[0]?.lastName}`}{" "}
                      Recommended
                    </h4>
                    <a
                      onClick={() =>
                        setmodelShow({
                          open: true,
                          data: treatnentData[0]?.cards[0]?.summery,
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <img src={user} alt="" />
                      Read Doctor Note
                    </a>
                  </div>
                  <Row>
                    <Col lg={6}>
                      {treatnentData.map((ele, index) => {
                        return (
                          <div
                            className="p-0 p-sm-3 rounded-3 mt-2"
                            style={{ background: "#F4F4F5", color: "#18181B" }}
                          >
                            <div className=" w-100">
                              <div className="treatmentmaindetails">
                                <div className="treatmenttitle">
                                  <p className="d-flex align-items-center">
                                    {ele?.treatmentName
                                      ? ele?.treatmentName
                                      : "-"}{" "}
                                    <div className="mx-2">
                                      {" "}
                                      <RxCross1 />{" "}
                                    </div>{" "}
                                    {ele?.quantity_of_unit_per_subscription}
                                  </p>
                                  <Grid container className="rounded-3 titleContainer" >
                                    <Grid item lg={10} md={10} sm={10} xs={10}>

                                      {ele?.active_drug} {ele?.quantity} {ele?.form}

                                    </Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={2} sx={{ display: "flex", justifyContent: "center" }}>
                                      <img
                                        src={ele?.image}
                                        style={{
                                          height: isMobile ? "70px" : "80px",
                                          width: isMobile ? "70px" : "80px",
                                        }}
                                      ></img>
                                    </Grid>

                                  </Grid>

                                </div>
                              </div>
                              <div
                                className={`sprayprofile mt-2 ${ele?.detail_information?.length - 1 === i &&
                                  "mb-1"
                                  }`}
                              >
                                <div className="numberoftreatment">
                                  <span>
                                    <p className="text-white">{1}</p>
                                  </span>
                                </div>
                                <div className="profilemain w-100">
                                  <div className="d-flex justify-content-between">
                                    <h4>{ele?.detail_information[0]?.title}</h4>
                                  </div>
                                  <p>
                                    {ele?.detail_information[0]?.description}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2 ">
                                <h4></h4>
                                <div
                                  className="text-black fw-semibold"
                                  style={{ fontSize: "14px" }}
                                >
                                  {showMain !== index ? (
                                    <AiOutlinePlus
                                      className="cursor-pointer ms-2"
                                      onClick={() => setShowMain(index)}
                                    />
                                  ) : (
                                    <AiOutlineMinus
                                      className="cursor-pointer ms-2"
                                      onClick={() => setShowMain()}
                                    />
                                  )}
                                </div>
                              </div>
                              {showMain === index && (
                                <div
                                  className="treatmentdetail p-0"
                                  style={{ margin: "0px" }}
                                >
                                  <div className="treatmentmaindetails mt-3">
                                    <div className="numberoftreatmentque">
                                      {ele?.detail_information &&
                                        ele?.detail_information.map((e, i) => {
                                          if (i !== 0) {
                                            return (
                                              <div
                                                className={`sprayprofile mt-2 ${ele?.detail_information
                                                  ?.length -
                                                  1 ===
                                                  i && "mb-1"
                                                  }`}
                                              >
                                                <div className="numberoftreatment">
                                                  <span>
                                                    <p>{i + 1}</p>
                                                  </span>
                                                </div>
                                                <div className="profilemain w-100">
                                                  <div className="d-flex justify-content-between">
                                                    <h4>{e.title}</h4>
                                                    <div>
                                                      {show !== i ? (
                                                        <AiOutlinePlus
                                                          className="cursor-pointer"
                                                          onClick={() =>
                                                            setShow(i)
                                                          }
                                                        />
                                                      ) : (
                                                        <AiOutlineMinus
                                                          className="cursor-pointer"
                                                          onClick={() =>
                                                            setShow()
                                                          }
                                                        />
                                                      )}
                                                    </div>
                                                  </div>
                                                  {show === i && (
                                                    <p>{e.description}</p>
                                                  )}
                                                </div>
                                              </div>
                                            );
                                          }
                                        })}
                                    </div>
                                  </div>
                                  {ModelShow.open && (
                                    <Modal
                                      title="Basic Modal"
                                      show={ModelShow.open}
                                      onHide={() =>
                                        setmodelShow({ open: false, data: "" })
                                      }
                                    >
                                      <h3 style={{ color: "white" }}>
                                        Summary
                                      </h3>
                                      <p>{ModelShow.data}</p>
                                    </Modal>
                                  )}
                                  {modal && (
                                    <Modal
                                      title="Basic Modal"
                                      centered
                                      show={modal}
                                      onHide={() => setModal(false)}
                                    >
                                      <h3
                                        style={{ color: "white" }}
                                        className="text-center"
                                      >
                                        Confirmation
                                      </h3>
                                      <p
                                        className="text-center"
                                        style={{ marginTop: "20px" }}
                                      >
                                        Please note, you subscription will be
                                        paused until further notice. If you have
                                        a prescription that is due to be shipped
                                        in the next 7 days the pause will take
                                        effect after that date.
                                      </p>
                                      <div className="text-center">
                                        <button
                                          className="btnreds text-center"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => setModal(false)}
                                        >
                                          Confirm
                                        </button>
                                      </div>
                                    </Modal>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </Col>
                    {
                      <Col lg={6}>
                        <div
                          className="treatmentdis p-0 p-sm-4 rounded m-0 mt-2"
                          style={{ background: "#F4F4F5", color: "#18181B" }}
                        >
                          <h4 className="text-center">


                            {totalPrice === 0 ? (
                              <>
                                {treatnentData?.map((val, i) => {
                                  return (
                                    <div key={i}>
                                    </div>
                                  );
                                })}
                                <h4>${treatnentData.reduce((total, item) => total + (item?.price || 0), 0)}</h4>
                              </>
                            ) : (
                              <>
                                ${totalPrice}
                                {treatnentData[0]?.actual_frequency > 0 && "/month"}
                              </>
                            )}

                          </h4>
                          {treatnentData?.length > 1 ? (
                            <div className="text-center mb-2">
                              {treatnentData?.map((val, i) => {
                                return (
                                  <span>
                                    ${val?.monthly_subscription_cost === 0 ? val?.price : val?.monthly_subscription_cost}{" "}

                                    {val?.actual_frequency ? `(${val?.treatmentName}/${treatnentData?.length > 0 &&
                                      val?.actual_frequency
                                      } months)` : `(${val?.treatmentName})`}
                                    {treatnentData?.length - 1 > i && "+"}
                                  </span>
                                );
                              })}
                            </div>
                          ) : (
                            <>
                              {treatnentData[0]?.actual_frequency ?
                                <p className="text-center">
                                  When you sign up for a{" "}
                                  {treatnentData?.length > 0 &&
                                    treatnentData[0]?.actual_frequency}{" "}
                                  months supply
                                </p>
                                : ""
                              }
                            </>
                          )}
                          <ul>
                            <li className="rounded-3">
                              <img src={tickmain} alt="" />
                              <span>No Contracts cancel anytime</span>
                            </li>
                            <li className="rounded-3">
                              <img src={tickmain} alt="" />
                              <span>Unlimited doctor consults</span>
                            </li>
                            <li className="rounded-3">
                              <img src={tickmain} alt="" />
                              <span>Delivery in 4-5 days</span>
                            </li>
                            <li className="rounded-3">
                              <img src={tickmain} alt="" />
                              <span>Delivery Renewals</span>
                            </li>
                          </ul>
                          {treatnentData &&
                            treatnentData.map((res, i) => {
                              if (
                                i === 0 &&
                                treatnentData[0]?.frequencyDate !== 0
                              ) {
                                if (
                                  treatnentData[0]?.paymentStatus !== 1 ||
                                  treatnentData[0]?.frequencyDate !== 0
                                ) {
                                  const date1 = new Date();
                                  const date2 = new Date(
                                    treatnentData[0]?.frequencyDate
                                  );
                                  const diffTime = Math.abs(date2 - date1);
                                  const diffDays = Math.ceil(
                                    diffTime / (1000 * 60 * 60 * 24)
                                  );
                                  return (
                                    <div className="card_detail my-4 w-100 text-center">
                                      <div className="text-center w-100">
                                        <div
                                          style={{ color: "#18181B" }}
                                        >{`Your next payment is due ${moment(
                                          nextPaymentDate
                                        ).format("DD-MM-YYYY")}`}</div>
                                      </div>
                                    </div>
                                  );
                                }
                              }
                            })}
                        </div>
                      </Col>
                    }
                    <div className="text-center mb-3">
                      <button
                        className="btnreds py-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsPayment(true)}
                      >
                        Continue
                      </button>
                    </div>
                  </Row>
                </div>
              )}

              {/* modal for doctor notes */}
              {ModelShow.open && (
                <Modal
                  title="Basic Modal"
                  show={ModelShow.open}
                  onHide={() => setmodelShow({ open: false, data: "" })}
                >
                  <h3 style={{ color: "white" }}>Summary</h3>
                  <p>{ModelShow.data}</p>
                </Modal>
              )}
              {/* modal to paused consult */}
              {modal && (
                <Modal
                  title="Basic Modal"
                  centered
                  show={modal}
                  onHide={() => setModal(false)}
                >
                  <h3 style={{ color: "white" }} className="text-center">
                    Confirmation
                  </h3>
                  <p className="text-center" style={{ marginTop: "20px" }}>
                    Please note, you subscription will be paused until further
                    notice. If you have a prescription that is due to be shipped
                    in the next 7 days the pause will take effect after that
                    date.
                  </p>
                  <div className="text-center">
                    <button
                      className="btnreds text-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => setModal(false)}
                    >
                      Confirm
                    </button>
                  </div>
                </Modal>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TreatmentDetail;
