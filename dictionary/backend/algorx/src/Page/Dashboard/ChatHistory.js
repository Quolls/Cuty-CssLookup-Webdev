import moment from "moment";
import React, { useEffect, useState } from "react";
import { ApiGet } from "../../helpers/API/API_data";
import notificationSVG from "../../Assets/images/svg/notification.svg";

function ChatHistory() {
  const [notifi, setNotifi] = useState([]);

  useEffect(() => {
    notification();
  }, []);
  const notification = () => {
    ApiGet(`patient/patient_notifications`)
      .then((res) => {
        setNotifi(res?.data?.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  return (
    <div className="mytreatmentd mt-0 bg-white border border-neutral-300 rounded-lg">
      <div className="mytreatmentheading bg-white rounded-t-lg">
        <h4>Notification</h4>
      </div>

      <ul className="bell noti1">
        {notifi?.length > 0
          ? notifi.map((item) => {
              return (
                <div className="notificationn">
                  <li>
                    <p
                      style={{ display: "flex", textAlign: "start" }}
                      className="notification_web_app_inner_div"
                    >
                      {/* <span></span> */}
                      <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      {item?.message}
                    </p>
                    <div className="notiicon flex-col">
                      {/* <img src={notificationSVG} style={{width:"20px"}} alt="notification img"/> */}
                      <div>🔔</div>
                      <p className="notification_web_app_main_div">
                        {moment(new Date()).format("DD/MM/YYY") ===
                        moment(new Date(item?.createdAt)).format("DD/MM/YYY")
                          ? "Today"
                          : moment(new Date(item?.createdAt)).format("DD/MM")}
                      </p>
                    </div>
                  </li>
                </div>
              );
            })
          : ""}
      </ul>
    </div>
  );
}

export default ChatHistory;
