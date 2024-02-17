import "./Sidebar.css";
import React, { useState, useEffect, useContext } from "react";
import AlgorxLogo from "../../Assets/images/svg/AlgoRX_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { appContext } from "../../helpers/AppContext";
import { ApiGet, ApiPost } from "../../helpers/API/API_data";
import { decryptData } from "../../helpers/Encrypt";
import { ErrorToast } from "../../Component/Toaster/Toaster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBookMedical,
  faFolders,
  faHeadset,
  faHouse,
  faMessageExclamation,
  faMessages,
  faShieldExclamation,
  faStethoscope,
} from "@fortawesome/pro-regular-svg-icons";

function SideDrawer() {
  let pathName = window.location.pathname;
  const navigate = useNavigate();
  const [unreadData, setUnreadData] = useState();
  const { setUnreadMsg, loader, setLoader } = useContext(appContext);
  const userData = JSON.parse(localStorage.getItem("logindata"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // get sidebar count data
  const countData = () => {
    ApiGet(`patient/unseen_count`)
      .then((res) => {
        setUnreadData(res?.data?.data);
        setUnreadMsg(res?.data?.data?.msgcounts);
      })
      .catch((e) => {
        //  logout user on token expire
        if (e?.status === 410) {
          ErrorToast(e.message);
          logout();
          const body1 = {
            old_token: userData?.token,
            refresh_token: userData?.refresh_token,
          };
          ApiPost("patient/generate/refresh_token", body1)
            .then(async (res) => {
              const decreptedData = decryptData(res?.data?.data);
              setLoader(true);
              if (res?.status == 200) {
                let updateUserData = {
                  ...userData,
                  token: decreptedData?.token,
                  refresh_token: decreptedData?.refresh_token,
                };
                //  localStorage.setItem("logindata", JSON.stringify(updateUserData));
                //  navigate('/Dashboard')
              }
            })
            .catch((e) => {})
            .finally(() => {
              setLoader(false);
            });
        }
      });
  };

  // get sidebar count data every 5 sec
  useEffect(() => {
    const countDataInterval = setInterval(async () => {
      await countData();
    }, 5000);
    return () => {
      clearInterval(countDataInterval);
    };
  }, []);

  // update sidebar count
  const HandleClick = (name) => {
    const body = {
      isOrders: name === "Orders" ? true : false,
      isSubscription: name === "subscription" ? true : false,
    };
    ApiPost(`patient/unseen_count`, body).then((res) => {});
  };

  return (
    <>
      <div className="chatscreen">
        <aside className="asidemain">
          <div className="asidechat">
            <img src={AlgorxLogo} width={1114} height={39} alt="" />
          </div>
          {/* sidebar url component */}
          <SidebarUl
            pathName={pathName}
            unreadData={unreadData}
            logout={logout}
            HandleClick={HandleClick}
          />
        </aside>
      </div>
    </>
  );
}

export default SideDrawer;

export const SidebarUl = ({ pathName }) => {
  const {
    setIsCostpmerSupportOpen,
    isCostpmerSupportOpen,
    setUnreadMsg,
    UnreadMsg,
  } = useContext(appContext);
  const navigate = useNavigate();
  return (
    <ul className="chatmenu newSideBar">
      {/* up */}
      <div className="bg-sideBar">
        <li>
          <Link
            to="/Dashboard"
            className={`sidebar_menu_link ${
              pathName === "/Dashboard" && !isCostpmerSupportOpen
                ? "active"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faHouse}/>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/Consult"
            className={`sidebar_menu_link ${
              pathName === "/Consult" && !isCostpmerSupportOpen ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faStethoscope} />
            <span>Consultations</span>
          </Link>
        </li>
        <li>
          <Link
            to="/ChatScreen"
            className={`sidebar_menu_link ${
              pathName === "/ChatScreen" && !isCostpmerSupportOpen
                ? "active"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faMessages} />
            <span>Messages</span>
            {UnreadMsg && UnreadMsg !== 0 ? (
              <span
                className="d-flex , justify-content-center , align-items-center rounded-circle"
                style={{
                  height: "25px",
                  width: "25px",
                  backgroundColor: "#F45656",
                }}
              >
                {UnreadMsg}
              </span>
            ) : (
              ""
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/ManageTreatment"
            className={`sidebar_menu_link ${
              pathName === "/ManageTreatment" && !isCostpmerSupportOpen
                ? "active"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faBookMedical} />
            <span>Treatments</span>
          </Link>
        </li>
        {/* <li>
          <Link
            to="/ContactUs"
            className={`sidebar_menu_link ${
              pathName === "/ContactUs" && !isCostpmerSupportOpen
                ? "active"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faMessageExclamation} />
            <span>Feedback</span>
          </Link>
        </li> */}
        <li>
          <Link
            to="/PrivacyPolicy"
            className={`sidebar_menu_link ${
              pathName === "/PrivacyPolicy" && !isCostpmerSupportOpen
                ? "active"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faShieldExclamation} />
            <span>Privacy Policy</span>
          </Link>
        </li>
        <li>
          <Link
            to="/TermsCondition"
            className={`sidebar_menu_link ${
              pathName === "/TermsCondition" && !isCostpmerSupportOpen
                ? "active"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faFolders} />
            <span>Terms & Conditions</span>
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className={`sidebar_menu_link ${
              isCostpmerSupportOpen ? "active" : ""
            }`}
            onClick={() => {
              setIsCostpmerSupportOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faHeadset} />
            <span>Contact Us</span>
          </Link>
        </li>
      </div>
      {/* middle */}
      <div className="bg-sideBar"></div>
      {/* bottom */}
      <div className="bg-sideBar">
        <li className="">
          <a
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="sidebar_menu_link text-white cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <span className="ms-3 cursor-pointer">Logout</span>
          </a>
        </li>
      </div>
    </ul>
  );
};
