import React, { useState } from 'react'
import "./OutOfRangePopUp.css"

import { MdOutlineCancel } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { GoLocation } from "react-icons/go";


import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useAttend } from "../../context/attendance/attenContext"


const OutOfRangePopUp = ({ setOutRange }) => {

    const [open, setOpen] = useState(true);
    const { currTime, currDate, getDist } = useAttend()

    const handleClose = () => {
        setOpen(false);
        setOutRange(false)
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogActions>
                    <Button onClick={handleClose}><MdOutlineCancel size={28} /></Button>
                </DialogActions>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span className='home-popup-top-div'>
                            <span><span><MdLocationOn className='home-popup-icon' /></span><strong>{currDate}</strong></span>
                        </span>
                        <span className='home-popup-dist-div'>
                            <span><span><AiOutlineClockCircle size={25} /></span><span>{currTime}</span><span>Sign in</span></span>
                            <span><span><GoLocation size={25} /></span><span>{getDist} Mtrs</span><span>Distance</span></span>
                        </span>
                        <span className='second-popup-main-div'>
                            <span>Please punch attendance within 1000 meters.</span>
                        </span>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default OutOfRangePopUp;