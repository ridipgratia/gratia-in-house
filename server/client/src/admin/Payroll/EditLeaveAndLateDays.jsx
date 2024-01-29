import React from 'react'
import "./EditLeaveAndLateDays.css"
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from "../../utils/axios.js";
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useState } from 'react';

const EditLeaveAndLateDays = ({ editLateLeavePopUp, setEditLateLeavePopUp, singleUserVal, numberOfDaysInMonth, setFilterEmpListData, getSalaryYear, getSalaryMonth }) => {
    // console.log(singleUserVal[0])
    const [loading, setLoading] = useState(false)
    const [empBasicSalary, setEmpBasicSalary] = useState(singleUserVal[0].basic)
    const [empLateDays, setEmpLateDays] = useState(singleUserVal[0].late)
    const [empLeavesDays, setEmpLeavesDays] = useState(singleUserVal[0].leaves)

    const editLateLeaveClose = () => {
        setEditLateLeavePopUp(false)
    }
    const totalDeduct = (singleUserVal[0].deductions.epf + singleUserVal[0].deductions.esic + singleUserVal[0].deductions.professional_tax)
    const afterTotalDeduct = singleUserVal[0].gross_salary - totalDeduct;


    // ------------------------save late and edit function------------------------
    const saveLateAndLeavesDataFun = () => {
        let afterAllDeduction = 0;
        let oneDaySalary = Math.round(Number(empBasicSalary) / Number(numberOfDaysInMonth))
        let lateDays = Math.floor(Number(empLateDays) / 3)
        let lateDeduction = (lateDays * oneDaySalary)
        let afterLateDeduction = (empBasicSalary - lateDeduction)
        // ------------------leave deduction-------------
        let leaveDayDeduction = 0;
        if (empLeavesDays > 1) {
            leaveDayDeduction = (empLeavesDays - 1) * oneDaySalary;
            afterAllDeduction = (afterLateDeduction - leaveDayDeduction)
        } else {
            afterAllDeduction = afterLateDeduction;
        }
        const totalNetSalary = afterTotalDeduct - lateDeduction - leaveDayDeduction;
        // console.log(totalNetSalary);

        return [lateDeduction, leaveDayDeduction, afterAllDeduction, totalNetSalary];
    }

    const handleSalaryDeduction = () => {
        const newArr = saveLateAndLeavesDataFun()
        const [lateDeductionSal, leaveDeductionSal, basicSal, netSalry] = newArr;

        const req = {
            user_id: singleUserVal[0].user_id,
            first_name: singleUserVal[0].first_name,
            last_name: singleUserVal[0].last_name,
            email: singleUserVal[0].email,
            emp_id: singleUserVal[0].emp_id,
            working_days: numberOfDaysInMonth,
            present_days: singleUserVal[0].present_days,
            month: getSalaryMonth,
            year: getSalaryYear,
            leaves: empLeavesDays,
            late: empLateDays,
            gross_salary: singleUserVal[0].gross_salary,
            epf: singleUserVal[0].deductions.epf,
            esic: singleUserVal[0].deductions.esic,
            professional_tax: singleUserVal[0].deductions.professional_tax,
            late_days_deduction: lateDeductionSal,
            leave_days_deduction: leaveDeductionSal,
            total_deductions: (leaveDeductionSal + lateDeductionSal),
            net_salary: netSalry,
        };
        axiosInstance
            .post("/save-salaries", req)
            .then((response) => {
                // console.log(response)
                setTimeout(() => {
                    setLoading(false);
                }, "1500");
                setEditLateLeavePopUp(false)
            })
            .catch((err) => {
                // console.log(err)
                setTimeout(() => {
                    toast.error(err, {
                        duration: 3000,
                        position: 'bottom-center',
                        className: "facultyToast"
                    });
                    setLoading(false)
                }, 1500)
                setEditLateLeavePopUp(false)

            });
    }

    return (
        <>
            <Dialog
                open={editLateLeavePopUp}
                onClose={editLateLeaveClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span className='edit_leave_late_days_container'>
                            <span className='edit_late_leave_days_input'>
                                <span className='label_cls'>Name</span>
                                <input type="text" value={singleUserVal[0]?.user_name} readOnly />
                            </span>
                            <span className='edit_late_leave_days_input'>
                                <span className='label_cls'>Employee ID</span>
                                <input type="text" value={singleUserVal[0]?.emp_id} readOnly />
                            </span>
                            <span className='edit_late_leave_days_input'>
                                <span className='label_cls'>Adjust late days</span>
                                <input type="number" value={empLateDays} onChange={(e) => setEmpLateDays(e.target.value)} />
                            </span>
                            <span className='edit_late_leave_days_input'>
                                <span className='label_cls'>Adjust leave days</span>
                                <input type="number" value={empLeavesDays} onChange={(e) => setEmpLeavesDays(e.target.value)} />
                            </span>
                            <span className='edit_late_leave_days_btn'>
                                <button onClick={() => handleSalaryDeduction()}>Save</button>
                            </span>
                        </span>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditLeaveAndLateDays