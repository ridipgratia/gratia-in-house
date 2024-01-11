import React, { useState, useEffect } from 'react'
import "./ApplyLeave.css"
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { BiPlus, BiChevronRight } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/authContext';
import dayjs from 'dayjs';
import axiosInstance from '../../utils/axios';


import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { Empty } from 'antd';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ApplyLeave = () => {
    const [leaveCategory, setLeaveCategory] = useState("all")
    const navigate = useNavigate();
    const { userData } = useAuth();
    const [userLeaveAllData, setUserLeaveAllData] = useState([])
    const [userLeaveFilterData, setUserLeaveFilterData] = useState(userLeaveAllData);
    // console.log(userLeaveFilterData)
    const [userLeaveDetailsPopUp, setUserLeaveDetailsPopUp] = useState(false)
    const [userLeaveDetailsFilter, setUserLeaveDetailsFilter] = useState([])
    const [leaveDateCountDiff, setLeaveDateCountDiff] = useState("")

    // -------------------------user leave details popup--------------------------------
    const handleUserLeaveDetailsPopupFun = () => {
        setUserLeaveDetailsPopUp(false)
    }



    // ----------------------------fetch all leave data fun-----------------
    const fetchUserLeaveDetailsFun = () => {
        const req = {
            user_id: userData.user_id
        };
        axiosInstance
            .post("/get-all-leaves", req)
            .then((response) => {
                // console.log(response)
                const { data } = response
                setUserLeaveAllData(data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchUserLeaveDetailsFun()
    }, [])


    const filterLeaveData = () => {
        if (leaveCategory === "all") {
            setUserLeaveFilterData(userLeaveAllData);
        }

        if (leaveCategory === "Medical") {
            const filteredProducts = userLeaveAllData.filter(
                (item) => item.leave_type === "Medical"
            );

            setUserLeaveFilterData(filteredProducts);
        }

        if (leaveCategory === "Casual") {
            const filteredProducts = userLeaveAllData.filter(
                (item) => item.leave_type === "Casual"
            );
            setUserLeaveFilterData(filteredProducts);
        }
        // if (leaveCategory === "Paid") {
        //     const filteredProducts = userLeaveAllData.filter(
        //         (item) => item.leave_type === "Paid"
        //     );
        //     setUserLeaveFilterData(filteredProducts);
        // }
    }

    useEffect(() => {
        filterLeaveData();
    }, [userLeaveAllData, leaveCategory])

    // -------------------------client leave details filter function---------------
    const filterUserLeaveDataFun = (id) => {
        let userLeaveDetails = userLeaveFilterData.filter((data) => data.leave_id === id)
        setUserLeaveDetailsFilter(userLeaveDetails)
        setUserLeaveDetailsPopUp(true)
    }

    // ----------------------calculate Users leave date--------------------
    const calculateUserLeaveDateFun = () => {
        for (let item of userLeaveDetailsFilter) {
            if (item.end_date != null) {
                let startDate = dayjs(item.start_date);
                let endDate = dayjs(item.end_date);
                let diffInDays = endDate.diff(startDate, 'day') + 1;
                setLeaveDateCountDiff(diffInDays)

            }
        }
    }
    useEffect(() => {
        calculateUserLeaveDateFun()
    }, [userLeaveDetailsFilter])



    return (
        <div className='faculty-history-container'>
            <div className='faculty-history-topbar'>
                <Navbar />
            </div>
            <div className='faculty-history-container-child'>
                <div className='faculty-history-sidebar'>
                    <Sidebar />
                </div>

                {/* --------------------------------------- */}
                <div className='faculty-history-right-div'>
                    <div className='apply_leave_heading_container'>
                        <h2 className='apply_leave_heading'>Leaves</h2>
                        <button onClick={() => navigate("/leave-form")}><BiPlus /></button>
                    </div>
                    <div className='apply_leave_select_btn_container'>
                        <div className='apply_leave_select_btn_div'>
                            <button className={`${leaveCategory === 'all' ? "leave_category_btn" : ""}`} onClick={() => setLeaveCategory("all")}> All {leaveCategory === 'all' && <span className='user_leave_count_in_btn'>{leaveCategory === 'all' && userLeaveFilterData.length}</span>}</button>
                            <button className={`${leaveCategory === 'Casual' ? "leave_category_btn" : ""}`} onClick={() => setLeaveCategory("Casual")}><span></span>Casual {leaveCategory === 'Casual' && <span className='user_leave_count_in_btn'>{leaveCategory === 'Casual' && userLeaveFilterData.length}</span>}</button>
                            <button className={`${leaveCategory === 'Medical' ? "leave_category_btn" : ""}`} onClick={() => setLeaveCategory("Medical")}><span></span>Medical {leaveCategory === 'Medical' && <span className='user_leave_count_in_btn'>{leaveCategory === 'Medical' && userLeaveFilterData.length}</span>}</button>
                            {/* <button className={`${leaveCategory === 'Paid' ? "leave_category_btn" : ""}`} onClick={() => setLeaveCategory("Paid")}><span></span>Paid {leaveCategory === 'Paid' && <span className='user_leave_count_in_btn'>{leaveCategory === 'Paid' && userLeaveFilterData.length}</span>}</button> */}
                        </div>
                        <div className='add_leave_btn_div'>
                            <button onClick={() => navigate("/leave-form")}><BiPlus /></button>
                        </div>
                    </div>
                    <div className="apply_leave_data_container">
                        {userLeaveFilterData?.length > 0 ? userLeaveFilterData?.map((data, index) => (
                            <div className='apply_leave_data_div' key={index}>
                                <h4 className='apply_leave_heading_1'>{dayjs(data?.applied_on).format('MMM-YYYY')}</h4>
                                <div className='apply_leave_data'>
                                    <div className='apply_leave_child_div'>
                                        <p>{data?.isHalfDay === 1 ? 'Half Day Application' : "Full Day Application"}</p>
                                        <h3>{dayjs(data.applied_on).format('ddd,DD-MMM')}</h3>
                                        <p className={data.leave_type === 'Casual' ? "" : "client_medical_btn"}>{data?.leave_type}</p>
                                    </div>
                                    <div className='apply_leave_child_div_2'>
                                        <span className={data.status === 'Awaiting' ? 'await_class' : data.status === 'Approved' ? 'approve_class' : 'reject_class'}>{data.status}</span>
                                        <span onClick={() => filterUserLeaveDataFun(data?.leave_id)}><BiChevronRight /></span>
                                    </div>
                                </div>
                            </div>
                        )) : <div className='no_data_found_in_leave'>
                            <Empty />
                        </div>}
                        {/* ------------------------user leave details popup---------------------- */}
                        {
                            userLeaveDetailsPopUp &&
                            <Dialog
                                open={userLeaveDetailsPopUp}
                                // onClose={handleUserLeaveDetailsPopupFun}
                                TransitionComponent={Transition}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        <span className='client_leave_details_container'>
                                            {
                                                userLeaveDetailsFilter?.map((data, index) => (
                                                    <span className='client_user_leave_details_data' key={index}>
                                                        <span><span>Applied </span><span>{dayjs(data.applied_on).format('YYYY-MM-DD')}</span></span>
                                                        <span><span>Leave For</span><span>{data.isHalfDay === 1 ? "Half Day" : 'Full Day'}</span></span>
                                                        <span><span>Leave Type</span><span>{data.leave_type}</span></span>
                                                        {
                                                            data?.isHalfDay === 1 && <span><span>Date</span><span>{data.start_date}</span></span>
                                                        }
                                                        {
                                                            data?.isHalfDay === 0 && <span><span>From</span><span>{data.start_date}</span></span>
                                                        }
                                                        {
                                                            data?.isHalfDay === 0 && <span><span>To</span><span>{data.end_date}</span></span>
                                                        }
                                                        {
                                                            data?.isHalfDay === 0 && <span><span>Duration</span><span>{leaveDateCountDiff}</span></span>
                                                        }
                                                        <span><span>Status</span><span className={data?.status === 'Awaiting' ? 'client_await' : data?.status === 'Approved' ? 'client_approved' : 'client_reject'}>{data.status}</span></span>
                                                    </span>
                                                ))
                                            }
                                        </span>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <span style={{ margin: '0 auto', paddingBottom: '12px' }} >
                                        <Button onClick={handleUserLeaveDetailsPopupFun} variant="contained" size="small">Close</Button>
                                    </span>
                                </DialogActions>
                            </Dialog>
                        }

                    </div>
                </div>

            </div>
        </div >
    )
}

export default ApplyLeave