import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../../assets/gratia.webp";
import loginBanner from "../../assets/loginBanner.webp";
import axiosInstance from "../../utils/axios.js";
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useAuth } from "../../context/auth/authContext";
import { jwtDecode } from "jwt-decode";



const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("")
  const [showHide, setShowHide] = useState(false)
  const [forgetPassword, setForgetPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState("")

  const { token, userData, handleUserData, handleToken, setIsLoading, emp_ID } = useAuth();

  const handleUserLogin = async () => {
    if (empId.trim() === "") {
      toast.error("Employee ID is required.", {
        duration: 3000,
        position: 'bottom-center',
        className: "facultyToast"
      });
    } else if (password.trim() === "") {
      toast.error("Password  is required.", {
        duration: 3000,
        position: 'bottom-center',
        className: "facultyToast"
      });
    } else {
      setLoading(true);
      const req = {
        emp_id: empId,
        password: password,
      };
      axiosInstance
        .post("/login", req)
        .then((response) => {
          // console.log(response)
          if (response.data?.status === 200) {
            handleToken(response.data?.token);
            // Decode the JWT token
            const decodedToken = jwtDecode(response.data?.token);
            // Log or use the decoded token
            handleUserData(decodedToken);
            toast.success("Successfully Logged In !", {
              duration: 3000,
              position: 'bottom-center',
              className: "facultyToast"
            });
            setLoading(false)
          }
          if (response.data?.status === 400) {
            setLoading(false)
            toast.error(response.data?.message)
          }

        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            className: "facultyToast"
          });
          setLoading(false)
        });
    }

  }
  // --------------route---------------
  useEffect(() => {
    if (token && userData) {
      return navigate("/home");
    } else {
      return navigate("/");
    }
  }, [token]);

  // --------------------forget password fun---------------
  const forgetPasswordFun = () => {
    setForgetPassword(true)
  }

  // -----------------------sent email for forgot password-------------------
  const sentEmailFun = async () => {
    try {
      const req = {
        email: resetEmail
      };
      const response = await axiosInstance.post("/reset-password", req);
      return response
    } catch (error) {
      return error
    }

  };

  const verifySentEmailFun = async () => {
    if (resetEmail === "") {
      toast.error("Email is required.", {
        duration: 3000,
        position: 'bottom-center',
        className: "facultyToast"
      });
    } else {
      try {
        toast.loading('Sending email...', {
          duration: 1500,
        }); // Display loading toast

        const data = await sentEmailFun();

        if (data.status === 200) {
          setTimeout(() => {
            toast.success(data.data.message, {
              duration: 3000,
              className: "facultyToast"
            }); // Display success toast
            setResetEmail("")
          }, 2000)
        }

        if (data.response.status === 404) {
          setTimeout(() => {
            toast.error(data.response.data.error, {
              duration: 3000,
              className: "facultyToast"
            }); // Display success toast
            setResetEmail("")
          }, 2000)
        }

      } catch (err) {
        // console.log(err)
      }
    }

  };
  // -----------------------------------------------------------


  return (
    <div className="login-container">
      <div className="login-left-div">
        {/* <form> */}
        <div className="logo-div">
          <img src={logo} alt="logo" />
        </div>
        {
          forgetPassword === true ?
            <h2 className="login-heading">Password Reset</h2>
            : <h2 className="login-heading">login to your account</h2>
        }


        {/* ------------------------------------------------------------------ */}
        {
          forgetPassword === true ?
            <div className="input_form_container forgot_pas_container">
              <div className="reset_password_message">
                <p>Enter your  email address that you used to register. We'll send you an email with your username and a link to reset your password.</p>
              </div>
              <div className="login-input-div">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
              <div className="get-otp-btn-div">
                <button className="get-otp-btn" onClick={() => verifySentEmailFun()}>
                  {loading === true ? <CircularProgress color="inherit" size={15} /> : "Send"}
                </button>
              </div>
            </div>

            : <div className="input_form_container">
              <div className="login-input-div">
                <input
                  type="text"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  placeholder="Enter your Emp ID "
                />
              </div>
              <div className="login-input-div">
                <input
                  type={showHide ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password "
                />
                {showHide ? <span onClick={() => setShowHide(!showHide)} className='passHideShowBtn'><BsEyeFill /></span> : <span onClick={() => setShowHide(!showHide)} className='passHideShowBtn'><BsEyeSlashFill /></span>}
              </div>
              <div className='forget_password_div'>
                <p>Forgot password<span onClick={() => forgetPasswordFun()}>Click Here</span></p>
              </div>
              <div className="get-otp-btn-div">
                <button className="get-otp-btn" onClick={handleUserLogin}>
                  {loading === true ? <CircularProgress color="inherit" size={15} /> : "Login"}
                </button>
              </div>
            </div>
        }


        {/* ------------------------------------------------------------------------------------ */}

      </div>
      <div className="login-right-div">
        <div className="login-right-div-img-container">
          <img src={loginBanner} alt="banner" />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
