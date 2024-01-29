
import React, { useState, useEffect } from 'react'
import "./LateAttendTable.css"
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import MoonLoader from "react-spinners/ClipLoader";
import moment from 'moment';
import axiosInstance from '../../utils/axios';
import { useAttend } from '../../context/attendance/attenContext';
import { TbUserCircle } from "react-icons/tb";
import { useImage } from "../../context/imgContext/imageContext"
import { Empty } from 'antd';
import { DataGrid } from '@mui/x-data-grid';
import toast, { Toaster } from 'react-hot-toast';

const LateAttendTable = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [lateAttendList, setLateAttendList] = useState("")
    const [lateAttendDate, setLateAttendDate] = useState(new Date().toISOString().substring(0, 10))

    // const todayDate = moment().format("YYYY-MM-DD")

    const { serverUrl } = useImage();
    const { updateAttendanceStatus } = useAttend();
    // ------------------------search absent users history------------------
    const currentDate = new Date().toISOString().substring(0, 10)

    const getHistoryPresentAttendDateFun = (date) => {
        let selectDate = date.toISOString().substring(0, 10);
        setLateAttendDate(selectDate)
        // if (new Date(selectDate) <= new Date(currentDate)) {
        setLoadingData(true);
        const req = {
            date: selectDate
        };
        axiosInstance
            .post("/late-users-get", req)
            .then((response) => {
                setTimeout(() => {
                    setLateAttendList(response?.data)
                    setLoadingData(false);
                }, 300);
            })
            .catch((err) => {
                setLoadingData(false);
                toast.error(err?.message)
            });
        // }
    }

    // -------------------------fetch All users attendance list--------------------
    const fetchAllUsersAttendList = () => {
        setLoadingData(true);
        const req = {
            date: lateAttendDate
        };
        axiosInstance
            .post("/late-users-get", req)
            .then((response) => {
                setTimeout(() => {
                    setLateAttendList(response?.data)
                    setLoadingData(false);
                }, 300);
            })
            .catch((err) => {
                setLoadingData(false);
                toast.error(err?.message)
            });
    }

    useEffect(() => {
        fetchAllUsersAttendList()
        // getHistoryPresentAttendDateFun()
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
                            <input type="date" value={lateAttendDate} onChange={(e) => getHistoryPresentAttendDateFun(new Date(e.target.value))} />
                        </div>
                        <p className='total_reg_users_count'>Today's Late Employees List</p>
                        <div style={{ height: 'calc(100vh - 70px - 16px - 60px - 40px)', width: '100%', position: 'relative', border: '1px solid gray', borderRadius: '6px', overflow: 'hidden' }}>
                            <div className='late-attend-table-head'>
                                <span>Full Name</span>
                                <span>ID</span>
                                <span>Designation</span>
                                <span>Time</span>
                                <span>Status</span>
                                <span>Message</span>
                            </div>
                            <div className='late-attend-table-body'>
                                {loadingData === true ?
                                    <div className='dashboard_loading'>
                                        <MoonLoader
                                            color='blue'
                                            size={70}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div> : lateAttendList.length > 0 ? lateAttendList.map((data, index) => (
                                        <div className='late-attend-table-data' key={index}>
                                            <span>{data.user?.first_name} {data.user?.last_name}</span>
                                            <span>{data.user?.emp_id}</span>
                                            <span>{data.user?.designation}</span>
                                            <span>{data?.in_time}</span>
                                            <span>{data?.msg === null ?
                                                <span className='on_time_mesg' style={{ width: '70px', textAlign: 'center' }}>On Time</span> :
                                                <span className='late_time_mesg' style={{ width: '70px', textAlign: 'center' }}>Late</span>}
                                            </span>
                                            <span className='reason_mesg_box'>{data?.msg === null ? "Null" : data.msg}</span>

                                        </div>
                                    )) : <div className='no_data_div'>
                                        <Empty />
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default LateAttendTable