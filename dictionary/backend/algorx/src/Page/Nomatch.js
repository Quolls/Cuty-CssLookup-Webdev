import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../helpers/Auth";

export const Nomatch = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    if (Auth.isUserAuthenticated()) Navigate("/Dashboard");
    else Navigate("/login");
  }, [Auth.isUserAuthenticated()]);
  return <></>;
};
