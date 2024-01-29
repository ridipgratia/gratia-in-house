import React from 'react'
import './Clean.css'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

import { AiOutlineFileExcel } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";

const Clean = () => {
    const navigate = useNavigate()
    return (
        <div className='admin-emp-list-container'>
            <div className='admin-emp-list-container-top-div'>
                <Navbar />
            </div>
            <div className='admin-emp-list-container-bottom-div'>
                <div className='admin-emp-list-div-left'>
                    <Sidebar />
                </div>

                {/* ------------------------------------------------------ */}
                <div className='admin-emp-list-div-right'>
                    <div className='home-detail-container'>
                        <div className='dashboard_home_page'>
                            <div className='dashboard_home_card_1' onClick={() => navigate("/delete-attendance")}>
                                <div className='clean_box_card'>
                                    <div className='clean_box_div'>
                                        <span style={{ backgroundColor: '#B8E1FF' }}><AiOutlineFileExcel /></span>
                                        <p><span>Attendance</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='dashboard_home_card_2' onClick={() => navigate("/delete-activity")}>
                                <div className='clean_box_card'>
                                    <div className='clean_box_div'>
                                        <span style={{ backgroundColor: '#FFDEAD' }}><BiMessageDetail /></span>
                                        <p><span>Activity</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
            {/* <Toaster /> */}
        </div >
    )
}

export default Clean