import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Auth from "./helpers/Auth";

function PublicRoutes() {
  const isAuth = Auth.isUserAuthenticated();
  const location = useLocation();
  return !isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace state={{ location: location }} />
  );
}

export default PublicRoutes;
