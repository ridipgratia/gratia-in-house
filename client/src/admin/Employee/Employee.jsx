import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Employee.css";
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
// import EditEmployeeDetails from './EditEmployeeDetails';
// import SalaryStructureForm from './SalaryStructureForm';
import ShowProfileDetails from './ShowProfileDetails';
import toast, { Toaster } from 'react-hot-toast';
import { Empty } from 'antd';

import { BiPlus } from "react-icons/bi";
import { MdOutlineSearch, MdDelete } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { TbUserCircle } from "react-icons/tb";
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
    const navigate = useNavigate();
    const [getAllData, setGetAllData] = useState([])
    const [getDetails, setGetDetails] = useState()
    const [deleteUser, setSeleteUser] = useState(false)
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [userId, setUserId] = useState("")
    const [query, setQuery] = useState('');

    const [loadingData, setLoadingData] = useState(false);
    const [profilePopUp, setProfilePopUp] = useState(false)

    // const [userEditPopUp, setUserEditPopUp] = useState(false)
    const [empEditData, setEmpEditData] = useState({})
    // const [salaryDetailsForm, setSalaryDetailsForm] = useState(false)
    // const [userSalaryId, setUserSalaryId] = useState("")

    const { serverUrl } = useImage();

    // ------------------------salary form popup fun-------------------
    // const salaryFormPopupFun = (userId) => {
    //     setUserSalaryId(userId)
    //     setSalaryDetailsForm(true)
    // }

    // ------------------------employee details edit fun , get  emp Id-----------------
    const empDetailsEditFun = (id) => {
        localStorage.setItem("E_id", JSON.stringify(id))
        // const singleEmpData = getAllData.find((data) => data.id === id)
        // setEmpEditData(singleEmpData)
        navigate('/edit')
        // setUserEditPopUp(true)
    }
    // --------------------fetch all data--------------------------
    const fetchAllData = () => {
        // setLoadingData(true);
        axiosInstance
            .post("/all-employee")
            .then((response) => {
                // console.log(response)
                setTimeout(() => {
                    setGetAllData(response.data.users)
                    setLoadingData(false);
                }, 500);
            })
            .catch((err) => {
                toast.error(err, {
                    duration: 3000,
                    position: 'bottom-center',
                    className: "facultyToast"
                });
                setLoadingData(false);
            });
    }
    useEffect(() => {
        fetchAllData()
    }, [deleteUser, empEditData])

    // ------------refresh function--------------------
    const refreshFun = () => {
        fetchAllData()
        setQuery("")
    }

    // -----------------------------------get employee details fun--------------------------
    const getEmpDetails = (empId) => {
        const filterEmpDetails = getAllData.filter((val) => val.emp_id === empId)
        setGetDetails(filterEmpDetails)
        setProfilePopUp(true)
    }

    // ---------------------------delete user------------------------------
    const getUserId = (_id) => {
        setDeletePopUp(true)
        setUserId(_id)
    }
    const deleteRegisterUser = async () => {
        setDeletePopUp(false)
        // setLoadingData(true);
        const req = {
            id: userId
        }
        console.log(userId);
        const delete_data = await axiosInstance.post('/delete-user', req);
        console.log(delete_data.data);
        // axiosInstance
        //     .post("/delete-user", req)
        //     .then((response) => {
        //         setTimeout(() => {
        //             setSeleteUser(true)
        //             setLoadingData(false);
        //         }, 1000);
        //         toast.success("Successfully deleted !", {
        //             // duration: 3000,
        //             // position: 'bottom-center',
        //             // className: "facultyToast"
        //         });
        //     })
        //     .catch((err) => {
        //         toast.error(err, {
        //             duration: 3000,
        //             position: 'bottom-center',
        //             className: "facultyToast"
        //         });
        //     });
    }
    // ---------------------------------search function-------------------
    const searchUserFun = (qry) => {
        setLoadingData(true);
        let timerOut = setTimeout(() => {
            const searchUser = getAllData.filter((val) => (val.first_name.toLowerCase().match(qry.toLowerCase()) || val.emp_id.toLowerCase().match(qry.toLowerCase())))
            setGetAllData(searchUser)
            setLoadingData(false);
        }, 500)
        return () => clearTimeout(timerOut)
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
                                <input type="text" placeholder='Search Employee by ID or Name...' value={query} onChange={(e) => setQuery(e.target.value)} />
                                <span onClick={() => searchUserFun(query)}><MdOutlineSearch /></span>
                            </div>
                            <div className='emp_add_div'>
                                <button className='emp-list-ref-btn' onClick={() => refreshFun()}>Refresh</button>
                                <button onClick={() => navigate("/add-employee")}>Add<span><BiPlus /></span></button>
                            </div>
                        </div>
                        <div className='emp_list_container'>
                            <p className='total_reg_users_count'>Total Users : {getAllData.length}</p>
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
                                        getAllData.length > 0 ? getAllData.map((data, index) => (
                                            <div key={index} className="emp_list_data">
                                                <span className='admin_emp_full_name'>{data?.first_name} {data?.last_name}</span>
                                                <span className='emp_id_field'>{data?.emp_id}</span>
                                                <span className='table-desig'>{data?.designation}</span>
                                                <span>{data?.label}</span>
                                                <span className='dashboard_action_button table-action'>
                                                    <span onClick={() => empDetailsEditFun(data.id)}><AiFillEdit /></span>
                                                    <span onClick={() => getUserId(data.id)}><MdDelete /></span>
                                                    {/* <span><AiFillEdit /></span>
                                                    <span><MdDelete /></span> */}
                                                </span>
                                            </div>
                                        )) : <span className='no_data_div'>
                                            <Empty />
                                        </span>
                                    }
                                </div>
                            </div>

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
                                            <p>Are you sure want to delete it?</p>
                                            <span className='dash_yes_no_btn_div'>
                                                <Button variant="contained" color="error" size="small" sx={{ ml: 1 }} onClick={() => setDeletePopUp(false)}>NO</Button>
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