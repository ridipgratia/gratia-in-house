import React, { useState, useEffect } from 'react'
import "./Home.css";
import userMale from "../../assets/profile.png"
import userFemale from '../../assets/woman.png'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import OutOfRangePopUp from '../../components/OutOfRangePopUp/OutOfRangePopUp';
import CheckOutPopUp from '../../components/CheckOutPopUp/CheckOutPopUp';
import CheckOutPopUpMesg from '../../components/CheckOutPopUp/CheckOutPopUpMesg';
import ReactionPopUp from '../../components/ReactionPopUp/ReactionPopUp';


import checkin from "../../assets/checkin.png"
import checkout from "../../assets/checkout.png"

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


import { AiOutlineClockCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { MdLocationOn } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import InRangePopUp from '../../components/InRangePopup/InRangePopUp';
import moment from 'moment';
import axiosInstance from '../../utils/axios';


import toast, { Toaster } from 'react-hot-toast';
import { useAttend } from '../../context/attendance/attenContext';
import { useLeave } from "../../context/leave/leaveContext"
import { useAuth } from '../../context/auth/authContext';
import { useImage } from "../../context/imgContext/imageContext"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);



const myLocations = [
    {
        name: 'PNRD',
        lon: '91.817686',
        lat: '26.132815'
    },
    {
        name: 'TSCS',
        lon: '91.796282',
        lat: '26.141161'
    },
    {
        name: 'GRATIA',
        lon: '91.77203',
        lat: '26.16103'
    }
]


