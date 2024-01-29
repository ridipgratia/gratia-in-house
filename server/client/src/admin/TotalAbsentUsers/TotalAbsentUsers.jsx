import React, { useState, useEffect } from 'react'
import "./TotalAbsentUsers.css"
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



const TotalAbsentUsers = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [rows, setRows] = useState([])
    const [absentAttendDate, setAbsentAttendDate] = useState(new Date().toISOString().substring(0, 10))

    const { updateAttendanceStatus } = useAttend();
    const { serverUrl } = useImage();
    // const todayDate = moment().format("YYYY-MM-DD")

    // -----------------------------search absent users fun----------------------------
    const currentDate = new Date().toISOString().substring(0, 10)
    const getHistoryAbsentAttendDateFun = (date) => {
        let selectDate = date.toISOString().substring(0, 10);
        setAbsentAttendDate(selectDate)
        // if (new Date(selectDate) <= new Date(currentDate)) {
        setLoadingData(true);
        const req = {
            date: selectDate
        };
        axiosInstance
            .post("/daily-absent-users", req)
            .then((response) => {
                // console.log(response)
                setTimeout(() => {
                    setRows(response?.data)
                    setLoadingData(false);
                }, 300);
            })
            .catch((err) => {
                setLoadingData(false);
                toast.error(err?.message)
            });
        // }
    }

    // ---------------------------fetch today attendance data fun-------------------
    const fetchTodayAbsentUsersFun = () => {
        setLoadingData(true);
        const req = {
            date: absentAttendDate
        };
        axiosInstance
            .post("/daily-absent-users", req)
            .then((response) => {
                setTimeout(() => {
                    setRows(response?.data)
                    setLoadingData(false);
                }, 300);
            })
            .catch((err) => {
                setLoadingData(false);
                toast.error(err?.message)
            });
    }

    useEffect(() => {
        fetchTodayAbsentUsersFun()
    }, [updateAttendanceStatus])


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
                            <input type="date" value={absentAttendDate} onChange={(e) => getHistoryAbsentAttendDateFun(new Date(e.target.value))} />
                        </div>
                        <p className='total_reg_users_count'>Today's Absent Employees List</p>
                        <div style={{ width: "100%", height: 'calc(100vh - 70px - 16px - 60px - 40px)', position: 'absolute', border: '1px solid rgb(163, 161, 161)', borderRadius: '6px', overflow: 'hidden' }}>
                            <div className='absent-attend-table-head'>
                                <span>Full Name</span>
                                <span>ID</span>
                                <span>Designation</span>
                                <span>Office</span>
                                <span>Phone No.</span>
                            </div>
                            <div className='absent-attend-table-body'>
                                {loadingData === true ?
                                    <div className='dashboard_loading'>
                                        <MoonLoader
                                            color='blue'
                                            size={70}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div> : rows.length > 0 ? rows.map((data, index) => (
                                        <div className='absent-attend-table-data' key={index}>
                                            {/* <span className='name_and_img_span'> */}
                                            <span>{data?.first_name} {data?.last_name}</span>
                                            {/* </span> */}
                                            <span>{data?.emp_id}</span>
                                            <span>{data?.designation}</span>
                                            <span>{data?.label}</span>
                                            <span>{data?.contact_no}</span>
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

export default TotalAbsentUsers