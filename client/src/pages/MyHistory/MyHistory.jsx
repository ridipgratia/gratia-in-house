import React, { useState, useEffect } from 'react'
import "./MyHistory.css";
import background from "../../assets/background_1.jpg"
import noDataImg from "../../assets/no_data_img.webp"
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

import { BsClock } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";

import axiosInstance from '../../utils/axios';
import { useAuth } from '../../context/auth/authContext';
import { useAttend } from '../../context/attendance/attenContext';
import { Empty } from 'antd';




const MyHistory = () => {
    const currentDate = new Date().toISOString().substring(0, 10)
    const [getHistoryDate, setGetHistoryDate] = useState(new Date().toISOString().substring(0, 10));
    const [updatedData, setUpdatedData] = useState({})

    const { userData } = useAuth()
    const { setFacultyHistoryData, facultyHistoryData } = useAttend();
    // console.log(facultyHistoryData)

    // -----------------------getHistorydateFun---------------
    const getHistoryDateFun = (date) => {
        let selectDate = date.toISOString().substring(0, 10);
        if (new Date(selectDate) <= new Date(currentDate)) {
            filterFacultyHistoryData(selectDate, true)
            setGetHistoryDate(selectDate);
        } else {
            setUpdatedData({ msg: "Please Select Today's Date !", in_date: selectDate, in_time: "" })

        }
    }

    useEffect(() => {
        if (facultyHistoryData) {
            filterFacultyHistoryData(currentDate, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [facultyHistoryData])


    const filterFacultyHistoryData = (currDate, isPastDate) => {
        const newData = facultyHistoryData.filter((val) => val.in_date === currDate);
        if (newData.length !== 0) {
            setUpdatedData(newData[0]);
        } else {
            const MSG = isPastDate ? "You are Absent Today !" : "You have not  checked In Today !";
            setUpdatedData({ msg: MSG, in_date: currDate, in_time: "" })
        }
    }


    // -----------------------API Call in UseEffect-----------
    useEffect(() => {
        const req = {
            user_id: userData.user_id
        };
        axiosInstance
            .post("/list-all-attendance", req)
            .then((response) => {
                const { data } = response;
                setFacultyHistoryData(data.data.data_processing)
            })
            .catch((err) => {
                console.log(err);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div className='faculty-history-container'>
            <div className='faculty-history-topbar'>
                <Navbar />
            </div>
            <div className='faculty-history-container-child'>
                <div className='faculty-history-sidebar'>
                    <Sidebar />
                </div>

                {/* //dashboard */}
                <div className='faculty-history-right-div'>
                    <p className='student-attendance-home-para'>Attendance History</p>
                    <div className='faculty-history-right-div-child'>
                        <div className='faculty-history-right-div-child-div-1'>
                            <h3 className='select-heading'>Select Date</h3>
                            <input type="date" value={getHistoryDate} onChange={(e) => getHistoryDateFun(new Date(e.target.value))} />
                        </div>
                        {/* ---------------------------------------------------------------------- */}
                        {updatedData.in_time === "" ? updatedData.msg === "You are Absent Today !" ?
                            <div className='no_history_data_container'>
                                <Empty />
                            </div> : <div className='attend_not_checkin_today_msg_div'><p className='attend_not_checkin_today_msg'>You have not  checked In Today !</p></div>
                            :
                            <div className='faculty-history-right-div-child-div-2'>
                                <p className='office_name_div'><span>OFFICE : </span><span>{updatedData?.in_office}</span></p>
                                <div className='faculty-history-login-information-div'>
                                    <div className='faculty-history-login-information-div-1'>
                                        <span>Check In</span><span className={updatedData.msg === "" ? "" : "redClass"}>{updatedData.msg === "" ? "On Time" : "Late"}</span><span>{updatedData?.in_date}</span>
                                    </div>
                                    <div className='faculty-history-login-information-div-2'>
                                        <p><span style={{ color: '#675cff' }}><BsClock /></span><span>Time</span><span>{updatedData.in_time}</span></p>
                                        <p><span style={{ color: '#675cff' }}><MdOutlineLocationOn size={23} /></span><span>Location</span><span>{updatedData.in_distance} mtrs</span></p>
                                    </div>
                                </div>
                                {updatedData.out_time &&
                                    <>
                                        <p className='office_name_div'><span>OFFICE : </span><span>{updatedData?.out_office}</span></p>
                                        <div className='faculty-history-login-information-div'>
                                            <div className='faculty-history-login-information-div-1'>
                                                <span>Check  Out</span><span>{updatedData.in_date}</span>
                                            </div>
                                            <div className='faculty-history-login-information-div-2'>
                                                <p><span style={{ color: '#675cff' }}><BsClock sice={25} /></span><span>Time</span><span>{updatedData.out_time}</span></p>
                                                <p><span style={{ color: '#675cff' }}><MdOutlineLocationOn size={23} /></span><span>Location</span><span>{updatedData.out_distance} mtrs</span></p>
                                            </div>
                                        </div>
                                    </>
                                }

                                {updatedData.msg && <div className='faculty-history-login-detail-div'>
                                    <p><span>Reason for late <strong>Check In</strong></span><span>{updatedData.in_date}</span></p>
                                    <p><span>Description :-</span><span>{updatedData.msg}</span></p>
                                </div>}

                            </div>
                        }
                        {/* -------------------------------------------------------------------------------------- */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyHistory