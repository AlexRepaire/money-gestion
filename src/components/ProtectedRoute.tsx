import React from "react";
import { Navigate, RouteProps } from "react-router-dom";

const ProtectedRoute = (props: AuxProps) => {
  if (localStorage.getItem("budgetApp-user")) {
    return <div>{props.children}</div>;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;

interface AuxProps {
  children: RouteProps["children"];
}
