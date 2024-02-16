import React, { useEffect, useState } from "react";
import img from "../../Assets/images/card-img-3.png";
import { BsCameraVideo, BsThreeDots } from "react-icons/bs";
import { Row, Col } from "react-bootstrap";
import {  BiMicrophone } from "react-icons/bi";
import SideDrawer from "../SideDrawer/SideDrawer";
import { ApiGet, ApiGetNoAuth, Bucket } from "../../helpers/API/API_data";

// video call screen
const Video = () => {
  // get id from search params
  const patientId = new URLSearchParams(window?.location?.search).get(
    "patientId"
  );
  const doctorId = new URLSearchParams(window?.location?.search).get(
    "doctorId"
  );
  const videoCallId = new URLSearchParams(window?.location?.search).get(
    "videoCallId"
  );
  const [data, setData] = useState({});
  const [doctorData, setDoctorData] = useState({});

  // start patient video call
  const getData = () => {
    ApiGetNoAuth("patient/agora/video_call/" + videoCallId)
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

    // get doctor video call data
  const getDoctorData = () => {
    ApiGet("patient/doctor/" + doctorId).then((res) => {
      setDoctorData(res?.data?.data)
    }).catch((err) => {
      console.log('err', err)
    })
  }
  useEffect(() => {
    getData();
    getDoctorData()
  }, []);

  return (
    <div>
     
      <div className="chatscreen admindashboard chat_with_doctor">
        <div>
          <Row>
            <Col lg={2}>
              <SideDrawer />
            </Col>
            <Col lg={10}>
              <div className="mx-3 my-5">
                <div className="bg-white shadow rounded-2">
                  <div className="p-3">
                    <div className="d-flex">
                      <div className="position-relative videoimg">
                        <img
                          src={doctorData?.image ? Bucket + doctorData?.image : img}
                          alt=""
                          style={{ width: "180px", height: "150px" }}
                        />
                        <div
                          className="d-flex position-absolute justify-content-center w-100 videores"
                          style={{ bottom: "-10px" }}
                        >
                          <div
                            className="p-1 rounded-pill d-flex align-items-center justify-content-center me-1"
                            style={{
                              height: "30px",
                              width: "30px",
                              backgroundColor: "#00000085",
                            }}
                          >
                            <BiMicrophone color="white" />
                          </div>
                          <div
                            className="p-1 rounded-pill d-flex align-items-center justify-content-center"
                            style={{
                              height: "30px",
                              width: "30px",
                              backgroundColor: "#00000085",
                            }}
                          >
                            <BsCameraVideo color="white" />
                          </div>
                        </div>
                      </div>
                      <div
                        className="ms-4 w-100"
                        style={{ color: "rgba(0, 59, 97, 1)" }}
                      >
                        <div className=" d-flex justify-content-between w-100">
                          <h4 className="appoint">Your appointment with {doctorData?.firstName}</h4>
                          <div
                            className="p-2 rounded-pill d-flex align-items-center justify-content-center"
                            style={{
                              backgroundColor: "rgba(236, 240, 243, 1)",
                              height: "30px",
                              width: "30px",
                            }}
                          >
                            <BsThreeDots />
                          </div>
                        </div>
                        <div className="mt-1 schedual">
                          Scheduled :{" "}
                          {data?.slotTime?.h >= 13
                            ? data?.slotTime?.h - 12 >= 10
                              ? data?.slotTime?.h - 12
                              : `0${data?.slotTime?.h - 12}`
                            : data?.slotTime?.h}{" "}
                          : {data?.slotTime?.m}{" "}
                          {data?.slotTime?.h >= 12 ? "PM" : "AM"}
                        </div>
                        <h5 className="mt-3 schedual">
                          The meeting will start at{" "}
                          {data?.slotTime?.h >= 13
                            ? data?.slotTime?.h - 12 >= 10
                              ? data?.slotTime?.h - 12
                              : `0${data?.slotTime?.h - 12}`
                            : data?.slotTime?.h}{" "}
                          : {data?.slotTime?.m}{" "}
                          {data?.slotTime?.h >= 12 ? "PM" : "AM"}{" "}
                         
                        </h5>
                        <button
                          class="join-button"
                          onClick={() =>
                            window.open(
                              process.env.REACT_APP_VIDEO_URL + "/?patientId=" +
                              patientId +
                              "&&videoCallId=" +
                              videoCallId
                            )
                          }
                        >
                          {" "}
                          Join{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Video;
