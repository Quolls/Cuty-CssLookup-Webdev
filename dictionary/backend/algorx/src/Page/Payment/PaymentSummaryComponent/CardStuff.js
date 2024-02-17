import React from "react";
import { Col, Row } from "react-bootstrap";

const CardStuff = ({ stripeData }) => {
  return (
    <>
      <hr style={{ margin: "0px" }} />
      <div className="payment_summary_component">
        <h1>Payment Summary</h1>
      </div>
      <div className="">
        <Row style={{ height: "auto" }}>
          <Col lg={12}>
            <div className="contctusdetail">
              <span>Residential Address</span>
              <textarea
                placeholder="Enter Your Address"
                value={stripeData?.shipping?.address?.line1}
                disabled
                name="Message"
                style={{ borderRadius: "3px" }}
              />
            </div>
          </Col>
          <Col lg={12}>
            <div className="contctusdetail">
              <input
                type="mail"
                placeholder="Suburb"
                disabled
                name="city"
                value={stripeData?.shipping?.address?.city}
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="contctusdetail">
              <input
                type="text"
                placeholder="Postcode"
                value={stripeData?.shipping?.address?.postal_code}
                disabled
                name="Postcode"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="contctusdetail">
              <input
                type="text"
                placeholder="state"
                value={stripeData?.shipping?.address?.state}
                disabled
                name="state"
              />
            </div>
          </Col>
          <Col lg={12}>
            <div className="contctusdetail">
              <span>Shipping Address</span>
              <input
                type="string"
                disabled
                placeholder="Same as residential address"
                maxLength={10}
                value={stripeData?.shipping?.address?.line1}
                name="address"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CardStuff;
