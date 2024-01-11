import React, { useState, useEffect } from 'react'
import './LeaveForm.css'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Select } from 'antd';
import dayjs from 'dayjs';
import { FileUploader } from "react-drag-drop-files";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../../context/auth/authContext';
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment'
import axiosInstance from '../../utils/axios';
import { useNavigate } from "react-router-dom"
import { BiSolidChevronRight } from "react-icons/bi"
// -------------mui popup----------------
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

import { Switch } from 'antd';



const ApplyLeave = () => {
    const { Option } = Select;
    const [leaveForState, setLeaveForState] = useState("")
    const [leaveTypeState, setLeaveTypeState] = useState("")
    const [selectedDate1, setSelectedDate1] = useState(new Date());
    const [selectedDate2, setSelectedDate2] = useState(new Date());
    const [textMesg, setTextMesg] = useState("");
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null);
    const [holidays, setHolidays] = useState([])
    const [remainingLeave, setRemainingLeave] = useState(false)
    const [remainingLeaveDay, setRemainingLeaveDay] = useState("")
    // const [leaveDayDeduction, setLeaveDayDeduction] = useState("")

    // ----------------toggle button---------
    const [toggleBtn, setToggleBtn] = useState(false)
    const handleToggle = (checked) => {
        setToggleBtn(checked)
    };
    // -----------------------------------------
    const { userData } = useAuth()
    const navigate = useNavigate();

    // -----------------leave api calling fun---------------
    const currentDate = new Date().toISOString().substring(0, 10)
    // const currDateTime = moment().format("YYYY-MM-DD") + " " + moment().format("LTS");

    const leaveApiFun = (event) => {
        event.preventDefault()
        if (leaveForState === "") {
            toast.error('Leave for field is required !', {
                duration: 2000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else if (leaveTypeState === "") {
            toast.error('Leave type field is required !', {
                duration: 2000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        }
        // else if (selectedDate2.toISOString().substring(0, 10) < selectedDate1.toISOString().substring(0, 10)) {
        //     toast.error('Select valid date !', {
        //         duration: 2000,
        //         position: 'bottom-center',
        //         className: "facultyToast"
        //     });
        // } 
        else if (textMesg === "") {
            toast.error('Give your reason !', {
                duration: 2000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else if (leaveTypeState === "Medical" && file === null) {
            toast.error('Submit medical reports !', {
                duration: 2000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        } else {
            if (leaveForState === 1) {
                // ----------------------half day leave for casual and paid------------------------
                if (leaveTypeState === 'Casual') {
                    setLoading(true);
                    const req = {
                        userId: userData.user_id,
                        leaveType: leaveTypeState,
                        startDate: selectedDate1.toISOString().substring(0, 10),
                        endDate: null,
                        isHalfDay: leaveForState,
                        reason: textMesg,
                    };
                    axiosInstance
                        .post("/apply-leave", req)
                        .then((response) => {
                            if (response.data?.status === 200) {
                                toast.success("Leave applied successfully !", {
                                    className: "facultyToast"
                                });
                                setLoading(false)
                                setLeaveForState("")
                                setLeaveTypeState("")
                                setTextMesg("")
                                setFile(null)
                                setSelectedDate1(new Date())
                                setSelectedDate2(new Date())
                            }
                            if (response.data?.status === 400) {
                                toast.error("Something went wrong !", {
                                    className: "facultyToast"
                                });
                            }
                        })
                        .catch((err) => {
                            toast.error("Network Error", {
                                className: "facultyToast"
                            });
                            setLoading(false)
                        });
                }
                // -------------------half day leave for medical-------------------
                if (leaveTypeState === 'Medical') {
                    setLoading(true);
                    medicalReportUploadFun()
                    const req = {
                        userId: userData.user_id,
                        leaveType: leaveTypeState,
                        startDate: selectedDate1.toISOString().substring(0, 10),
                        endDate: null,
                        isHalfDay: leaveForState,
                        reason: textMesg,
                    };
                    axiosInstance
                        .post("/apply-leave", req)
                        .then((response) => {
                            console.log(response)
                            if (response.data?.status === 200) {
                                toast.success("Leave applied successfully !", {
                                    className: "facultyToast"
                                });
                                setLoading(false)
                                setLeaveForState("")
                                setLeaveTypeState("")
                                setTextMesg("")
                                setFile(null)
                                setSelectedDate1(new Date())
                                setSelectedDate2(new Date())
                            }
                            if (response.data?.status === 400) {
                                toast.error("Something went wrong !", {
                                    className: "facultyToast"
                                });
                            }
                        })
                        .catch((err) => {
                            toast.error("Network Error!", {
                                className: "facultyToast"
                            });
                            setLoading(false)
                        });

                }

            } else {
                if (leaveTypeState === 'Casual') {
                    setLoading(true);
                    const req = {
                        userId: userData.user_id,
                        leaveType: leaveTypeState,
                        startDate: selectedDate1.toISOString().substring(0, 10),
                        endDate: selectedDate2.toISOString().substring(0, 10),
                        isHalfDay: leaveForState,
                        reason: textMesg,
                    };

                    axiosInstance
                        .post("/apply-leave", req)
                        .then((response) => {
                            if (response.data?.status === 200) {
                                toast.success("Leave applied successfully !", {
                                    className: "facultyToast"
                                });
                                setLoading(false)
                                setLeaveForState("")
                                setLeaveTypeState("")
                                setTextMesg("")
                                setFile(null)
                                setSelectedDate1(new Date())
                                setSelectedDate2(new Date())
                            }
                            if (response.data?.status === 400) {
                                toast.error("Something went wrong !", {
                                    className: "facultyToast"
                                });
                                setLoading(false)
                            }

                        })
                        .catch((err) => {
                            toast.error("Network Error !", {
                                className: "facultyToast"
                            });
                            setLoading(false)
                        });
                }
                if (leaveTypeState === 'Medical') {
                    setLoading(true);
                    medicalReportUploadFun()
                    const req = {
                        userId: userData.user_id,
                        leaveType: leaveTypeState,
                        startDate: selectedDate1.toISOString().substring(0, 10),
                        endDate: selectedDate2.toISOString().substring(0, 10),
                        isHalfDay: leaveForState,
                        reason: textMesg,
                    };
                    axiosInstance
                        .post("/apply-leave", req)
                        .then((response) => {
                            if (response.data?.status === 200) {
                                toast.success("Leave applied successfully !", {
                                    className: "facultyToast"
                                });
                                setLoading(false)
                                setLeaveForState("")
                                setLeaveTypeState("")
                                setTextMesg("")
                                setFile(null)
                                setSelectedDate1(new Date())
                                setSelectedDate2(new Date())
                            }
                            if (response.data?.status === 400) {
                                toast.error("Something went wrong !", {
                                    className: "facultyToast"
                                });
                                setLoading(false)
                            }
                        })
                        .catch((err) => {
                            toast.error("Network Error !", {
                                className: "facultyToast"
                            });
                            setLoading(false)
                        });
                }
            }
        }
    }
    // -------------------------upload medical report fun--------------------------
    const medicalReportUploadFun = () => {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('user_id', userData.user_id);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        setLoading(true);
        axiosInstance.post("/upload-document", formData, config)
            .then((response) => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
            ).catch((error) => {
                setTimeout(() => {
                    toast.error(error.message, {
                        duration: 3000,
                        position: 'bottom-center',
                        className: "facultyToast"
                    });
                    setLoading(false)
                }, 1000)

            })
        // }
    }

    // ------------------------------------------------------------------------
    const fileTypes = ["JPG", "PNG", "JPEG"];
    const handleChange = (file) => {
        // console.log(file)
        setFile(file);
        if (file) {
            toast.success("Medical report successfully uploaded !", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        }
    };

    const medicalFileTypeErrorEun = (err) => {
        toast.error(`${err} , Please select image.`, {
            duration: 4000,
            position: 'top-center',
            className: "facultyToast"
        });
    }

    // Custom filter function to disable Sundays
    const filterSundaysFun1 = (date) => {
        // Get the day of the week (0: Sunday, 1: Monday, ...)
        const day = date.getDay();
        return day !== 0; // Return true to enable the date if it's not Sunday
    };
    const filterSundaysFun2 = (date) => {
        // Get the day of the week (0: Sunday, 1: Monday, ...)
        const day = date.getDay();
        return day !== 0; // Return true to enable the date if it's not Sunday
    };


    // -------------------holidays api call here--------------------
    useEffect(() => {
        axiosInstance.get('/all-holidays')
            .then(response => {
                const holidayDates = response.data.map(holiday => new Date(holiday.date));
                setHolidays(holidayDates);
            })
            .catch(error => {
                console.error('Error fetching holidays:', error);
            });
    }, [])

    useEffect(() => {
        setRemainingLeave(true)
    }, [])

    // --------------------trigger paid leave message function----------------
    // const startDate = dayjs(selectedDate1).format('YYYY-MM-DD');
    // const endDate = dayjs(selectedDate2).format('YYYY-MM-DD');


    // ----------------------------------------------------------------------------
    // ----------------------remaining leave days api call-----------------------
    const remainingLeaveDayFun = () => {
        const req = {
            user_id: userData.user_id,
        }
        axiosInstance.post('/paid-leave-balance', req)
            .then(response => {
                // console.log(response)
                setRemainingLeaveDay(response.data)
            })
            .catch(error => {
                console.error(err);
            });
    }

    useEffect(() => {
        remainingLeaveDayFun()
    }, [])

    // -----------------------------------------------------------------------




    return (
        <div className='faculty-history-container'>
            <div className='faculty-history-topbar'>
                <Navbar />
            </div>
            <div className='faculty-history-container-child'>
                <div className='faculty-history-sidebar'>
                    <Sidebar />
                </div>

                {/* --------------------------------------- */}
                <div className='faculty-history-right-div'>
                    <div className='faculty_monthly_summery'>
                        <div className='faculty_apply_leave_form_conatiner'>
                            {
                                remainingLeave &&
                                <div className='remaining_leave_show_div'>
                                    <p>Remaining paid leave</p>
                                    <span className='arrow_for_rem_leave'><BiSolidChevronRight /></span>
                                    <span>{remainingLeaveDay}</span>
                                </div>
                            }
                            <h5 className='faculty_apply_leave_form_heading'>New Leave</h5>
                            <form>
                                <div className='faculty_apply_leave_form_div'>
                                    <div>
                                        <label>LEAVE FOR</label>
                                        <Select defaultValue={leaveForState} value={leaveForState} onChange={(e) => setLeaveForState(e)}>
                                            <Option value={1}>Half Day</Option>
                                            <Option value={0}>Full Day</Option>
                                        </Select>
                                    </div>
                                    <div>
                                        <label>LEAVE TYPE</label>
                                        <Select defaultValue={leaveTypeState} value={leaveTypeState} onChange={(e) => setLeaveTypeState(e)}>
                                            <Option value="Casual">Casual</Option>
                                            <Option value="Medical">Medical</Option>
                                            {/* <Option value="Paid">Paid</Option> */}
                                        </Select>
                                    </div>
                                    <div>
                                        <label>Start Date</label>
                                        <DatePicker
                                            selected={selectedDate1}
                                            onChange={(date) => setSelectedDate1(date)}
                                            filterDate={filterSundaysFun1}
                                            highlightDates={holidays}
                                            dayClassName={(date) =>
                                                holidays.some(holiday => holiday.date === new Date(date).toISOString().split('T')[0])
                                                    ? 'holiday'
                                                    : undefined
                                            }
                                            // renderDayContents={renderDayContents}
                                            // renderCustomHeader={renderHolidayTooltip}
                                            className='date_picker'
                                            showIcon
                                        />

                                    </div>
                                    {leaveForState === 1 ? "" :
                                        <div>
                                            <label>End Date</label>
                                            <DatePicker
                                                showIcon={true}
                                                selected={selectedDate2}
                                                onChange={(date) => setSelectedDate2(date)}
                                                filterDate={filterSundaysFun2}
                                                className='date_picker'
                                            />
                                        </div>
                                    }
                                </div>
                                {/* {
                                    (daysDifference <= remainingLeaveDay && leaveTypeState === "Casual" || leaveTypeState === "Medical") &&
                                    <div className='casual_leave_toggle_btn'>
                                        <Switch onChange={handleToggle} />
                                        <span>Use paid leaves*</span>
                                    </div>
                                } */}

                                <div className='faculty_apply_leave_textarea_div'>
                                    <label>REASON</label>
                                    <textarea rows="4" cols="20" value={textMesg} onChange={(e) => setTextMesg(e.target.value)}></textarea>
                                </div>

                                {leaveTypeState === "Casual" ? "" :
                                    <div className='faculty_apply_leave_upload_document'>
                                        <div>
                                            <FileUploader handleChange={handleChange} name="file" types={fileTypes} label="Upload image" onTypeError={medicalFileTypeErrorEun} onSizeError={(file) => console.log(file)} />
                                        </div>
                                    </div>
                                }
                                {/* -------------------paid leave message popup--------------- */}
                                {/* {
                                    paidLeaveMesg && <>
                                        <Dialog
                                            open={paidLeaveMesg}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    <span>You can apply only one day paid leave in a month.</span>
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <span style={{ marginRight: '13px' }}>
                                                    <Button onClick={closePaidLeaveMesgPopUpFun} variant="contained" size="small" className='mr-2'>Close</Button>
                                                </span>
                                            </DialogActions>
                                        </Dialog>
                                    </>
                                } */}
                                <div className='faculty_apply_leave_submit_btn'>
                                    <button onClick={(e) => leaveApiFun(e)}>{loading === true ? <CircularProgress color="inherit" size={15} /> : "Submit"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
            <Toaster />
        </div >
    )
}

export default ApplyLeave