import React, { useState } from 'react'
import "./ShowProfileDetails.css"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { TbUserCircle } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

const ShowProfileDetails = ({ profileDetailsPopUp, setProfileDetailsPopUp, getDetails, serverUrl }) => {
    const [maxWidth] = useState('md');
    const profilePopUpClose = () => {
        setProfileDetailsPopUp(false)
    }

    return (
        <>
            <Dialog
                open={profileDetailsPopUp}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogActions>
                    <button onClick={profilePopUpClose} className='emp_details_popup_close_btn'><MdClose /></button>
                </DialogActions>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span className='emp_profile_details_container'>
                            <span className='emp_profile_img_container'>
                                <span className='emp_profile_details_img'>
                                    {getDetails?.user_image === null ? <span className='emp_profile_details_icon'><FaRegUser /></span> : <img src={`${serverUrl}${getDetails?.user_image}`} alt="user_img" />}
                                </span>
                                <span className='emp_profile_details_name'>{getDetails?.first_name} {getDetails?.last_name}</span>
                            </span>
                            <span className='emp_profile_details_data_container'>
                                <span className='emp_profile_details_data_show'>
                                    <span>Emp ID : </span>
                                    <span>{getDetails?.emp_id}</span>
                                </span>
                                <span className='emp_profile_details_data_show'>
                                    <span>Designation : </span>
                                    <span>{getDetails?.designation}</span>
                                </span>
                                <span className='emp_profile_details_data_show'>
                                    <span>Date of Joining : </span>
                                    <span>{getDetails?.date_of_joining}</span>
                                </span>
                                <span className='emp_profile_details_data_show'>
                                    <span>Office : </span>
                                    <span>{getDetails?.label}</span>
                                </span>
                                <span className='emp_profile_details_data_show'>
                                    <span>Date of Birth : </span>
                                    <span>{getDetails?.dob}</span>
                                </span>
                                <span className='emp_profile_details_data_show'>
                                    <span>Gender : </span>
                                    <span>{getDetails?.gender}</span>
                                </span>
                                <span className='emp_profile_details_data_show'>
                                    <span>Email : </span>
                                    <span>{getDetails?.email}</span>
                                </span>
                                <span className='emp_profile_details_data_show'>
                                    <span>Phone No. : </span>
                                    <span>{getDetails?.contact_no}</span>
                                </span>
                                <span className='emp_profile_details_data_show'>
                                    <span>Total Leave : </span>
                                    <span>{getDetails?.paid_leaves}</span>
                                </span>
                                <span className='emp_profile_details_data_show'>
                                    <span>Status : </span>
                                    <span style={{ color: 'green' }}>{getDetails?.status}</span>
                                </span>
                                <span className='emp_profile_details_data_show'>
                                    <span>Present Address : </span>
                                    <span>{getDetails?.current_address}</span>
                                </span>
                                <span className='emp_profile_details_data_show'>
                                    <span>Permanent Address : </span>
                                    <span>{getDetails?.perment_address}</span>
                                </span>
                            </span>
                        </span>
                    </DialogContentText>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default ShowProfileDetails