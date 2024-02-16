import React, { createContext, useState } from "react";
import socketIO from "socket.io-client";
import config from "../config/API/api-dev";

export const appContext = createContext();

const AppProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [rooms, setRooms] = useState();
  const [UnreadMsg, setUnreadMsg] = useState();
  const [socket, setSocket] = useState(null);
  const [roomContexData, setRoomContexData] = useState([]);
  const [isCostpmerSupportOpen, setIsCostpmerSupportOpen] = useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth > 991);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      const mobile = window.innerWidth > 991;
      if (isMobile) setIsMobile(mobile);
    });
  }, [isMobile]);

  const connectSocket = () => {
    if (!socket) {
      const socket1 = socketIO.connect(`${config.endpoint}/room`, { withCredentials: true, secure: true, transports: ["websocket"] });
      setSocket(socket1);
    }
  };

  const getRoom = () => {
    socket.off("get_rooms").on("get_rooms", async (rooms) => {
      rooms?.rooms &&
        rooms?.rooms.map((res) => {
          socket.emit("join_room", {
            roomId: res?._id,
            userId: res?.user?._id,
          });
        });
      setRooms(rooms?.rooms);
    });
  };

  return (
    <appContext.Provider
      value={{
        isMobile,
        setIsMobile,
        socket,
        loader,
        setLoader,
        getRoom,
        rooms,
        UnreadMsg,
        setUnreadMsg,
        connectSocket,
        setRoomContexData,
        roomContexData,
        setIsCostpmerSupportOpen,
        isCostpmerSupportOpen,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
