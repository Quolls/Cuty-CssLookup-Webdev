import React from "react";
import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import AutoCompleteAddress from "./AutoCompleteAdress";
import "./PaymentAdress.css";

const PaymentAdress = ({
  paymentAdress = {},
  setPaymentAdress = () => {},
  isUpdateInfo = false,
}) => {
  const handleChangePaymentAdress = (e) => {
    const { name, value } = e.target;
    setPaymentAdress({ ...paymentAdress, [name]: value?.trimStart() });
  };
  return (
    <>
      <Row className="h-auto align-items-start">
        <Col lg={isUpdateInfo && 12} className={!isUpdateInfo && "mt-4 p-0"}>
          <AutoCompleteAddress
            paymentAdress={paymentAdress}
            setPaymentAdress={setPaymentAdress}
            isUpdateInfo={isUpdateInfo}
          />
        </Col>
      </Row>
      <Row className={isUpdateInfo ? "h-auto mb-2 " : "h-auto mb-2 gap-2 "}>
        <Col lg={isUpdateInfo && 6} className={!isUpdateInfo && "m-0 p-0"}>
          <div className="namecard mt-4 text-[#18181B]">Suburb</div>
          <input
            type="text"
            placeholder="Suburb"
            className={
              isUpdateInfo
                ? "updateInfoInput text-[#18181B]"
                : "nameinput mt-2 text-[#18181B]"
            }
            name="suburb"
            value={paymentAdress?.suburb}
            onChange={handleChangePaymentAdress}
            list="streetOptions"
            style={{ border: "1px solid #18181B" }}
          />
          {isUpdateInfo && paymentAdress?.suburb?.length === 0 && (
            <p style={{ color: "red" }}>Suburb is required</p>
          )}
        </Col>

        <Col lg={isUpdateInfo && 6} className={!isUpdateInfo && "m-0 p-0"}>
          <div className="namecard mt-4 text-[#18181B]">State</div>
          <input
            type="text"
            placeholder="State"
            maxLength="6"
            pattern="[0-9]{6}"
            className={
              isUpdateInfo
                ? "updateInfoInput text-[#18181B]"
                : "nameinput mt-2 text-[#18181B]"
            }
            name="zip"
            value={paymentAdress?.state}
            onChange={handleChangePaymentAdress}
            style={{ border: "1px solid #18181B" }}
          />
          {isUpdateInfo && paymentAdress?.state?.length === 0 && (
            <p style={{ color: "red" }}>State is required</p>
          )}
        </Col>
      </Row>

      <Row className={isUpdateInfo ? "h-auto mb-2 " : "h-auto mb-2 gap-2 "}>
        <Col lg={isUpdateInfo && 6} className={!isUpdateInfo && "m-0 p-0"}>
          <div className="namecard mt-4 text-[#18181B]">Postcode or Zip</div>
          <input
            type="text"
            placeholder="Postcode or Zip"
            className={
              isUpdateInfo
                ? "updateInfoInput text-[#18181B]"
                : "nameinput mt-2 text-[#18181B]"
            }
            pattern="[0-9]{6}"
            name="postcodeZip"
            value={paymentAdress?.postcodeZip}
            onChange={handleChangePaymentAdress}
            list="streetOptions"
            maxLength="6"
            style={{ border: "1px solid #18181B" }}
          />
          {isUpdateInfo && paymentAdress?.postcodeZip?.length === 0 && (
            <p style={{ color: "red" }}>Postcode is required</p>
          )}
        </Col>

        <Col lg={isUpdateInfo && 6} className={!isUpdateInfo && "m-0 p-0"}>
          <div className="namecard mt-4 text-[#18181B]">Country</div>
          <input
            type="text"
            placeholder="Country"
            className={
              isUpdateInfo
                ? "updateInfoInput text-[#18181B]"
                : "nameinput mt-2 text-[#18181B]"
            }
            name="country"
            value={paymentAdress?.country}
            onChange={handleChangePaymentAdress}
            readOnly
            // disabled
            style={{ border: "1px solid #18181B" }}
          />
          {isUpdateInfo && paymentAdress?.country?.length === 0 && (
            <p style={{ color: "red" }}>Country is required</p>
          )}
        </Col>
      </Row>
    </>
  );
};
export default memo(PaymentAdress);
