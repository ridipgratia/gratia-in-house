import React, { useState, useEffect } from "react";
import "../../pages/Login/Login.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import logo from "../../assets/gratia.webp";
import loginBanner from "../../assets/loginBanner.webp";
import axiosInstance from "../../utils/axios.js";
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useAuth } from "../../context/auth/authContext"

const Login = () => {
    const navigate = useNavigate();
    const [adminEmail, setAdminEmail] = useState("")
    const [adminPassword, setAdminPassword] = useState("")
    const [showHide, setShowHide] = useState(false)
    const [loading, setLoading] = useState(false)

    const { token, userData, handleUserData, handleToken, setIsLoading, emp_ID } = useAuth();

    // -------------------------------------------------------
    const handleAdminLogin = async () => {
        if (adminEmail === "") {
            toast.error("Email is required.", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });

        }
        else if (!adminEmail.includes("@")) {
            toast.error("Please enter valid email.", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });
        } else if (adminPassword === "") {
            toast.error("Password  is required.", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else {
            setLoading(true);
            const req = {
                email: adminEmail,
                password: adminPassword
            };
            axiosInstance
                .post("/admin-login", req)
                .then((response) => {
                    setTimeout(() => {
                        const { data } = response
                        const userToken = data.token;
                        handleUserData(data.user);
                        handleToken(userToken);
                        toast.success("Successfully Logged In !");
                        setLoading(false)
                        setAdminEmail("")
                        setAdminPassword("")
                    }, 500);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                    setLoading(false)
                });
        }

    }

    useEffect(() => {
        if (token && userData) {
            return navigate("/home");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, userData]);


    // -------------------------------------------------------
    return (
        <>
            <div className="login-container admin_login_page">
                <div className="login_top_div">
                    <Navbar />
                </div>
                <div className="login_bottom_div">
                    <div className="login-left-div">
                        {/* <form> */}
                        <div className="logo-div">
                            <img src={logo} alt="logo" />
                        </div>
                        <h2 className="login-heading">login to Admin account</h2>

                        {/* ------------------------------------------------------------------ */}
                        <div className="input_form_container">
                            <div className="login-input-div">
                                <input
                                    type="text"
                                    value={adminEmail}
                                    onChange={(e) => setAdminEmail(e.target.value)}
                                    placeholder="Enter email "
                                />
                            </div>
                            <div className="login-input-div">
                                <input
                                    type={showHide ? "text" : "password"}
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    placeholder="Enter password "
                                />
                                {showHide ? <span onClick={() => setShowHide(!showHide)} className='passHideShowBtn'><BsEyeFill /></span> : <span onClick={() => setShowHide(!showHide)} className='passHideShowBtn'><BsEyeSlashFill /></span>}
                            </div>
                            <div className="get-otp-btn-div">
                                <button className="get-otp-btn" onClick={handleAdminLogin}>
                                    {loading === true ? <CircularProgress color="inherit" size={15} /> : "Login"}
                                </button>
                            </div>
                        </div>
                        {/* ------------------------------------------------------------------------------------ */}
                    </div>
                    {/* =============== */}
                    <div className="login-right-div">
                        <div className="login-right-div-img-container">
                            <img src={loginBanner} alt="banner" />
                        </div>
                    </div>
                </div>
                <Toaster />
            </div>
            {/* ---------------------- */}
            <div className="admin_login_text_view">
                <div className="admin_login_text">
                    <p>Admin panel works  only on laptop and desktop.</p>
                </div>
            </div>
        </>
    )
}

export default Login