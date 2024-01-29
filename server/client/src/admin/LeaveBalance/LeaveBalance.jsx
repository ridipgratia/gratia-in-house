import React, { useState, useEffect } from 'react'
import './LeaveBalance.css'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import axiosInstance from '../../utils/axios';
import MoonLoader from "react-spinners/ClipLoader";
import { DataGrid } from "@mui/x-data-grid";
import toast, { Toaster } from 'react-hot-toast';
import { Empty } from 'antd';

const LeaveBalance = () => {
    const [loadingData, setLoadingData] = useState(false)
    const [userLeaveBalance, setUserLeaveBalance] = useState([])

    // -------------------get all users leave data fun----------------------
    const getUserLeaveBalanceFun = () => {
        setLoadingData(true)
        axiosInstance
            .post("/all-leave-balance")
            .then((response) => {
                // console.log(response.data)
                setTimeout(() => {
                    setUserLeaveBalance(response.data)
                    setLoadingData(false);
                }, 500);
            })
            .catch((err) => {
                setLoadingData(false)
                toast.error(err?.message)
            });
    }
    useEffect(() => {
        getUserLeaveBalanceFun()
    }, [])



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
                    <div className='leaveBalance_table'>
                        <div className='admin_leave_balance_heading_container'>
                            <h2>Leave Balance</h2>
                            <h2>Year : {new Date().getFullYear()}</h2>
                        </div>
                        <div className='admin_leave_balance_list_div'>
                            <div className='emp_leave_list-head'>
                                <span>Name</span>
                                <span>Employee ID</span>
                                <span>Casual Leave</span>
                                <span>Medical Leave</span>
                                <span>Remaining Leave</span>
                            </div>
                            <div className='admin_leave_balance_container'>
                                {loadingData === true ?
                                    <div className='holiday_loader_loading'>
                                        <MoonLoader
                                            color='blue'
                                            size={70}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div> : userLeaveBalance.length > 0 ? userLeaveBalance.map((data, index) => (
                                        <div className='emp-leave-balance-list-data' key={index}>
                                            <span style={{ fontSize: '12px', padding: '12px 0px' }}>{data?.first_name} {data?.last_name}</span>
                                            <span style={{ fontSize: '12px', padding: '12px 0px' }}>{data?.emp_id}</span>
                                            <span style={{ fontSize: '12px', padding: '12px 0px' }}>{data?.total_casual_leaves}</span>
                                            <span style={{ fontSize: '12px', padding: '12px 0px' }}>{data?.total_medical_leaves}</span>
                                            <span style={{ fontSize: '12px', padding: '12px 0px' }}>{data?.remaining_paid_leaves} days</span>
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

export default LeaveBalance