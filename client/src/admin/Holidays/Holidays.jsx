import React, { useState, useEffect } from 'react'
import "./Holidays.css"
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import axiosInstance from '../../utils/axios';
import MoonLoader from "react-spinners/ClipLoader";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { BiPlus } from "react-icons/bi";


import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const Holidays = () => {
    const [getAllHolidays, setGetAllholidays] = useState([])
    const [loadingData, setLoadingData] = useState(false)
    const [deleteHolidays, setDeleteholidays] = useState(false)
    const [deleteHolidaysId, setDeleteHolidaysId] = useState("")

    const [createHoliday, setCreateHoliday] = useState(false)
    const [createHolidayName, setCreateHolidayName] = useState("")
    const [createHolidayDay, setCreateHolidayDay] = useState("")
    const [createHolidayDate, setCreateHolidayDate] = useState("")

    const [editHolidayPopUp, setEditHolidayPopUp] = useState(false)
    const [selectHolidayName, setSelectHolidayName] = useState("")
    const [selectHolidayDay, setSelectHolidayDay] = useState("")
    const [selectHolidayDate, setSelectHolidayDate] = useState("")
    const [getUpdateId, setGetUpdateId] = useState("")
    // const [holidaySelectData, setHolidaySelectData] = useState([])

    // -------------------get all holidays data fun----------------------
    const getAllHolidaysFun = () => {
        setLoadingData(true)
        axiosInstance
            .get("/all-holidays")
            .then((response) => {
                // console.log(response)
                setTimeout(() => {
                    setGetAllholidays(response.data)
                    setLoadingData(false);
                }, 500);
            })
            .catch((err) => {
                console.log(err)
            });
    }
    useEffect(() => {
        getAllHolidaysFun()
    }, [])
    // -------------------delete holidays data frun--------------------
    const getDeleteId = (id) => {
        setDeleteHolidaysId(id)
        setDeleteholidays(true)
    }
    const deleteHolidaysDataFun = (id) => {
        axiosInstance
            .post(`/delete-holiday/${id}`)
            .then((response) => {
                toast.success(response.data.msg, {
                    duration: 3000,
                    position: 'bottom-center',
                    className: "facultyToast"
                });
                setDeleteholidays(false)
                getAllHolidaysFun()
            })
            .catch((err) => {
                console.log(err)
            });
    }

    // --------------------------------holidays function------------------------
    const editHolidayFun = (id) => {
        setGetUpdateId(id)
        setEditHolidayPopUp(true)
        const selectHolidayData = getAllHolidays.filter((data) => data.id === id)
        for (let i in selectHolidayData) {
            setSelectHolidayName(selectHolidayData[i].name);
            setSelectHolidayDay(selectHolidayData[i].day);
            setSelectHolidayDate(selectHolidayData[i].date);
        }
        // setHolidaySelectData(selectHolidayData)
    }

    // ---------------------------updated holidays fun--------------------------
    const holidayUpdatedFun = (id) => {
        if (selectHolidayName === "") {
            toast.error("Holiday name is required!", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });
        } else if (selectHolidayDay === "") {
            toast.error("Week day is required !", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });

        } else if (selectHolidayDate === "") {
            toast.error("Date field is required !", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });
        } else {
            const req = {
                name: selectHolidayName,
                day: selectHolidayDay,
                date: selectHolidayDate,
            }
            axiosInstance
                .post(`/update-holiday/${id}`, req)
                .then((response) => {
                    toast.success("Successfully updated !", {
                        duration: 3000,
                        position: 'bottom-center',
                        className: "facultyToast"
                    });
                    setEditHolidayPopUp(false)
                    getAllHolidaysFun()

                })
                .catch((err) => {
                    console.log(err)
                });

        }
    }
    // ----------------------created new holidays fun----------------------
    const createdNewHolidayFun = () => {
        if (createHolidayName === "") {
            toast.error("Please provide a holiday name !", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });

        } else if (createHolidayDay === "") {
            toast.error("Please provide a week day !", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });

        } else if (createHolidayDate === "") {
            toast.error("Please provide a date", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });

        } else {
            const req = {
                name: createHolidayName,
                day: createHolidayDay,
                date: createHolidayDate,
            }
            axiosInstance
                .post('/create-holiday', req)
                .then((response) => {
                    toast.success("Successfully created !", {
                        duration: 3000,
                        position: 'bottom-center',
                        className: "facultyToast"
                    });
                    setCreateHoliday(false)
                    getAllHolidaysFun()
                    setCreateHolidayName("")
                    setSelectHolidayDay("")
                    setSelectHolidayDate("")

                })
                .catch((err) => {
                    console.log(err)
                });

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
                    <div className='admin-home-detail-container'>
                        <div className='holiday_container_div'>
                            <div className='holidays_add_btn_div'>
                                <h3>Holidays List of Year : {new Date().getFullYear()}</h3>
                                <button onClick={() => setCreateHoliday(true)}><BiPlus /></button>
                            </div>
                            <div className='admin_holidays_list_div'>
                                <div className='holiday_list_heading'>
                                    <span>Name</span>
                                    <span>Day</span>
                                    <span>Date</span>
                                    <span>Action</span>
                                </div>
                                <div className='admin_holidays_container'>
                                    {loadingData === true ?
                                        <div className='holiday_loader_loading'>
                                            <MoonLoader
                                                color='blue'
                                                size={70}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </div> : getAllHolidays.length > 0 ? getAllHolidays.map((data, index) => (
                                            <div className='admin_holidays_list_data' key={index}>
                                                <span style={{ textTransform: 'capitalize' }}>{data?.name}</span>
                                                <span style={{ textTransform: 'capitalize' }}>{data?.day}</span>
                                                <span>{data?.date}</span>
                                                <span className='holidays_edit_delete_btn_in_admin'><span onClick={() => editHolidayFun(data.id)}><AiOutlineEdit /></span><span onClick={() => getDeleteId(data.id)}><MdOutlineDeleteOutline /></span></span>
                                            </div>
                                        )) : <div className='no_data_div'>
                                            <p>No Data</p>
                                        </div>}
                                </div>

                                {/* ------------------delete holidays component------------- */}
                                <Dialog
                                    open={deleteHolidays}
                                    TransitionComponent={Transition}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            <span className='dash_delete_popup_div'>
                                                <span>Are you sure want to delete it?</span>
                                                <span className='dash_yes_no_btn_div'>
                                                    <Button variant="contained" color="error" size="small" sx={{ ml: 1 }} onClick={() => setDeleteholidays(false)}>NO</Button>
                                                    <Button variant="contained" size="small" sx={{ mr: 1 }} onClick={() => deleteHolidaysDataFun(deleteHolidaysId)}>YES</Button>
                                                </span>
                                            </span>
                                        </DialogContentText>
                                    </DialogContent>
                                </Dialog>
                                {/* ---------------------------- */}
                                {/* ------------------------holidays edit component----------------- */}
                                <Dialog
                                    open={editHolidayPopUp}
                                    TransitionComponent={Transition}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            <span className='holiday_data_edit_div'>
                                                <h4>Edit Holiday</h4>
                                                <span className='holiday_input_div'>
                                                    <input type="text" value={selectHolidayName} onChange={(e) => setSelectHolidayName(e.target.value)} />
                                                    <input type="text" value={selectHolidayDay} onChange={(e) => setSelectHolidayDay(e.target.value)} />
                                                    <input type="date" value={selectHolidayDate} onChange={(e) => setSelectHolidayDate(e.target.value)} />
                                                </span>
                                                <span className='holiday_edit_btn_div'>
                                                    <Button variant="contained" color="error" size="small" onClick={() => setEditHolidayPopUp(false)}>NO</Button>
                                                    <Button variant="contained" size="small" onClick={() => holidayUpdatedFun(getUpdateId)}>YES</Button>
                                                </span>
                                            </span>
                                        </DialogContentText>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
            {/* -------------------------------------create new holidays component------------------ */}
            <Dialog
                open={createHoliday}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span className='admin_holiday_create'>
                            <h4>Create New Holiday</h4>
                            <span className='create_input_div'>
                                <input type="text" placeholder="Holiday Name" value={createHolidayName} onChange={(e) => setCreateHolidayName(e.target.value)} />
                                <input type="text" placeholder="Day" value={createHolidayDay} onChange={(e) => setCreateHolidayDay(e.target.value)} />
                                <input type="date" value={createHolidayDate} onChange={(e) => setCreateHolidayDate(e.target.value)} />
                            </span>
                            <span className='create_holiday_data_btn'>
                                <Button variant="outlined" size="small" onClick={() => setCreateHoliday(false)}>NO</Button>
                                <Button variant="contained" size="small" onClick={() => createdNewHolidayFun()}>YES</Button>
                            </span>
                        </span>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default Holidays