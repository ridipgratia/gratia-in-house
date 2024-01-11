import React, { useState } from 'react'
import logo from "../../assets/gratia.webp";
import loginBanner from "../../assets/loginBanner.webp";
import axiosInstance from "../../utils/axios.js";
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [newPassword, setNewPassword] = useState("")

    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const resetToken = searchParams.get('resetToken');

    // ----------------------updated password function-----------------
    const setNewPasswordFun = () => {
        if (newPassword === "") {
            toast.error("Please set new password...", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else {
            setLoading(true);
            const req = {
                newPassword: newPassword
            };
            axiosInstance
                .post(`/update-password/${resetToken}`, req)
                .then((response) => {
                    // console.log(response)
                    setTimeout(() => {
                        toast.success("Successfully updated !", {
                            duration: 3000,
                            position: 'bottom-center',
                            className: "facultyToast"
                        });
                        setLoading(false)
                        setNewPassword()
                        navigate("/")
                    }, "2000");
                })
                .catch((err) => {
                    console.log(err)
                    setTimeout(() => {
                        toast.error(err.response.data.message, {
                            duration: 3000,
                            position: 'bottom-center',
                            className: "facultyToast"
                        });
                        setLoading(false)
                        setNewPassword()
                    }, 2000)

                });
        }
    }




    return (
        <div className="login-container">
            <div className="login-left-div">
                {/* <form> */}
                <div className="logo-div">
                    <img src={logo} alt="logo" />
                </div>
                <h2 className="login-heading">Set New Password</h2>

                {/* ------------------------------------------------------------------ */}
                <div className="input_form_container">
                    <div className="login-input-div">
                        <input
                            type="text"
                            placeholder="Enter new password..."
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="get-otp-btn-div">
                        <button className="get-otp-btn" onClick={() => setNewPasswordFun()}>
                            {loading === true ? <CircularProgress color="inherit" size={15} /> : "Save"}
                        </button>
                    </div>
                </div>

                {/* ------------------------------------------------------------------------------------ */}

            </div>
            <div className="login-right-div">
                <div className="login-right-div-img-container">
                    <img src={loginBanner} alt="banner" />
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default ResetPassword