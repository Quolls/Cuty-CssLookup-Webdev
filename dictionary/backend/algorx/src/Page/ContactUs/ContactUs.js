import "./ContactUs.css";
import React from "react";
import { Row, Col } from "react-bootstrap";
import SideDrawer from "../SideDrawer/SideDrawer";
import Header from "../Header/Header";

const ContactUs = () => {


  return (
    <>
      <div className="chatscreen admindashboard">
        <Row>
          <Col lg={2}>
            <SideDrawer />
          </Col>
          <Col lg={10}>
            <Header />
            <div className="contact_us">
              <iframe src="https://oq8vvfvo9jo.typeform.com/to/vbCaJsCK" frameborder="0" className="mx-2" style={{ marginTop: "98px", height: "calc(100vh - 140px)", width: "99%" }}></iframe>
              {/* <div className="coptrights">
                <p>©2023 Frenchie M.D Pty Ltd</p>
              </div> */}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ContactUs;
