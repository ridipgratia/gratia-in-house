import React, { useState, useEffect } from 'react'
import "./Payroll.css"
// import "antd/dist/antd.css";
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import FinalSalaryTable from './FinalSalaryTable'
import EditLeaveAndLateDays from './EditLeaveAndLateDays'
import { DatePicker, Button, Table, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { Select } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from "../../utils/axios.js";
import CircularProgress from '@mui/material/CircularProgress';

import { AiOutlineLeft, } from "react-icons/ai"
import { BiPlusCircle } from "react-icons/bi"
import * as ExcelJS from 'exceljs';




// ------------------------------------------------------------------------------------------ 

const Payroll = () => {
    const { Option } = Select;
    const [empSalaryData, setEmpSalaryData] = useState([])
    console.log(empSalaryData)
    const [selectPayRollDropDown, setSelectPayRollDropDown] = useState("Select office")
    const [getSalaryMonth, setGetSalaryMonth] = useState("")
    const [getSalaryYear, setGetSalaryYear] = useState("")
    const [loading, setLoading] = useState(false)
    const [editingRow, setEditingRow] = useState("");
    const [singleUserDataState, setSingleUserDataState] = useState([])
    // const [updatedLeaveAndLate, setUpdatedLeaveAndLate] = useState({})
    const [form] = Form.useForm();

    // --------------------------------------
    const filterSalaryDataFun = (id) => {
        const singleUserData = empSalaryData?.filter((val) => val.id === id)
        setSingleUserDataState(singleUserData)
    }


    const onChange = (date, dateString) => {
        setGetSalaryMonth(dayjs(date).format("MM"));
        setGetSalaryYear(dayjs(date).format("YYYY"));
        // let selectMonth = parseInt(dayjs(date).format('MM') - 1);
        // let numOfDaysInMonth = dayjs().month(selectMonth).daysInMonth()
        // setNumberOfDaysInMonth(numOfDaysInMonth)
    };



    // -----------------salary generate Api call fun-------------------
    const generateSalaryFun = () => {
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
                .post("/salary-generate", req)
                .then((response) => {
                    // console.log(response)
                    setTimeout(() => {
                        setEmpSalaryData(response.data)
                        // console.log(response.data.salaries)
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

    // ---------------------table structure----------------------
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
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="late"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter late day",
                                },
                            ]}
                        >
                            <Input style={{ width: "50px", height: '35px' }} />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: "Leave-Days",
            dataIndex: "leaves",
            key: "leaves",
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="leaves"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter late day",
                                },
                            ]}
                        >
                            <Input style={{ width: "50px", height: '35px' }} />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
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
        {
            title: "Actions",
            render: (_, record) => {
                // console.log(record)
                return (
                    <div style={{ display: "flex" }}>
                        <Button
                            size="small"
                            onClick={() => {
                                filterSalaryDataFun(record.id)
                                setEditingRow(record.id);
                                form.setFieldsValue({
                                    late: record.late,
                                    leaves: record.leaves,
                                });
                            }}
                            style={{ marginRight: '5px' }}
                        >
                            Edit
                        </Button>
                        <Button htmlType="submit" size="small">
                            Save
                        </Button>
                    </div>
                );
            },
        },
    ];

    const onFinish = (values) => {
        const req = {
            id: editingRow,
            month: singleUserDataState[0].month,
            year: singleUserDataState[0].year,
            label: selectPayRollDropDown,
            adjust_leaves: values.leaves,
            adjust_late: values.late,
            basic: singleUserDataState[0].basic,
            epf: singleUserDataState[0].epf,
            esic: singleUserDataState[0].esic,
            professional_tax: singleUserDataState[0].professional_tax,
            ctc_per_month: singleUserDataState[0].ctc_per_month
        };
        axiosInstance
            .post('/update-salary', req)
            .then((response) => {
                console.log(response)
                setEmpSalaryData(response.data.data);
                toast.success("Salary updated successfully.", {
                    duration: 3000,
                    position: 'bottom-center',
                    className: "facultyToast"
                });

            })
            .catch((err) => {
                console.log(err)
            });

    };

    // ------------------------------generate salary excel sheet-----------------------
    const generateSalaryExcelFun = async () => {
        if (getSalaryMonth === "" && selectPayRollDropDown === "Select office") {
            toast.error("Select month and office.", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else if (empSalaryData?.length === 0) {
            toast.error("Please filter data list.", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        }
        else {
            try {
                // Create a new workbook
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Sheet 1');

                // Set headers
                const headers = ["Name", "Month", "Year", "Label", "Working-Days", "Present-Days", "Leaves", "Adjust-Leaves", "Late", "Adjust-Late", "Epf", "Esic", "Professional-Tax", "Leave-Days-Deduction", "Late-Days-Deduction", "Net-Salary"];
                const headerRow = worksheet.getRow(1);
                worksheet.getRow(1).values = headers;
                headerRow.font = { bold: true };
                headerRow.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '0BA045' }, // Yellow background color
                };

                // Set data rows
                empSalaryData?.forEach((salaries, index) => {
                    const rowIndex = index + 2;
                    const { first_name, month, year, label, working_days, present_days, leaves, adjust_leaves, late, adjust_late, epf, esic, professional_tax, leave_days_deduction, late_days_deduction, net_salary } = salaries;
                    const values = [first_name, month, year, label, working_days, present_days, leaves, adjust_leaves, late, adjust_late, gross_salary, epf, esic, professional_tax, leave_days_deduction, late_days_deduction, net_salary];
                    const dataRow = worksheet.getRow(rowIndex).values = values;
                    dataRow.alignment = { vertical: 'middle', horizontal: 'center' }; // Center alignment
                });


                // Set column widths
                worksheet.columns.forEach((column) => {
                    column.width = 15; // Set column width to 15
                });

                // Set row heights
                worksheet.eachRow((row) => {
                    row.height = 20; // Set row height to 20
                });

                // Generate the Excel file
                const buffer = await workbook.xlsx.writeBuffer();

                // Create a Blob from the buffer
                const blob = new Blob([buffer], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });

                // Create a download link and click it
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'salaries.xlsx';
                link.click();

                // Cleanup
                URL.revokeObjectURL(url);

            } catch (error) {
                console.error('Error generating Excel file:', error);
            }
        }
        setEmpSalaryData([])
    }



    return (
        <>
            <div className='admin-home-container'>
                <div className='admin-emp-list-container-top-div'>
                    <Navbar />
                </div>
                <div className='admin-home-container-bottom-div'>
                    <div className='admin-home-div-left'>
                        < Sidebar />
                    </div>
                    {/* ------------------------------------------------------ */}
                    <div className='admin-home-div-right'>
                        <div className='payroll_container'>
                            <div className='payroll-back_btn_div'>
                                <span><AiOutlineLeft /></span>
                                <span>Dashboard Generate Salary Report</span>
                            </div>
                            <div className='payroll_heading_div'>
                                <span>GENERATE SALARY & LOP REPORT</span>
                                <span><BiPlusCircle /></span>
                            </div>
                            <div className='payroll_input_lopbtn_div'>
                                <div className='payroll_input_div'>
                                    {/* <label>SELECT MONTH</label> */}
                                    <DatePicker onChange={onChange} picker="month" style={{ height: "38px", paddingTop: "0px" }} />
                                </div>
                                <div className='payroll_drop_down'>
                                    <Select defaultValue="Select category" value={selectPayRollDropDown} onChange={(e) => setSelectPayRollDropDown(e)} style={{ width: "100%" }} >
                                        <Option value="HRMS">HRMS</Option>
                                        <Option value="TTMS">TTMS</Option>
                                        <Option value="GRATIA">GRATIA</Option>
                                    </Select>
                                </div>
                                <div className='payroll_lop_btn_div'>
                                    <button onClick={generateSalaryFun}>{loading === true ? <CircularProgress color="inherit" size={15} /> : "GENERATE SALARY"}</button>
                                </div>
                            </div>
                            <div className='employee_list_table_container'>
                                <h5>Employee Salary List</h5>
                                <div className='employee_list_table'>
                                    <Form form={form} onFinish={onFinish}>
                                        <Table columns={columns} dataSource={empSalaryData} pagination={false} className='salary_table'></Table>
                                    </Form>
                                </div>
                                <div className='download_salary_excel_div'>
                                    <button onClick={generateSalaryExcelFun}>Download Excel</button>
                                </div>

                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </>
    )
}

export default Payroll