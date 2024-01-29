import React, { useState } from 'react'
import EditLeaveAndLateDays from './EditLeaveAndLateDays'
import { BiEdit } from "react-icons/bi"

const FinalSalaryTable = ({ numberOfDaysInMonth, filterEmpListData, setFilterEmpListData, getSalaryYear, getSalaryMonth }) => {
    const [editLateLeavePopUp, setEditLateLeavePopUp] = useState(false)
    const [singleUserVal, setSingleUserVal] = useState([])

    const getEmpSalaryID = (id) => {
        const getSingleEmp = filterEmpListData.filter((val) => val?.user_id === id)
        setSingleUserVal(getSingleEmp)
        setEditLateLeavePopUp(true)
    }

    return (
        <div className='employee_list_table'>
            <div className="employee_list_table_heading">
                <span>SI. No</span>
                <span>Employee ID</span>
                <span>Name</span>
                <span>Designation</span>
                <span>Working Days</span>
                <span>Present</span>
                <span>Late Comming Days</span>
                <span>Leave</span>
                <span>Basic</span>
                <span>Gross Salary</span>
                <span>Epf</span>
                <span>Esic</span>
                <span>Professional Tax</span>
                <span>Late Days Deduction</span>
                <span>Leave Days Deduction</span>
                <span>Net Salary</span>
                <span>Edit</span>
            </div>
            <div className="employee_list_table_data">
                {filterEmpListData.map((val, index) => (
                    <div div className="employee_list_table_data_container" key={index} >
                        <span>{index + 1}</span>
                        <span>{val?.emp_id}</span>
                        <span>{val?.user_name}</span>
                        <span>{val?.designation}</span>
                        <span>{numberOfDaysInMonth}</span>
                        <span>{val?.present_days}</span>
                        <span >{val?.late}</span>
                        <span >{val?.leaves}</span>
                        <span>{val?.basic}</span>
                        <span>₹ {val?.gross_salary}</span>
                        <span>₹ {val.deductions?.epf}</span>
                        <span>₹ {val.deductions?.esic}</span>
                        <span>₹ {val.deductions?.professional_tax}</span>
                        <span>₹ {val.deductions?.late_days_deduction}</span>
                        <span>₹ {val.deductions?.leave_days_deduction}</span>
                        <span>₹ {val?.net_salary}</span>
                        <span className='leaves_and_late_edit_btn'>
                            <button onClick={() => getEmpSalaryID(val?.user_id)}>
                                <BiEdit />
                            </button>
                        </span>
                    </div>
                ))}
            </div>
            {editLateLeavePopUp &&
                <EditLeaveAndLateDays
                    editLateLeavePopUp={editLateLeavePopUp}
                    setEditLateLeavePopUp={setEditLateLeavePopUp}
                    singleUserVal={singleUserVal}
                    numberOfDaysInMonth={numberOfDaysInMonth}
                    filterEmpListData={filterEmpListData}
                    setFilterEmpListData={setFilterEmpListData}
                    getSalaryYear={getSalaryYear}
                    getSalaryMonth={getSalaryMonth}
                />}
        </div>
    )
}

export default FinalSalaryTable