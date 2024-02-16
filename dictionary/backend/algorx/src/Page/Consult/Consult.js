import "./Consult.css";
import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import SideDrawer from "../SideDrawer/SideDrawer";
import Header from "../Header/Header";
import Loader from "../../Component/Loader/Loader";
import { appContext } from "../../helpers/AppContext";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BiCopy } from "react-icons/bi";
import img from "../../Assets/images/frame.png";
import { ApiGet, ApiPost, Bucket } from "../../helpers/API/API_data";
import moment from "moment";
import { SuccessToast } from "../../Component/Toaster/Toaster";
import { useNavigate } from "react-router-dom";
import { CiStethoscope } from "react-icons/ci";
import { FiArrowUpRight, FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const Consult = () => {
  const navigate = useNavigate();
  const { loader, setLoader } = useContext(appContext);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(0);
  const [modal, setModal] = useState(false);

  // copy comsult id
  const handleCopyClick = (value) => {
    // Create a temporary textarea element to copy the text
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = value;
    document.body.appendChild(tempTextarea);
    // Select the text inside the textarea and copy it
    tempTextarea.select();
    document.execCommand("copy");
    // Remove the temporary textarea element
    document.body.removeChild(tempTextarea);
  };

  // get consult and presciption data with payment status
  const getData = () => {
    setLoader(true);
    ApiGet("patient/subscription_payment")
      .then((res) => {
        setData(res?.data?.data?.subscription_data);
        setLoader(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoader(false);
      });
  };
  // get consult and presciption data with payment status
  useEffect(() => {
    getData();
  }, []);

  // handle cancel and pause treatment
  const treatnentcancel = (status, id) => {
    const body = {
      subscriptionStatus: status,
      treatmentIds: [id],
    };
    ApiPost(`patient/change_subscription_status`, body)
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleQuestionTypeClick = (v) => {
    if (v?.questionType === "STI/STD") {
      window.open(
        "https://medicine-storage.s3.ap-southeast-2.amazonaws.com/64a39bbac3449e419cc1d1ea/document/FRENCHIE-MD-STI-FACT-SHEET-v1_1692167158918.pdf",
        "_blank"
      );
    } else if (v?.questionType === "Erectile Dysfunction") {
      window.open(
        "https://medicine-storage.s3.ap-southeast-2.amazonaws.com/64a39bbac3449e419cc1d1ea/document/FRENCHIE-MD-ED-FACT-SHEET-v1_1692166601314.pdf",
        "_blank"
      );
    } else if (v?.questionType === "Premature Ejaculation") {
      window.open(
        "https://medicine-storage.s3.ap-southeast-2.amazonaws.com/64a39bbac3449e419cc1d1ea/document/FRENCHIE-MD-PE-FACT-SHEET-v1_1692166612033.pdf",
        "_blank"
      );
    } else if (v?.questionType === "Thrush / Bacterial Vaginosis") {
      window.open(
        "https://medicine-storage.s3.ap-southeast-2.amazonaws.com/64a39bbac3449e419cc1d1ea/document/FRENCHIE-MD-THRUSH-BV-FACT-SHEET_1692166633499.pdf",
        "_blank"
      );
    } else if (v?.questionType === "Urinary Tract Infection") {
      window.open(
        "https://medicine-storage.s3.ap-southeast-2.amazonaws.com/64a39bbac3449e419cc1d1ea/document/FRENCHIE-MD-UTI-FACT-SHEET-V1_1692166560592.pdf",
        "_blank"
      );
    }
  };

  const handleButtonClick = (val) => {
    localStorage.setItem("payid", val?._id);
    localStorage.setItem("subscriptionType", val?.subscriptionType);

    const dataToStore = {
      label: val?.label,
      price: val?.price,
    };

    const dataToStoreJSON = JSON.stringify(dataToStore);

    localStorage.setItem("myData", dataToStoreJSON);
  };

  return (
    <>
      <div className="chatscreen admindashboard patient_order_main_sec">
        <div className="loader">
          <Row>
            <Col lg={2}>
              <SideDrawer />
            </Col>
            <Col
              lg={10}
              style={{
                height: "100vh",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Header />
              <div className="activepatient inner_div_dashboard h-100">
                <div className="titlepatient d-flex justify-content-between align-items-center">
                  <h4>Consult</h4>
                </div>
                {/* consult list */}
                {data?.map((val, i) => {
                  return (
                    <div className=" border mt-3">
                      <div
                        className="row background-blue height-unset align-items-center py-2 cursor-pointer"
                        style={{
                          color: "#EDF1F4",
                          fontSize: "17px",
                          fontFamily: "Inter",
                        }}
                        onClick={() => (show === i ? setShow() : setShow(i))}
                      >
                        <div className="col-1 border-end d-flex align consultno">
                          {i + 1 < 10 && "0"}
                          {i + 1}
                        </div>
                        <div className="col-10 flex-sm-row flex-column d-flex justify-content-between align-items-sm-center heading">
                          <div className="">
                            {val?.questionType === "STI/STD"
                              ? "STI Screening"
                              : val?.questionType}
                          </div>
                          <div className="">
                            <button className="inprogress-btn px-3 py-1 resfontpayment">
                              {val?.subscriptionType === 0 ? (
                                <>
                                  {val?.payment === 1
                                    ? "Pause"
                                    : val?.payment === 0
                                    ? "In Progress"
                                    : val?.payment === 2
                                    ? "Cancel"
                                    : val?.payment === 4
                                    ? "In Progress"
                                    : "Payment Pending"}
                                </>
                              ) : (
                                <>
                                  {val?.consultpaymentStatus === 1
                                    ? "In Progress"
                                    : val?.consultpaymentStatus === 0
                                    ? "Payment Pending"
                                    : val?.consultpaymentStatus === 2
                                    ? "Payment Failed"
                                    : val?.consultpaymentStatus === 3
                                    ? "Payment Cancel"
                                    : "-"}
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="col-1 p-sm-3 p-0 d-flex align">
                          {show === i ? (
                            <RxCaretUp
                              size={23}
                              className="cursor-pointer"
                              onClick={() => setShow()}
                            />
                          ) : (
                            <RxCaretDown
                              size={23}
                              className="cursor-pointer"
                              onClick={() => setShow(i)}
                            />
                          )}
                        </div>
                      </div>
                      {show === i && (
                        <>
                          <div
                            className="d-flex align-items-center justify-content-between p-4 height-unset flex-wrap gapresp"
                            style={{ backgroundColor: "#F4F4F5" }}
                          >
                            <div>
                              <div className="payment-type">Payment Type</div>
                              <div className="mt-1 subscription mt-2">
                                {val?.subscriptionType === 0
                                  ? "Subscription"
                                  : "Consultation"}
                                {val?.subscriptionType === 0 ? (
                                  <FiRefreshCw
                                    size={20}
                                    color="#557c96"
                                    className="ms-2"
                                  />
                                ) : (
                                  <CiStethoscope
                                    size={20}
                                    color="#557c96"
                                    className="ms-2"
                                  />
                                )}
                              </div>
                            </div>
                            {val?.subscriptionType !== 1 && (
                              <div>
                                <div
                                  className="py-2 px-3 bg-white"
                                  style={{
                                    color: "#18181B",
                                    fontWeight: "400",
                                  }}
                                >
                                  Repeats left:{" "}
                                  <span
                                    className="rounded-circle ms-2"
                                    style={{
                                      backgroundColor: "#DCE4EA",
                                      color: "#18181B",
                                      padding: "4px 10px",
                                    }}
                                  >
                                    {val?.remainMonthDuration}
                                  </span>
                                </div>
                              </div>
                            )}
                            <div className="d-flex align-items-center">
                              <div
                                className="py-2 px-3 bg-white me-2"
                                style={{ color: "#18181B" }}
                              >
                                {val?.nextPaymentDate
                                  ? "Next Payment Date:"
                                  : "Date:"}{" "}
                                <span style={{ color: "#7796AB" }}>
                                  {" "}
                                  {val?.nextPaymentDate
                                    ? moment(val?.nextPaymentDate).format(
                                        "DD/MM/YYYY"
                                      )
                                    : val?.paymentDate
                                    ? moment(val?.paymentDate).format(
                                        "DD/MM/YYYY"
                                      )
                                    : moment(val?.createdAt).format(
                                        "DD/MM/YYYY"
                                      )}
                                </span>
                              </div>

                              {val?.subscriptionType === 0 &&
                                val?.payment !== 2 && (
                                  <Popover placement="bottom" shadow="none">
                                    <PopoverTrigger>
                                      <div
                                        style={{
                                          border: "none",
                                          outline: "none",
                                        }}
                                      >
                                        <div class="p-0 text-end" role="button">
                                          <IoSettingsOutline
                                            color="#7796AB"
                                            size={22}
                                          />
                                        </div>
                                      </div>
                                    </PopoverTrigger>
                                    <PopoverContent shadow="none">
                                      <div className="px-3 py-2 dropdowns">
                                        <div
                                          className="text-small font-bold"
                                          role="button"
                                          onClick={() =>
                                            treatnentcancel(
                                              val?.status === 1 ? 0 : "",
                                              val?.treatmentId
                                            )
                                          }
                                        >
                                          {val?.status === 1 ? (
                                            "Resume"
                                          ) : (
                                            <div onClick={() => setModal(true)}>
                                              Pause
                                            </div>
                                          )}
                                        </div>
                                        <div
                                          className="text-tiny"
                                          role="button"
                                          onClick={() =>
                                            treatnentcancel(2, val?.treatmentId)
                                          }
                                        >
                                          Cancel
                                        </div>
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                )}
                              {/* pause  consult modal*/}
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
                                    Please note, you subscription will be paused
                                    until further notice. If you have a
                                    prescription that is due to be shipped in
                                    the next 7 days the pause will take effect
                                    after that date.
                                  </p>
                                  <div className="text-center">
                                    <button
                                      className="btnreds text-center"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setModal(false);
                                        treatnentcancel(
                                          val?.status === 1 ? 0 : 1,
                                          val?.treatmentId
                                        );
                                      }}
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                </Modal>
                              )}
                            </div>
                          </div>
                          <div className="row p-0 p-sm-4 py-3 height-unset">
                            <div className="col-md-6">
                              <div className="box-consult p-3">
                                {val?.doctor?.length > 0 ? (
                                  <>
                                    <div className="inner-doctor">
                                      Your Doctor
                                    </div>
                                    <div className="d-flex align-items-center mt-4">
                                      <img
                                        src={
                                          val?.doctor[0]?.image
                                            ? Bucket + val?.doctor[0]?.image
                                            : img
                                        }
                                        alt=""
                                        height={34}
                                        width={34}
                                        className="rounded-circle"
                                      />
                                      <div className="doctor-name ms-3">
                                        {val?.doctor[0]?.firstName}{" "}
                                        {val?.doctor[0]?.lastName}
                                      </div>
                                      <div className="doctor-pronounce ms-2">{`(${val?.doctor[0]?.pronouns})`}</div>
                                    </div>
                                    <div className="doctor-desc mt-3 px-2 pb-4">
                                      {val?.doctor[0]?.bio}
                                    </div>
                                    <div className="d-flex justify-content-center">
                                      <div
                                        className="bg-white mt-3 rounded-circle cursor-pointer"
                                        style={{
                                          width: "fit-content",
                                          padding: "10px 13px",
                                        }}
                                        onClick={() =>
                                          navigate(`/ChatScreen`, {
                                            state: {
                                              doctorId: val?.doctor[0]?._id,
                                            },
                                          })
                                        }
                                      >
                                        <HiChatBubbleLeftRight
                                          color="#18181B"
                                          size={20}
                                        />
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="inner-doctor">
                                    Whilst our team are assigning you a doctor
                                    please feel free to read or download a fact
                                    sheet on{" "}
                                    <span
                                      className="question-type"
                                      role="button"
                                      onClick={() =>
                                        handleQuestionTypeClick(val)
                                      }
                                    >
                                      {val?.questionType === "STI/STD"
                                        ? "STI Screening"
                                        : val?.questionType}
                                    </span>
                                    .
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              {val?.subscriptionType === 0 && (
                                <div className="box-consult p-3">
                                  <div className="inner-doctor">Medication</div>

                                  <div className="d-flex align-items-center justify-content-between w-100 mt-3">
                                    <div className="medicine-name">
                                      {val?.treatment[0]?.drugName} ⓘ
                                    </div>
                                    <div className="medicine-price">
                                      {val?.treatment?.quantity}{" "}
                                      {val?.treatment?.form}
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div
                                className={
                                  "box-consult p-3 " +
                                  `${val?.treatment?.length > 0 ? "mt-3" : ""}`
                                }
                              >
                                <div className="inner-doctor">
                                  Payment Status
                                </div>
                                <div className="d-flex align-items-center justify-content-between w-100 mt-3">
                                  <div
                                    className={
                                      val?.paymentStatus === 1
                                        ? "medicine-name green-btn px-3 py-2"
                                        : "medicine-name red-btn px-3 py-2"
                                    }
                                  >
                                    {val?.paymentStatus === 1 ? (
                                      "Payment Successful"
                                    ) : val?.paymentStatus === 0 ? (
                                      <>
                                        <Link
                                          to={
                                            val?.payment !== 2
                                              ? val?.subscriptionType === 0
                                                ? `/TreatmentDetail/?name=${val?.questionType}`
                                                : "/payment1"
                                              : "#"
                                          }
                                          style={{
                                            cursor: "pointer",
                                            color: "#0065C0",
                                          }}
                                          onClick={() =>
                                            val?.payment !== 2
                                              ? handleButtonClick(val)
                                              : () => {}
                                          }
                                        >
                                          Payment Pending{" "}
                                          <FiArrowUpRight
                                            style={{ fontSize: "23px" }}
                                          />
                                        </Link>
                                      </>
                                    ) : (
                                      "Payment Failed"
                                    )}
                                  </div>
                                  <div className="medicine-price">
                                    ${val?.paymentAmount}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {val?.order?.length > 0 && (
                            <>
                              <div className="border-bottom height-unset"></div>
                              <div className="mt-5 mb-5">
                                <div className="gapresp">
                                  <div className="align">
                                    <div className="text-center">
                                      <div className="table-header">
                                        Order No.
                                      </div>
                                      <div className="table-cell">
                                        {" "}
                                        {val?.order?.length > 0 &&
                                          val?.order[0]?.orderNumber?.substring(
                                            0,
                                            4
                                          ) + "..."}{" "}
                                        <span className="ms-2 cursor-pointer">
                                          <BiCopy
                                            onClick={() => {
                                              handleCopyClick(
                                                val?.order[0]?.orderNumber
                                              );
                                              SuccessToast(
                                                "Copy Successfully!"
                                              );
                                            }}
                                          />
                                        </span>{" "}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="align">
                                    <div className="text-center">
                                      <div className="table-header">QTY</div>
                                      <div className="table-cell">
                                        {
                                          val?.order[0]
                                            ?.quantity_of_unit_per_subscription
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div className="align">
                                    <div className="text-center">
                                      <div className="table-header">
                                        Order Status
                                      </div>
                                      <div className="table-cell">
                                        {val?.order[0]?.status === 0 &&
                                          "Awaiting Payment"}{" "}
                                        {val?.order[0]?.status === 1 &&
                                          "Dispensing"}{" "}
                                        {val?.order[0]?.status === 2 &&
                                          "Shipped"}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="align">
                                    <div className="text-center">
                                      <div className="table-header">
                                        Tracking Number
                                      </div>
                                      <div className="table-cell">
                                        {val?.shipmentCode
                                          ? val?.shipmentCode
                                          : "-"}
                                        <span className="ms-2 cursor-pointer">
                                          <BiCopy
                                            onClick={() => {
                                              handleCopyClick(
                                                val?.shipmentCode
                                              );
                                              SuccessToast(
                                                "Copy Successfully!"
                                              );
                                            }}
                                          />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* <div className="copyright mt-3">
                <p>©2023 Frenchie M.D Pty Ltd</p>
              </div> */}
            </Col>
          </Row>
          {loader && <Loader />}
        </div>
      </div>
    </>
  );
};

export default Consult;