const Home = () => {
    const [openDropdown, setOpenDropdown] = useState(false)
    const [openCheckOutBtnGroup, setOpenCheckOutBtnGroup] = useState(false)
    const [officeName, setOfficeName] = useState("")
    // console.log(officeName);
    const [open, setOpen] = useState(false);
    const [inRange, setInRange] = useState(false);
    const [outRange, setOutRange] = useState(false)
    const [checkIn, setCheckIn] = useState(null);
    const [checkInTodayDate, setCheckInTodayDate] = useState(null);
    const [checkInData, setCheckInData] = useState([])
    const [canUser, setCanUser] = useState(true);
    const [facultyCheckout, setFacultyCheckout] = useState(false)
    const [checkOutPopUpMesgBox, setCheckOutPopUpMesgBox] = useState(false)
    const [holidayData, setHolidayData] = useState("")
    const [holidayPopUp, setHolidayPopUp] = useState(false)
    const [leaveNumber, setLeaveNumber] = useState("")
    const [inTimeAttendCount, setInTimeAttendCount] = useState("")
    const [lateAttendCount, setLateAttendCount] = useState("")


    // --------------------reaction popup---------------------
    // const [reactPopup, setReactPopup] = useState(false);

    // useEffect(() => {
    //     const lastPopupDate = localStorage.getItem('lastPopupDate');
    //     const today = new Date().toDateString();

    //     if (lastPopupDate !== today) {
    //         setReactPopup(true);
    //         localStorage.setItem('lastPopupDate', today);
    //     }
    // }, []);

    // const handleCloseReactPopup = () => {
    //     setReactPopup(false);
    // };
    // ------------------------------------------------------


    // ----------------------------------------calculate distance------------------------------------------
    const time = moment().format("LTS")
    const currentDate = moment().format("D MMMM YYYY")
    const todayDate = moment().format("YYYY-MM-DD")


    const { setCurrTime, setCurrDate, setGetDist, getDist, setShowMesgBox, uploadProfileImg, setUploadProfileImg } = useAttend();
    const { userData } = useAuth();
    // console.log(userData)
    const { userAttendUpdatePerDay } = useLeave();
    const { serverUrl } = useImage();

    // ----------------------user Profile image fun call---------------
    useEffect(() => {
        const req = {
            emp_id: userData.emp_id,
        };
        axiosInstance.post("/get-profile-url", req)
            .then((response) => {
                setUploadProfileImg(response.data.data.user_image)
            })
            .catch((err) => {
                console.log(err)
            });

    }, [uploadProfileImg])
    // -----------------------------------------------------------------


    const rad = (x) => {
        return (x * Math.PI) / 180;
    }

    function calculateDistance(lat1, lng1, lat2, lng2) {
        var R = 6378137;
        var dLat = rad(lat2 - lat1);
        var dLong = rad(lng2 - lng1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }
    // -------------------location check In button group fun-------------------------
    const handleDropdownOpen = () => {
        setOpenDropdown(true)
    }

    const handleDropdownClose = () => {
        setOpenDropdown(false)
    }
    // -------------------location check out button group fun-------------------------
    const handleCheckOutBtnGroupOpen = () => {
        setOpenCheckOutBtnGroup(true)
    }

    const handleCheckOutBtnGroupClose = () => {
        setOpenCheckOutBtnGroup(false)
    }
    // -------------------------fetch check in location distance--------------------------
    const handleClickOpen = async (el) => {
        if (checkInTodayDate && checkInTodayDate === todayDate) {
            toast.success("You have already checked-in and check-out today.", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });

        } else {
            setOfficeName(el.name)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const dist = calculateDistance(position.coords.latitude, position.coords.longitude, el.lat, el.lon)
                    setCurrDate(currentDate);
                    setCurrTime(time);
                    setGetDist(dist.toFixed())
                })
            } else {
                toast.warn("Pls, Update your Broswer", {
                    duration: 4000,
                    position: 'top-center',
                    className: "facultyToast"
                });
            }
            setOpen(true);
            setOpenDropdown(false)
        }
    };

    // ------------------fetch check out loctaion distance fun--------------
    const CheckDistance = async (el) => {
        setOfficeName(el.name)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const dist = calculateDistance(position.coords.latitude, position.coords.longitude, el.lat, el.lon)
                setCurrDate(currentDate);
                setCurrTime(time);
                setGetDist(dist.toFixed())
            })
        } else {
            toast.warn("Geolocation is not supported by this browser", {
                duration: 4000,
                position: 'top-center',
                className: "facultyToast"
            });
            // console.log("Geolocation is not supported by this browser.");
        }
        setFacultyCheckout(true)
        setOpenCheckOutBtnGroup(false)

    }

    // -----------------------------------------------
    let newDate = new Date();
    const handleClose = () => {
        if (newDate.getHours() <= 9 && newDate.getMinutes() <= 60 && newDate.getSeconds() <= 60) {
            setOpen(false);
            setShowMesgBox(false)
        } else {
            setOpen(false);
            setShowMesgBox(true)
        }

    };

    const handleYesButton = () => {
        if (getDist <= 1000) {
            setInRange(true)
        } else {
            setOutRange(true)
        }
    }
    const checkOutYesBtn = () => {
        setCheckOutPopUpMesgBox(true);
    }

    // ------------------------Search Attendance check In or not function---------------------
    const handleUserCheckIn = async () => {
        const req = {
            user_id: userData.user_id
        };
        axiosInstance
            .post("/list-attendance", req)
            .then((response) => {
                const { data } = response;
                if (data.data.data_processing.length > 0) {
                    setCheckIn(data.data.data_processing[0].in_date)
                    setCheckInTodayDate(data.data.data_processing[0].in_date)
                    setCheckInData(data.data.data_processing[0])
                    // -----------------------modify here------------------
                    if (data.data.data_processing[0].out_time !== "") {
                        setCanUser(false);
                    }
                }
                else {
                    setCheckIn(null);
                    setCheckInTodayDate(null)
                    // setCheckInData("")
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        handleUserCheckIn()
        setTimeout(() => {
            setHolidayPopUp(true)
        }, 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    // ------------------------------user attendance leave charts-------------------------------
    const data = {
        labels: ["In Time", "Late"],
        datasets: [
            {
                data: [inTimeAttendCount, lateAttendCount],
                backgroundColor: ["#25D366", "#FF5A60"],
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },

        },
    }

    const data1 = {
        labels: ["Taken", "Balance"],
        datasets: [
            {
                data: [leaveNumber.applied_leaves, leaveNumber.leave_balance],
                backgroundColor: ["#1AA7EC", "#4ADEDE"],
            }
        ]
    };
    const options1 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },

        },
    }

    // --------------------------holiday data fetch fun--------------------
    const fetchHolidayDataFun = () => {
        axiosInstance
            .post("/upcoming-holiday")
            .then((response) => {
                const { data } = response
                setHolidayData(data)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // --------------------------fetch leave count------------------
    const fetchTotalLeaveFun = () => {
        const req = {
            user_id: userData.user_id
        };
        axiosInstance
            .post("/calculate-leave", req)
            .then((response) => {
                const { data } = response
                setLeaveNumber(data.leaves[0])
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchHolidayDataFun()
        fetchTotalLeaveFun()
    }, [])

    // const holidayDate = moment(holidayData.date).format('MMM-DD-YYYY')
    const currentMonth = moment(new Date()).format('MMMM-YYYY')
    const currentYear = moment(new Date()).format('YYYY')

    // ------------------------monthly attendance count function-------------------------
    const currYear = moment(new Date()).format('YYYY');
    const currMonth = moment(new Date()).format('M');

    const fetchUserMonthlyAttendanceInTimeCountFun = () => {
        const req = {
            user_id: userData.user_id,
            year: currYear,
            month: currMonth

        };
        axiosInstance
            .post("/monthly-attendance-count", req)
            .then((response) => {
                const { data } = response
                // console.log(data)
                setInTimeAttendCount(data)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // -------------------------
    const fetchUserMonthlyAttendanceLateCountFun = () => {
        const req = {
            user_id: userData.user_id,
            year: currYear,
            month: currMonth
        };
        axiosInstance
            .post("/monthly-late-users-count", req)
            .then((response) => {
                const { data } = response
                // console.log(data)
                setLateAttendCount(data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchUserMonthlyAttendanceInTimeCountFun()
        fetchUserMonthlyAttendanceLateCountFun()
    }, [userAttendUpdatePerDay])



    return (
        <div className='home-container' >
            <div className='home-container-top-div'>
                <Navbar />
            </div>
            <div className='home-container-bottom-div'>
                <div className='home-div-left'>
                    <Sidebar />
                </div>

                {/* ------------------------------------------------------ */}
                <div className='home-div-right'>
                    <div className='home-detail-container'>
                        <div className='home-detail-div-1'>
                            <div className='home-details'>
                                <div className='home-details-child-1'>
                                    <div className='user_home_prof_img_name_container'>
                                        <div className='user_home_prof_img_name_div'>
                                            <div className='user_home_page_image_div'>
                                                {
                                                    uploadProfileImg === null ? userData.gender === 'male' ? <img src={userMale} alt="user_img" /> : <img src={userFemale} alt="user_img" /> : <img src={`${serverUrl}${uploadProfileImg}`} alt="user_img" />
                                                }
                                                <span className='role_for_mob_view'>{userData.designation}</span>
                                            </div>
                                            <p>
                                                <span>Welcome</span>
                                                <span className='home-user-name' style={{ textTransform: "capitalize" }}>{userData.first_name} {userData.last_name}</span>
                                            </p>
                                        </div>
                                        <p>
                                            <span>Status : <span style={{ color: 'green' }}>Active</span></span>
                                        </p>
                                    </div>

                                </div>
                                <div className='home-details-child-2'>
                                    <p>
                                        <span>Employee ID : </span>
                                        <span> {userData.emp_id}</span>
                                    </p>
                                    <p>
                                        <span>Role : </span>
                                        <span> {userData.designation}</span>
                                    </p>
                                    <p className='mobile_view_user_status'>
                                        <span>Status : </span>
                                        <span style={{ color: 'green' }}> ACTIVE</span>
                                    </p>
                                </div>
                            </div>
                            <div className='home-register-button'>
                                <div>
                                    {canUser ? (
                                        <>
                                            {checkIn && (
                                                <Box className='home-register-btn-div'>
                                                    <Button onClick={handleCheckOutBtnGroupOpen}>
                                                        <img src={checkout} alt="atten-btn" />
                                                    </Button>
                                                </Box>
                                            )}

                                            {!checkIn && (
                                                <Box className='home-register-btn-div'>
                                                    <Button onClick={handleDropdownOpen}>
                                                        <img src={checkin} alt="atten-btn" />
                                                    </Button>
                                                </Box>
                                            )}
                                        </>
                                    ) : (
                                        <Box className='home-register-btn-div'>
                                            <Button onClick={handleClickOpen}>
                                                <img src={checkin} alt="atten-btn" />
                                            </Button>
                                        </Box>
                                    )}

                                    <Typography className='home-details-date'>{currentDate}</Typography>
                                    {!checkIn &&
                                        <Box className='home-detail-dist-div'>
                                            <Typography><span><AiOutlineClockCircle /></span><span>00:00</span><span>Sign In</span></Typography>
                                            <Typography><span><GoLocation /></span><span>0 Mtrs</span><span>Distance</span></Typography>
                                        </Box>
                                    }
                                    {
                                        checkIn &&
                                        <Box className='home-detail-dist-div'>
                                            <Typography><span><AiOutlineClockCircle /></span><span>{checkInData?.in_time}</span><span>Sign In</span></Typography>
                                            <Typography><span><GoLocation /></span><span>{checkInData?.in_distance} Mtrs</span><span>Distance</span></Typography>
                                        </Box>
                                    }
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                <span className='faculty_login_attendance_popup_date'><MdLocationOn className='home-popup-icon' /><strong>{currentDate}</strong></span>
                                                {/* <span className='faculty_login_attendance_popup_address'>Juripar Bus Stop- Lokhra, Jalukbari,<br /> Asssam 434234, India</span> */}
                                                <span className='faculty_login_attendance_popup_current_time_distance'>
                                                    <span className='faculty_login_attendance_popup_current_time'>
                                                        <span><AiOutlineClockCircle size={25} /></span>
                                                        <span>{time}</span>
                                                        <span>Sign in</span>
                                                    </span>
                                                    <span className='faculty_login_attendance_popup_current_time'>
                                                        <span><GoLocation size={25} /></span>
                                                        <span>{getDist} Mtrs</span>
                                                        <span>Distance</span>
                                                    </span>
                                                </span>
                                                {!getDist &&
                                                    <span className='location_span'>
                                                        <span>*Please turn on your location.</span>
                                                    </span>
                                                }
                                            </DialogContentText>
                                        </DialogContent>
                                        {getDist &&
                                            <DialogActions>
                                                <Box className='home-popup-btn-div'>
                                                    <Typography>Do you want to confirm your attendance?</Typography>
                                                    <Box className='home-popup-yes-no-btn-div'>
                                                        <Button onClick={handleClose}>No</Button>
                                                        <Button onClick={() => { handleYesButton(); handleClose() }} autoFocus>
                                                            Yes
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </DialogActions>
                                        }

                                    </Dialog>
                                    {/* -------------------------------location check In button group----------------------------- */}
                                    <Dialog
                                        open={openDropdown}
                                        onClose={handleDropdownClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                <span className='location_dropdown_container'>
                                                    <span className='loaction_select_heading'>Choose your office</span>
                                                    <span className='location_select_btn_group'>
                                                        {myLocations && myLocations.map((el, index) => (
                                                            <button onClick={() => handleClickOpen(el)} key={index} className="custom-btn btn-1">{el.name}</button>
                                                        ))}
                                                    </span>
                                                </span>
                                            </DialogContentText>
                                        </DialogContent>
                                    </Dialog>
                                    {/* --------------------------------------------------------------------------------- */}
                                    {/* -------------------------------location check out button group----------------------------- */}
                                    <Dialog
                                        open={openCheckOutBtnGroup}
                                        onClose={handleCheckOutBtnGroupClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                <span className='location_dropdown_container'>
                                                    <span className='loaction_select_heading'>Choose your office</span>
                                                    <span className='location_select_btn_group'>
                                                        {myLocations && myLocations.map((el, index) => (
                                                            <button onClick={() => CheckDistance(el)} key={index} className="custom-btn btn-1">{el.name}</button>
                                                        ))}
                                                    </span>
                                                </span>
                                            </DialogContentText>
                                        </DialogContent>
                                    </Dialog>
                                    {/* --------------------------------------------------------------------------------- */}

                                    {inRange && <InRangePopUp handleUserCheckIn={handleUserCheckIn} setCheckIn={setCheckIn} setInRange={setInRange} setCheckInTodayDate={setCheckInTodayDate} officeName={officeName} />}
                                    {outRange && <OutOfRangePopUp setOutRange={setOutRange} />}
                                    {facultyCheckout && <CheckOutPopUp setFacultyCheckout={setFacultyCheckout} checkOutYesBtn={checkOutYesBtn} getDist={getDist} />}
                                    {checkOutPopUpMesgBox && <CheckOutPopUpMesg setCheckOutPopUpMesgBox={setCheckOutPopUpMesgBox} checkOutPopUpMesgBox={checkOutPopUpMesgBox} getDist={getDist} setCheckIn={setCheckIn} handleUserCheckIn={handleUserCheckIn} officeName={officeName} />}
                                    {/* {reactPopup && <ReactionPopUp reactPopup={reactPopup} setReactPopup={setReactPopup} handleCloseReactPopup={handleCloseReactPopup} />} */}
                                </div>
                            </div>
                        </div>

                        {/* ------------------------holiday content----------------- */}
                        {/* {holidayPopUp &&
                            <div className='holiday_popup_container'>
                                <p className='holiday_popup_container_para'><span><span><HiOutlineEmojiHappy /></span><span>Your upcoming holiday is <span style={{ marginLeft: '4px', color: 'green' }}>"{holidayData.name}"</span><strong> {holidayDate}</strong></span></span><span onClick={() => setHolidayPopUp(false)}><AiOutlineCloseCircle /></span></p>
                            </div>} */}
                        {/* ------------------------Apply leave----------------- */}
                        <div className='apply_leave_box_container'>
                            <div className='user_attendance_summary_container'>
                                <div className='client_monthly_attend_overview'>
                                    <p>Monthly attendance overview</p>
                                    <p>{currentMonth}</p>
                                </div>
                                <div className='user_attendance_summary_count_container'>
                                    <div className='user_attendance_summary_count_div_1'>
                                        <span>On Time</span>
                                        <span style={{ color: "#25D366" }}>{inTimeAttendCount}</span>
                                    </div>
                                    <div className='user_attendance_summary_count_div_1'>
                                        <span>Late</span>
                                        <span style={{ color: "#FF5A60" }}>{lateAttendCount}</span>
                                    </div>
                                </div>
                                <div className='user_attendance_summary_graph_container'>
                                    <div className='user_attend_charts'>
                                        <Pie data={data} options={options}>
                                        </Pie>
                                    </div>
                                </div>

                            </div>
                            <div className='user_leave_summary_container'>
                                <div className='client_monthly_attend_overview'>
                                    <p>Yearly Leave overview</p>
                                    <p>{currentYear}</p>
                                </div>
                                <div className='user_attendance_summary_count_container'>
                                    <div className='user_attendance_summary_count_div_1'>
                                        <span>Leave Taken</span>
                                        <span style={{ color: "#FF5A60" }}>{leaveNumber.applied_leaves === null ? "0" : leaveNumber.applied_leaves}</span>
                                    </div>
                                    <div className='user_attendance_summary_count_div_1'>
                                        <span>Leave Balance</span>
                                        <span style={{ color: "#25D366" }}>{leaveNumber.available_leaves === null ? '15' : leaveNumber.leave_balance}</span>
                                    </div>
                                </div>
                                <div className='user_attendance_summary_graph_container'>
                                    <div className='user_attend_charts'>
                                        <Pie data={data1} options={options1}>
                                        </Pie>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ----------------------add content in right conatiner div------------------ */}

                    </div>

                </div>
            </div >
            <Toaster />
        </div >
    )
}

export default Home