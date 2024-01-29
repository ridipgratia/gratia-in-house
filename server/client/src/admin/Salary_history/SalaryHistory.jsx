import React, { useState } from 'react'
import "./SalaryHistory.css"
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { AiOutlineLeft, } from "react-icons/ai"
import { Select, DatePicker, Table } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import axiosInstance from "../../utils/axios.js";
import toast, { Toaster } from 'react-hot-toast';


const SalaryHistory = () => {
    const { Option } = Select;
    const [loading, setLoading] = useState(false)
    const [selectPayRollDropDown, setSelectPayRollDropDown] = useState("Select office")
    const [getSalaryMonth, setGetSalaryMonth] = useState("")
    const [getSalaryYear, setGetSalaryYear] = useState("")
    const [getSalaryHistory, setGetSalaryHistory] = useState([])

    const onChange = (date, dateString) => {
        setGetSalaryMonth(dayjs(date).format("MM"));
        setGetSalaryYear(dayjs(date).format("YYYY"));
    };

    // -------------------------get salary history---------------------
    const getSalaryHistoryFun = () => {
        if (getSalaryMonth === "") {
            toast.error("Select a month.", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else if (selectPayRollDropDown === "Select office") {
            toast.error("Select  office.", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        }
        else {
            setLoading(true)
            const req = {
                month: getSalaryMonth,
                year: getSalaryYear,
                label: selectPayRollDropDown
            };
            axiosInstance
                .post("/export-salaries", req)
                .then((response) => {
                    console.log(response)
                    setTimeout(() => {
                        setGetSalaryHistory(response.data)
                        if (response.data.length === 0) {
                            toast.error("No salaries found for this month.", {
                                duration: 4000,
                                position: 'bottom-center',
                                className: "facultyToast"
                            });
                        }
                        setLoading(false);
                    }, "1500");
                })
                .catch((error) => {
                    // console.log(error.response.data.error)
                    setTimeout(() => {
                        toast.error(error.response.data.error, {
                            duration: 4000,
                            position: 'bottom-center',
                            className: "facultyToast"
                        });
                        setLoading(false)
                    }, 1500)

                });
        }
    }
    // ------------------history table column---------------------
    const columns = [
        {
            title: "First Name",
            dataIndex: "user.first_name",
            key: "user.first_name",
        },
        {
            title: "Last Name",
            dataIndex: "user.last_name",
            key: "user.last_name",
        },
        {
            title: "Working Days",
            dataIndex: "working_days",
            key: "emp_id"
        },
        {
            title: "Present Days",
            dataIndex: "present_days",
            key: "present_days"
        },
        {
            title: "Late Comming Days",
            dataIndex: "late",
            key: "late",
        },
        {
            title: "Leave-Days",
            dataIndex: "leaves",
            key: "leaves",

        },
        {
            title: "CTC",
            dataIndex: "ctc_per_month",
            key: "ctc_per_month"
        },
        {
            title: "Epf",
            dataIndex: "epf",
            key: "epf"
        },
        {
            title: "Esic",
            dataIndex: "esic",
            key: "esic"
        },
        {
            title: "Professional Tax",
            dataIndex: "professional_tax",
            key: "professional_tax"
        },
        {
            title: "Late Days Deduction",
            dataIndex: "late_days_deduction",
            key: "late_days_deduction"
        },
        {
            title: "Leave Days Deduction",
            dataIndex: "leave_days_deduction",
            key: "leave_days_deduction"
        },
        {
            title: "Net Salary",
            dataIndex: "net_salary",
            key: "net_salary"
        },

    ];

    return (
        <div className='admin-emp-list-container'>
            <div className='admin-emp-list-container-top-div'>
                <Navbar />
            </div>
            <div className='admin-emp-list-container-bottom-div'>
                <div className='admin-emp-list-div-left'>
                    < Sidebar />
                </div>
                {/* ------------------------------------------------------ */}
                <div className='admin-emp-list-div-right'>
                    <div className='admin-home-detail-container'>
                        <div className='salary-history-back_btn_div'>
                            <span><AiOutlineLeft /></span>
                            <span>Dashboard,  Salary History</span>
                        </div>

                        <div className='salary_history_input_lopbtn_div'>
                            <div className='payroll_input_div'>
                                <DatePicker onChange={onChange} picker="month" style={{ height: "38px", paddingTop: "0px", paddingBottom: "1px" }} />
                            </div>
                            <div className='payroll_drop_down'>
                                <Select defaultValue="Select category" value={selectPayRollDropDown} onChange={(e) => setSelectPayRollDropDown(e)} style={{ width: "100%", paddingTop: "0px", paddingBottom: "1px" }} >
                                    <Option value="HRMS">HRMS</Option>
                                    <Option value="TTMS">TTMS</Option>
                                    <Option value="GRATIA">GRATIA</Option>
                                </Select>
                            </div>
                            <div className='payroll_lop_btn_div'>
                                <button onClick={getSalaryHistoryFun}>{loading === true ? <CircularProgress color="inherit" size={15} /> : "SEARCH"}</button>
                            </div>
                        </div>
                        <div className='salary_history_table_container'>
                            <div className='salary_history_heading'>
                                <h5>Employee Salary List</h5>
                            </div>

                            <div className='salary_history_table'>
                                <Table columns={columns} dataSource={getSalaryHistory} pagination={false} className='salary_table'></Table>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default SalaryHistory