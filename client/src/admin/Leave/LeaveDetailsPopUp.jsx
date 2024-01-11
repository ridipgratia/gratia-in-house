import React, { useState } from 'react'
import "./LeaveDetailsPopUp.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { TbUserCircle } from "react-icons/tb";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const LeaveDetailsPopUp = ({ showUserLeaveDetailsPopUp,
    setShowUserLeaveDetailsPopUp,
    filterUserLeaveDetailsState,
    serverUrl, leaveDateCountDiff,
    handleDownload,
    adminRejectedUserLeaveFun,
    setLeaveRejectedMesg,
    adminApprovedUserLeaveFun }) => {

    const [rejectLeaveMesgUpPop, setRejectLeaveMesgUpPop] = useState(false)
    const [Uid, setUid] = useState("")
    const [Lid, setLid] = useState("")

    const closeLeaveDetailsPopUp = () => {
        setShowUserLeaveDetailsPopUp(false)
    }

    // ---------------------reject leave with message---------------
    const leaveRejectedWithMesgFun = (u_id, l_id) => {
        setUid(u_id)
        setLid(l_id)
        setRejectLeaveMesgUpPop(true)
    }

    const closeLeaveRejectMesgPopUp = () => {
        setRejectLeaveMesgUpPop(false)
    }

    // -------------------leave rejected submit--------------------
    const LeaveRejectSubmitFun = () => {
        adminRejectedUserLeaveFun(Uid, Lid)
        setRejectLeaveMesgUpPop(false)
        closeLeaveDetailsPopUp()
    }

    return (
        <>
            <Dialog
                open={showUserLeaveDetailsPopUp}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <span className='show_emp_leave_details_container'>
                            {
                                filterUserLeaveDetailsState.map((val, index) => (
                                    <span className='show_emp_leave_details_div' key={index}>
                                        <span className='show_emp_leave_details_img'>
                                            {val.user_image === null ? <span className='show_emp_details_icon'><TbUserCircle /></span> : <img src={`${serverUrl}${val?.user_image}`} alt="img" />}
                                        </span>
                                        <span className='show_emp_leave_details_name'>{val.first_name} {val.last_name}</span>
                                        <span className='show_emp_leave_details_data_div'>
                                            <span className='show_emp_leave_details_data'>
                                                <span className='show_emp_leave_details'>
                                                    <span>Emp ID : </span><span>{val.emp_id}</span>
                                                </span>
                                                <span className='show_emp_leave_details'>
                                                    <span>Role : </span><span>{val.designation}</span>
                                                </span>
                                                <span className='show_emp_leave_details'>
                                                    <span>Leave For : </span><span>{val.is_half_day === 1 ? 'Half Day' : 'Full day'}</span>
                                                </span>
                                                <span className='show_emp_leave_details'>
                                                    <span>Leave Type : </span><span>{val.leave_type}</span>
                                                </span>
                                                <span className='show_emp_leave_details'>
                                                    <span>From : </span><span>{val.start_date}</span>
                                                </span>
                                                {
                                                    val.is_half_day === 0 && <span className='show_emp_leave_details'><span>To : </span><span>{val.end_date}</span></span>
                                                }
                                                {
                                                    val?.is_half_day === 0 && <span className='show_emp_leave_details'><span>Duration : </span><span>{leaveDateCountDiff} Days</span></span>
                                                }
                                                <span className='show_emp_leave_details'>
                                                    <span>Status : </span><span>{val.status}</span>
                                                </span>
                                                {
                                                    val.leave_type === 'Medical' &&

                                                    <span className='show_emp_leave_details'>
                                                        <span>Medical Report : </span>
                                                        <span>
                                                            <button className="buttonDownload" onClick={handleDownload}>Download</button>
                                                        </span>
                                                    </span>
                                                }
                                            </span>
                                            <span className='admin_user_leave_details_reason_mesg'>
                                                <span>Reason :</span>
                                                <span>
                                                    {val.reason}
                                                </span>
                                            </span>
                                            <span className='admin_user_leave_details_reject_accept_btn_div'>
                                                <span className={val.status === 'Awaiting' ? 'admin_user_leave_details_reject_accept_btn' : 'admin_accept_reject_btn'}>
                                                    {val.status === 'Awaiting' &&
                                                        <>
                                                            {/* <button onClick={() => adminRejectedUserLeaveFun(val.user_id, val.id)}>Reject</button> */}
                                                            <button onClick={() => leaveRejectedWithMesgFun(val.user_id, val.id)}>Reject</button>
                                                            <button onClick={() => adminApprovedUserLeaveFun(val.user_id, val.id)}>Accept</button>
                                                        </>
                                                    }
                                                    {val.status === 'Approved' && <button className='admin_leave_approved_btn'>Approved</button>}
                                                    {val.status === 'cancelled' && <button className='admin_leave_rejected_btn'>Rejected</button>}
                                                </span>
                                            </span>
                                        </span>
                                    </span>
                                ))
                            }
                        </span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <span style={{ margin: '0px auto' }}>
                        <Button onClick={closeLeaveDetailsPopUp} variant="contained" size="small" className='mr-2'>Close</Button>
                    </span>
                </DialogActions>
            </Dialog>
            {
                rejectLeaveMesgUpPop && <Dialog
                    open={rejectLeaveMesgUpPop}
                    // TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <span className='leave_reject_textarea'>
                                <textarea autoFocus placeholder='Give reason message for leave rejection...' rows='4' cols="50" onChange={(e) => setLeaveRejectedMesg(e.target.value)}>
                                </textarea>
                            </span>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <span style={{ width: '100%', margin: '10px 13px', display: 'flex', justifyContent: 'space-between' }}>
                            <Button onClick={closeLeaveRejectMesgPopUp} variant="contained" color="error" size="small" className='ml-2'>Close</Button>
                            <Button variant="contained" size="small" className='mr-2' onClick={LeaveRejectSubmitFun}>submit</Button>
                        </span>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}

export default LeaveDetailsPopUp