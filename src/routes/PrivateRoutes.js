import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { UserContext } from "../hooks/AuthProvider/AuthProvider";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();
  if (loading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
