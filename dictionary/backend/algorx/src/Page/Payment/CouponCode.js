import { Col, Row } from "react-bootstrap";
// coupon code component
const CouponCode = (props) => {
  return (
    <Row className="mt-4 h-auto">
      <Col lg={8}>
        <div className="medicininput coupn">
          <input
            type="text"
            name="itemNumber"
            className="rounded"
            placeholder="Enter Coupon Code"
            onChange={(e) => props.setCouponNumber(e?.target?.value)}
            value={props.couponNumber}
          />
        </div>
      </Col>
      <Col lg={3}>
        <div className="btnnext mt-0">
          <button
            type={"button"}
            onClick={props.HandleApply}
            disabled={props.buttonClicked}
          >
            {props.buttonClicked ? "Applied" : "Apply"}
          </button>
        </div>
      </Col>
      <div>
        <p
          style={{
            color: "#18181B",
            marginTop: "1rem",
          }}
        >
          {props.error ? props.error : ""}
        </p>
      </div>
    </Row>
  );
};

export default CouponCode;
