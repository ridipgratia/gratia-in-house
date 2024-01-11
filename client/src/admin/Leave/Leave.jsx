import React, { useState, useEffect } from 'react'
import './Leave.css'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import LeaveDetailsPopUp from './LeaveDetailsPopUp';
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';
import { BiPlus, BiChevronRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { TbUserCircle } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast';
import { useImage } from "../../context/imgContext/imageContext"
import { Empty } from 'antd';


const Leave = () => {
    const [getAllAppliedLeaves, setGetAllAppliedLeaves] = useState([]);
    const [getFilterAppliedLeave, setGetFilterAppliedLeave] = useState(getAllAppliedLeaves)
    // console.log(getFilterAppliedLeave)
    const [filterUserLeaveDetailsState, setFilterUserLeaveDetailsState] = useState([])
    const [adminLeaveCategory, setAdminLeaveCategory] = useState("all")
    const [showUserLeaveDetailsPopUp, setShowUserLeaveDetailsPopUp] = useState(false)
    const [medicalReportUrl, setMedicalReportUrl] = useState("")
    const [leaveDateCountDiff, setLeaveDateCountDiff] = useState("")
    const [leaveRejectedMesg, setLeaveRejectedMesg] = useState("")


    const { serverUrl } = useImage();

    // ----------------------get All leaves data fun-----------------
    const getAllAppliedLeavesDataFun = () => {
        axiosInstance
            .post("/leave-applied-users")
            .then((response) => {
                // console.log(response.data)
                setGetAllAppliedLeaves(response.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {
        getAllAppliedLeavesDataFun()
    }, [])

    // ------------------------filetr applied leave data fun-----------------------------
    const filterAppliedLeaveData = () => {
        if (adminLeaveCategory === "all") {
            setGetFilterAppliedLeave(getAllAppliedLeaves);
        }

        if (adminLeaveCategory === "Awaiting") {
            const filteredProducts = getAllAppliedLeaves.filter(
                (item) => item.status === "Awaiting"
            );

            setGetFilterAppliedLeave(filteredProducts);
        }

        if (adminLeaveCategory === "Approved") {
            const filteredProducts = getAllAppliedLeaves.filter(
                (item) => item.status === "Approved"
            );
            setGetFilterAppliedLeave(filteredProducts);
        }
        if (adminLeaveCategory === "cancelled") {
            const filteredProducts = getAllAppliedLeaves.filter(
                (item) => item.status === "cancelled"
            );
            setGetFilterAppliedLeave(filteredProducts);
        }
    }

    useEffect(() => {
        filterAppliedLeaveData();
    }, [getAllAppliedLeaves, adminLeaveCategory])

    // ----------------------filter user leave details data fun--------------------
    const filterUserLeaveDetaisFun = (id) => {
        const filterUserLeaveDetailsData = getFilterAppliedLeave.filter((data) => data.id === id)
        setMedicalReportUrl(filterUserLeaveDetailsData[0])
        setFilterUserLeaveDetailsState(filterUserLeaveDetailsData)
        setShowUserLeaveDetailsPopUp(true)
    }

    // ------------------medical report download function------------------
    const handleDownload = () => {
        const fileUrl = medicalReportUrl.document
        const fileName = fileUrl.split("/").pop();
        leaveMedicalReportDownloadfun(fileUrl, fileName)
    };
    const leaveMedicalReportDownloadfun = (url, fileName) => {
        const link = document.createElement('a');
        link.href = `https://attendance.gratiatechnology.com/uploads/${url}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // ----------------------approved user leave--------------------------
    const adminApprovedUserLeaveFun = (user_id, leave_id) => {
        const req = {
            user_id: user_id,
            leave_id: leave_id
        }
        axiosInstance
            .post("/approved-leave", req)
            .then((response) => {
                // console.log(response.data)
                toast.success("Leave approved successfully!", {
                    duration: 3000,
                    position: 'bottom-center',
                    className: "facultyToast"
                });
                getAllAppliedLeavesDataFun();
                setShowUserLeaveDetailsPopUp(false)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    // ----------------------approved user leave--------------------------
    const adminRejectedUserLeaveFun = (user_id, leave_id) => {
        // console.log("rejected")
        const req = {
            user_id: user_id,
            leave_id: leave_id,
            cancel_reason: leaveRejectedMesg,
        }
        axiosInstance
            .post("/cancel-leave", req)
            .then((response) => {
                toast.error("Leave rejected successfully!", {
                    duration: 3000,
                    position: 'bottom-center',
                    className: "facultyToast"
                });
                // console.log(response.data)
                getAllAppliedLeavesDataFun();
                setShowUserLeaveDetailsPopUp(false)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    // ----------------------calculate leave date--------------------
    const calculateUserLeaveDateFun = () => {
        for (let item of filterUserLeaveDetailsState) {
            if (item.end_date != null) {
                const startDate = dayjs(item.start_date);
                const endDate = dayjs(item.end_date);
                const diffInDays = endDate.diff(startDate, 'day') + 1;
                setLeaveDateCountDiff(diffInDays)

            }
        }
    }
    useEffect(() => {
        calculateUserLeaveDateFun()
    }, [filterUserLeaveDetailsState])


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
                    <div className='admin-home-detail-container'>
                        <div className='admin-emp-leaves-list-div'>
                            <div className='admin_leave_heading_container'>
                                <h2>Leaves</h2>
                            </div>
                            <div className='apply_leave_select_btn_container'>
                                <div className='admin_filter_btn'>
                                    <button className={`${adminLeaveCategory === 'all' ? "admin_leave_category_btn under_line_1" : ""}`} onClick={() => setAdminLeaveCategory("all")}>All</button>
                                    <button className={`${adminLeaveCategory === 'Awaiting' ? "admin_leave_category_btn under_line_2" : ""}`} onClick={() => setAdminLeaveCategory("Awaiting")}><span></span>Pending</button>
                                    <button className={`${adminLeaveCategory === 'Approved' ? "admin_leave_category_btn under_line_3" : ""}`} onClick={() => setAdminLeaveCategory("Approved")}><span></span>Approved</button>
                                    <button className={`${adminLeaveCategory === 'cancelled' ? "admin_leave_category_btn under_line_4" : ""}`} onClick={() => setAdminLeaveCategory("cancelled")}><span></span>Rejected</button>
                                </div>
                            </div>
                            <div className="admin_leave_list_data_container">
                                {getFilterAppliedLeave?.length > 0 ? getFilterAppliedLeave?.map((data, index) => (
                                    <div className='apply_leave_data_div' key={index}>
                                        <div className='apply_leave_data'>
                                            <div className='apply_leave_child_div'>
                                                <p>{data?.is_half_day === 1 ? 'Half Day Application' : "Full Day Application"}</p>
                                                <div className='admin_applied_leave_name_img_div'>
                                                    <div className='admin_applied_leave_img_div'>
                                                        {data.user_image === null ? <span><TbUserCircle /></span> : <img src={`${serverUrl}${data?.user_image}`} alt="img" className='admin_applied_leave_img' />}
                                                    </div>
                                                    <span style={{ textTransform: 'capitalize' }}>{data?.first_name}  {data?.last_name}</span>
                                                </div>
                                                <h4 className='leave_applied_date_admin'>{dayjs(data?.applied_on).format('ddd-DD-MMM')}</h4>
                                                <p style={{ fontSize: '14px' }} className={data.leave_type === 'Casual' ? "" : "client_medical_btn"}>{data?.leave_type}</p>
                                            </div>
                                            <div className='apply_leave_child_div_1'>
                                                <p><span>Start Date : </span><span>{data?.start_date}</span></p>
                                                {data.is_half_day === 0 && <p><span>End Date : </span><span>{data.end_date}</span></p>}
                                            </div>
                                            <div className='apply_leave_child_div_2'>
                                                <span className={data.status === 'awaiting' ? 'await_class' : data.status === 'Approved' ? 'approve_class' : 'reject_class'}>{data.status}</span>
                                                <span onClick={() => filterUserLeaveDetaisFun(data.id)} style={{ cursor: 'pointer' }}><BiChevronRight /></span>
                                            </div>
                                        </div>
                                    </div>
                                )) : <div className='no_data_found_in_leave'>
                                    <Empty />
                                </div>}

                            </div>
                            {/* -------------------------show user leave details popUp  */}
                            {
                                showUserLeaveDetailsPopUp && <LeaveDetailsPopUp
                                    showUserLeaveDetailsPopUp={showUserLeaveDetailsPopUp}
                                    setShowUserLeaveDetailsPopUp={setShowUserLeaveDetailsPopUp}
                                    filterUserLeaveDetailsState={filterUserLeaveDetailsState}
                                    serverUrl={serverUrl}
                                    leaveDateCountDiff={leaveDateCountDiff}
                                    handleDownload={handleDownload}
                                    adminRejectedUserLeaveFun={adminRejectedUserLeaveFun}
                                    adminApprovedUserLeaveFun={adminApprovedUserLeaveFun}
                                    setLeaveRejectedMesg={setLeaveRejectedMesg}
                                />
                            }
                        </div>
                    </div>
                </div>

            </div >
            <Toaster />
        </div >
    )
}

export default Leave