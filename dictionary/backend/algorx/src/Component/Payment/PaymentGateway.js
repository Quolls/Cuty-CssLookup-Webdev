import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiGet, ApiPost } from "../../helpers/API/API_data";
import swal from "sweetalert";
import { ErrorToast } from "../Toaster/Toaster";
import { Col, Row } from "reactstrap";
import { GoPerson } from "react-icons/go";
import { MdLock, MdOutlineCreditCard } from "react-icons/md";
import { getCardType } from "../Payment/cardTypes";
import { formatExpirationDate } from "../Payment/cardTypes";
import PaymentAdress from "./PaymentAdress";
import { appContext } from "../../helpers/AppContext";
import CouponCode from "../../Page/Payment/CouponCode";

const PaymentGateway = ({
  amount,
  discountCode,
  setPaymentData,
  paymenttype,
  discount,
  couponNumber,
  setCouponNumber,
  buttonClicked,
  error,
  isPay,
  HandleApply,
}) => {
  const location = useLocation();
  const pathname = window?.location?.pathname;
  const navigate = useNavigate();
  const boxRef = useRef(null);

  const amountString = amount?.toString();
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumbernew, setCardNumbernew] = useState("");
  const [cardcvv, setcardcvv] = useState("");
  const [ExpirtMonth, setExpirtMonth] = useState("");
  const [ExpiryYear, setExpiryYear] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [treatpay, setTreatpay] = useState("");
  const [useNewAddress, setUseNewAddress] = useState(true);

  const [paymentAdress, setPaymentAdress] = useState({
    address: "",
    suburb: "",
    state: "",
    postcodeZip: "",
    country: "Australia",
    street: "",
  });

  const { isMobile } = React.useContext(appContext);

  const patientdetails = JSON.parse(localStorage.getItem("logindata"));
  useEffect(() => {}, []);
  const questionTypes = JSON.parse(localStorage.getItem("questionTypes"));
  const myData = JSON.parse(localStorage.getItem("myData"));

  const questionId = questionTypes?.questionId;
  const payid = localStorage.getItem("payid");

  const subId = location?.state?.treatmentId;
  const isDoctor = paymenttype;

  let newcondition = JSON.parse(localStorage?.getItem("newcondition"));

  const handleInputChange = ({ target }) => {
    if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
      setExpirtMonth(target?.value.slice(0, 2));
      setExpiryYear(target?.value.slice(3, 5));
    }
    this.setState({ [target.name]: target.value });
  };

  const updateCardNumber = function (e) {
    const regex = /^[0-9]{0,16}$/;
    let num = e.target.value.replaceAll(" ", "");
    if (regex.test(num)) {
      let ctype = getCardType(num).toLowerCase();
      ctype = ctype.length === 0 ? "visa" : ctype;
      if (ctype === "amex") {
        let tempCardNumber = (
          num.slice(0, 4).replace(/(.{4})/g, "$1 ") +
          num.slice(4, 10).replace(/(.{6})/g, "$1 ") +
          num.slice(10, 15)
        ).trim();
        setCardNumber(tempCardNumber);
      } else setCardNumber(num.replace(/(.{4})/g, "$1 ").trim());

      setCardNumbernew(num);
    }
  };

  const updateActiveBox = (x, y, width, height) => {
    boxRef.current.style.display = "block";
    boxRef.current.style.borderColor = "darkgray";
    boxRef.current.style.transform = `translate(${x}rem,${y}rem)`;
    boxRef.current.style.height = `${height}rem`;
    boxRef.current.style.width = `${width}rem`;
    boxRef.current.style.backgroundColor = "#F4F4F5";
  };

  const boxAtCardNumber = () => {
    updateActiveBox("0", "0", "21", "3");
  };
  const resetBox = () => {
    boxRef.current.style.borderColor = "transparent";
    boxRef.current.style.transform = "translate(0,0)";
  };

  const updateCVV = function (e) {
    const regex = /^[0-9]{0,4}$/;
    if (regex.test(e.target.value)) {
      setcardcvv(e.target.value);
    }
  };
  const subscriptionType = JSON.parse(localStorage.getItem("subscriptionType"));
  const handlesubmit = (e) => {
    setLoading(true);

    const body = {
      currency: "AUD",
      amount: amountString,
      cardExpiryMonth: ExpirtMonth,
      cardNumber: cardNumbernew,
      cardExpiryYear: 20 + ExpiryYear,
      cardCVV: cardcvv,
      customerName: customerName,
      street1: paymentAdress?.street || treatpay?.billingAddress,
      city: paymentAdress?.suburb || treatpay?.city,
      zip: paymentAdress?.postcodeZip || treatpay?.postcode,
      state: paymentAdress?.state || treatpay?.state,
      country: "Australia",
      couponCode: discountCode,
    };
    ApiPost("patient/paymentInitial", body)
      .then((res) => {
        if (res?.data?.status === 200) {
          const paymentId = res?.data?.data?.Result?.PaymentID;
          const providerTransactionNumber =
            res?.data?.data?.ProviderResps?.ProviderResp[0]
              ?.ProviderTransactionNumber;

          let ext;

          if (
            newcondition?.questionType === "Urinary Tract Infection" &&
            newcondition?.treatmentStatus === 3
          ) {
            ext =
              pathname === "/payment1"
                ? payid
                : pathname === "/payment"
                ? questionTypes?.consultation_id
                : pathname === "/paymentSummary"
                ? questionTypes?.consultation_id
                : "";
          } else if (
            newcondition?.questionType === "STI/STD" &&
            newcondition?.treatmentStatus === 3
          ) {
            ext =
              pathname === "/payment1"
                ? payid
                : pathname === "/payment"
                ? questionTypes?.consultation_id
                : pathname === "/paymentSummary"
                ? questionTypes?.consultation_id
                : "";
          } else if (
            newcondition?.questionType === "Premature Ejaculation" &&
            newcondition?.treatmentStatus === 3
          ) {
            ext =
              pathname === "/payment1"
                ? payid
                : pathname === "/payment"
                ? questionTypes?.consultation_id
                : pathname === "/paymentSummary"
                ? questionTypes?.consultation_id
                : "";
          } else if (
            newcondition?.questionType === "Erectile Dysfunction" &&
            newcondition?.treatmentStatus === 3
          ) {
            ext =
              pathname === "/payment1"
                ? payid
                : pathname === "/payment"
                ? questionTypes?.consultation_id
                : pathname === "/paymentSummary"
                ? questionTypes?.consultation_id
                : "";
          } else if (
            newcondition?.questionType === "Thrush / Bacterial Vaginosis" &&
            newcondition?.treatmentStatus === 3
          ) {
            ext =
              pathname === "/payment1"
                ? payid
                : pathname === "/payment"
                ? questionTypes?.consultation_id
                : pathname === "/paymentSummary"
                ? questionTypes?.consultation_id
                : "";
          } else {
            if (subscriptionType || subscriptionType == 0) {
              if (subscriptionType == 1) {
                ext =
                  pathname === "/payment1"
                    ? payid
                    : pathname === "/payment"
                    ? questionTypes?.consultation_id
                    : pathname === "/paymentSummary"
                    ? questionTypes?.consultation_id
                    : "";
              } else {
                ext = "";
              }
            } else {
              ext =
                pathname === "/payment1"
                  ? payid
                  : pathname === "/payment"
                  ? questionTypes?.consultation_id
                  : pathname === "/paymentSummary"
                  ? questionTypes?.consultation_id
                  : "";
            }
          }
          // debugger

          const body1 = {
            cardNumber: cardNumbernew,
            cardExpiryMonth: ExpirtMonth,
            cardExpiryYear: 20 + ExpiryYear,
            cardCVV: cardcvv,
            customerName: customerName,
            street1: paymentAdress?.street || treatpay?.billingAddress,
            city: paymentAdress?.suburb || treatpay?.city,
            zip: paymentAdress?.postcodeZip || treatpay?.postcode,
            state: paymentAdress?.state || treatpay?.state,
            country: paymentAdress?.country,
            amount: amountString,
            email: patientdetails?.email,
            transactionNumber: providerTransactionNumber,
            novattiPaymentIntentId: paymentId,
            questionType:
              pathname === "/payment1"
                ? myData?.label
                : pathname === "/payment"
                ? questionTypes?.label
                : pathname === "/paymentSummary"
                ? questionTypes?.label
                : isDoctor?.type,
            treatmentId: subId,
            treatmentIds: isDoctor?.id,
            isDoctorAssigned: isDoctor?.isDoctorAssigned,
            paymentStatus: 1,
            params: {
              treatmentId: subId,
              treatmentIds: isDoctor?.id,
              questionId: questionId,
            },
            patientId: patientdetails?._id,
            consultation_id: ext,
            discount,
          };
          ApiPost("patient/save_payment", body1)
            .then((res) => {
              localStorage.setItem(
                "paymentdata",
                JSON.stringify(res?.data?.data)
              );

              if (res?.data?.message) {
                if (newcondition) {
                  localStorage.removeItem("newcondition");
                }
                //
                swal({
                  title: "payment successful!",
                  icon: "success",
                  confirmButtonText: "OK",
                }).then(function () {
                  if (window.location.pathname === "/paymentSummary") {
                    setPaymentData({ ...body, status: 200 });
                  } else if (window.location.pathname === "/payment") {
                    navigate("/dashboard");
                  } else {
                    navigate("/ManageTreatment");
                  }
                });
              } else {
                if (res?.data?.error) {
                  swal({
                    title: "payment unsuccessful!",
                    icon: "error",
                    confirmButtonText: "OK",
                  });
                }
              }
            })
            .catch((err) => {
              console.log("err", err);
              setLoading(false);
            });
        }
      })
      .catch((err) => {
        console.log("err", err);

        if (
          err?.message === "Encountering an error during the payment process!"
        ) {
          ErrorToast(err?.data?.Result?.ResponseMessage);
        } else {
          ErrorToast(err?.message);
        }
        setLoading(false);
      });
  };

  const handletreatpayment = () => {
    ApiGet("patient")
      .then(async (res) => {
        setTreatpay(res?.data?.data[0]);
      })
      .catch((error) => {
        if (error?.status === 410) {
          ErrorToast(error?.message);
          localStorage.removeItem("userData");
          localStorage.removeItem("token");

          setTimeout(() => {
            navigate("/");
          }, 100);
        }
        console.log("error👌", error);
      });
  };

  return (
    <>
      <div className="card_title card_title1">Card details</div>
      <div className="textcard mt-3 mb-3">
        {window.location.pathname === "/payment1" ||
        window.location.pathname === "/payment"
          ? "Once you’ve completed your payment we will assign you a suitable treating doctor. They will review your quiz and reach out to schedule a short chat to discuss your health condition."
          : "After you make the payment, you will have an option to schedule a call/video call with a doctor. Don’t  worry, if you don’t wish to procced with your plan after the chat. you will be fully refunded. No strings attached."}
      </div>

      <Row className="h-auto mb-2">
        <Col className="h-auto m-0 p-0">
          <div className="namecard mt-4">
            <GoPerson className="me-2" />
            Name
          </div>
          <input
            type="text"
            placeholder="Name"
            className="nameinput mt-2"
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value.trimStart())}
          />
        </Col>
      </Row>

      <Row className="h-auto mb-2">
        <Col className="h-auto m-0 p-0">
          <div className="namecard mt-4">
            <MdOutlineCreditCard className="me-2" />
            Credit Card Number
          </div>
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            className="form-control1 nameinput mt-2"
            onChange={updateCardNumber}
            onFocus={boxAtCardNumber}
            onBlur={resetBox}
          />
        </Col>
      </Row>

      <Row className="h-auto mb-2 gap-2">
        <Col className=" m-0 p-0">
          <div className="namecard mt-4 mb-2">Expire Date</div>
          <input
            type="text"
            name="expiry"
            className="form-control1 nameinput"
            placeholder="MM/YY"
            pattern="\d\d/\d\d"
            required
            onChange={handleInputChange}
          />
        </Col>
        <Col className="m-0 p-0">
          <div className="namecard mt-4">Card CVV</div>
          <input
            type="text"
            maxLength="3"
            pattern="[0-9]{3}"
            placeholder="000"
            className="nameinput mt-2"
            name="cardCVV"
            onChange={updateCVV}
          />
        </Col>
      </Row>

      <Row className="h-auto">
        <Col className="m-0 p-0">
          <div></div>
        </Col>
      </Row>

      {location.pathname !== "/paymentSummary" && (
        <div className="d-flex gap-4 mt-4">
          <div class="form-check gap-2 w-100 d-flex">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked={useNewAddress}
              onChange={() => setUseNewAddress(true)}
            />
            <label class="form-check-label1" for="flexRadioDefault2">
              New Address
            </label>
            <div
              class="form-check gap-2 mb-0 d-flex"
              onClick={handletreatpayment}
            >
              <input
                class="form-check-input "
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked={!useNewAddress}
                onChange={() => setUseNewAddress(false)}
              />
              <label class="form-check-label1" for="flexRadioDefault1">
                Existing Address
              </label>
            </div>
          </div>
        </div>
      )}

      {useNewAddress ? (
        <>
          <PaymentAdress
            paymentAdress={paymentAdress}
            setPaymentAdress={setPaymentAdress}
          />
        </>
      ) : (
        <>
          <Row className="h-auto mb-2">
            <Col className="h-auto m-0 p-0">
              <div className="namecard mt-4">Address</div>
              <input
                type="text"
                placeholder="Name"
                className="nameinput mt-2"
                name="customerName"
                value={`${
                  treatpay?.billingAddress ? treatpay?.billingAddress : ""
                } ${treatpay?.billingAddress ? "," : ""} ${
                  treatpay?.city ? treatpay?.city : ""
                } ${treatpay?.state ? treatpay?.state : ""} ${
                  treatpay?.postcode ? treatpay?.postcode : ""
                }${treatpay?.postcode ? "," : ""} ${
                  treatpay?.country ? treatpay?.country : ""
                }`}
                readOnly={true}
              />
            </Col>
          </Row>
          <Row className="h-auto mb-2 gap-2">
            <Col className=" m-0 p-0">
              <div className="namecard mt-4">Suburb</div>
              <input
                type="text"
                placeholder="Suburb"
                className="nameinput mt-2"
                name="city"
                id="city"
                value={treatpay?.city}
              />
            </Col>

            <Col className=" m-0 p-0">
              <div className="namecard mt-4">State</div>
              <input
                type="text"
                placeholder="State"
                className="nameinput mt-2"
                name="state"
                value={treatpay?.state}
              />
            </Col>
          </Row>

          <Row className="h-auto mb-2 gap-2">
            <Col className=" m-0 p-0">
              <div className="namecard mt-4 text-[#18181B]">
                Postcode or Zip
              </div>
              <input
                type="text"
                placeholder="Postcode or Zip"
                className="nameinput mt-2 text-[#18181B]"
                name="zip"
                pattern="[0-9]{6}"
                value={treatpay?.postcode}
                list="streetOptions"
                style={{ border: "1px solid #18181B" }}
              />
            </Col>

            <Col className=" m-0 p-0">
              <div className="namecard mt-4">Country</div>
              <input
                type="text"
                placeholder="Country"
                maxLength="6"
                className="nameinput mt-2"
                name="country"
                value={"Australia"}
              />
            </Col>
          </Row>
        </>
      )}

      {isMobile ? null : (
        <CouponCode
          couponNumber={couponNumber}
          setCouponNumber={setCouponNumber}
          buttonClicked={buttonClicked}
          error={error}
          isPay={isPay}
          HandleApply={HandleApply}
        />
      )}

      <button
        type="button"
        className="paymentbtn w-100 mt-4 gap-5 "
        onClick={() => handlesubmit()}
        disabled={loading}
      >
        {loading ? "Loading....." : "Make Payment"}
        <MdLock />
      </button>
    </>
  );
};

export default PaymentGateway;
