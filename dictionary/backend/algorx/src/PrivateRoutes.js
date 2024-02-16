import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { appContext } from "./helpers/AppContext";
import Auth from "./helpers/Auth";
import jwt_decode from "jwt-decode";

const PrivateRoutes = () => {
  const { socket, setUnreadMsg } = useContext(appContext);
  const [rooms, setRooms] = useState();
  const [msg, setMsg] = useState();
  const userData = Auth.getUserData();
  const isAuth = Auth.isUserAuthenticated();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(userData?._id){
    socket?.emit("online", { userId: userData?._id });
    socket?.on("receive_message", (data) => {
      setMsg(data);
      socket?.emit("message_deliver_status", {
        messageId: data._id,
        status: 1,
        roomId: data?.roomId,
      });
      askNotificationPermission();
      if (
        Notification.permission === "granted" &&
        window.location.pathname !== "/ChatScreen"
      ) {
        createNotification(data);
      }
    });
    return () => {
      socket?.off("get_rooms");
      rooms?.rooms?.map((res) => {
        socket?.emit("leave_room", { roomId: res?._id, userId: res?.user?._id });
      });
    };
  }
  }, [window.location.pathname, msg]);

  useEffect(() => {
    if(userData?._id){
    if (window?.location?.pathname !== "/ChatScreen") {
      socket?.on("get_rooms", async (rooms) => {
        rooms?.rooms &&
          rooms?.rooms.map((res) => {
            socket?.emit("join_room", {
              roomId: res?._id,
              userId: res?.user?._id,
            });
          });
        setRooms(rooms?.rooms);
        // setUnreadMsg(rooms?.totalUnreadCount);
      });
    }
  }
  }, [msg, window.location.pathname]);

  useEffect(() => {
    const guestRoute = ["/paymentSummary"];
    if (!guestRoute.includes(window.location.pathname)) {
      const token = Auth.getToken();
      var decoded = token && jwt_decode(token);
      if (!decoded?.isEmailVerified) {
        navigate("/condition");
      }
    }
  }, []);

  const createNotification = (data) => {
    const text = data?.message;
    const notification = new Notification(
      data?.firstName + " " + data?.lastName,
      { body: text, icon: "" }
    );
    notification.onclick = () => {
      notification.close();
      window.parent.focus();
    };
  };
  const checkNotificationPromise = () => {
    try {
      Notification.requestPermission().then();
    } catch (e) {
      return false;
    }

    return true;
  };
  const askNotificationPermission = () => {
    const handlePermission = (permission) => {
      if (!Reflect.has(Notification, "permission")) {
        Notification.permission = permission;
      }
    };

    if (!Reflect.has(window, "Notification")) {
    } else {
      if (checkNotificationPromise()) {
        Notification.requestPermission().then(handlePermission);
      } else {
        Notification.requestPermission(handlePermission);
      }
    }
  };

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );

  //  return isAuth ? (
  //    <Outlet />
  //  ) : (
  //    <Navigate to="/login" replace state={{ from: location }} />
  //  );
};

export default PrivateRoutes;
