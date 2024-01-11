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
                    setRows(response.data)
                    setLoadingData(false);
                }, 500);
            })
            .catch((err) => {
                console.log(err)
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
                console.log(response.data)
                setTimeout(() => {
                    setRows(response.data)
                    console.log(response.data)
                    setLoadingData(false);
                }, 500);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {
        fetchTodayAbsentUsersFun()
    }, [updateAttendanceStatus])
    // -------------------------------table columns----------------------------------------------
    const columns = [
        // { field: 'id', headerName: 'ID', width: 100 },
        { field: 'first_name', headerName: 'First Name', flex: 1 },
        { field: 'last_name', headerName: 'Last Name', flex: 1 },
        { field: 'emp_id', headerName: 'Employee ID', flex: 1 },
        { field: 'designation', headerName: 'Designation', flex: 1 },
        { field: 'label', headerName: 'Office', width: 100 },
        { field: 'email', headerName: 'Email', flex: 1 },
    ]

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
                        <div style={{ width: "100%", height: 'calc(100vh - 70px - 16px - 60px - 40px)', position: 'absolute' }}>
                            {loadingData === true ?
                                <div className='dashboard_loading' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MoonLoader
                                        color='blue'
                                        size={60}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </div> : rows.length > 0 ?
                                    <DataGrid
                                        columns={columns}
                                        rows={rows}
                                        initialState={{
                                            ...rows.initialState,
                                            pagination: {
                                                ...rows.initialState?.pagination,
                                                paginationModel: {
                                                    pageSize: 15,
                                                },
                                            },
                                        }}
                                        pageSizeOptions={[15, 20, 30]}
                                        sx={{
                                            "& .css-t89xny-MuiDataGrid-columnHeaderTitle": {
                                                fontWeight: '600',
                                                color: '#3A3B3C',
                                                fontFamily: 'Poppins',
                                                textTransform: 'uppercase'
                                            },
                                            "& .MuiDataGrid-cellContent": {
                                                fontFamily: 'Poppins',
                                            },
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

export default TotalAbsentUsers