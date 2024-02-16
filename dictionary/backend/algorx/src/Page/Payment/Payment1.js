import "./Payment.css";
import { Row, Col } from "react-bootstrap";
import PaymentGateway from "../../Component/Payment/PaymentGateway";
import { codition } from "../../data/jsonData";
import React, { useEffect } from "react";
import { useState } from "react";
import { ApiGet } from "../../helpers/API/API_data";
import { ErrorToast } from "../../Component/Toaster/Toaster";
import tick_circle from "../../../src/Assets/images/tick-circle.png";
import Stethoscope from "../../Assets/images/stethoscope.png";
import Filter from "../../Assets/images/filter.png";
import Injection from "../../Assets/images/injection.png";
import CouponCode from "./CouponCode";
import { appContext } from "../../helpers/AppContext";

const Payment1 = () => {
  const [couponNumber, setCouponNumber] = useState();
  const [code, setCode] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [error, setError] = useState();
  const [discount, setDiscount] = useState();
  const [price, setPrice] = useState();
  const { isMobile } = React.useContext(appContext);

  // let tempData;
  const tempData = JSON.parse(localStorage.getItem("myData"));

  const logindata = JSON.parse(localStorage.getItem("logindata"));
  let isPay = localStorage.getItem("isPay");

  let pathologyTestCharge = localStorage.getItem("pathologyTestCharge");

  useEffect(() => {
    if (isPay) {
      setPrice(Number(tempData?.price) + Number(pathologyTestCharge));
    } else {
      setPrice(Number(tempData?.price));
    }
  }, [tempData?.price, isPay]);

  useEffect(() => {
    if (!tempData) {
      let paymentPending = [];
      logindata.paymentStatus &&
        Object.keys(logindata.paymentStatus).forEach((key, index) => {
          if (logindata.paymentStatus[key] === false) {
            paymentPending.push(key);
          }
        });

      codition.find((data) => paymentPending.includes(data.label)) &&
        localStorage.setItem(
          "myData",
          JSON.stringify(
            codition.find((data) => paymentPending.includes(data.label))
          )
        );
    }
  }, []);
  const HandleApply = async () => {
    if (!buttonClicked) {
      await ApiGet(
        `patient/validate_coupon?couponCode=${couponNumber}&condition=${tempData?.label}&price=${price}`
      )
      
        .then((res) => {
          const discountData = res?.data?.data;
          if (discountData?.discountType === 1) {
            let amount = (price * discountData?.discount) / 100;

            setDiscount({
              discount: amount > price ? price : amount,
              discountType: discountData?.discountType,
            });
            amount > price
              ? setPrice(0)
              : setPrice(price - Number(discountData.discount));

            setPrice(price - Number(amount));
          } else {
            setDiscount({
              discount:
                discountData.discount > price ? price : discountData.discount,
              discountType: discountData.discountType,
            });
            discountData?.discount > price
              ? setPrice(0)
              : setPrice(price - Number(discountData?.discount));
          }
          setError(res?.data?.message);
          setCouponNumber("");
          setButtonClicked(true);
          setCode(couponNumber);
        })
        .catch((e) => {
          ErrorToast(e.message);
        });
    }
  };

  return (
    <>
      <div className="chatscreen admindashboard payment_sec">
        <div className="treatmentdetail container">
          <Row style={{ justifyContent: "center" }}>
            <Col lg={6}>
              <div className="card_title card_title1">Confirm your order</div>
              {isMobile && (
                <CouponCode
                  couponNumber={couponNumber}
                  setCouponNumber={setCouponNumber}
                  buttonClicked={buttonClicked}
                  error={error}
                  isPay={isPay}
                  HandleApply={HandleApply}
                />
              )}

           

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
                      <div className="prepdiv" style={{ fontSize: "18px" }}>
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
                  >{`$${tempData?.price}`}</p>
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
                      <div className="prepdiv" style={{ fontSize: "18px" }}>
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
                      <div className="prepdiv" style={{ fontSize: "18px" }}>
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
                {discount?.discount && (
                  <>
                    <div className="card_detail1  d-flex justify-content-between my-3">
                      <div className="prepdiv" style={{ fontSize: "18px" }}>
                        Sub Total
                      </div>
                      <div
                        className="prepdiv"
                        style={{ opacity: "0.7", fontSize: "17px" }}
                      >
                        {isPay === "true" ? `$ 130` : `$${tempData?.price}`}
                      </div>
                    </div>
                    <div className="card_detail1  d-flex justify-content-between my-3">
                      <div className="prepdiv" style={{ fontSize: "18px" }}>
                        Discount -{" "}
                      </div>
                      <div
                        className="prepdiv"
                        style={{ opacity: "0.7", fontSize: "17px" }}
                      >{`- $${discount?.discount}`}</div>
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
                    $ {price || price === 0 ? price : ""}
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
                      Doctor will review your questions within hours not days
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
                <PaymentGateway
                  couponNumber={couponNumber}
                  setCouponNumber={setCouponNumber}
                  buttonClicked={buttonClicked}
                  error={error}
                  isPay={isPay}
                  HandleApply={HandleApply}
                  amount={price}
                  navigateTo={"/dashboard"}
                  discount={discount?.discount}
                  discountCode={code}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Payment1;
