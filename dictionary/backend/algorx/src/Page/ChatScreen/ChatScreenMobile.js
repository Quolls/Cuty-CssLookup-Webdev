import "./ChatScreenMobile.css";
import React, { useState, useEffect, useRef } from "react";
import profile3 from "../../Assets/images/chat/avatarBlue.png";
import { Row, Col,  Modal, } from "react-bootstrap";
import { Link, useLocation,} from "react-router-dom";
import SideDrawer from "../SideDrawer/SideDrawer";
import Header from "../Header/Header";
import { useContext } from "react";
import { appContext } from "../../helpers/AppContext";
import Auth from "../../helpers/Auth";
import { ReactComponent as SingleTick } from "../../Assets/images/chat/singleTick.svg";
import { ReactComponent as DoubleTicks } from "../../Assets/images/chat/doubleTicks.svg";
import { ReactComponent as BlueTicks } from "../../Assets/images/chat/blueTicks.svg";
import Say_hi from "../../Assets/images/Say_hi.gif";
import moment from "moment";
import ChatLoader from "../../Component/ChatLoader/ChatLoader";
import { TextareaAutosize } from "@mui/material";
import { RiArrowLeftSLine } from "react-icons/ri";
import { ApiGet, ApiGetMessage, ApiPost } from "../../helpers/API/API_data";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { Calendar } from "antd";
import { ErrorToast, SuccessToast } from "../../Component/Toaster/Toaster";
import { AiOutlinePlus } from "react-icons/ai";
import { GoogleLogin } from "react-google-login"
import { loadGapiInsideDOM } from "gapi-script";
import { v4 as uuidv4 } from 'uuid';
import Autolinker from 'react-autolinker';

const ChatScreenMobile = () => {
  const uuid = uuidv4();
const clientId = process.env.REACT_APP_GOOGLE_CLOUD_SECTREAT_ID;
  const { socket, loader,  connectSocket } = useContext(appContext);
  const userData = Auth.getUserData();
  const [message, setMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const [chatData, setchatData] = useState([]);
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(true);
  const [date, setDate] = useState(new Date());
  const [timesloat, SetTimesloat] = useState("");
  const [sloat, setSloat] = useState([]);
  const [userMessage, setUserMessage] = useState([]);
  const [doctorRoomId, setDoctorRoomId] = useState();
  const [roomId, setRoomId] = useState("");
  const [page, setPage] = useState(1);
  const [name, setName] = useState();
  const [profile, setProfile] = useState({})
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const focusref = useRef();
  const messageEl = useRef(null);
  const elementRef = useRef(null);

  const location = useLocation();

  // get message id from useParams
  let messageId = window.location?.pathname.split("/")[2];
  const id = window.location?.pathname.split("/")[3];
  const receiverId = id;
  
  

  useEffect(() => {
    setRoomId(messageId);
    connectSocket()
  }, []);

  // open selected room chat when navigate fron initial chat and chat with screen
  useEffect(() => {
    if (location?.state?.doctorId) {
      const doctorRoomId = rooms?.find(
        (ele) => ele?.user?._id === location?.state?.doctorId
      );
      setDoctorRoomId(doctorRoomId);
    }
  }, [rooms]);



  const scrollToBottom = () => {
    if (elementRef.current) {
      elementRef.current.scrollToBottom = elementRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    
    scrollToBottom();
  }, [page]);

// handle sent message
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

// sent msg on hit enter
  const handleKeySendMsg = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage(e, message);
    }
  };

  // set sender and receiver message
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

