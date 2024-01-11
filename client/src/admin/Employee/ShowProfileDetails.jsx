import React from 'react'
import "./ShowProfileDetails.css"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { TbUserCircle } from "react-icons/tb";

const ShowProfileDetails = ({ profilePopUp, setProfilePopUp, getDetails, serverUrl }) => {
    const profilePopUpClose = () => {
        setProfilePopUp(false)
    }
    return (
        <>
            <Dialog
                open={profilePopUp}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span className='emp_profile_details_container'>
                            {
                                getDetails.map((val, index) => (
                                    <>
                                        <span className='emp_profile_img_container'>
                                            <span className='emp_profile_details_img'>
                                                {val.user_image === null ? <span className='emp_profile_details_icon'><TbUserCircle /></span> : <img src={`${serverUrl}${val?.user_image}`} alt="user_img" />}
                                            </span>
                                            <span className='emp_profile_details_name'>{val.first_name} {val.last_name}</span>
                                        </span>
                                        <span className='emp_profile_details_data_container'>
                                            <span className='emp_profile_details_data_show'>
                                                <span>Emp ID : </span>
                                                <span>{val.emp_id}</span>
                                            </span>
                                            <span className='emp_profile_details_data_show'>
                                                <span>Designation : </span>
                                                <span>{val.designation}</span>
                                            </span>
                                            <span className='emp_profile_details_data_show'>
                                                <span>Date of Birth : </span>
                                                <span>{val.dob}</span>
                                            </span>
                                            <span className='emp_profile_details_data_show'>
                                                <span>Gender : </span>
                                                <span>{val.gender}</span>
                                            </span>
                                            <span className='emp_profile_details_data_show'>
                                                <span>Email : </span>
                                                <span>{val.email}</span>
                                            </span>
                                            <span className='emp_profile_details_data_show'>
                                                <span>Contact : </span>
                                                <span>{val.contact_no}</span>
                                            </span>
                                            <span className='emp_profile_details_data_show'>
                                                <span>Guardian Name : </span>
                                                <span>{val.guardian_name}</span>
                                            </span>
                                            <span className='emp_profile_details_data_show'>
                                                <span>Address : </span>
                                                <span>{val.address}</span>
                                            </span>
                                        </span>
                                        <span className='emp_profile_details_close_btn'>
                                            <Button onClick={profilePopUpClose} variant="contained">Close</Button>
                                        </span>
                                    </>
                                ))
                            }
                        </span>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ShowProfileDetails