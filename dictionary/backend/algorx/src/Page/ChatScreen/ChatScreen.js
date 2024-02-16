import "./ChatScreen.css";
import React, { useState, useEffect, useRef } from "react";
import profile3 from "../../Assets/images/chat/avatarBlue.png";
import { Row, Col, Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import SideDrawer from "../SideDrawer/SideDrawer";
import Header from "../Header/Header";
import { useContext } from "react";
import { appContext } from "../../helpers/AppContext";
import Auth from "../../helpers/Auth";
import Massages from "../../Assets/images/chat/Massage.svg";
import { ReactComponent as SingleTick } from "../../Assets/images/chat/singleTick.svg";
import { ReactComponent as DoubleTicks } from "../../Assets/images/chat/doubleTicks.svg";
import { ReactComponent as BlueTicks } from "../../Assets/images/chat/blueTicks.svg";
import Say_hi from "../../Assets/images/Say_hi.gif";
import Search_img from "../../Assets/images/chat/Search.png";
import close_img from "../../Assets/images/chat/close.png";
import moment from "moment";
import ChatLoader from "../../Component/ChatLoader/ChatLoader";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { TextareaAutosize } from "@mui/material";
import { Calendar } from "antd";
import { ApiGet, ApiPost } from "../../helpers/API/API_data";
import { ErrorToast, SuccessToast } from "../../Component/Toaster/Toaster";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import Autolinker from "react-autolinker";

const ChatScreen = () => {
  const uuid = uuidv4();
  const clientId = process.env.REACT_APP_GOOGLE_CLOUD_SECTREAT_ID;
  const { socket, loader, setLoader, connectSocket } = useContext(appContext);

  const userData = Auth.getUserData();
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState();
  const [receiverId, setReceiverId] = useState();
  const [rooms, setRooms] = useState([]);
  const [id, setId] = useState();
  const [rommSearch, SetRommSearch] = useState("");
  const [chatData, setchatData] = useState([]);
  const focusref = useRef();
  const [modal, setModal] = useState(false);
  const messageEl = useRef(null);
  const [userMessage, setUserMessage] = useState([]);

  const [doctorRoomId, setDoctorRoomId] = useState();
  const [name, setName] = useState();
  const [show, setShow] = useState(true);
  const [date, setDate] = useState(new Date());
  const [timesloat, SetTimesloat] = useState("");
  const [sloat, setSloat] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const elementRef = useRef(null);

  const location = useLocation();

  let pathName = window.location.pathname;
  // sent messgae by hit send button
  const handleSendMessage = (e, message) => {
    e.preventDefault();

    if (message.trim()) {
      socket?.emit("send_message", {
        senderId: userData?._id,
        roomId: doctorRoomId?._id ? doctorRoomId?._id : roomId,
        receiverId: receiverId,
        message: message.trim(),
      });
      setMessage("");
    }
  };

  useEffect(() => {
    if (location?.state?.doctorId) {
      const doctorRoomId = rooms?.find(
        (ele) => ele?.user?._id === location?.state?.doctorId
      );
      setDoctorRoomId(doctorRoomId);
      setRoomId(doctorRoomId?._id);
      setId(location?.state?.doctorId);
      setReceiverId(location?.state?.doctorId);
    }
  }, [rooms]);

  // search room by user name
  let timeOutId;
  const handleSearch = (e) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      getRoomData(e.target.value);
    }, 500);
  };

  // sent messgae by hit enter
  const handleKeySendMsg = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage(e, message);
    }
  };

  // set sender and reciver message
  const sendermsg = [];
  const receivermsg = [];
  for (let i = 0; i < userMessage.length; i++) {
    sendermsg.push(
      userMessage[i - 1]?.senderId !== userData?._id &&
        userMessage[i]?.senderId === userData?._id &&
        userMessage[i]
    );
    receivermsg.push(
      userMessage[i - 1]?.senderId === userData?._id &&
        userMessage[i]?.senderId !== userData?._id &&
        userMessage[i]
    );
  }
  // get patient room data
  const getRoomData = async (i) => {
    let body = {
      search: i,
      page: 1,
      limit: 10000,
    };
    await ApiPost("patient/room/get", body)
      .then((res) => {
        setRooms(res?.data?.data?.room_data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  // get message by roomId
  const callmessage = async () => {
    socket?.emit("join_room", { roomId: roomId, userId: userData?._id });
    let body = {
      page: 1,
      limit: 20,
      roomId: roomId,
    };
    await ApiPost("patient/room/message/get", body)
      .then((res) => {
        setUserMessage(res?.data?.data?.message_data.reverse());
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // get patient room data every 5 sec
  useEffect(() => {
    connectSocket();

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

  // -----------update seen and unseen message status by socket---------
  useEffect(() => {
    socket?.emit("online", { userId: userData?._id });
  }, [socket]);

  socket?.off("receive_message").on("receive_message", (data) => {
    socket?.emit("message_deliver_status", {
      messageId: data._id,
      status:
        data?.roomId === (doctorRoomId?._id ? doctorRoomId?._id : roomId) &&
        data?.receiverId === userData?._id
          ? 2
          : 1,
      roomId: data?.roomId,
    });

    if (data?.roomId === roomId) {
      setUserMessage((prev) => {
        return JSON.parse(JSON.stringify([...prev, data]));
      });
    }
  });

  // get message with room id change
  useEffect(() => {
    const name = rooms?.find((ele) => ele?.user?._id === id);
    setName(name);
    focusref?.current?.focus();
    callmessage();
  }, [roomId]);

  // scroll to bottom
  const scrollToBottom = () => {
    if (elementRef.current) {
      elementRef.current.scrollToBottom = elementRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [page]);

  // load message with scrolling
  const firstEvent = async (e) => {
    const element = e.target;
    const currentScrollPos = element.scrollTop;
    if (currentScrollPos === 0) {
      // Get the current scroll height before loading new data
      const prevScrollHeight = element.scrollHeight;
      const newScrollHeight = element.scrollHeight;
      // Calculate the difference in scroll height
      const scrollHeightDiff = newScrollHeight - prevScrollHeight;
      // Set the scroll position to maintain the user's position
      element.scrollTop = currentScrollPos + scrollHeightDiff;
      // Make your API call here
      await loadMoreMessages(page + 1);
    }
  };
  const loadMoreMessages = async (i) => {
    let body = {
      page: i,
      limit: 20,
      roomId: roomId,
    };

    try {
      const res = await ApiPost("patient/room/message/get", body);
      const newMessages = res?.data?.data?.message_data.reverse();

      if (page >= res?.data?.data?.state?.page_limit) {
        return;
      } else {
        setUserMessage((prevMessages) => [...newMessages, ...prevMessages]);
        setPage((page) => page + 1);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  // scroll to bottom
  const scrollToBottomWithSmoothScroll = () => {
    messageEl.current?.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "auto" });
    });
  };

  // modify user message
  useEffect(() => {
    if (userMessage.length) {
      const temp = [];
      userMessage.forEach((ele, i) => {
        if (
          userMessage[i - 1]?.createdAt &&
          moment(userMessage[i - 1]?.createdAt).format("DD-MM-YYYY") ===
            moment(ele?.createdAt).format("DD-MM-YYYY")
        ) {
          temp[temp.length - 1].item.push(ele);
        } else {
          temp.push({
            date: ele?.createdAt,
            item: [ele],
          });
        }
        setchatData(temp);
      });
    } else {
      setchatData("");
    }
    scrollToBottomWithSmoothScroll();
  }, [userMessage]);

  // get profile and set profile data
  const getProfile = () => {
    ApiGet("patient")
      .then((res) => {
        setProfile(res?.data?.data[0]);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);

  // set unread message
  const setunreed = (i) => {
    let extdata = rooms;
    extdata[i].unReadCount = 0;

    setRooms(extdata);
  };
  // -----------video call--------------------

  //replace add to calender with join before 10 min of schedule time
  const isWithin10Minutes = (dateTime) => {
    const givenDateTime = moment(dateTime, "DD-MM-YYYY HH:mm");
    const currentDateTime = moment();

    const differenceInMinutes = givenDateTime.diff(currentDateTime, "minutes");

    return differenceInMinutes < 10;
  };
  // -------------get slot and book it-----------------

  // get slot by date
  const wrapperStyle = {
    border: "1px solid rgb(240, 240, 240)",
    borderRadius: "8px",
    backgroundColor: "#FFFBF3",
  };
  // Disable dates before today (past dates)
  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };
  const getSloat = () => {
    let body = {
      date: moment(date)?.format("YYYY-MM-DD"),
      doctorId: receiverId,
      currentTime: new Date(),
    };
    ApiPost("patient/schedule/get", body)
      .then((res) => {
        setSloat(res?.data?.data?.slotList);
      })
      .catch((err) => {
        ErrorToast(err?.message);
        console.log("err", err);
        setSloat([]);
      });
  };

  // book available
  const bookSloat = () => {
    setLoading(true);

    let time = sloat?.find((val, i) => i === timesloat);
    time = time?.startTime;
    const dateObj = new Date(date);
    const endDate = new Date(date);

    dateObj.setUTCHours(time?.h);
    dateObj.setUTCMinutes(time?.m);
    endDate.setUTCHours(time?.h);
    endDate.setUTCMinutes(Number(time?.m) + 15);
    const start = dateObj.toISOString();
    const end = endDate.toISOString();

    const formattedDate = dateObj.toISOString().replace(/Z$/, "");

    let body = {
      date: moment(date)?.format("YYYY-MM-DD"),
      time: time,
      doctorId: receiverId,
      slotDateTime: formattedDate,
      startendDate: {
        start,
        end,
      },
    };

    if (time) {
      ApiPost("patient/schedule/video_allocation", body)
        .then((res) => {
          SuccessToast(res?.data?.message);
          setModal(false);
          setLoading("");
        })
        .catch((err) => {
          console.log("err", err);
          ErrorToast(err?.message);
          setLoading(false);
        });
    } else {
      ErrorToast("Please select time sloat!");
    }
  };

  // get slot with date change
  useEffect(() => {
    if (receiverId) {
      getSloat();
    }
  }, [date]);
  // -----------add event in google calnder----------------

  // login with google
  const onLoginSuccess = async (res, selectedData) => {
    if (
      selectedData?.jsonMessage?.patientEmail?.includes(res?.profileObj?.email)
    ) {
      SuccessToast("Event Already Added");
      return;
    }
    let body = {
      accessToken: res?.tokenObj?.access_token,
      refreshToken: res?.tokenObj?.id_token,
      patientId: profile?._id,
      doctorId: "",
      addToCaledarId: selectedData?._id,
      userEmail: res?.profileObj?.email,
      isPatient: true,
    };
    ApiPost("patient/google_login", body)
      .then((res) => {
        getProfile();
        addEvent(selectedData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const onLoginFailure = (res) => {};

  // add event in google calnder
  const addEvent = (res) => {
    const dateTime = moment(
      `${res?.jsonMessage?.videoCall?.videoCallDate} ${res?.jsonMessage?.videoCall?.videoCallTime}`,
      "DD-MM-YYYY hh:mm A"
    );
    const formattedDateTime = dateTime?.format("YYYY-MM-DDTHH:mm:ss");
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    let body = {
      patientId: profile?._id,
      doctorId: "",
      googleCalendarPayload: {
        start: {
          dateTime: formattedDateTime,
          timeZone,
        },
        end: {
          dateTime: formattedDateTime,
          timeZone,
        },
        summary: `Medicine Meeting with ${res?.jsonMessage?.doctor?.firstName} ${res?.jsonMessage?.doctor?.lastName}`,
        description: `Meeting URL ${
          window.location.protocol +
          "//" +
          window.location.hostname +
          (window.location.port ? ":" + window.location.port : "") +
          "/" +
          res?.jsonMessage?.videoLinkPath
        }`,
        conferenceData: {
          createRequest: {
            requestId: uuid,
            conferenceSolutionKey: {
              type: "eventHangout",
            },
            entryPoints: [
              {
                entryPointType: "video",
                uri: `${
                  window.location.protocol +
                  "//" +
                  window.location.hostname +
                  (window.location.port ? ":" + window.location.port : "") +
                  "/" +
                  res?.jsonMessage?.videoLinkPath
                }`,
              },
            ],
          },
        },
      },
      addToCaledarId: res?._id,
    };
    ApiPost("patient/message/google/calendar", body)
      .then((res) => {
        SuccessToast(res?.data?.message);
        callmessage();
      })
      .catch((err) => {
        ErrorToast(err?.message);
        console.log("err", err);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <>
      <div className="chatscreen admindashboard chat_with_doctor">
        <div>
          <Row>
            <Col lg={2}>
              <SideDrawer />
            </Col>
            <Col lg={10}>
              <Header />
              <div className="inner_div_dashboard pt-0">
                <Row>
                  <Col lg={3}>
                    <div className="customerlist">
                      {/* search rooms by name */}
                      <div className="customersearch">
                        <input
                          type="text"
                          placeholder="Search"
                          value={rommSearch}
                          className="h-auto py-2"
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
                                getRoomData("");
                              }}
                            />
                          ) : (
                            <img alt="" src={Search_img} />
                          )}
                        </span>
                      </div>
                      {/* room data list */}
                      <ul className="chatlists">
                        {rooms?.length ? (
                          rooms?.map((element, i) => {
                            return (
                              <li className="activechats pb-0">
                                <Link
                                  to="#"
                                  className={
                                    element.user?._id ===
                                    (doctorRoomId?.user?._id
                                      ? doctorRoomId?.user?._id
                                      : id)
                                      ? "active_user"
                                      : ""
                                  }
                                  onClick={() => {
                                    setDoctorRoomId();
                                    setId(element?.user?._id);
                                    setRoomId(element?._id);
                                    setReceiverId(element.user._id);
                                    setunreed(i);
                                  }}
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
                  </Col>

                  <Col lg={9}>
                    {name ? (
                      <>
                        <ul className="chatprofileheader">
                          <li>
                            <img
                              src={
                                name?.user?.image ? name?.user?.image : profile3
                              }
                              className="userAvatar"
                              alt=""
                            />
                            <div className="chatmeninfo">
                              <h4>
                                {name?.user?.firstName
                                  ? name?.user?.firstName +
                                    " " +
                                    name?.user?.lastName
                                  : "-"}
                              </h4>
                              <p>{name && name?.user?.email}</p>
                            </div>
                          </li>
                          <li>
                            <Link
                              to=""
                              className="chat_screen_web_inner_image_div"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19.7924 4.81154C19.6637 4.73524 19.5044 4.73226 19.373 4.80393L14.7842 7.30955V5.80614C14.7828 4.63659 13.8351 3.68882 12.6655 3.6875H2.11864C0.949086 3.68882 0.00132415 4.63659 0 5.80614V14.1715C0.00132415 15.341 0.949086 16.2888 2.11864 16.2901H12.6655C13.8351 16.2888 14.7828 15.341 14.7842 14.1715V12.6954L19.3732 15.201C19.5044 15.2727 19.6638 15.2699 19.7924 15.1936C19.9212 15.1171 20 14.9785 20 14.8291V5.17585C20 5.02622 19.921 4.88784 19.7924 4.81154ZM13.9364 14.1716C13.9357 14.8734 13.367 15.442 12.6652 15.4428H2.11864C1.41684 15.442 0.848285 14.8734 0.847458 14.1716V5.80614C0.848285 5.10451 1.41684 4.53579 2.11864 4.53496H12.6655C13.3672 4.53579 13.9359 5.10451 13.9367 5.80614L13.9364 14.1716ZM19.1525 14.115L14.7842 11.7299V8.27503L19.1525 5.89006V14.115Z"
                                  fill="#18181B"
                                />
                              </svg>
                            </Link>
                          </li>
                        </ul>
                        {loader ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              justifyContent: "center",
                              height: "100%",
                            }}
                          >
                            <ChatLoader />
                          </div>
                        ) : (
                          <div className="msgsends">
                            {!chatData.length && (
                              <div
                                className="says_hii_gif"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100vh",
                                }}
                              >
                                <div className="modal_msg">
                                  <img
                                    alt=""
                                    style={{ height: "50px" }}
                                    src={Say_hi}
                                  />
                                  <p>
                                    Say hi{" "}
                                    {name?.user?.firstName
                                      ? name?.user?.firstName +
                                        " " +
                                        name?.user?.lastName
                                      : "-"}{" "}
                                    with a wave
                                  </p>
                                  <button
                                    className="button"
                                    onClick={(e) => {
                                      handleSendMessage(e, "Hi");
                                    }}
                                  >
                                    Say hi
                                  </button>
                                </div>
                              </div>
                            )}
                            <ul
                              className="chats"
                              ref={messageEl}
                              onScroll={firstEvent}
                              id="chat-feed"
                            >
                              {chatData.length
                                ? chatData.map((item, i) => (
                                    <>
                                      <li className="display_date">
                                        {moment(new Date()).format(
                                          "DD-MM-YYYY"
                                        ) ===
                                        moment(new Date(item?.date)).format(
                                          "DD-MM-YYYY"
                                        )
                                          ? "Today"
                                          : moment(new Date(item?.date)).format(
                                              "DD-MM-YYYY"
                                            )}
                                      </li>
                                      {item.item.map((res, i) => {
                                        return (
                                          <>
                                            {res.senderId === userData._id && (
                                              <>
                                                {res?.jsonMessage?.doctor
                                                  ?._id ? (
                                                  <li
                                                    className=" mt-2 send_massage "
                                                    key={`sender${i}`}
                                                  >
                                                    <div className="massage_sent">
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          alignItems: "end",
                                                        }}
                                                      >
                                                        <div
                                                          style={{
                                                            padding: "10px",
                                                            wordBreak:
                                                              "break-word",
                                                          }}
                                                        >
                                                          <div>
                                                            <span className="p-0 fw-semibold">
                                                              {
                                                                res?.jsonMessage
                                                                  ?.patient
                                                                  ?.firstName
                                                              }{" "}
                                                              {
                                                                res?.jsonMessage
                                                                  ?.patient
                                                                  ?.lastName
                                                              }
                                                            </span>{" "}
                                                            Scheduled a meeting
                                                            with{" "}
                                                            <span className="p-0 fw-semibold">
                                                              {
                                                                res?.jsonMessage
                                                                  ?.doctor
                                                                  ?.firstName
                                                              }{" "}
                                                              {
                                                                res?.jsonMessage
                                                                  ?.doctor
                                                                  ?.lastName
                                                              }
                                                            </span>
                                                          </div>
                                                          <div>
                                                            <span className="p-0 fw-semibold">
                                                              Date :
                                                            </span>{" "}
                                                            {
                                                              res?.jsonMessage
                                                                ?.videoCall
                                                                ?.videoCallDate
                                                            }
                                                          </div>
                                                          <div>
                                                            <span className="p-0 fw-semibold">
                                                              Time :
                                                            </span>{" "}
                                                            {
                                                              res?.jsonMessage
                                                                ?.videoCall
                                                                ?.videoCallTime
                                                            }
                                                          </div>
                                                          <div className="mt-3">
                                                            {!isWithin10Minutes(
                                                              `${res?.jsonMessage?.videoCall?.videoCallDate} ${res?.jsonMessage?.videoCall?.videoCallTime}`
                                                            ) ? (
                                                              <GoogleLogin
                                                                clientId={
                                                                  clientId
                                                                }
                                                                className="w-100"
                                                                buttonText="Sign In With Google"
                                                                scope="https://www.googleapis.com/auth/calendar"
                                                                onSuccess={(
                                                                  ress
                                                                ) =>
                                                                  onLoginSuccess(
                                                                    ress,
                                                                    res
                                                                  )
                                                                }
                                                                onFailure={
                                                                  onLoginFailure
                                                                }
                                                                cookiePolicy={
                                                                  "single_host_origin"
                                                                }
                                                                render={(
                                                                  renderProps
                                                                ) => (
                                                                  <button
                                                                    className="Reschedule-button mx-1"
                                                                    id="google-login"
                                                                    onClick={() => {
                                                                      renderProps.onClick();
                                                                    }}
                                                                  >
                                                                    <AiOutlinePlus className="me-1" />
                                                                    Add to
                                                                    Calendar
                                                                  </button>
                                                                )}
                                                              />
                                                            ) : (
                                                              <button
                                                                className="join-button"
                                                                onClick={() =>
                                                                  window.open(
                                                                    window
                                                                      .location
                                                                      .protocol +
                                                                      "//" +
                                                                      window
                                                                        .location
                                                                        .hostname +
                                                                      (window
                                                                        .location
                                                                        .port
                                                                        ? ":" +
                                                                          window
                                                                            .location
                                                                            .port
                                                                        : "") +
                                                                      "/" +
                                                                      res
                                                                        ?.jsonMessage
                                                                        ?.videoLinkPath,
                                                                    "_blank"
                                                                  )
                                                                }
                                                              >
                                                                Join
                                                              </button>
                                                            )}
                                                          </div>
                                                        </div>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            alignItems:
                                                              "center",
                                                            justifyContent:
                                                              "end",
                                                            gap: "5px",
                                                            margin: "5px",
                                                            minWidth: "45px",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: "10px",
                                                              padding: "0px",
                                                              color: "darkgrey",
                                                            }}
                                                          >{`${new Date(
                                                            res?.createdAt
                                                          ).getHours()}:${new Date(
                                                            res?.createdAt
                                                          ).getMinutes()}`}</span>
                                                          {res?.status === 0 ? (
                                                            <SingleTick
                                                              width="12px"
                                                              height="12px"
                                                            />
                                                          ) : res?.status ===
                                                            1 ? (
                                                            <DoubleTicks
                                                              width="12px"
                                                              height="12px"
                                                            />
                                                          ) : (
                                                            <BlueTicks
                                                              width="16px"
                                                              height="16px"
                                                            />
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="ms-2 me-2 "
                                                      style={{
                                                        height: "40px",
                                                        width: "40px",
                                                      }}
                                                    >
                                                      {sendermsg.includes(
                                                        res
                                                      ) ? (
                                                        <img
                                                          src={
                                                            userData?.image
                                                              ? userData?.image
                                                              : profile3
                                                          }
                                                          alt="sender"
                                                          style={{
                                                            height: "30px",
                                                            width: "30px",
                                                          }}
                                                        />
                                                      ) : (
                                                        ""
                                                      )}
                                                    </div>
                                                  </li>
                                                ) : (
                                                  <li
                                                    className=" mt-2 send_massage "
                                                    key={`sender${i}`}
                                                  >
                                                    <div className="massage_sent">
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          alignItems: "end",
                                                        }}
                                                      >
                                                        <div
                                                          style={{
                                                            padding: "10px",
                                                            wordBreak:
                                                              "break-word",
                                                          }}
                                                        >
                                                          <Autolinker
                                                            text={res.message}
                                                          />
                                                          {/* {res.message} */}
                                                        </div>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            alignItems:
                                                              "center",
                                                            justifyContent:
                                                              "end",
                                                            gap: "5px",
                                                            margin: "5px",
                                                            minWidth: "45px",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: "10px",
                                                              padding: "0px",
                                                              color: "darkgrey",
                                                            }}
                                                          >{`${new Date(
                                                            res?.createdAt
                                                          ).getHours()}:${new Date(
                                                            res?.createdAt
                                                          ).getMinutes()}`}</span>
                                                          {res?.status === 0 ? (
                                                            <SingleTick
                                                              width="12px"
                                                              height="12px"
                                                            />
                                                          ) : res?.status ===
                                                            1 ? (
                                                            <DoubleTicks
                                                              width="12px"
                                                              height="12px"
                                                            />
                                                          ) : (
                                                            <BlueTicks
                                                              width="16px"
                                                              height="16px"
                                                            />
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="ms-2 me-2 "
                                                      style={{
                                                        height: "40px",
                                                        width: "40px",
                                                      }}
                                                    >
                                                      {sendermsg.includes(
                                                        res
                                                      ) ? (
                                                        <img
                                                          src={
                                                            userData?.image
                                                              ? userData?.image
                                                              : profile3
                                                          }
                                                          alt="sender"
                                                          style={{
                                                            height: "30px",
                                                            width: "30px",
                                                          }}
                                                        />
                                                      ) : (
                                                        ""
                                                      )}
                                                    </div>
                                                  </li>
                                                )}
                                              </>
                                            )}
                                            {res.senderId !== userData._id && (
                                              <>
                                                {res?.jsonMessage?.doctor
                                                  ?._id ? (
                                                  <li
                                                    className="mt-2 receiv_massage"
                                                    key={`receiver${i}`}
                                                  >
                                                    <div
                                                      className="chat_screen_user_image_chat_discuss_text_message"
                                                      style={{
                                                        height: "40px",
                                                        width: "40px",
                                                        marginRight: "8px",
                                                      }}
                                                    >
                                                      <img
                                                        src={
                                                          name?.user?.image
                                                            ? name?.user?.image
                                                            : profile3
                                                        }
                                                        alt="receiver"
                                                        className="rounded-pill"
                                                        style={{
                                                          height: "30px",
                                                          width: "30px",
                                                        }}
                                                      />
                                                    </div>
                                                    <div
                                                      className="massage_sent"
                                                      style={{
                                                        backgroundColor:
                                                          "#e3f8ff",
                                                      }}
                                                    >
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          alignItems: "end",
                                                        }}
                                                      >
                                                        <div
                                                          style={{
                                                            margin: "5px",
                                                            minWidth: "26px",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: "10px",
                                                              padding: "0px",
                                                              backgroundColor:
                                                                "#e3f8ff",
                                                              color: "darkgrey",
                                                            }}
                                                          >{`${new Date(
                                                            res?.createdAt
                                                          ).getHours()}:${new Date(
                                                            res?.createdAt
                                                          ).getMinutes()}`}</span>
                                                        </div>
                                                        <div
                                                          className="receive_message"
                                                          style={{
                                                            padding: "10px",
                                                            wordBreak:
                                                              "break-word",
                                                          }}
                                                        >
                                                          <div>
                                                            <span className="p-0 fw-semibold">
                                                              {
                                                                res?.jsonMessage
                                                                  ?.patient
                                                                  ?.firstName
                                                              }{" "}
                                                              {
                                                                res?.jsonMessage
                                                                  ?.patient
                                                                  ?.lastName
                                                              }
                                                            </span>{" "}
                                                            Scheduled a meeting
                                                            with{" "}
                                                            <span className="p-0 fw-semibold">
                                                              {
                                                                res?.jsonMessage
                                                                  ?.doctor
                                                                  ?.firstName
                                                              }{" "}
                                                              {
                                                                res?.jsonMessage
                                                                  ?.doctor
                                                                  ?.lastName
                                                              }
                                                            </span>
                                                          </div>
                                                          <div>
                                                            <span className="p-0 fw-semibold">
                                                              Date :
                                                            </span>{" "}
                                                            {
                                                              res?.jsonMessage
                                                                ?.videoCall
                                                                ?.videoCallDate
                                                            }
                                                          </div>
                                                          <div>
                                                            <span className="p-0 fw-semibold">
                                                              Time :
                                                            </span>{" "}
                                                            {
                                                              res?.jsonMessage
                                                                ?.videoCall
                                                                ?.videoCallTime
                                                            }
                                                            (EST)
                                                          </div>
                                                          <div className="mt-3">
                                                            {!isWithin10Minutes(
                                                              `${res?.jsonMessage?.videoCall?.videoCallDate} ${res?.jsonMessage?.videoCall?.videoCallTime}`
                                                            ) ? (
                                                              <button className="Reschedule-button mx-1">
                                                                <AiOutlinePlus className="me-1" />
                                                                Add to Calendar
                                                              </button>
                                                            ) : (
                                                              <button
                                                                className="join-button"
                                                                onClick={() =>
                                                                  window.open(
                                                                    window
                                                                      .location
                                                                      .protocol +
                                                                      "//" +
                                                                      window
                                                                        .location
                                                                        .hostname +
                                                                      (window
                                                                        .location
                                                                        .port
                                                                        ? ":" +
                                                                          window
                                                                            .location
                                                                            .port
                                                                        : "") +
                                                                      "/" +
                                                                      res
                                                                        ?.jsonMessage
                                                                        ?.videoLinkPath,
                                                                    "_blank"
                                                                  )
                                                                }
                                                              >
                                                                Join
                                                              </button>
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </li>
                                                ) : (
                                                  <li
                                                    className="mt-2 receiv_massage"
                                                    key={`receiver${i}`}
                                                  >
                                                    <div
                                                      className="chat_screen_user_image_chat_discuss_text_message"
                                                      style={{
                                                        height: "40px",
                                                        width: "40px",
                                                        marginRight: "8px",
                                                      }}
                                                    >
                                                      <img
                                                        src={
                                                          name?.user?.image
                                                            ? name?.user?.image
                                                            : profile3
                                                        }
                                                        alt="receiver"
                                                        className="rounded-pill"
                                                        style={{
                                                          height: "30px",
                                                          width: "30px",
                                                        }}
                                                      />
                                                    </div>
                                                    <div
                                                      className="massage_sent"
                                                      style={{
                                                        backgroundColor:
                                                          "#e3f8ff",
                                                      }}
                                                    >
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          alignItems: "end",
                                                        }}
                                                      >
                                                        <div
                                                          style={{
                                                            margin: "5px",
                                                            minWidth: "26px",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: "10px",
                                                              padding: "0px",
                                                              backgroundColor:
                                                                "#e3f8ff",
                                                              color: "darkgrey",
                                                            }}
                                                          >{`${new Date(
                                                            res?.createdAt
                                                          ).getHours()}:${new Date(
                                                            res?.createdAt
                                                          ).getMinutes()}`}</span>
                                                        </div>
                                                        <div
                                                          className="receive_message"
                                                          style={{
                                                            padding: "10px",
                                                            wordBreak:
                                                              "break-word",
                                                          }}
                                                        >
                                                          {res.message?.includes(
                                                            "I’ve reviewed your information and it would be great to schedule a brief 10 min video call to confirm and chat through next steps"
                                                          ) ? (
                                                            <>
                                                              {" "}
                                                              <div
                                                                style={{
                                                                  marginTop:
                                                                    "-20px",
                                                                }}
                                                              >
                                                                {
                                                                  res?.message?.split(
                                                                    "."
                                                                  )[0]
                                                                }
                                                                .
                                                              </div>
                                                              <div
                                                                className="d-inline-block text-decoration-underline cursor-pointer text-danger"
                                                                onClick={() => {
                                                                  setModal(
                                                                    true
                                                                  );
                                                                  setDate(
                                                                    new Date()
                                                                  );
                                                                }}
                                                              >{`Schedule your video consultation`}</div>
                                                            </>
                                                          ) : (
                                                            <Autolinker
                                                              text={
                                                                res?.message
                                                              }
                                                            />
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </li>
                                                )}
                                              </>
                                            )}
                                          </>
                                        );
                                      })}
                                    </>
                                  ))
                                : ""}
                            </ul>
                            <div
                              className="entermsgsend entermsgsends"
                              style={{
                                position: "unset",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <TextareaAutosize
                                ref={focusref}
                                style={{ padding: "15px 20px" }}
                                minRows={1}
                                maxRows={5}
                                placeholder={`Write a message for ${
                                  name?.user?.firstName
                                    ? name?.user?.firstName +
                                      " " +
                                      name?.user?.lastName
                                    : "-"
                                } `}
                                value={message}
                                onChange={(e) => {
                                  // socket?.emit("is_user_typing", true);
                                  // setTimeout(() => {
                                  //   socket?.emit("is_user_typing", false);
                                  // }, 2000);
                                  setMessage(e?.target?.value);
                                }}
                                onKeyUp={(e) => handleKeySendMsg(e)}
                                className={message ? "set_button" : "set_input"}
                              />
                              {message.length ? (
                                <a
                                  onClick={(e) => {
                                    handleSendMessage(e, message);
                                  }}
                                  style={{ position: "unset" }}
                                >
                                  Send
                                </a>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        className="web_app_main_div_image_messages_search"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "91vh",
                          // height: "93vh",
                        }}
                      >
                        <img
                          src={Massages}
                          style={{ height: "500px", width: "100%" }}
                          alt=""
                        ></img>
                      </div>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        {/* booked schedule */}
        <div className="">
          <Modal
            show={modal}
            onHide={() => setModal(false)}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="calender"
          >
            <Modal.Body>
              <div
                className="text-start border-bottom mb-3"
                style={{ color: "#18181B", textTransform: "uppercase" }}
              >
                <h2>Choose a date and time</h2>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <h4 className="text-start mb-3" style={{ color: "#18181B" }}>
                    Select Dates
                  </h4>
                  <div style={wrapperStyle}>
                    <Calendar
                      fullscreen={false}
                      disabledDate={disabledDate}
                      onChange={(e) => {
                        setDate(e?.$d);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <h4 className="text-start mb-3" style={{ color: "#18181B" }}>
                    Choose Schedule Time
                  </h4>
                  <div
                    className="rounded-3 p-3"
                    style={{ background: "#F4F4F5" }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="show-date">
                        {moment(date).format("dddd, MMMM Do")}
                      </div>
                      <div>
                        {show ? (
                          <RxCaretUp
                            className="cursor-pointer"
                            size={25}
                            color="#18181B"
                            onClick={() => setShow(!show)}
                          />
                        ) : (
                          <RxCaretDown
                            className="cursor-pointer"
                            size={25}
                            color="#18181B"
                            onClick={() => setShow(!show)}
                          />
                        )}
                      </div>
                    </div>
                    {show && (
                      <>
                        <hr />
                        <div className="row">
                          {sloat?.length > 0 ? (
                            sloat?.map((val, i) => {
                              return (
                                <div className="col-md-3">
                                  <div
                                    className={`p-2 rounded-pill fw-semibold cursor-pointer sloatHover mt-3 ${
                                      timesloat === i
                                        ? "bg-active text-white"
                                        : "bg-white text-secondary"
                                    }`}
                                    onClick={() => SetTimesloat(i)}
                                  >
                                    {val?.startTime?.h >= 13
                                      ? val?.startTime?.h - 12 >= 10
                                        ? val?.startTime?.h - 12
                                        : `0${val?.startTime?.h - 12}`
                                      : val?.startTime?.h}{" "}
                                    : {val?.startTime?.m}{" "}
                                    {val?.startTime?.h >= 12 ? "PM" : "AM"}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div
                              className="text-center"
                              style={{ color: "#18181B" }}
                            >
                              Doctor is not Available
                            </div>
                          )}
                        </div>
                        <div className="d-flex mt-4">
                          <div
                            className="btnCon w-100 justify-content-center cursor-pointer mx-2"
                            onClick={() => {
                              SetTimesloat();
                              setModal(false);
                            }}
                          >
                            Cancel
                          </div>
                          <button
                            className="btnCon w-100 justify-content-center cursor-pointer mx-2"
                            onClick={() => bookSloat()}
                            disabled={loading}
                          >
                            {loading ? "Loading....." : "Continue"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      {/* login with google and add event in google calnder */}
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign In With Google"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
        scope="https://www.googleapis.com/auth/calendar"
        render={(renderProps) => (
          <button
            className="Reschedule-button mx-1 d-none"
            id="google-login"
            onClick={renderProps.onClick}
          >
            <AiOutlinePlus className="me-1" />
            Add to Calendar
          </button>
        )}
      />
    </>
  );
};

export default ChatScreen;
