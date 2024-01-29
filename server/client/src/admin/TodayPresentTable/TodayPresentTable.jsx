import React, { useState, useEffect } from 'react'
import "./TodayPresentTable.css"
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import MoonLoader from "react-spinners/ClipLoader";
import axiosInstance from '../../utils/axios';
import { useAttend } from '../../context/attendance/attenContext';
import { TbUserCircle } from "react-icons/tb";

import { useImage } from "../../context/imgContext/imageContext"
import { Empty } from 'antd';
import { DataGrid } from '@mui/x-data-grid';
import toast, { Toaster } from 'react-hot-toast';



const TodayPresentTable = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [getTodayAttend, setGetTodayAttend] = useState([])
    const [presentAttendDate, setPresentAttendDate] = useState(new Date().toISOString().substring(0, 10))

    const { updateAttendanceStatus, setUpdateAttendanceStatus } = useAttend();
    const { serverUrl } = useImage();


    // const todayDate = moment().format("YYYY-MM-DD")

    // ----------------------------search present attendance history-----------------------------
    const currentDate = new Date().toISOString().substring(0, 10)
    const getHistoryPresentAttendDateFun = (date) => {
        let selectDate = date.toISOString().substring(0, 10);
        setPresentAttendDate(selectDate)
        // if (new Date(selectDate) <= new Date(currentDate)) {
        setLoadingData(true);
        const req = {
            date: selectDate
        };
        axiosInstance
            .post("/attendance-on-date", req)
            .then((response) => {
                // console.log(response)
                setTimeout(() => {
                    setGetTodayAttend(response?.data)
                    setLoadingData(false);
                }, 500);
            })
            .catch((err) => {
                setLoadingData(false);
                toHaveStyle.error(err?.message)
            });
        // }
    }

    // ---------------------------fetch today attendance data fun-------------------
    const fetchTodayAttendanceFun = () => {
        setLoadingData(true);
        const req = {
            date: presentAttendDate
        };
        axiosInstance
            .post("/attendance-on-date", req)
            .then((response) => {
                setTimeout(() => {
                    setGetTodayAttend(response?.data)
                    setLoadingData(false);
                }, 300);
            })
            .catch((err) => {
                toast.error(err?.message)
                setLoadingData(false);
            });
    }

    useEffect(() => {
        fetchTodayAttendanceFun()
    }, [updateAttendanceStatus])
    // -----------------------------------------------------------------------------



    return (
        <div className='admin-emp-list-container'>
            <div className='admin-emp-list-container-top-div'>
                <Navbar />
            </div>
            <div className='admin-emp-list-container-bottom-div'>
                <div className='admin-emp-list-div-left'>
                    <Sidebar />
                </div>

                {/* ------------------------------------------------------ */}
                <div className='admin-emp-list-div-right'>
                    <div className='emp_list_container'>
                        <div className='emp_present_search_box'>
                            <input type="date" value={presentAttendDate} onChange={(e) => getHistoryPresentAttendDateFun(new Date(e.target.value))} />
                        </div>
                        <p className='total_reg_users_count'>Today's Present Employees List</p>
                        <div style={{ height: 'calc(100vh - 70px - 16px - 60px - 40px)', width: '100%', position: 'relative', border: '1px solid gray', borderRadius: '6px', overflow: 'hidden' }}>
                            <div className='current-attend-table-head'>
                                <span>Full Name</span>
                                <span>ID</span>
                                <span>Designation</span>
                                <span>In Time</span>
                                <span>Status</span>
                                <span>Message</span>
                                <span>Out Time</span>
                            </div>
                            <div className='current-attend-table-body'>
                                {loadingData === true ?
                                    <div className='dashboard_loading'>
                                        <MoonLoader
                                            color='blue'
                                            size={70}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div> : getTodayAttend.length > 0 ? getTodayAttend.map((data, index) => (
                                        <div className='current-attend-table-data' key={index}>
                                            {/* <span className='name_and_img_span'> */}
                                            <span>{data.user?.first_name} {data.user?.last_name}</span>
                                            {/* </span> */}
                                            <span>{data.user?.emp_id}</span>
                                            <span>{data.user?.designation}</span>
                                            <span>{data?.in_time}</span>
                                            <span>{data?.msg === "" ?
                                                <span className='on_time_mesg' style={{ width: '70px', textAlign: 'center' }}>On Time</span>
                                                : <span className='late_time_mesg' style={{ width: '70px', textAlign: 'center' }}>Late</span>}
                                            </span>
                                            <span>{data?.msg === "" ? "null" : data?.msg}</span>
                                            <span>{data?.out_time === "" ? "null" : data?.out_time}</span>
                                        </div>
                                    )) : <div className='no_data_div'>
                                        <Empty />
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div >
            </div >
            <Toaster />
        </div >
    )
}

export default TodayPresentTable