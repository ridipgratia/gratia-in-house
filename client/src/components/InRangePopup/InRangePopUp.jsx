import React, { useState } from 'react'
import "./InRangePopUp.css";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import axiosInstance from '../../utils/axios';
import { useAuth } from '../../context/auth/authContext';
import { useAttend } from '../../context/attendance/attenContext';
import { useLeave } from '../../context/leave/leaveContext'
import moment from 'moment';



const InRangePopUp = ({ setInRange, setCheckIn, handleUserCheckIn, officeName }) => {
    const [open, setOpen] = useState(true);
    const [lateMesg, setLateMesg] = useState("")

    const { userData } = useAuth();
    const { currTime, currDate, getDist, showMesgBox, updateAttendanceStatus, setUpdateAttendanceStatus } = useAttend()
    const { setUserAttendUpdatePerDay } = useLeave();


    const handleClose = () => {
        setOpen(false);
        setInRange(false);
    };




    // -------------faculty attendance check-in API-----------------
    const checkFacultyAttendance = () => {
        if (!showMesgBox) {
            const req = {
                user_id: userData.user_id,
                date: currDate,
                time: moment().format("LTS"),
                in_distance: getDist,
                out_distance: null,
                location: "Guwahati",
                msg: "",
                status: "on time",
                in_office: officeName,
                out_office: null
            };
            axiosInstance
                .post("/add-attendance", req)
                .then((response) => {
                    const { data } = response
                    setCheckIn(data)
                    handleUserCheckIn()
                    setUpdateAttendanceStatus(true)
                    setUserAttendUpdatePerDay(true)
                })
                .catch((err) => {
                    console.error(err);

                });

        } else {
            const req = {
                user_id: userData.user_id,
                date: currDate,
                time: moment().format("LTS"),
                in_distance: getDist,
                out_distance: null,
                location: "Guwahati",
                msg: lateMesg,
                status: "late",
                in_office: officeName,
                out_office: null,
            };
            axiosInstance
                .post("/add-attendance", req)
                .then((response) => {
                    const { data } = response
                    setCheckIn(data)
                    handleUserCheckIn()
                    setUpdateAttendanceStatus(true)
                    setUserAttendUpdatePerDay(true)
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }


    return (
        <>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <span className='faculty_login_attendance_popup_date'><MdLocationOn className='home-popup-icon' /><strong>{currDate}</strong></span>
                            {/* <span className='faculty_login_attendance_popup_address'>Juripar Bus Stop- Lokhra, Jalukbari,<br /> Asssam 434234, India</span> */}
                            <span className='faculty_login_attendance_popup_current_time_distance'>
                                <span className='faculty_login_attendance_popup_current_time'><span><AiOutlineClockCircle size={25} /></span><span>{currTime}</span><span>sign In</span></span>
                                <span className='faculty_login_attendance_popup_current_time'><span><GoLocation size={25} /></span><span>{getDist} Mtrs</span><span>Distance</span></span>
                            </span>

                            {showMesgBox &&
                                <span className='faculty_login_attendance_late_mesg_div'>
                                    <span>reason for Late :</span>
                                    <textarea id="w3review" name="lateMessage" rows="5" cols="30" onChange={(e) => setLateMesg(e.target.value)} required></textarea>
                                </span>}
                            <span className='InRange-message-span'>You are in range of {getDist} meters</span>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <span style={{ display: 'block', margin: '0px auto' }}>
                            <Button
                                onClick={() => { handleClose(); checkFacultyAttendance() }}
                                className={showMesgBox && lateMesg.trim().length <= 5 ? "disableClass" : "ableClass"}
                                variant="contained"
                                size="small"
                                autoFocus>
                                Confirm
                            </Button>
                        </span>

                    </DialogActions>
                </Dialog>

            </div>

        </>
    )
}

export default InRangePopUp