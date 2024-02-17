import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import tab__ from "../../Assets/images/tab__.png";
import truak from "../../Assets/images/truak.png";
import Injection from "../../Assets/images/injection.png";
import tick_circle from "../../Assets/images/tick-circle.png";
import PaymentGateway from "../../Component/Payment/PaymentGateway";
import { useEffect } from "react";
import { useState } from "react";
import { ApiGet } from "../../helpers/API/API_data";
import { ErrorToast, SuccessToast } from "../../Component/Toaster/Toaster";
import moment from "moment";

const TreatmentDetailSummary = ({
  treatnentData,
  paymenttype,
  nextPaymentDate,
}) => {
  const typePurchase = window?.location?.search.split("name=")[1];
  const [totalPayment, setTotalPayment] = useState();
  const [error, setError] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);

  const [discountCode, setDiscountCode] = useState();
  const [code, setCode] = useState();

  const [discount, setDiscount] = useState();

  useEffect(() => {
    treatnentData &&
      setTotalPayment(
        treatnentData
          .filter((res) => res?.paymentStatus !== 1)
          .reduce((prev, curr, index, array) => prev + curr.price, 0)
      );
  }, [treatnentData]);
  const HandleApply = async () => {
    if (!buttonClicked) {
      await ApiGet(
        `patient/validate_coupon?couponCode=${discountCode}&typePurchase=${typePurchase}&price=${
          (totalPayment || totalPayment == 0) && `${totalPayment}`
        }`
      )
        .then((res) => {
          SuccessToast(res?.data?.message);
          const discountDat = res?.data?.data;

          if (discountDat.discountType === 0) {
            discountDat.discount > totalPayment
              ? setTotalPayment(0)
              : setTotalPayment(totalPayment - discountDat.discount);
            setDiscount(
              discountDat.discount > totalPayment
                ? totalPayment
                : discountDat.discount
            );
          } else {
            const percentAmout = (totalPayment * discountDat.discount) / 100;
            percentAmout > totalPayment
              ? setTotalPayment(0)
              : setTotalPayment(totalPayment - percentAmout);
            setDiscount(
              percentAmout > totalPayment ? totalPayment : percentAmout
            );
          }
          setError(res?.data?.message);
          setDiscountCode("");
          setButtonClicked(true);
          setCode(discountCode);
        })
        .catch((e) => {
          ErrorToast(e.message);
        });
    }
  };

  return (
    <>
      <div className="payment_summary_component">
        <h1> What's Next?</h1>
        <p>
          Your treatment will be dispensed and sent by our partner pharmacy.
        </p>
      </div>
      <div className="payment_summary_component">
        {(totalPayment || totalPayment == 0) && (
          <div className="crad crad1">
            <div className="medicinlist">
              <Form>
                <Row>
                  <Col lg={6}>
                    <div className="card_title card_title1">
                      Confirm your order
                    </div>
                    {/* apply coupon */}
                    <Row className="mt-4 h-auto gap-2 resgap">
                      <Col lg={8} className="m-0 p-0">
                        <div className="medicininput coupn">
                          <input
                            type="text"
                            className="rounded"
                            placeholder="Enter Coupon Code"
                            name="itemNumber"
                            onChange={(e) => setDiscountCode(e.target.value)}
                            value={discountCode}
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="btnnext mt-0">
                          <button
                            type={"button"}
                            onClick={() => (discount ? "" : HandleApply())}
                            disabled={buttonClicked}
                          >
                            {buttonClicked ? "Applied" : "Apply"}
                          </button>
                        </div>
                      </Col>
                      <div>
                        <p style={{ color: "#18181B", fontSize: "15px" }}>
                          {error ? error : ""}
                        </p>
                      </div>
                    </Row>
                    {/* payment summary */}
                    <div className="shynetreat mt-3" style={{ color: "black" }}>
                      {treatnentData &&
                        treatnentData.map((res) => {
                          if (res?.paymentStatus !== 1) {
                            return (
                              <div className="card_detail1 mt-2 d-flex justify-content-between gap-5">
                                <div
                                  className="imgin"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "20px",
                                  }}
                                >
                                  <img src={tab__} alt="" width="20px" />
                                  <div style={{ textAlign: "start" }}>
                                    <div
                                      className="prepdiv"
                                      style={{ fontSize: "17px" }}
                                    >
                                      {res?.treatmentName}
                                    </div>
                                    <div
                                      className="sub_title1 mt-1 prepdiv"
                                      style={{
                                        fontSize: "15px",
                                        opacity: "0.7",
                                      }}
                                    >{`$${res?.monthly_subscription_cost} /month`}</div>
                                  </div>
                                </div>
                                <div
                                  className="prepdiv"
                                  style={{ opacity: "0.7", fontSize: "17px" }}
                                >{`$${res?.price}`}</div>
                              </div>
                            );
                          }
                        })}
                      <div className="card_detail1 mt-2  d-flex justify-content-between">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                          }}
                        >
                          <img src={Injection} alt="" width="20px" />
                          <div style={{ textAlign: "start" }}>
                            <div
                              className="prepdiv"
                              style={{ fontSize: "17px" }}
                            >
                              Ongoing Care{" "}
                            </div>
                            <div
                              className="sub_title1 mt-1 prepdiv"
                              style={{ fontSize: "15px", opacity: "0.7" }}
                            >
                              Online Check-in with doctor or nurse
                            </div>
                          </div>
                        </div>
                        <div
                          className="prepdiv"
                          style={{ opacity: "0.7", fontSize: "15px" }}
                        >
                          Included
                        </div>
                      </div>
                      <div className="card_detail1 mt-2  d-flex justify-content-between mb-4">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                          }}
                        >
                          <img src={truak} alt="" width="20px" height="20px" />
                          <div style={{ textAlign: "start" }}>
                            <div
                              className="prepdiv"
                              style={{ fontSize: "17px" }}
                            >
                              Shipping
                            </div>
                            <div
                              className="sub_title1 mt-1 prepdiv"
                              style={{ fontSize: "15px", opacity: "0.7" }}
                            >
                              Fast, discreet delivery
                            </div>
                          </div>
                        </div>
                        <div
                          className="prepdiv"
                          style={{ opacity: "0.7", fontSize: "15px" }}
                        >
                          Included
                        </div>
                      </div>
                      <hr style={{ color: "#526E82" }} />
                      {discount && (
                        <>
                          <div className="card_detail1 my-2  d-flex justify-content-between">
                            <div className="text-start">
                              <div
                                className="prepdiv"
                                style={{ fontSize: "17px" }}
                              >
                                Sub Total
                              </div>
                            </div>
                            <div
                              className="prepdiv"
                              style={{ opacity: "0.7", fontSize: "15px" }}
                            >
                              {" "}
                              {discount && `$${totalPayment + discount}`}{" "}
                            </div>
                          </div>
                          <div className="card_detail1 my-2  d-flex justify-content-between">
                            <div className="text-start">
                              <div
                                className="prepdiv"
                                style={{ fontSize: "17px" }}
                              >
                                Discount - {discountCode}
                              </div>
                            </div>
                            <div
                              className="prepdiv"
                              style={{ opacity: "0.7", fontSize: "15px" }}
                            >
                              {" "}
                              {discount && `- $${discount}`}{" "}
                            </div>
                          </div>{" "}
                          <hr style={{ color: "#526E82" }} />
                        </>
                      )}

                      {treatnentData &&
                        treatnentData.map((res, i) => {
                          if (i === 0) {
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
                                <div className="card_detail1 mt-4  d-flex justify-content-between">
                                  <div className="text-start">
                                    <div
                                      className="prepdiv"
                                      style={{ fontSize: "17px" }}
                                    >
                                      Total{" "}
                                      {treatnentData[0]?.actual_frequency !==
                                        0 &&
                                        `- ${treatnentData[0]?.actual_frequency} month supply`}{" "}
                                    </div>
                                    <div
                                      className="sub_title1 mt-2 prepdiv"
                                      style={{
                                        fontSize: "15px",
                                        opacity: "0.7",
                                      }}
                                    >
                                      {treatnentData[0]?.actual_frequency !==
                                        0 &&
                                        `Next payment due ${moment(
                                          nextPaymentDate
                                        ).format("DD-MM-YYYY")} `}
                                    </div>
                                  </div>
                                  <div
                                    className="prepdiv"
                                    style={{ opacity: "0.7", fontSize: "15px" }}
                                  >
                                    {" "}
                                    {(totalPayment || totalPayment == 0) &&
                                      `$${totalPayment}`}{" "}
                                  </div>
                                </div>
                              );
                            }
                          } else if (treatnentData?.length === 1) {
                            return (
                              <div className="card_detail1 my-4  d-flex justify-content-between">
                                <div className="text-start">
                                  <div className="prepdiv">
                                    Total{" "}
                                    {treatnentData[0]?.actual_frequency !== 0 &&
                                      `- ${treatnentData[0]?.actual_frequency} month supply`}{" "}
                                  </div>
                                </div>
                                <div
                                  className="prepdiv"
                                  style={{ opacity: "0.7" }}
                                >
                                  {" "}
                                  {(totalPayment || totalPayment == 0) &&
                                    `$${totalPayment}`}{" "}
                                </div>
                              </div>
                            );
                          }
                        })}
                    </div>
                    {/* Our Promise */}
                    <div className="crad2 mt-4">
                      <div className="card_detail">
                        <p>Our Promise</p>
                      </div>
                      <div className="card_detail mb-2">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <img src={tick_circle} alt="" width="20px" />
                          <p style={{ fontSize: "13.5px" }}>
                            Doctor will review your questions within hours not
                            days
                          </p>
                        </div>
                      </div>
                      <div className="card_detail mb-2">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <img src={tick_circle} alt="" width="20px" />
                          <p style={{ fontSize: "13.5px" }}>
                            Best treatments available at lowest possible price
                          </p>
                        </div>
                      </div>
                      <div className="card_detail mb-2">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <img src={tick_circle} alt="" width="20px" />
                          <p style={{ fontSize: "13.5px" }}>
                            Fast, discreet and free delivery of your treament
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  {/* card details */}
                  <Col lg={6}>
                    <div className="cardDetailForm">
                      {(totalPayment || totalPayment == 0) && (
                        <PaymentGateway
                          amount={totalPayment}
                          navigateTo={"/ManageTreatment"}
                          discount={discount}
                          discountCode={code}
                          setPaymentData={() => {}}
                          paymenttype={paymenttype}
                        />
                      )}
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TreatmentDetailSummary;
