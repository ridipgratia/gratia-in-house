import React, { useState } from 'react'
import "./AddEmployee.css"
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import FirstStep from './formSteps/FirstStep'
import { useNavigate } from 'react-router-dom';
import { BiChevronRight, BiChevronLeft } from "react-icons/bi"


const AddEmployee = () => {
    const navigate = useNavigate()

    return (
        <div className='admin-home-container'>
            <div className='admin-home-container-top-div'>
                <Navbar />
            </div>

            <div className='admin-home-container-bottom-div'>
                <div className='admin-home-div-left'>
                    <Sidebar />
                </div>

                {/* ------------------------------------------------------ */}
                <div className='admin-home-div-right'>
                    <div className='admin-home-detail-container'>
                        <div className='dashboard_add_emp_page'>
                            <div className='admin_add_emp_heading' style={{ paddingLeft: '10px' }}>
                                <span onClick={() => navigate("/home")}><BiChevronLeft /></span>
                                <span>Dashboard<span><BiChevronRight /></span> Add New Employee</span>
                            </div>
                            {/* -------------------------Frist Form Start Here ---------------------------- */}
                            <FirstStep />
                        </div>
                    </div >
                </div >
            </div >
        </div >
    )
}

export default AddEmployee
