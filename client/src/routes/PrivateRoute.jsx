import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const {isLoading, user } = useAuth();

if(isLoading){
    return <div className="progress w-full"></div>
}

  if (!isLoading && !user?.email) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
