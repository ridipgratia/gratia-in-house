import React, { useState } from 'react'
import "./EditEmployeeDetails.css"
import axiosInstance from '../../utils/axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { TbUserCircle } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

const EditEmployeeDetails = ({ serverUrl, empEditData, userEditPopUp, setUserEditPopUp, fetchAllData }) => {
    const [firstName, setFirstName] = useState(empEditData?.first_name)
    const [lastName, setLastName] = useState(empEditData?.last_name);
    const [dob, setDob] = useState(new Date(empEditData?.dob ? new Date(empEditData.dob) : new Date()));
    const [gender, setGender] = useState(empEditData?.gender)
    const [empid, setEmpid] = useState(empEditData?.emp_id)
    const [email, setEmail] = useState(empEditData?.email)
    const [office, setOffice] = useState(empEditData?.label)
    const [designation, setDesignation] = useState(empEditData?.designation)
    const [dateOfJoin, setDateOfJoin] = useState(new Date(empEditData?.date_of_joining ? new Date(empEditData.date_of_joining) : new Date()))
    const [phoneNo, setPhoneNo] = useState(empEditData?.contact_no)
    const [leave, setLeave] = useState(empEditData?.paid_leaves)
    const [permanentAdd, setPermanentAdd] = useState(empEditData?.perment_address)
    const [presentAdd, setPresentAdd] = useState(empEditData?.current_address)
    const [loading, setLoading] = useState(false)
    const [maxWidth] = useState('md');
    const profilePopUpClose = () => {
        setUserEditPopUp(false)
    }

    // ===========dob date change==========
    const handleDOBChange = (e) => {
        setDob(new Date(e.target.value));
    };

    // ==========date of joining change========
    const handleDOJChange = (e) => {
        setDateOfJoin(new Date(e.target.value));
    };
    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }
    const handleOfficeChange = (e) => {
        setOffice(e.target.value)
    }

    // ============Edit api calling===========
    const editUserDetailsAPIFun = async () => {
        setLoading(true);
        try {
            const req = {
                request_id: empEditData?.id,
                first_name: firstName,
                last_name: lastName,
                dob: dob,
                gender: gender,
                emp_id: empid,
                designation: designation,
                label: office,
                date_of_joining: dateOfJoin,
                paid_leaves: leave,
                email: email,
                phoneNumber: phoneNo,
                presentAddress: presentAdd,
                permanentAddress: permanentAdd,
            };
            const response = await axiosInstance.post("/edit-user-details-submit", req)
            // console.log(response)
            if (response?.status == 200) {
                toast.success(response.data?.message);
                setLoading(false);
                setUserEditPopUp(false)
                fetchAllData()
            }
            if (response?.status == 400) {
                toast.error(response.data?.message);
                setLoading(false)
            }
        } catch (error) {
            // console.log("error", error)
            toast.error("Server error !");
            setLoading(false)
        }
    }
    return (
        <>
            <Dialog
                open={userEditPopUp}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogActions>
                    <button onClick={profilePopUpClose} className='emp_details_popup_close_btn'><MdClose /></button>
                </DialogActions>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span>
                            <span className='emp_profile_img_container'>
                                <span className='emp_profile_details_img'>
                                    {empEditData?.user_image === null ? <span className='emp_profile_details_icon'><FaRegUser /></span> : <img src={`${serverUrl}${empEditData?.user_image}`} alt="user_img" />}
                                </span>
                                <span className='edit_name_div'>{`${firstName} ${lastName}`}</span>
                            </span>
                            <span className='edit_heading'>Edit user details</span>
                            <span className='edit_profile_details_data_container'>
                                <span className='edit_input_container'>
                                    <span className='edit_input_div'>
                                        <label>First Name</label>
                                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </span>
                                    <span className='edit_input_div'>
                                        <label>Last Name</label>
                                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </span>
                                    <span className='edit_input_div'>
                                        <label>Date of birth</label>
                                        <input type="date" value={dob?.toISOString().split('T')[0]} onChange={handleDOBChange} />
                                    </span>
                                    <span className='edit_input_div'>
                                        <label>Gender</label>
                                        <select
                                            name="selectGender"
                                            value={gender}
                                            onChange={handleGenderChange}
                                        >
                                            <option value="" disabled>Select an option</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </span>
                                    <span className='edit_input_div'>
                                        <label>Employee ID</label>
                                        <input type="text" value={empid} onChange={(e) => setEmpid(e.target.value)} />
                                    </span>
                                    <span className='edit_input_div'>
                                        <label>Email</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </span>
                                    <span className='edit_input_div'>
                                        <label>Office</label>
                                        <select
                                            value={office}
                                            onChange={handleOfficeChange}
                                        >
                                            <option value="">Select an option</option>
                                            <option value="GTPL">GTPL</option>
                                            <option value="TSCS">TSCS</option>
                                            <option value="TTMS">TTMS</option>
                                            <option value="THS">THS</option>
                                            <option value="HRMS">HRMS</option>
                                        </select>
                                    </span>
                                    <span className='edit_input_div'>
                                        <label>Designation</label>
                                        <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                                    </span>
                                    <span className='edit_input_div'>
                                        <label>Date of joining</label>
                                        <input type="date" value={dateOfJoin?.toISOString().split('T')[0]} onChange={handleDOJChange} />
                                    </span>
                                    <span className='edit_input_div'>
                                        <label>Phone No.</label>
                                        <input type="text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                                    </span>
                                    <span className='edit_input_div'>
                                        <label>Total Leave</label>
                                        <input type="text" value={leave} onChange={(e) => setLeave(e.target.value)} />
                                    </span>
                                </span>
                                <span className='edit_adress_div'>
                                    <span className='permanent_input_div'>
                                        <label>Permanent Address</label>
                                        <textarea type="text" rows="4" value={permanentAdd} onChange={(e) => setPermanentAdd(e.target.value)} />
                                    </span>
                                    <span className='permanent_input_div'>
                                        <label>Present Address</label>
                                        <textarea type="text" rows="4" value={presentAdd} onChange={(e) => setPresentAdd(e.target.value)} />
                                    </span>
                                </span>
                                <span className='edit_button_div'>
                                    <Button onClick={editUserDetailsAPIFun} variant="contained" size="medium" style={{ width: '120px', height: '40px' }}>{loading === true ? <CircularProgress color="inherit" size={15} /> : "Submit"}</Button>
                                </span>
                            </span>
                        </span>
                    </DialogContentText>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default EditEmployeeDetails