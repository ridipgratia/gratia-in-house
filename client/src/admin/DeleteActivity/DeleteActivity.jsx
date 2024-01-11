import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

import axiosInstance from '../../utils/axios';
import MoonLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from 'react-hot-toast';

import { BsArrowRightCircle } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import Button from '@mui/material/Button';
import { Empty } from 'antd';

const DeleteActivity = () => {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [allData, setAllData] = useState([])
    const [loadingData, setLoadingData] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState(false)

    // ----------------------------fetchAttendanceForDelete fun-------------------------------------
    const clearActivityHistory = () => {
        if (startDate === "") {
            toast.error("Select start Date.", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else if (endDate === "") {
            toast.error("Select end Date.", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else if (startDate > endDate) {
            toast.error("Select Valid Date.", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else {
            setDeletePopUp(true)
        }
    }
    // -----------------------------------------------------
    const fetchActivityForDelete = () => {
        if (startDate === "") {
            toast.error("Select start Date.", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else if (endDate === "") {
            toast.error("Select end Date.", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else if (startDate > endDate) {
            toast.error("Select Valid Date.", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else {
            setLoadingData(true);
            const req = {
                start_date: startDate,
                end_date: endDate
            };
            axiosInstance
                .post("/activity-on-date", req)
                .then((response) => {
                    // console.log(response)
                    setTimeout(() => {
                        setAllData(response.data)
                        setLoadingData(false);
                    }, 1000);
                })
                .catch((err) => {
                    console.log(err)
                    setTimeout(() => {
                    }, 1000)
                });
        }
    }
    // -----------------------delete selected fun-------------------------
    const deleteSelectedActivityList = () => {
        if (startDate > endDate) {
            toast.error("Select Valid Date.", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else {
            setDeletePopUp(false)
            setLoadingData(true);
            const req = {
                start_date: startDate,
                end_date: endDate
            };
            axiosInstance
                .post("/clean-activity", req)
                .then((response) => {
                    setTimeout(() => {
                        setLoadingData(false);
                        setAllData([])
                    }, 1000);
                    toast.success("Deleted successfuly all data.", {
                        duration: 3000,
                        position: 'bottom-center',
                        className: "facultyToast"
                    });
                })
                .catch((err) => {
                    console.log(err)
                    setTimeout(() => {
                    }, 1000)
                });
        }
    }


    return (
        <div className='home-container'>
            <Navbar />
            <div className='home-container-bottom-div'>
                <div className='home-div-left'>
                    <Sidebar />
                </div>

                {/* ------------------------------------------------------ */}
                <div className='home-div-right'>
                    <div className='home-detail-container'>
                        <div className='dash_report_container'>
                            <div className='report_search_container'>
                                <div className='delete_user_atten_history_div'>
                                    <p className='to_class'>from</p>
                                    <div className='report_search_box'>
                                        <input type="date" onChange={(e) => setStartDate(e.target.value)} />
                                    </div>
                                    <p className='to_class'>to</p>
                                    <div className='report_search_box'>
                                        <input type="Date" onChange={(e) => setEndDate(e.target.value)} />
                                    </div>
                                    <div className='go_btn_div'>
                                        <button className='go_btn' onClick={fetchActivityForDelete}><BsArrowRightCircle /></button>
                                    </div>
                                </div>
                                <div className='report_add_div'>
                                    <button className='clean_btn' onClick={clearActivityHistory}><span className='dash_download_icon'><AiOutlineClear /></span>Clean</button>
                                </div>
                            </div>
                            {/* --------------------------popup---------------------------- */}
                            {deletePopUp &&
                                <div className='dash_delete_popup_container'>
                                    <div className='dash_delete_popup_div'>
                                        <p>Are you sure want to delete it?</p>
                                        <div className='dash_yes_no_btn_div'>
                                            <Button variant="outlined" size="small" sx={{ ml: 1 }} onClick={() => setDeletePopUp(false)}>NO</Button>
                                            <Button variant="contained" size="small" sx={{ mr: 1 }} onClick={deleteSelectedActivityList}>YES</Button>
                                        </div>
                                    </div>
                                </div>
                            }
                            {/* ------------------------------------------------------------- */}
                            <div className='dashboard_emp_page_container'>
                                <div className='emp_list_container'>
                                    <div className='emp_list_div'>
                                        <div className='emp_list_heading'>
                                            <span>Name</span>
                                            <span>ID</span>
                                            <span>Designation</span>
                                            <span>Date</span>
                                            <span>Activity</span>
                                        </div>

                                        <div className='user_list_container'>
                                            {loadingData === true ?
                                                <div className='dashboard_loading'>
                                                    <MoonLoader
                                                        color='blue'
                                                        size={70}
                                                        aria-label="Loading Spinner"
                                                        data-testid="loader"
                                                    />
                                                </div> : allData.length > 0 ? allData.map((data, index) => (
                                                    <div className='emp_list_data' key={index}>
                                                        <span className='name_and_img_span'><span style={{ textTransform: 'capitalize' }}>{data.user?.first_name} {data.user?.last_name}</span></span>
                                                        <span>{data.user?.emp_id}</span>
                                                        <span style={{ textTransform: 'capitalize' }}>{data.user?.designation}</span>
                                                        <span>{data?.date}</span>
                                                        <span>{data?.activity}</span>
                                                    </div>
                                                )) : <div className='no_data_div'>
                                                    <Empty />
                                                </div>}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
            {/* <Toaster /> */}
        </div >
    )
}

export default DeleteActivity