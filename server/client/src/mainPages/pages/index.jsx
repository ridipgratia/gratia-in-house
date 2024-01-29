import React, { useEffect } from "react";
import AdminHome from "../../admin/Home/Home"
import UserHome from "../../pages/Home/Home";
import { useAuth } from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom"



const MainHome = () => {
  const navigate = useNavigate()
  const { userData, token } = useAuth();

  useEffect(() => {
    if (!userData || !token) {
      navigate("/")
    }
  }, [userData, navigate, token])
  return (
    <>
      {token && userData.role === 0 ? (
        <UserHome />
      ) : token && userData.role === 1 ? (
        <AdminHome />
      ) : null}
    </>
  );
};

export default MainHome;
