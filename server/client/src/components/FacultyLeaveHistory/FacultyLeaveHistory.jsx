import React from 'react'
import "./FacultyLeaveHistory.css";

const FacultyLeaveHistory = () => {
    return (
        <div className='faculty_apply_leave_history_data_container'>
            <div className='faculty_apply_leave_history_data_table'>
                <div className='faculty_apply-leave-history-list-head'>
                    <span>Subjects</span>
                    <span>Leave Type</span>
                    <span>Leave For</span>
                    <span>Reason Of leave</span>
                    <span style={{ color: "green" }}>Start Date</span>
                    <span style={{ color: "red" }}>End Date</span>
                </div>
                <div className='faculty_apply_leave_history-list-data'>
                    <span>Science</span>
                    <span>Other</span>
                    <span>Other</span>
                    <span>Other</span>
                    <span>01/04/2023</span>
                    <span>01/04/2023</span>
                </div>
            </div>
            <div className='faculty_apply_leave_history_approved_box'>
                <p>Your leave request has been approved</p>
                <p>Approved</p>
            </div>
        </div>
    )
}

export default FacultyLeaveHistory