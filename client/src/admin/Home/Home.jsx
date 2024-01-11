import React, { useEffect, useState } from 'react'
import "./Home.css"
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Chart from "../../components/Charts/Chart"
import Chart1 from "../../components/Charts/Chart1"
import { useNavigate } from "react-router-dom"
import axiosInstance from '../../utils/axios';
import moment from 'moment';
import { useAttend } from '../../context/attendance/attenContext'
import dayjs from 'dayjs';

import { CgUserList, CgUserAdd } from "react-icons/cg";
import { HiOutlineUserGroup, HiOutlineRefresh } from "react-icons/hi";

const Home = () => {
    const [totalUsers, setTotalUsers] = useState("")
    const [totalPresentAttend, setTotalPresentAttend] = useState("");
    const [totalLateAttend, setTotalLateAttend] = useState("")
    const [totalAbsentUsers, setTotalAbsentUsers] = useState("")
    const [todaysLeaveCount, setTodayLeaveCount] = useState("")
    const [weeklyLeaveCount, setWeeklyLeaveCount] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const todayDate = moment().format("YYYY-MM-DD")


    const { updateAttendanceStatus, setUpdateAttendanceStatus } = useAttend();

    useEffect(() => {
        fetchTotalPresentToadyAttendCount()
        fetchTotalLateToadyAttendCount()
        fetchTotalAbsentUserCount()
    }, [updateAttendanceStatus])


    const frefreshBtnFun = () => {
        setLoading(true)
        setTimeout(() => {
            fetchTotalPresentToadyAttendCount()
            fetchTotalLateToadyAttendCount()
            fetchTotalAbsentUserCount()
            setUpdateAttendanceStatus(true)
            setLoading(false)
            getTodaysLeaveCountFun();
            getWeeklyLeaveCountFun()
        }, 1000)
    }
    // ------------------------------total present users today fun----------------------------------
    const fetchTotalPresentToadyAttendCount = () => {
        const req = {
            date: todayDate
        };
        axiosInstance
            .post("/daily-attendance-count", req)
            .then((response) => {
                // setTimeout(() => {
                setTotalPresentAttend(response.data.count)
                // setUpdateAttendanceStatus(true)
                // }, 1000)
            })
            .catch((err) => {
                console.log(err)
            });
    }
    // ------------------------------------total late users fun----------------------------------------
    const fetchTotalLateToadyAttendCount = () => {
        const req = {
            date: todayDate
        };
        axiosInstance
            .post("/late-users", req)
            .then((response) => {
                setTotalLateAttend(response.data)
                // setUpdateAttendanceStatus(true)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    // ------------------------total absent users count fun-----------------------------------------
    const fetchTotalAbsentUserCount = () => {
        const req = {
            date: todayDate
        };
        axiosInstance
            .post("/daily-absent-count", req)
            .then((response) => {
                setTotalAbsentUsers(response.data.absentUsers)
                setTotalUsers(response.data.totalUsersCount)
                // setUpdateAttendanceStatus(true)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    // -------------------------today,s leave count fun------------------------
    const currDate = dayjs(new Date()).format('YYYY-MM-DD');
    const getTodaysLeaveCountFun = () => {
        const req = {
            start_date: currDate,
        };
        axiosInstance
            .post("/on-leave-today", req)
            .then((response) => {
                setTodayLeaveCount(response.data.leaveCount)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    // -----------------------weekly leave count fun---------------------
    const getWeeklyLeaveCountFun = () => {
        axiosInstance
            .post("/count-leave-applied")
            .then((response) => {
                setWeeklyLeaveCount(response.data.numberOfLeaves)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {
        getTodaysLeaveCountFun()
        getWeeklyLeaveCountFun()
    }, [])



    return (
        <>
            <div className='admin-home-container'>
                <div className='admin-home-container-top-div'>
                    <Navbar />
                </div>
                <div className='admin-home-container-bottom-div'>
                    <div className='admin-home-div-left'>
                        < Sidebar />
                    </div>

                    {/* ------------------------------------------------------ */}
                    <div className='admin-home-div-right'>
                        <div className='admin-home-detail-container'>
                            <div className='dashboard_home_page'>
                                <div className='dashboard_home_card_1'>
                                    <div className='admin-teacher-reg-div'>
                                        <div className='admin-teacher-reg-div-child-1'>
                                            <p><span>Today's Present</span></p>
                                            <span><CgUserList /></span>
                                        </div>
                                        <div className='admin-teacher-reg-div-child-2'>
                                            <span>{totalPresentAttend}</span>
                                            <button onClick={() => navigate("/attendance")}>View List</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='dashboard_home_card_2'>
                                    <div className='admin-teacher-reg-div'>
                                        <div className='admin-teacher-reg-div-child-1'>
                                            <p><span>Today's Late</span></p>
                                            <span style={{ backgroundColor: '#B8E1FF' }}><CgUserAdd /></span>
                                        </div>
                                        <div className='admin-teacher-reg-div-child-2'>
                                            <span>{totalLateAttend}</span>
                                            <button onClick={() => navigate("/late")}>View List</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='dashboard_home_card_3'>
                                    <div className='admin-teacher-reg-div'>
                                        <div className='admin-teacher-reg-div-child-1'>
                                            <p><span>Today's Absent</span></p>
                                            <span style={{ background: '#ff7b7b' }}><HiOutlineUserGroup /></span>
                                        </div>
                                        <div className='admin-teacher-reg-div-child-2'>
                                            <span>{totalAbsentUsers}</span>
                                            <button onClick={() => navigate("/absent")}>View List</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ------------------------charts--------------- */}
                            <div className='admin-charts-div'>
                                <h3>Attendance Chart</h3>
                                <div className='admin-charts-container'>
                                    <div className='admin-charts-div-child-1'>
                                        <Chart totalUsers={totalUsers} totalPresentAttend={totalPresentAttend} totalLateAttend={totalLateAttend} totalAbsentUsers={totalAbsentUsers} />
                                    </div>
                                </div>
                            </div>
                            <div className='admin_leave_charts_container'>
                                <h3>Leave Summary</h3>
                                <div className='admin_leave_charts_container_div'>
                                    <div>
                                        <p>Weekly Leave Application</p>
                                        <p onClick={() => navigate('/leave-applied')}>{weeklyLeaveCount}</p>
                                    </div>
                                    <div>
                                        <p>Today's Leave Application</p>
                                        <p onClick={() => navigate('/leave-applied')}>{todaysLeaveCount}</p>
                                    </div>
                                </div>
                            </div>
                            {/* ---------------------------------------------- */}
                            <div className='admin_refresh_btn_div'>
                                <button onClick={frefreshBtnFun}><HiOutlineRefresh className={loading && 'refresh_icon'} /></button>
                            </div>
                        </div >
                    </div >
                </div >
            </div >
            <div className='admin_warning_mesg_container'>
                <div className='admin_warning_mesg_div'>
                    <div className='admin_warning_mesg'>
                        <p>Admin panel works  only on laptop and desktop.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home