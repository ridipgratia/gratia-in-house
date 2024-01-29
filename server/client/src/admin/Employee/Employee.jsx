import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Employee.css";
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import EditEmployeeDetails from './EditEmployeeDetails';
// import SalaryStructureForm from './SalaryStructureForm';
import ShowProfileDetails from './ShowProfileDetails';
import toast, { Toaster } from 'react-hot-toast';
import { Empty } from 'antd';

import { BiPlus } from "react-icons/bi";
import { MdOutlineSearch, MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import Button from '@mui/material/Button';
import axiosInstance from '../../utils/axios';
import MoonLoader from "react-spinners/ClipLoader";
import { useImage } from "../../context/imgContext/imageContext"
import { useStep } from '../../context/steps/stepsContext';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
// import Button from '@mui/material/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});




const Employee = () => {
    const { serverUrl } = useImage()
    const navigate = useNavigate();
    const [getAllData, setGetAllData] = useState([])
    const [getDetails, setGetDetails] = useState([])
    const [deleteUser, setSeleteUser] = useState(false)
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [userId, setUserId] = useState("")
    const [query, setQuery] = useState('');

    const [loadingData, setLoadingData] = useState(false);
    const [profileDetailsPopUp, setProfileDetailsPopUp] = useState(false)

    const [userEditPopUp, setUserEditPopUp] = useState(false)
    const [empEditData, setEmpEditData] = useState("")

    // --------------------fetch all data--------------------------
    const fetchAllData = () => {
        setLoadingData(true);
        axiosInstance
            .post("/all-employee")
            .then((response) => {
                if (response.data?.status === 200) {
                    setGetAllData(response?.data?.users)
                    setLoadingData(false);
                }
                if (response.data?.status === 400) {
                    toast.error("Something went wrong!")
                    setLoadingData(false);
                }
            })
            .catch((err) => {
                // console.log(err)
                setLoadingData(false);
                toast.error(err?.message);
            });
    }
    useEffect(() => {
        fetchAllData()
    }, [])

    // =============================Get Single users=======================
    const getSingleUserFun = async (id) => {
        try {
            const req = {
                emp_id: id
            }
            const response = await axiosInstance.post("/edit-user-details", req)
            if (response.data?.status === 200) {
                setEmpEditData(response.data?.employee_details)
                setUserEditPopUp(true)
            }
            if (response.data?.status === 400) {
                setUserEditPopUp(false)
                toast.error("Something went wrong!")
            }
        } catch (error) {
            setUserEditPopUp(false)
            toast.error("Server Error!")
        }
    }

    // ------------refresh function--------------------
    const refreshFun = () => {
        fetchAllData()
        setQuery("")
    }

    // -----------------------------------get employee details fun--------------------------
    const getEmpDetails = async (empID) => {
        try {
            const req = {
                emp_id: empID
            }
            const response = await axiosInstance.post("/view-user-data", req)
            if (response.data?.status === 200) {
                setGetDetails(response.data?.user)
                setProfileDetailsPopUp(true)
            }
            if (response.data?.status === 400) {
                toast.error(response.data?.message)
                setProfileDetailsPopUp(false)
            }
        } catch (error) {
            toast.error("Server Error!")
        }

    }

    // ---------------------------delete user------------------------------
    const getUserId = (_id) => {
        setDeletePopUp(true)
        setUserId(_id)
    }
    const deleteRegisterUser = () => {
        setDeletePopUp(false)
        setLoadingData(true);
        const req = {
            id: userId
        }
        axiosInstance
            .post("/delete-user", req)
            .then((response) => {
                if (response.data?.status === 200) {
                    setSeleteUser(true)
                    setLoadingData(false);
                    toast.success(response.data?.message);
                    fetchAllData()
                }
                if (response.data?.status === 400) {
                    setSeleteUser(true)
                    setLoadingData(false);
                    toast.success(response.data?.message);
                }
            })
            .catch((err) => {
                setLoadingData(false);
                toast.error(err);
            });
    }
    // ---------------------------------search function-------------------
    const searchUserFun = async () => {
        if (query.trim() === "") {
            return;
        } else {
            try {
                setLoadingData(true);
                const req = {
                    search_query: query
                }
                const response = await axiosInstance.post("/search-on-input", req)
                if (response.data?.status === 200) {
                    setGetAllData(response.data?.users)
                    setLoadingData(false);
                } else {
                    toast.error("Something went wrong!")
                    setLoadingData(false);
                }
            } catch (error) {
                setLoadingData(false);
                toast.error("Server error!")
            }
        }
    }


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
                    {/* <div className='admin-home-detail-container' style={{ border: '1px solid red' }}> */}
                    <div className='dashboard_emp_page_container'>
                        <div className='emp_search_container'>
                            <div className='emp_search_box'>
                                <input
                                    type="text"
                                    placeholder='Search Employee by ID or Name...'
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            searchUserFun();
                                        }
                                    }}
                                />
                                <span onClick={() => searchUserFun()}><MdOutlineSearch /></span>
                            </div>
                            <div className='emp_add_div'>
                                <button className='emp-list-ref-btn' onClick={() => refreshFun()}>Refresh</button>
                                <button onClick={() => navigate("/add-employee")}>Add<span><BiPlus /></span></button>
                            </div>
                        </div>
                        <div className='emp_list_container'>
                            <p className='total_reg_users_count'>Total Users : {getAllData?.length}</p>
                            <div className='emp_list_div'>
                                <div className='emp-list-head'>
                                    <span>Name</span>
                                    <span>Employee ID</span>
                                    <span>Designation</span>
                                    <span>Office</span>
                                    <span>Action</span>
                                </div>
                                <div className='user_list_container'>
                                    {loadingData === true ?
                                        <div className='holiday_loader_loading'>
                                            <MoonLoader
                                                color='blue'
                                                size={70}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </div> :
                                        getAllData?.length > 0 ? getAllData?.map((data, index) => (
                                            <div key={index} className="emp_list_data">
                                                <span className='admin_emp_full_name'>{`${data?.first_name} ${data?.last_name}`}</span>
                                                <span className='emp_id_field'>{data?.emp_id}</span>
                                                <span className='table-desig'>{data?.designation}</span>
                                                <span>{data?.label}</span>
                                                <span className='dashboard_action_button  table-action'>
                                                    <span onClick={() => getEmpDetails(data?.emp_id)}><IoEye /></span>
                                                    <span onClick={() => getSingleUserFun(data?.id)}><MdEdit /></span>
                                                    <span onClick={() => getUserId(data?.id)}><MdDelete /></span>
                                                </span>
                                            </div>
                                        )) : <div className='no_data_div'>
                                            <Empty />
                                        </div>
                                    }
                                </div>
                            </div>
                            {/* ------------------------------------user details pop up--------------------- */}
                            {
                                profileDetailsPopUp && <ShowProfileDetails serverUrl={serverUrl} profileDetailsPopUp={profileDetailsPopUp} setProfileDetailsPopUp={setProfileDetailsPopUp} getDetails={getDetails} />
                            }

                            {/* ===============Edit component==================== */}
                            {
                                userEditPopUp && <EditEmployeeDetails serverUrl={serverUrl} empEditData={empEditData} userEditPopUp={userEditPopUp} setUserEditPopUp={setUserEditPopUp} fetchAllData={fetchAllData} />
                            }
                            {/* -----------------------------------delete popup---------------------------- */}
                            <Dialog
                                open={deletePopUp}
                                TransitionComponent={Transition}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        <span className='dash_delete_popup_div'>
                                            <span>Are you sure want to delete it?</span>
                                            <span className='dash_yes_no_btn_div'>
                                                <Button variant="contained" color="error" size="medium" sx={{ ml: 1 }} onClick={() => setDeletePopUp(false)}>NO</Button>
                                                <Button variant="contained" size="small" sx={{ mr: 1 }} onClick={() => deleteRegisterUser()}>YES</Button>
                                            </span>
                                        </span>
                                    </DialogContentText>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div >
            </div >
            <Toaster />
        </div >
    )
}

export default Employee