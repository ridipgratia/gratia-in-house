import React, { useEffect } from 'react'
import "./FProfile.css"
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/auth/authContext"
import { useAttend } from '../../context/attendance/attenContext';
import { FaEdit } from "react-icons/fa";
import axiosInstance from "../../utils/axios"
import { useNavigate } from 'react-router-dom'

import { useImage } from "../../context/imgContext/imageContext"


const FProfile = () => {
    const { userData } = useAuth();
    // console.log(userData)
    const navigate = useNavigate();

    const { uploadProfileImg, setUploadProfileImg } = useAttend();
    const { serverUrl } = useImage();

    useEffect(() => {
        const req = {
            emp_id: userData.emp_id,
        };
        axiosInstance.post("/get-profile-url", req)
            .then((response) => {
                setUploadProfileImg(response.data.data.user_image)
            })
            .catch((err) => {
                console.log(err)
            });

    }, [uploadProfileImg])




    return (
        <>
            <div className='faculty-history-container'>
                <div className='faculty-history-topbar'>
                    <Navbar />
                </div>
                <div className='faculty-history-container-child'>
                    <div className='faculty-history-sidebar'>
                        <Sidebar />
                    </div>

                    {/* //dashboard */}
                    <div className='faculty-history-right-div'>
                        <div className='faculty_profile_details_container'>
                            <div className='faculty_profile_details'>
                                <div className='faculty_profile_all_details_container'>
                                    <div className='faculty_profile_image_div'>
                                        {uploadProfileImg === null ? <span><FaUserCircle /></span> : <img src={`${serverUrl}${uploadProfileImg}`} alt="user_img" />}
                                    </div>
                                    <div className='edit_btn_div'>
                                        <span onClick={() => navigate("/profile/edit")}><FaEdit /></span>
                                    </div>

                                    <div className='faculty_profile_personal_details_div'>
                                        <p><span>Emp ID : </span><span>{userData?.emp_id}</span></p>
                                        <p><span>Name : </span><span style={{ textTransform: "capitalize" }}>{userData?.first_name} {userData?.last_name}</span></p>
                                        <p><span>DOB : </span><span>{userData?.dob}</span></p>
                                        <p><span>Gender : </span><span style={{ textTransform: 'capitalize' }}>{userData?.gender}</span></p>
                                        <p><span>Phone : </span><span>{userData?.phone_no}</span></p>
                                        <p><span>Date of joining : </span><span>{userData?.date_of_joining}</span></p>
                                        <p ><span>Designation : </span><span style={{ textTransform: 'capitalize' }}>{userData?.designation}</span></p>
                                        <p><span>Office : </span><span>{userData?.office}</span></p>
                                        <p><span>Email : </span><span>{userData?.email}</span></p>
                                        <p><span>Status : </span><span style={{ color: '#4FCE5D' }}>{userData?.status}</span></p>
                                        {userData.guardian_name && <p><span>Guardian Name : </span><span>{userData.guardian_name}</span></p>}
                                        {userData.religion && <p><span>Religion : </span><span>{userData.religion}</span></p>}
                                        {userData.address && <p><span>Address : </span><span>{userData.address}</span></p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>

    )
}

export default FProfile