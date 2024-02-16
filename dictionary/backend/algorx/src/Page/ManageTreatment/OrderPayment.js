import "./ManageTreatment.css";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import SideDrawer from "../SideDrawer/SideDrawer";
import Header from "../Header/Header";
import PaymentGateway from "../../Component/Payment/PaymentGateway";
import { ApiGet } from "../../helpers/API/API_data";
import { ErrorToast } from "../../Component/Toaster/Toaster";

const OrderPayment = () => {
  const location = useLocation();
  const treatnentNames = location.state?.treatnentNames;
  const treatnentpayment = location.state?.treatment;

  const [treatnents, setTreatnents] = useState([]);
  const [couponNumber, setCouponNumber] = useState();
  const [error, setError] = useState();
  const [discount, setDiscount] = useState();

  useEffect(() => {
    if (treatnentNames?.length) setTreatnents(treatnentNames);
  }, [treatnentNames]);

  // appply coupen code
  const HandleApply = async () => {
    await ApiGet(`patient/validate_coupon?couponCode=${couponNumber}`)
      .then((res) => {
        console.log("res", res);
        setDiscount(res?.data?.data);
        setError(res?.data?.message);
        setCouponNumber("");
      })
      .catch((e) => {
        ErrorToast(e.message);
      });
  };
  return (
    <>
      <div className="chatscreen admindashboard order_payment">
        <Row>
          <Col lg={2}>
            <SideDrawer />
          </Col>
          <Col lg={10}>
            <Header />

            <div className="treatmentdetail inner_div_dashboard">
              <Row className="align-items-center">
                <Col lg={6}>
                  <div className="treatmenttitle">
                    <h4>Confirm your order</h4>
                  </div>
                  <div className="shayestreatment">
                    {treatnents?.length ? (
                      treatnents?.map((ele) => {
                        return (
                          <>
                            <h5>{ele?.firstname + " " + ele?.lastname}</h5>
                            <p>{ele?.treatment}</p>
                            <hr />
                          </>
                        );
                      })
                    ) : (
                      <>{treatnentpayment?.treatmentName}</>
                    )}
                  </div>
                  <div className="shayestreatment">
                    <ul>
                      {/* apply treatment */}
                      <li className="d-flex justify-content-between">
                        <span className="w-50">
                          <input
                            className="w-100"
                            value={couponNumber}
                            style={{
                              height: "40px",
                              border: "1px solid #F4F4F5",
                              fontWeight: "500",
                            }}
                            type="text"
                            placeholder="Enter Coupon Code"
                            onChange={(e) => setCouponNumber(e?.target?.value)}
                          />
                        </span>
                        <a
                          className="button"
                          style={{ cursor: "pointer" }}
                          onClick={HandleApply}
                        >
                          Apply
                        </a>
                      </li>
                      {/* payable amount */}
                      <li>
                        <p style={{ color: "#18181B" }}>{error ? error : ""}</p>
                      </li>
                      <li className="border-top">
                        <p>
                          $
                          {location?.state?.Amount ??
                            treatnentpayment?.payment_amount}
                        </p>
                      </li>
                      {discount ? (
                        <>
                          <li className="p-0">
                            <p style={{ color: "#18181B" }}>
                              {discount?.discountType === 1
                                ? `-${discount?.discount}%`
                                : `-$${discount?.discount}`}
                            </p>
                          </li>
                          <li className="border-top">
                            <span>Total Amount</span>
                            <p>
                              {location?.state?.Amount
                                ? discount?.discountType === 1
                                  ? `$${
                                      location?.state?.Amount -
                                      (discount?.discount *
                                        location?.state?.Amount) /
                                        100
                                    }`
                                  : `$${
                                      location?.state?.Amount -
                                      discount?.discount
                                    }`
                                : discount?.discountType === 1
                                ? `$${
                                    treatnentpayment?.payment_amount -
                                    (discount?.discount *
                                      treatnentpayment?.payment_amount) /
                                      100
                                  }`
                                : `$${
                                    treatnentpayment?.payment_amount -
                                    discount?.discount
                                  }`}
                            </p>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>

                 
                </Col>
                <Col lg={6} className="ps-5 pe-5">
                  <div className="treatmenttitle">
                    <h4>Card details</h4>
                  </div>
                  <div>
                    <p className="cardDetail">
                      After you make the payment, you will have an optionto
                      schedule a call/video call with a doctor. Don’t worry, if
                      you don’t wish to procced with your plan after the chat.
                      you will be fully refunded. No strings attached.
                    </p>
                  </div>
                  <Row>
                    <Col lg={12}>
                      <div className="cardDetailForm mt-4">
                        {/* payment detail component */}
                        <PaymentGateway
                          amount={
                            location?.state?.Amount ??
                            treatnentpayment?.payment_amount
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderPayment;
