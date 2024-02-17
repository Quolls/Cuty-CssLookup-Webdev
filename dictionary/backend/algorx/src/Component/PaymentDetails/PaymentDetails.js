import "./PaymentDetails.css";
import React, { useState } from "react";
import Logo from "../../Assets/images/logo.png";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreditCardInput from "react-credit-card-input";

const PaymentDetails = () => {
  const [data, setData] = useState({});
  const [number, setnumber] = useState("");
  const [loader, setloader] = useState(false);
  const [cvc, setcvc] = useState("");
  const [date, setdate] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const stripePayment = async () => {
    navigate("/ChatScreen");
  };
  return (
    <>
      <section className="condition ">
        <div className="loginimglogo conlogo">
          <img src={Logo} alt="" />
        </div>
        <div className="conditionmain">
          <div className="borderdiv payment">
            <div className="paymentDetails">
              <div className="paymentheading">
                <h3>Payment Details</h3>
              </div>
              <div className="paymentinfo">
                <Row>
                  <Col lg={6}>
                    <div className="profiledetail">
                      <span>
                        <svg
                          width="12"
                          height="17"
                          viewBox="0 0 12 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 16.5H10.5V15C10.5 14.4033 10.2629 13.831 9.84099 13.409C9.41903 12.9871 8.84674 12.75 8.25 12.75H3.75C3.15326 12.75 2.58097 12.9871 2.15901 13.409C1.73705 13.831 1.5 14.4033 1.5 15V16.5H0V15C0 14.0054 0.395088 13.0516 1.09835 12.3483C1.80161 11.6451 2.75544 11.25 3.75 11.25H8.25C9.24456 11.25 10.1984 11.6451 10.9017 12.3483C11.6049 13.0516 12 14.0054 12 15V16.5ZM6 9.75C5.40905 9.75 4.82389 9.6336 4.27792 9.40746C3.73196 9.18131 3.23588 8.84984 2.81802 8.43198C2.40016 8.01412 2.06869 7.51804 1.84254 6.97208C1.6164 6.42611 1.5 5.84095 1.5 5.25C1.5 4.65905 1.6164 4.07389 1.84254 3.52792C2.06869 2.98196 2.40016 2.48588 2.81802 2.06802C3.23588 1.65016 3.73196 1.31869 4.27792 1.09254C4.82389 0.866396 5.40905 0.75 6 0.75C7.19347 0.75 8.33807 1.22411 9.18198 2.06802C10.0259 2.91193 10.5 4.05653 10.5 5.25C10.5 6.44347 10.0259 7.58807 9.18198 8.43198C8.33807 9.27589 7.19347 9.75 6 9.75ZM6 8.25C6.79565 8.25 7.55871 7.93393 8.12132 7.37132C8.68393 6.80871 9 6.04565 9 5.25C9 4.45435 8.68393 3.69129 8.12132 3.12868C7.55871 2.56607 6.79565 2.25 6 2.25C5.20435 2.25 4.44129 2.56607 3.87868 3.12868C3.31607 3.69129 3 4.45435 3 5.25C3 6.04565 3.31607 6.80871 3.87868 7.37132C4.44129 7.93393 5.20435 8.25 6 8.25Z"
                            fill="#18181B"
                          />
                        </svg>
                        First Name
                      </span>
                      <input
                        type="text"
                        placeholder=""
                        name="firstName"
                        value={data?.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="profiledetail">
                      <span>Last Name</span>
                      <input
                        type="text"
                        placeholder=""
                        name="lastName"
                        value={data?.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="profiledetail">
                      <span className="mb-10">
                        <svg
                          width="16"
                          height="14"
                          viewBox="0 0 16 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.25 0.25H14.75C14.9489 0.25 15.1397 0.329018 15.2803 0.46967C15.421 0.610322 15.5 0.801088 15.5 1V13C15.5 13.1989 15.421 13.3897 15.2803 13.5303C15.1397 13.671 14.9489 13.75 14.75 13.75H1.25C1.05109 13.75 0.860322 13.671 0.71967 13.5303C0.579018 13.3897 0.5 13.1989 0.5 13V1C0.5 0.801088 0.579018 0.610322 0.71967 0.46967C0.860322 0.329018 1.05109 0.25 1.25 0.25V0.25ZM14 7H2V12.25H14V7ZM14 4V1.75H2V4H14Z"
                            fill="#18181B"
                          />
                        </svg>
                        Credit Card Details
                      </span>
                      <CreditCardInput
                        containerStyle={{
                          width: "100%",
                          background: "white",
                        }}
                        fieldClassName={{
                          background: "white",
                        }}
                        invalidStyle={{ border: "none" }}
                        dangerTextStyle={{ border: "none", display: "none" }}
                        fieldStyle={{
                          color: "black",
                          height: "46px",
                          border:
                            "1px solid rgba(204, 204, 204, 0.4) !important",
                        }}
                        inputStyle={{
                          color: "black",
                          border: "none",
                          marginTop: "0px !important",
                        }}
                        cardCVCInputRenderer={({
                          handleCardCVCChange,
                          props,
                        }) => (
                          <input
                            style={{ width: "60px" }}
                            {...props}
                            onChange={handleCardCVCChange((e) =>
                              setcvc(e.target.value)
                            )}
                          />
                        )}
                        cardExpiryInputRenderer={({
                          handleCardExpiryChange,
                          props,
                        }) => (
                          <input
                            {...props}
                            onChange={handleCardExpiryChange((e) =>
                              setdate(e.target.value)
                            )}
                          />
                        )}
                        cardNumberInputRenderer={({
                          handleCardNumberChange,
                          props,
                        }) => (
                          <input
                            {...props}
                            onChange={handleCardNumberChange((e) =>
                              setnumber(e.target.value)
                            )}
                          />
                        )}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="profiledetail">
                      <span>Billing Information</span>
                      <input
                        type="text"
                        placeholder=""
                        name="billingAddress"
                        value={data?.billingAddress}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="profiledetail">
                      <input
                        type="text"
                        placeholder="Enter city"
                        name="city"
                        value={data?.city}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="profiledetail">
                      <input
                        type="text"
                        placeholder="Enter state"
                        name="state"
                        value={data?.state}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="profiledetail">
                      <input
                        type="number"
                        placeholder="Enter postcode"
                        name="pincode"
                        value={data?.pincode}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="paybtn">
                <div className="payinfo">
                  <p>Total</p>
                  <h6>$25*per consultation</h6>
                </div>
                <div className="btnnext pay">
                  <button
                    type="button "
                    onClick={stripePayment}
                    className="btnFix"
                  >
                    {loader ? "loading..." : "Pay & Subscribe"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentDetails;
