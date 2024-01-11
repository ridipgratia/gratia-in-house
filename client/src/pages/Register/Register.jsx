import React, { useState } from 'react'
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/authContext';
import logo from "../../assets/logo.webp";
import loginBanner from "../../assets/loginBanner.webp";
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
// import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import axiosInstance from '../../utils/axios';
import { Select } from 'antd';

const Register = () => {
    const { Option } = Select;
    const [userFirstName, setUserFirstName] = useState("")
    const [userLastName, setUserLastName] = useState("")
    const [dob, setDob] = useState("");
    const [userPhone, setUserPhone] = useState("")
    const [userGender, setUserGender] = useState("")
    const [userRole, setUserRole] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showHide, setShowHide] = useState(false)

    const navigate = useNavigate();
    const { setEmp_ID } = useAuth()

    const handleChange1 = (value) => {
        setUserRole(value);
    };
    const handleUserGender = (value) => {
        setUserGender(value)
    }

    const handleUserRegister = async () => {
        if (userFirstName === "") {
            toast.error("First name is required.", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });
        } else if (userLastName === "") {
            toast.error("Last name is required.", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });
        } else if (userGender === "") {
            toast.error("Select gender.", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });
        }
        else if (dob === "") {
            toast.error("Select gender.", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });
        }
        else if (userPhone === "") {
            toast.error("Phone number is required.", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });
        }
        else if (Number(userPhone.length) < 10 || Number(userPhone.length) > 10) {
            toast.error("Please enter 10 digits number.", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });
        } else if (userRole === "") {
            toast.error("Role field is required.", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });
        }
        else if (userEmail === "") {
            toast.error("Email field is required.", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });
        }
        else if (!userEmail.includes("@")) {
            toast.error("Please enter valid email.", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });
        } else {
            setLoading(true);
            const req = {
                first_name: userFirstName,
                last_name: userLastName,
                dob: dob,
                gender: userGender,
                contact_no: userPhone,
                designation: userRole,
                email: userEmail,
            };

            axiosInstance
                .post("/register", req)
                .then((response) => {
                    setEmp_ID(response.data)
                    // console.log(response.data.autoPassword)
                    // console.log(response.data.emp_id)
                    setTimeout(() => {
                        toast.success("Successfully Registered !", {
                            duration: 3000,
                            position: 'bottom-center',
                            className: "facultyToast"
                        });
                        setLoading(false)
                        navigate("/")
                    }, 2000);
                })
                .catch((err) => {
                    console.log(err)
                    setTimeout(() => {
                        toast.error(err.response.data.error, {
                            duration: 3000,
                            position: 'bottom-center',
                            className: "facultyToast"
                        });
                        setLoading(false)
                    }, 2000)

                });
        }

    }

    return (
        <div className="register-container">
            <div className="login-left-div">
                {/* <form> */}
                <div className="logo-div">
                    <img src={logo} alt="logo" />
                </div>
                <h2 className="login-heading">Create an account</h2>

                {/* ------------------------------------------------------------------ */}
                <div>
                    <div className="login-input-div">
                        <input
                            type="text"
                            value={userFirstName}
                            placeholder="First name"
                            onChange={(e) => setUserFirstName(e.target.value)}
                        />
                    </div>
                    <div className="login-input-div">
                        <input
                            type="text"
                            value={userLastName}
                            placeholder="Last name"
                            onChange={(e) => setUserLastName(e.target.value)}
                        />
                    </div>
                    <div className="login-input-div">
                        <input
                            type="text"
                            value={dob}
                            placeholder="Date of birth"
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>

                    <div className='register_select_box_div'>
                        <Select defaultValue="Gender" className='register-select-box' onChange={handleUserGender}>
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                        </Select>
                    </div>
                    <div className="login-input-div">
                        <input
                            type="text"
                            value={userPhone}
                            placeholder="Phone number"
                            onChange={(e) => setUserPhone(e.target.value)}
                            maxLength="10"
                        />
                    </div>

                    <div className='register_select_box_div'>
                        <Select defaultValue="Designation" className='register-select-box' onChange={handleChange1}>
                            <Option value="1">Teacher</Option>
                            <Option value="2">Staff</Option>
                        </Select>
                    </div>
                    {/* ------------------------------------------------- */}
                    {/* <div className="login-input-div">
                        <input
                            type="text"
                            value={userLastName}
                            placeholder="Address"
                            onChange={(e) => setUserLastName(e.target.value)}
                        />
                    </div>
                    <div className="login-input-div">
                        <input
                            type="text"
                            value={userLastName}
                            placeholder="Guardian name"
                            onChange={(e) => setUserLastName(e.target.value)}
                        />
                    </div>
                    <div className="login-input-div">
                        <input
                            type="text"
                            value={userLastName}
                            placeholder="Religion"
                            onChange={(e) => setUserLastName(e.target.value)}
                        />
                    </div> */}
                    <div className="login-input-div">
                        <input
                            type="email"
                            value={userEmail}
                            placeholder="Enter your email "
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>

                    {/* <div className="login-input-div">
                        <input
                            type={showHide ? "text" : "password"}
                            value={userPassword}
                            placeholder="Enter your password "
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                        {showHide ? <span onClick={() => setShowHide(!showHide)} className='passHideShowBtn'><BsEyeFill /></span> : <span onClick={() => setShowHide(!showHide)} className='passHideShowBtn'><BsEyeSlashFill /></span>}
                    </div> */}

                    <div className="get-otp-btn-div register_btn_div">
                        <button className="get-otp-btn" onClick={handleUserRegister}>
                            {loading === true ? <CircularProgress color="inherit" size={15} /> : "register"}
                        </button>
                    </div>
                    <div className='register_mesg_div'>
                        <p>You have an account?<span onClick={() => navigate("/")}> Login</span></p>
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

export default Register