import React, { useState, useEffect } from "react";
import profile3 from "../../Assets/images/chat/avatarBlue.png";
import { Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import SideDrawer from "../SideDrawer/SideDrawer";
import Header from "../Header/Header";
import { useContext } from "react";
import { appContext } from "../../helpers/AppContext";
import Auth from "../../helpers/Auth";
import Search_img from "../../Assets/images/chat/Search.png";
import close_img from "../../Assets/images/chat/close.png";
import ChatLoader from "../../Component/ChatLoader/ChatLoader";
import "./ChatScreenListMobile.css";
import "./ChatScreen.css";
import { ApiPost } from "../../helpers/API/API_data";

const ChatScreenListMobile = () => {
  const { setRoomContexData, roomContexData } = useContext(appContext);
  const [id, setId] = useState();
  const [rommSearch, SetRommSearch] = useState("");
  const [doctorRoomId, setDoctorRoomId] = useState();
  const location = useLocation();
  let pathName = window.location.pathname;

  // set rooms selected when navigate fron iniate chat or chat with doctor functions
  useEffect(() => {
    if (location?.state?.doctorId) {
      const doctorRoomId = roomContexData?.find(
        (ele) => ele?.user?._id === location?.state?.doctorId
      );
      setDoctorRoomId(doctorRoomId);
    }
  }, [roomContexData]);

  // search room by name
  let timeOutId;
  const handleSearch = (e) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      getRoomData(e.target.value);
    }, 500);
  };

  // get patient room data
  const getRoomData = async (i) => {
    let body = {
      search: i,
      page: 1,
      limit: 10000,
    };
    await ApiPost("patient/room/get", body)
      .then((res) => {
        setRoomContexData(res?.data?.data?.room_data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // get patient room data every 5sec
  useEffect(() => {
    let interval;

    if (pathName === "/ChatScreen") {
      interval = setInterval(async () => {
        await getRoomData();
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="chatscreen admindashboard chat_with_doctor mobile_chat_screen_list">
        <div>
          <Row>
            <Col lg={2}>
              <SideDrawer />
            </Col>
            <Col lg={10}>
              <Header />
              <div className="inner_div_dashboard">
                <div className="chat_screen_mobile_back_btn">
                  <Link className="chat_screen_mobile_back_link" to={"/"}>
                    <span className="chat_screen_mobile_back_span">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_5079_71993)">
                          <path
                            d="M10.828 12.0002L15.778 16.9502L14.364 18.3642L8 12.0002L14.364 5.63623L15.778 7.05023L10.828 12.0002Z"
                            fill="#18181B"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_5079_71993">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Back
                  </Link>
                </div>
                <div className="customerlist">
                  <div className="customersearch">
                    <input
                      type="text"
                      placeholder="Search"
                      value={rommSearch}
                      onChange={(e) => {
                        handleSearch(e);
                        SetRommSearch(e.target.value);
                      }}
                    />
                    <span>
                      {rommSearch.length ? (
                        <img
                          alt=""
                          src={close_img}
                          onClick={() => {
                            SetRommSearch("");
                          }}
                        />
                      ) : (
                        <img alt="" src={Search_img} />
                      )}
                    </span>
                  </div>
                  {/* room list */}
                  <ul className="chatlists">
                    {roomContexData?.length ? (
                      roomContexData?.map((element) => {
                        return (
                          <li className="activechats pb-0">
                            <Link
                              to={`/ChatScreenMobile/${element?._id}/${element?.user?._id}`}
                              className={
                                element.user?._id ===
                                (doctorRoomId?.user?._id
                                  ? doctorRoomId?.user?._id
                                  : id)
                                  ? "active_user"
                                  : ""
                              }
                              onClick={Auth.setUserChatMessageId(
                                element?.user?._id
                              )}
                            >
                              <img
                                style={{ height: "50px", width: "50px" }}
                                src={
                                  element?.user?.image
                                    ? element?.user?.image
                                    : profile3
                                }
                                alt=""
                                className="rounded-circle"
                              />
                              <div className="profileinfochat">
                                <h4>{`${element?.user?.firstName} ${element?.user?.lastName}`}</h4>
                                <p>{element?.message?.message}</p>
                              </div>
                              {element?.unReadCount ? (
                                <span className="massage_count">
                                  {element?.unReadCount}
                                </span>
                              ) : (
                                ""
                              )}
                            </Link>
                          </li>
                        );
                      })
                    ) : (
                      <div
                        style={{
                          height: "80vh",
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        <ChatLoader />
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ChatScreenListMobile;
