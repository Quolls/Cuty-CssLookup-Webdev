import { Link, useNavigate } from "react-router-dom";
import notification from "../../Assets/images/notification.png";
// import user from "../../Assets/images/darkuser.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-regular-svg-icons";
import { ApiGet, ApiPost } from "../../helpers/API/API_data";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Drawer } from "@mui/material";
import Logo from "../../Assets/images/svg/AlgoRX_logo.svg";
import logo from "../../Assets/images/svg/AlgoRX_logo.svg";
import { SidebarUl } from "../SideDrawer/SideDrawer";
import { appContext } from "../../helpers/AppContext";
import notificationSVG from "../../Assets/images/svg/notification.svg";

const Header = () => {
  const Name = JSON.parse(localStorage.getItem("patientName"));
  const [notify, setNotify] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth > 1440);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadData, setUnreadData] = useState();

  const navigate = useNavigate();

  const { UnreadMsg, isCostpmerSupportOpen } = useContext(appContext);

  let pathName = window.location.pathname;

  // handle responsiveness
  useEffect(() => {
    window.addEventListener("resize", () => {
      const isMobiles = window.innerWidth > 1440;
      if (isMobile !== isMobiles) setIsMobile(isMobiles);
    });
    if (isCostpmerSupportOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isCostpmerSupportOpen]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("logindata"));
    if (localData) {
      notifications(localData._id);
    }
  }, []);

  // get notification data
  const notifications = () => {
    ApiGet(`patient/patient_notifications`)
      .then((res) => {
        setNotify(res?.data?.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  // toggle sidebar
  const handleIsOpen = () => setIsOpen(!isOpen);

  // get count data
  const countData = () => {
    ApiGet(`patient/unseen_count`).then((res) => {
      setUnreadData(res?.data?.data);
    });
  };

  // get count data
  useEffect(() => {
    countData();
  }, []);

  // handle count seen and unseen by count post API
  const HandleClick = (name) => {
    const body = {
      isOrders: name === "Orders" ? true : false,
      isSubscription: name === "subscription" ? true : false,
    };
    ApiPost(`patient/unseen_count`, body).then((res) => {
      // console.log("res👏", res);
    });
  };

  return (
    <header className="chatheader">
      <div className="header chHeader">
        <div className="profilelogo flex items-center">
          {!isMobile ? (
            <img className="header_logo_main" src={logo} alt="" />
          ) : (
            <span
              className="text-capitalize flex items-center"
              onClick={() => navigate("/editPatient?isedit=${true}")}
              style={{ cursor: "pointer" }}
            >
              {/* <img src={user} alt="" className="me-3" /> */}
              <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" />
              {Name}
            </span>
          )}
        </div>
        <div className="header_right_bar">
          {/* <div className="notificationicon">
            <Link to="">
              <img src={notification} alt="" />
            </Link>
            <input type="checkbox" />
            <ul className="bell noti">
              {notify?.map((item) => {
                return (
                  <li style={{ justifyContent: "space-between", gap: "20px" }}>
                    <p style={{ textAlign: "start" }}>
                      <span></span>
                      {item?.message}
                    </p>
                    <div
                      className="notiicon"
                      style={{ maxWidth: "90px", marginLeft: "0px" }}
                    >
                      <img
                        src={notificationSVG}
                        style={{ width: "20px" }}
                        alt="notification img"
                      />
                      <p>
                        {moment(new Date()).format("DD/MM/YYYY") ===
                        moment(new Date(item?.createdAt)).format("DD/MM/YYYY")
                          ? "Today"
                          : moment(new Date(item?.createdAt)).format("DD/MM")}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div> */}
          {!isMobile ? (
            <div className="header_hamburger_menu">
              <button className="header_hamburger_menu_button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_5067_68597)">
                    <path
                      d="M20 22H18V20C18 19.2044 17.6839 18.4413 17.1213 17.8787C16.5587 17.3161 15.7956 17 15 17H9C8.20435 17 7.44129 17.3161 6.87868 17.8787C6.31607 18.4413 6 19.2044 6 20V22H4V20C4 18.6739 4.52678 17.4021 5.46447 16.4645C6.40215 15.5268 7.67392 15 9 15H15C16.3261 15 17.5979 15.5268 18.5355 16.4645C19.4732 17.4021 20 18.6739 20 20V22ZM12 13C11.2121 13 10.4319 12.8448 9.7039 12.5433C8.97595 12.2417 8.31451 11.7998 7.75736 11.2426C7.20021 10.6855 6.75825 10.0241 6.45672 9.2961C6.15519 8.56815 6 7.78793 6 7C6 6.21207 6.15519 5.43185 6.45672 4.7039C6.75825 3.97595 7.20021 3.31451 7.75736 2.75736C8.31451 2.20021 8.97595 1.75825 9.7039 1.45672C10.4319 1.15519 11.2121 1 12 1C13.5913 1 15.1174 1.63214 16.2426 2.75736C17.3679 3.88258 18 5.4087 18 7C18 8.5913 17.3679 10.1174 16.2426 11.2426C15.1174 12.3679 13.5913 13 12 13ZM12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11Z"
                      fill="#18181B"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5067_68597">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          ) : (
            ""
          )}
          {!isMobile ? (
            <div className="header_hamburger_menu">
              <button
                onClick={handleIsOpen}
                className="header_hamburger_menu_button"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_5067_68598)">
                    <path
                      d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"
                      fill="#18181B"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5067_68598">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          ) : (
            ""
          )}

          <div className="custom_drawer_main">
            <Drawer
              className="custom_drawer"
              anchor="right"
              open={isOpen}
              onClose={handleIsOpen}
            >
              <div className="custom_drawer_main">
                <div className="asidechat">
                  <img onClick={handleIsOpen} src={Logo} alt="" />
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={handleIsOpen}
                    className="drawer_close"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_5114_34999)">
                        <path
                          d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20V20ZM12 10.586L14.828 7.757L16.243 9.172L13.414 12L16.243 14.828L14.828 16.243L12 13.414L9.172 16.243L7.757 14.828L10.586 12L7.757 9.172L9.172 7.757L12 10.586Z"
                          fill="#F8F5F0"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_5114_34999">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
                <div className="mobile_sidebar_ul">
                  <SidebarUl
                    pathName={pathName}
                    push={navigate}
                    UnreadMsg={UnreadMsg}
                    unreadData={unreadData}
                    HandleClick={HandleClick}
                  />
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
