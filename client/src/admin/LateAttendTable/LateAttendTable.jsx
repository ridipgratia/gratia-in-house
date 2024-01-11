
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
                // console.log(response)
                let st = [];
                response.data.map((el, i) => {
                    const { user, ...rest } = el
                    st = [...st, { ...user, ...rest }]
                })
                setTimeout(() => {
                    setLateAttendList(st)
                    setLoadingData(false);
                }, 500);
            })
            .catch((err) => {
                console.log(err)
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
                // console.log(response)
                let st = [];
                response.data.map((el, i) => {
                    const { user, ...rest } = el
                    st = [...st, { ...user, ...rest }]
                })
                setTimeout(() => {
                    setLateAttendList(st)
                    setLoadingData(false);
                }, 500);
            })
            .catch((err) => {
                console.log(err)
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
                        {/* <div className='emp_list_div'>
                            <div className='emp_list_heading'>
                                <span>Name</span>
                                <span>ID</span>
                                <span>Designation</span>
                                <span>Time</span>
                                <span>Status</span>
                                <span>Message</span>
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
                                    </div> : lateAttendList.length > 0 ? lateAttendList.map((data, index) => (
                                        <div className='emp_list_data' key={index}>

                                            <span className='name_and_img_span'><span className='dashboard_emp_img'>{data.user?.user_image === null ? <span className='table_user_icon'><TbUserCircle /></span> : <img src={`${serverUrl}${data.user?.user_image}`} alt="_img" />}</span><span>{data.user?.first_name} {data.user?.last_name}</span></span>
                                            <span>{data.user?.emp_id}</span>
                                            <span>{data.user?.designation}</span>
                                            <span>{data?.in_time}</span>
                                            <span>{data?.msg === null ? <span className='on_time_mesg'>On Time</span> : <span className='late_time_mesg'>Late</span>}</span>
                                            <span className='reason_mesg_box'>{data?.msg === null ? "Null" : data.msg}</span>

                                        </div>
                                    )) : <div className='no_data_div'>
                                        <Empty />
                                    </div>}
                            </div>
                        </div> */}
                        <div style={{ height: 'calc(100vh - 70px - 16px - 60px - 40px)', width: '100%', position: 'relative' }}>
                            {loadingData === true ?
                                <div className='dashboard_loading' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MoonLoader
                                        color='blue'
                                        size={60}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </div> : lateAttendList.length > 0 ?
                                    <DataGrid
                                        pagination
                                        rowsPerPageOptions={[7, 10, 25]}
                                        columns={[
                                            { field: 'first_name', headerName: 'First Name', flex: 1, fontWeight: 500 },
                                            { field: 'last_name', headerName: 'Last Name', flex: 1 },
                                            { field: 'emp_id', headerName: 'ID', flex: 1 },
                                            { field: 'designation', headerName: 'Designation', flex: 1 },
                                            { field: 'in_time', headerName: 'Time', width: 100 },
                                            { field: 'status', headerName: 'Status', width: 100 },
                                            { field: 'msg', headerName: 'Message', flex: 1 },
                                        ]}
                                        rows={lateAttendList}
                                        initialState={{
                                            ...lateAttendList.initialState,
                                            pagination: { paginationModel: { pageSize: 7 } },
                                        }}
                                        // pageSizeOptions={[5, 10, 25]}
                                        sx={{
                                            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                                                width: '0.3em',
                                            },
                                            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
                                                background: '#f1f1f1',
                                            },
                                            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                                                backgroundColor: '#888',
                                                borderRadius: '6px'
                                            },
                                            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
                                                background: '#555',
                                            },
                                        }}

                                    />

                                    : <div className='no_data_div'>
                                        <Empty />
                                    </div>}
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default LateAttendTable