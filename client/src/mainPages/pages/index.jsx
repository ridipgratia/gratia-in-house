import React from "react";
// import "./loginSpinner.css";
import AdminHome from "../../admin/Home/Home"
import UserHome from "../../pages/Home/Home";
import { useAuth } from "../../context/auth/authContext";
import Error from "../../pages/Error/Error"

// import BounceLoader from "react-spinners/BounceLoader";



const MainHome = () => {
  const { userData } = useAuth();
  return (
    <>
      {userData.role === 0 ? (
        <UserHome />
      ) : userData.role === 1 ? (
        <AdminHome />
      ) : <Error />}
    </>
  );
};

export default MainHome;
