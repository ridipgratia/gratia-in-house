import React, { useState, useEffect } from "react";
import "./Navbar.css";
// import logo from "../../assets/gratia.webp";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';


import { BiUserCircle } from "react-icons/bi";
import { AiOutlineMenuFold, AiOutlineClose } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { BiHistory, BiLockOpen } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiCalendarCheckFill } from "react-icons/ri";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';



import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";
import { useLocation } from "react-router-dom";


const Navbar = ({ type, color }) => {

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [userProfile, setUserProfile] = useState(false)
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changedPasswordState, setChangePasswordState] = useState(false)
  const [passLoading, setPassLoading] = useState(false)
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const menuControl = () => {
    setMenu(!menu);
  };

  const userProfileFun = () => {
    setUserProfile(!userProfile);
  }
  const changePasswordPopUpFun = () => {
    setChangePasswordState(!changedPasswordState)
    setUserProfile(false)
  }
  const { token, userData, handleUserLogout } = useAuth();

  const handlePasswordPopUpClose = () => {
    setChangePasswordState(false)
  }
  const changePasswordFun = () => {
    if (oldPassword === "") {
      toast.error("Old password is required.", {
        duration: 3000,
        position: 'bottom-center',
        className: "facultyToast"
      });

    } else if (newPassword === "") {
      toast.error("New password is required.", {
        duration: 3000,
        position: 'bottom-center',
        className: "facultyToast"
      });
    } else {
      setPassLoading(true)
      const req = {
        emp_id: userData.emp_id,
        password: newPassword,
      };
      axiosInstance
        .post("/change-password", req)
        .then((response) => {
          setTimeout(() => {
            toast.success(response.data.message, {
              duration: 3000,
              position: 'bottom-center',
              className: "facultyToast"
            });
            setOldPassword("")
            setNewPassword("")
            setChangePasswordState(false)
            setPassLoading(false)
          }, 2000)

        })
        .catch((err) => {
          console.log(err)
        });

    }
  }

  const logOutFun = async () => {
    await handleUserLogout()
    navigate("/")
  }


  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <div className="navbar-logo-div">
          <img src="/image/gratia.webp" alt="logo" onClick={() => navigate("/home")} />
        </div>
        <div className="brand_name" onClick={() => navigate("/home")}>
          <h3>GRATIA TECHNOLOGY</h3>
        </div>
      </div>
      <div className="navbar-right">
        <div className="menu-div" onClick={menuControl}>
          {menu ? (
            <AiOutlineClose className="close-icon" />
          ) : (
            <AiOutlineMenuFold className="open-icon" />
          )}
        </div>
        {/* -------------------------Users menu for mobile------------------------------------  */}

        <ul className={menu ? "openMenu mobMenu" : "openMenu closeMenu"}>
          {userData.role === 0 &&
            <>
              <li onClick={menuControl}>
                <NavLink to="/home" style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#212526",
                })}>
                  <span>
                    <AiOutlineHome className="mob-nav-icon" />
                  </span>
                  <span>Home</span>
                </NavLink>
              </li>

              <li onClick={menuControl}>
                <NavLink to="/history" style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#212526",
                })}>
                  <span>
                    <BiHistory className="mob-nav-icon" />
                  </span>
                  <span>History</span>
                </NavLink>
              </li>
              <li onClick={menuControl}>
                <NavLink to="/leave" style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#212526",
                })}>
                  <span>
                    <RiCalendarCheckFill className="mob-nav-icon" />
                  </span>
                  <span>Leave</span>
                </NavLink>
              </li>
              <li onClick={menuControl}>
                <NavLink to="/profile&1" style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#212526",
                })}>
                  <span>
                    <BiUserCircle className="mob-nav-icon" />
                  </span>
                  <span>Profile</span>
                </NavLink>
              </li>
              {/* ----------------------------------------------------- */}
              <li className="logout_btn_for_mobile" onClick={() => { menuControl(); changePasswordPopUpFun() }}>
                <span>
                  <BiLockOpen className="mob-nav-icon" />
                </span>
                <span>Password</span>
              </li>
              {/* ------------------------------------------------------- */}
              <li className="logout_btn_for_mobile" onClick={logOutFun}>
                <span>
                  <FiLogOut className="mob-nav-icon" />
                </span>
                <span>Logout</span>
              </li>
            </>
          }

          {/* ---------------------------Admin menu for mobile-------------------- */}
          {userData.role === 1 &&
            <>
              <li className="logout_btn_for_mobile" onClick={logOutFun}>
                <span>
                  <FiLogOut className="mob-nav-icon" />
                </span>
                <span>Dashboard</span>
              </li>
            </>
          }
        </ul>
        {/* ------------------------------users navbar for desktop-------------- */}

        {userData.role === 0 &&
          <div>
            <div className="desktop-notification-div">
              <span onClick={userProfileFun}>
                {token ? userData.first_name.charAt(0) : ''}
              </span>
            </div>
            {userProfile && <div className="user_profile_and_logout">
              <span onClick={() => navigate("/profile&1")}>Profile</span>
              <span onClick={changePasswordPopUpFun}>Password</span>
              <span onClick={logOutFun}>Logout</span>
            </div>}
            {
              // -------------------------------------password popup---------------------------
              changedPasswordState &&
              <Dialog
                open={changedPasswordState}
                onClose={handlePasswordPopUpClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <span>
                      <span className="password_popup_container">
                        <span className="change_password_heading">Change Password</span>
                        <span className="change_password_input_div">
                          <input type="text" placeholder="Enter old Password" onChange={(e) => setOldPassword(e.target.value)} required />
                        </span>
                        <span className="change_password_input_div">
                          <input type="text" placeholder="Set new Password" onChange={(e) => setNewPassword(e.target.value)} required />
                        </span>
                        <span className="change_password_confirm_btn">
                          <Button
                            onClick={changePasswordFun}
                            variant="contained"
                            size="small"
                            className="passWordChangeBtn"
                          // autoFocus
                          >
                            {passLoading === true ? <CircularProgress color="inherit" size={15} /> : "Confirm"}
                          </Button>
                        </span>
                      </span>
                    </span>
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            }
          </div>
        }

        {/* ---------------------------------------------------admin navbar for desktop ------------------------- */}
        {userData.role === 1 &&
          <>
            <div className="desktop-notification-div">
              <span onClick={userProfileFun}>
                A
                {/* {token ? userData.first_name.charAt(0) : ''} */}
              </span>
            </div>
            {userProfile && <div className="user_profile_and_logout">
              {/* <span onClick={() => navigate("/profile&1")}>Profile</span>
              <span onClick={changePasswordPopUpFun}>Change Password</span> */}
              <span onClick={logOutFun}>Logout</span>
            </div>}
          </>
        }
        {/* -------------------------Users menu ended------------------------------------  */}
      </div>
      <Toaster />
    </div >

  );
};

export default Navbar;