// update message seen and un-seen status by sockes
  useEffect(() => {
    socket?.emit("online", { userId: userData?._id });
  }, [socket]);

  socket?.off("receive_message").on("receive_message", (data) => {

    socket?.emit("message_deliver_status", {
      messageId: data._id,
      status:
        data?.roomId === (doctorRoomId?._id ? doctorRoomId?._id : roomId) && data?.receiverId === userData?._id && window.location?.pathname !== "/ChatScreen"
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

  
// get chat message
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
      });
  };

  // load message on scroll
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

  // get chat message with room change
  useEffect(() => {
    if (roomId && rooms.length > 0) {
      const name = rooms?.find((ele) => ele?.user?._id === id);
      setName(name);
      focusref?.current?.focus();
      callmessage();
    }



  }, [roomId, rooms]);


  useEffect(() => {
    if (doctorRoomId) {
      const name = rooms?.find(
        (ele) => ele?.user?._id === doctorRoomId.user?._id
      );
      setName(name);
      focusref?.current?.focus();
    }
  }, [doctorRoomId?._id]);

  // scroll to bottom
  const scrollToBottomWithSmoothScroll = () => {
    messageEl.current?.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "auto" });
    });
  };


// modify user message responses
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

  useEffect(() => {
    (async () => {
      await loadGapiInsideDOM();
    })();
  });

  // get room data
  const getRoomData = async () => {
    let body = {
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
  // get profile data
  
  const getProfile = () => {
    ApiGet("patient").then((res) => {
      setProfile(res?.data?.data[0])


    }).catch((err) => {
      console.log('err', err)
    })
  }
 
  // get room and profile data on initial load 
  useEffect(() => {
    getRoomData()
    getProfile()
  }, [])

   const handleLinkClick = () => {
    setRoomId("")
  };

  // -----book slot for video call----------
  const wrapperStyle = {
    border: "1px solid rgb(240, 240, 240)",
    borderRadius: "8px",
    backgroundColor: "#FFFBF3",
  };
  const disabledDate = (current) => {
    // Disable dates before today (past dates)
    return current && current < moment().startOf("day");
  };
    // get available slot datewise 
  const getSloat = () => {
    let body = {
      date: moment(date)?.format("YYYY-MM-DD"),
      doctorId: id,
      currentTime: new Date()
    };
    ApiPost("patient/schedule/get", body)
      .then((res) => {
        setSloat(res?.data?.data?.slotList);
      })
      .catch((err) => {
        ErrorToast(err?.message)
        console.log("err", err);
        setSloat([]);
      });
  };

  // book slot for video call
  const bookSloat = () => {
    setLoading(true)
    let time = sloat?.find((val, i) => i === timesloat);
    time = time?.startTime
    const dateObj = new Date(date);
    dateObj.setUTCHours(time?.h);
    dateObj.setUTCMinutes(time?.m);
    const formattedDate = dateObj.toISOString().replace(/Z$/, "");
    let body = {
      date: moment(date)?.format("YYYY-MM-DD"),
      time: time,
      doctorId: id,
      slotDateTime: formattedDate,
    };
    if (time) {
      ApiPost("patient/schedule/video_allocation", body)
        .then((res) => {
          SuccessToast(res?.data?.message);
          setModal(false);
          setLoading("")
        })
        .catch((err) => {
          console.log("err", err);
          ErrorToast(err?.message);
          setLoading(false)
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
// ------------agora video call-----------

// replace add to calander with join before 10 min of shedule time
const isWithin10Minutes = (dateTime) => {
  const givenDateTime = moment(dateTime, 'DD-MM-YYYY HH:mm');
  const currentDateTime = moment();

  const differenceInMinutes = givenDateTime.diff(currentDateTime, 'minutes');

  return differenceInMinutes < 10;
}
  // ---------login with google and add event in google calander-----

  // login with google
  const onLoginSuccess = (res,selectedData) => {
    
    if (selectedData?.jsonMessage?.patientEmail?.includes(res?.profileObj?.email)) {
      SuccessToast("Event Already Added")
      return 
    }
    let body = {
      accessToken: res?.tokenObj?.access_token,
      refreshToken: res?.tokenObj?.id_token,
      patientId: profile?._id,
      doctorId: "",
      addToCaledarId : selectedData?._id,
      userEmail: res?.profileObj?.email,
      isPatient:true
    }
    ApiPost("patient/google_login", body).then((res) => {
      getProfile()
      addEvent(selectedData)
    }).catch((err) => {
      console.log('err', err)
    })
  };
  const onLoginFailure = (res) => {
  };

  // add event in google calander
  const addEvent = (res) => {
    const dateTime = moment(`${res?.jsonMessage?.videoCall?.videoCallDate} ${res?.jsonMessage?.videoCall?.videoCallTime}`, "DD-MM-YYYY hh:mm A");
    const formattedDateTime = dateTime?.format("YYYY-MM-DDTHH:mm:ss");
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    let body =
    {
      "patientId": profile?._id,
      "doctorId": "",
      addToCaledarId : data?._id,
      "googleCalendarPayload": {
        start: {
          dateTime: formattedDateTime,
          timeZone,
        },
        end: {
          dateTime: formattedDateTime,
          timeZone,
        },
        "summary": `Medicine Meeting with ${res?.jsonMessage?.doctor?.firstName} ${res?.jsonMessage?.doctor?.lastName}`,
        "description": `Meeting URL ${window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/' + res
          ?.jsonMessage
          ?.videoLinkPath}`,
        "conferenceData": {
          "createRequest": {
            "requestId": uuid,
            "conferenceSolutionKey": {
              "type": "eventHangout"
            },
            "entryPoints": [
              {
                "entryPointType": "video",
                "uri": `${window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/' + res
                  ?.jsonMessage
                  ?.videoLinkPath}`
              }
            ]
          }
        }
      },
      addToCaledarId : res?._id
    }
    ApiPost("patient/message/google/calendar", body).then((res) => {
      SuccessToast(res?.data?.message)
      setData({})
      callmessage()
    }).catch((err) => {
      ErrorToast(err?.message);
      console.log('err', err)
    })
  }

  return (
    <>
      <div className="chatscreen admindashboard chat_with_doctor chat_screen_mobile">
        <Row>
          <Col lg={2}>
            <SideDrawer />
          </Col>
          <Col lg={10}>
            <Header />
            <div className="inner_div_dashboard">
              <ul className="chatprofileheader">
                <li>
                  <Link
                    to={"/ChatScreen"}
                    className="chat_screen_arrow_mobile_link"
                    onClick={handleLinkClick}
                  >

                    <RiArrowLeftSLine />
                  </Link>
                  <img
                    src={name?.user?.image ? name?.user?.image : profile3}
                    className="userAvatar"
                    alt=""
                  />
                  <div className="chatmeninfo">
                    <h4>
                      {name?.user?.firstName
                        ? name?.user?.firstName + " " + name?.user?.lastName
                        : "-"}
                    </h4>
                    <p>{name && name?.user?.email}</p>
                  </div>
                </li>
                <li>
                  <Link to="" className="chat_screen_web_inner_image_div">
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
                        <img alt="" style={{ height: "50px" }} src={Say_hi} />
                        <p>
                          Say hi{" "}
                          {name?.user?.firstName
                            ? name?.user?.firstName + " " + name?.user?.lastName
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
                  {/* user's msg list */}
                  <ul className="chats"
                    ref={messageEl}
                    onScroll={firstEvent} id="chat-feed">
                    {chatData.length && chatData.length
                      ? chatData.map((item, i) => (
                        <>
                          <li className="display_date">
                            {moment(new Date()).format("DD-MM-YYYY") ===
                              moment(new Date(item?.date)).format("DD-MM-YYYY")
                              ? "Today"
                              : moment(new Date(item?.date)).format(
                                "DD-MM-YYYY"
                              )}
                          </li>
                          {item.item.map((res, i) => (
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
                                              {!isWithin10Minutes(`${res?.jsonMessage
                                                ?.videoCall
                                                ?.videoCallDate} ${res?.jsonMessage
                                                  ?.videoCall
                                                  ?.videoCallTime}`) ?
                                                res?.jsonMessage?.isGoogleCalendarEventAdded?.patient  ? 
                                                <button
                                                className="Reschedule-button mx-1"
                                                onClick={() => {
                                                  SuccessToast("Event Already Added")
                                                }}
                                              >
                                                <AiOutlinePlus className="me-1" />
                                                Add to
                                                Calendar
                                              </button>
                                                :
                                                // login with google and add event into google calnder
                                                <GoogleLogin
                                                clientId={clientId}
                                                className="w-93"
                                                buttonText="Sign In With Google"
                                                onSuccess={(ress) => onLoginSuccess(ress, res)}
                                                onFailure={onLoginFailure}
                                                cookiePolicy={"single_host_origin"}
                                                scope="https://www.googleapis.com/auth/calendar"
                                              render={(renderProps) => (
                                                <button className="Reschedule-button mx-1" id="google-login" onClick={() => {setData(res); renderProps.onClick(); }}>
                                                  <AiOutlinePlus className="me-1" />
                                                  Add to Calendar
                                                </button>
                                              )}
                                              />
                                                :
                                                <button
                                                  className="join-button"
                                                  onClick={() =>
                                                    window.open(
                                                      window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/' + res
                                                        ?.jsonMessage
                                                        ?.videoLinkPath,
                                                      "_blank"
                                                    )
                                                  }
                                                >
                                                  Join
                                                </button>}
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
                                            {/* {res.message} */}
                                            <Autolinker text={res?.message} />
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
                                              {!isWithin10Minutes(`${res?.jsonMessage
                                                ?.videoCall
                                                ?.videoCallDate} ${res?.jsonMessage
                                                  ?.videoCall
                                                  ?.videoCallTime}`) ? <button className="Reschedule-button mx-1">
                                                <AiOutlinePlus className="me-1" />
                                                Add to Calendar
                                              </button> :
                                                <button
                                                  className="join-button"
                                                  onClick={() =>
                                                    window.open(
                                                      window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/' + res
                                                        ?.jsonMessage
                                                        ?.videoLinkPath,
                                                      "_blank"
                                                    )
                                                  }
                                                >
                                                  Join
                                                </button>}
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
                                            {res.message?.includes("I’ve reviewed your information and it would be great to schedule a brief 10 min video call to confirm and chat through next steps") ? <> <div style={{ marginTop: "-20px" }}>{res?.message?.split(".")[0]}.</div><div className="d-inline-block text-decoration-underline cursor-pointer text-danger" onClick={() => {setModal(true);setDate(new Date())}}>
                                            {`Schedule your video consultation`}
                                            </div></> :
                                              <Autolinker text={res?.message} />
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                </>
                              )}
                            </>
                          ))}
                        </>
                      ))
                      : ""}
                  </ul>
                  {/* sent msg */}
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
                      placeholder={`Write a message for ${name?.user?.firstName
                        ? name?.user?.firstName + " " + name?.user?.lastName
                        : "-"
                        } `}
                      value={message}
                      onChange={(e) => {
                        setMessage(e?.target?.value);
                      }}
                      onKeyUp={(e) => handleKeySendMsg(e)}
                      className={message ? "set_button" : "set_input"}
                    />
                    {message.length ? (
                      <Link
                        onClick={(e) => {
                          handleSendMessage(e, message);
                        }}
                        style={{ position: "unset" }}
                      >
                        Send
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
        {/* booked slot for video call */}
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
                <div className="col-md-12">
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
                <div className="col-md-12 mt-3">
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
                                    className={`p-2 rounded-pill fw-semibold cursor-pointer sloatHover mt-3 ${timesloat === i
                                      ? "bg-active text-white"
                                      : "bg-white text-secondary"
                                      }`}
                                    onClick={() => SetTimesloat(i)}
                                  >
                                    {val?.startTime?.h  >= 13
                                      ? val?.startTime?.h  - 12 >= 10
                                        ? val?.startTime?.h  - 12
                                        : `0${val?.startTime?.h  - 12}`
                                      : val?.startTime?.h }{" "}
                                    : {val?.startTime?.m} {val?.startTime?.h  >= 12 ? "PM" : "AM"}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-center" style={{ color: "#18181B" }}>
                              Doctor is not Available
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex mt-4">

                <div
                  className="btnCon w-100 justify-content-center cursor-pointer mx-2"
                  onClick={() => SetTimesloat()}
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
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ChatScreenMobile;
