import React from "react";
import Stethoscope from "../../../Assets/images/stethoscope.png";
import Filter from "../../../Assets/images/filter.png";
import Injection from "../../../Assets/images/injection.png";
import tick_circle from "../../../Assets/images/tick-circle.png";
import { Col, Form, Row } from "react-bootstrap";
import PaymentGateway from "../../../Component/Payment/PaymentGateway";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { patientSignUp } from "../../../redux/reducer/patientAuthSclice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "../../../Component/Toaster/Toaster";
import { useEffect } from "react";
import { ApiGet } from "../../../helpers/API/API_data";

const PaymentSummaryComponent = ({ questionTypes, userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [error, setError] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);

  const [paymentData, setPaymentData] = useState();

  const [price, setPrice] = useState();
  const [discountCode, setDiscountCode] = useState();
  const [code, setCode] = useState();

  const [discountData, setDiscountData] = useState();
  const [discountAmount, setDiscountAmount] = useState();
  let isPay = localStorage.getItem("isPay");
  let pathologyTestCharge = localStorage.getItem("pathologyTestCharge");

  useEffect(() => {
    if (isPay) {
      setPrice(Number(questionTypes?.price) + Number(pathologyTestCharge));
    } else {
      setPrice(questionTypes?.price);
    }
  }, [questionTypes?.price, isPay]);

  const signupSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords does not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const handleSignUp = (formData) => {
    if (paymentData?.status === 200) {
      const data = {
        email: userData?.email,
        password: formData?.password,
        address: paymentData?.street1,
        city: paymentData?.city,
        country: paymentData?.country,
        state: paymentData?.state,
        postcode: paymentData?.postcode,
      };

      dispatch(patientSignUp({ data, navigate }))
        .then((result) => {
          if (result?.payload?.status === 200) {
            localStorage.clear();
            navigate("/verify-email");
          } else {
            ErrorToast(result?.payload?.message);
          }
        })
        .catch((err) => {
        });
    } else {
      ErrorToast("Make your payment first!");
    }
  };

  const HandleApply = async () => {
    if (!buttonClicked) {
      await ApiGet(
        `patient/validate_coupon?couponCode=${discountCode}&condition=${questionTypes?.label}&price=${price}`
      )
        .then((res) => {
          SuccessToast(res?.data?.message);
          const discountDat = res?.data?.data;
          if (discountDat.discountType === 0) {
            discountDat.discount > price
              ? setPrice(0)
              : setPrice(price - Number(discountDat.discount));
            setDiscountAmount(
              discountDat.discount > price ? price : discountDat.discount
            );
          } else {
            let percentAmout = "";
            percentAmout = (price * discountDat.discount) / 100;
            percentAmout > price
              ? setPrice(0)
              : setPrice(price - Number(percentAmout));
            setDiscountAmount(percentAmout > price ? price : percentAmout);
          }
          setDiscountData(res?.data?.data);
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
        <h1>What's Next?</h1>
        <p>
          Your Doctor will review your answers and work on a <br /> suitable
          treatment plan.
        </p>
      </div>
      <div className="payment_summary_component">
       
        <div className="crad border shadow" style={{ background: "#f8f5f0" }}>
          <h1 className="card_title">Confirm your account details</h1>
          <h5 className="" style={{ color: "#F4F4F5" }}>
            This will allow you to login and check updates from your treating
            doctor.
          </h5>
          <div className="medicinlist mt-4">
            <Form>
              <Row>
                <Col lg={6} md={6}>
                  <div className="medicininput">
                    <span>Email</span>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      name="itemNumber"
                      value={userData?.email}
                      disabled
                    />
                  </div>
                </Col>
                <Col lg={6} md={6}>
                  <div className="medicininput">
                    <span>Phone</span>
                    <input
                      type="text"
                      placeholder="Enter your phone number"
                      name="itemNumber"
                      value={userData?.contactNumber}
                      disabled
                    />
                  </div>
                </Col>
                <Col lg={6} md={6}>
                  <div className="medicininput">
                    <span>Password</span>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      {...register("password")}
                    />
                    {errors?.password && (
                      <p className="validationError">
                        {errors?.password?.message}
                      </p>
                    )}
                  </div>
                </Col>
                <Col lg={6} md={6}>
                  <div className="medicininput">
                    <span>Confirm Password</span>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      name="confirmPassword"
                      {...register("confirmPassword")}
                    />
                    {errors?.confirmPassword && (
                      <p className="validationError">
                        {errors?.confirmPassword?.message}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
       
        {paymentData?.status !== 200 && (
          <div className="crad border shadow" style={{ background: "#f8f5f0" }}>
            <div className="medicinlist">
              <Form>
                <Row>
                  <Col lg={6}>
                    <div className="card_title card_title1">
                      Confirm your order
                    </div>
                    <Row className="mt-4 h-auto">
                      <Col lg={8}>
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
                            onClick={HandleApply}
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

                    <div className="shynetreat mt-3">
                   

                      <div className="card_detail1  d-flex justify-content-between">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                          }}
                        >
                          <img src={Stethoscope} alt="" width="25px" />
                          <div className="text-start">
                            <div
                              className="prepdiv"
                              style={{ fontSize: "18px" }}
                            >
                              Doctor's Consult
                            </div>
                            <div
                              style={{ fontSize: "14px", opacity: "0.7" }}
                              className="mt-2 prepdiv"
                            >
                              Experienced sexual health practioners
                            </div>
                          </div>
                        </div>
                        <p
                          className="prepdiv"
                          style={{ opacity: "0.7", fontSize: "17px" }}
                        >{`$${questionTypes?.price}`}</p>
                      </div>
                      <div className="card_detail1  d-flex justify-content-between mt-3">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                          }}
                        >
                          <img src={Filter} alt="" width="25px" />
                          <div className="text-start">
                            <div
                              className="prepdiv"
                              style={{ fontSize: "18px" }}
                            >
                              Additional Pathology Test/s
                            </div>
                            <div
                              style={{ fontSize: "14px", opacity: "0.7" }}
                              className="mt-2 prepdiv"
                            >
                              Medicare card not required
                            </div>
                          </div>
                        </div>
                        <div
                          className="prepdiv"
                          style={{ opacity: "0.7", fontSize: "17px" }}
                        >
                          {isPay === "true" ? "$50" : "Included"}
                        </div>
                      </div>
                      <div className="card_detail1  d-flex justify-content-between mt-3">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                          }}
                        >
                          <img src={Injection} alt="" width="25px" />
                          <div className="text-start">
                            <div
                              className="prepdiv"
                              style={{ fontSize: "18px" }}
                            >
                              Ongoing care
                            </div>
                            <div
                              style={{ fontSize: "14px", opacity: "0.7" }}
                              className="mt-2 prepdiv"
                            >
                              Online Check-in with doctor or nurse
                            </div>
                          </div>
                        </div>
                        <p
                          className="prepdiv"
                          style={{ opacity: "0.7", fontSize: "17px" }}
                        >
                          Included
                        </p>
                      </div>
                      <hr style={{ color: "#526E82" }} />
                      {discountData?.discount && (
                        <>
                          <div className="card_detail1  d-flex justify-content-between my-3">
                            <div
                              className="prepdiv"
                              style={{ fontSize: "18px" }}
                            >
                              Sub Total
                            </div>
                            <div
                              className="prepdiv"
                              style={{ opacity: "0.7", fontSize: "17px" }}
                            >
                              {isPay === "true"
                                ? `$ 130`
                                : `$${questionTypes?.price}`}
                            </div>
                          </div>
                          <div className="card_detail1  d-flex justify-content-between my-3">
                            <div
                              className="prepdiv"
                              style={{ fontSize: "18px" }}
                            >
                              Discount - {discountCode}
                            </div>
                            <div
                              className="prepdiv"
                              style={{ opacity: "0.7", fontSize: "17px" }}
                            >{`- $${discountAmount}`}</div>
                          </div>{" "}
                          <hr style={{ color: "#526E82" }} />
                        </>
                      )}
                      <div className="card_detail1  d-flex justify-content-between mt-3">
                        <div className="prepdiv" style={{ fontSize: "18px" }}>
                          Total
                        </div>
                        <div
                          className="prepdiv"
                          style={{ opacity: "0.7", fontSize: "17px" }}
                        >
                          $ {price || price == 0 ? price : ""}
                        </div>
                      </div>
                    </div>

                    <div className="crad2 mt-4">
                      <div className="card_detail  d-flex justify-content-between">
                        <p>Our Promise</p>
                      </div>
                      <div className="card_detail  d-flex justify-content-between mb-2">
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
                      <div className="card_detail  d-flex justify-content-between mb-2">
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
                      <div className="card_detail  d-flex justify-content-between mb-2">
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
                  <Col lg={6}>
                    <div className="cardDetailForm">
                      {(price || price === 0) && (
                        <PaymentGateway
                          amount={price}
                          discountCode={code}
                          setPaymentData={setPaymentData}
                          password={password}
                          confirmPassword={confirmPassword}
                          status={1}
                          discount={discountAmount}
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
      <div className="btnnext mt-0">
        <button
          onClick={handleSubmit((data) => {
            handleSignUp(data);
          })}
        >
          Submit
          <svg
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.28117 5.33117L4.70517 1.75517L5.64784 0.8125L10.8332 5.99783L5.64784 11.1832L4.70517 10.2405L8.28117 6.6645H0.166504V5.33117H8.28117Z"
              fill="#F8F5F0"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default PaymentSummaryComponent;
