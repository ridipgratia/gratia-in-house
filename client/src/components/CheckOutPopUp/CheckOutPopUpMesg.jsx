import React, { useEffect, useState } from 'react'
import "./CheckOutPopUpMesg.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';
import axiosInstance from '../../utils/axios';
import { useAuth } from '../../context/auth/authContext';
import { useAttend } from '../../context/attendance/attenContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CheckOutPopUpMesg = ({ setCheckOutPopUpMesgBox, checkOutPopUpMesgBox, getDist, setCheckIn, handleUserCheckIn, officeName }) => {
    const { totalActivityList, setTotalActivityList } = useAttend()
    // console.log(totalActivityList.length);
    const [activity1MaxLengthMesg, setActivity1MaxLengthMesg] = useState(100);
    const [activity1Length, setActivity1Length] = useState(0)

    const [activity2MaxLengthMesg, setActivity2MaxLengthMesg] = useState(100);
    const [activity2Length, setActivity2Length] = useState(0)

    const [activity3MaxLengthMesg, setActivity3MaxLengthMesg] = useState(100);
    const [activity3Length, setActivity3Length] = useState(0)

    const [activity4MaxLengthMesg, setActivity4MaxLengthMesg] = useState(100);
    const [activity4Length, setActivity4Length] = useState(0)

    const [activity5MaxLengthMesg, setActivity5MaxLengthMesg] = useState(100);
    const [activity5Length, setActivity5Length] = useState(0)


    const [activity1, setActivity1] = useState("")
    const [activity2, setActivity2] = useState("")
    const [activity3, setActivity3] = useState("")
    const [activity4, setActivity4] = useState("")
    const [activity5, setActivity5] = useState("")

    useEffect(() => {
        setTotalActivityList([activity1, activity2, activity3, activity4, activity5]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activity1, activity2, activity3, activity4, activity5])


    const handleClose = () => {
        setCheckOutPopUpMesgBox(false)
    };
    // ---------------------------activity logic fun------------------
    const activity1Fun = (e) => {
        setActivity1(e.target.value)
        let count = e.target.value;
        let maxLen = 100;
        if (count.length > 0) {
            setActivity1MaxLengthMesg(maxLen - count.length)
            setActivity1Length(count.length)
        }
        if (count.length === 0) {
            setActivity1MaxLengthMesg(maxLen)
            setActivity1Length(count.length)
        }
    }
    const activity2Fun = (e) => {
        setActivity2(e.target.value)
        let count = e.target.value;
        let maxLen = 100;
        if (count.length > 0) {
            setActivity2MaxLengthMesg(maxLen - count.length)
            setActivity2Length(count.length)
        }
        if (count.length === 0) {
            setActivity2MaxLengthMesg(maxLen)
            setActivity2Length(count.length)
        }
    }

    const activity3Fun = (e) => {
        setActivity3(e.target.value)
        let count = e.target.value;
        let maxLen = 100;
        if (count.length > 0) {
            setActivity3MaxLengthMesg(maxLen - count.length)
            setActivity3Length(count.length)
        }
        if (count.length === 0) {
            setActivity3MaxLengthMesg(maxLen)
            setActivity3Length(count.length)
        }
    }

    const activity4Fun = (e) => {
        setActivity4(e.target.value)
        let count = e.target.value;
        let maxLen = 100;
        if (count.length > 0) {
            setActivity4MaxLengthMesg(maxLen - count.length)
            setActivity4Length(count.length)
        }
        if (count.length === 0) {
            setActivity4MaxLengthMesg(maxLen)
            setActivity4Length(count.length)
        }
    }
    const activity5Fun = (e) => {
        setActivity5(e.target.value)
        let count = e.target.value;
        let maxLen = 100;
        if (count.length > 0) {
            setActivity5MaxLengthMesg(maxLen - count.length)
            setActivity5Length(count.length)
        }
        if (count.length === 0) {
            setActivity5MaxLengthMesg(maxLen)
            setActivity5Length(count.length)
        }
    }
    // -------------------checkOut API Call--------------------
    const todayDate = moment().format("YYYY-MM-DD")

    const { userData } = useAuth()

    const facultyCheckOutFun = () => {
        if (activity1.length > 0 && activity2.length > 0) {
            const req = {
                user_id: userData.user_id,
                date: todayDate,
                in_distance: null,
                out_distance: getDist,
                time: moment().format("LTS"),
                location: "Guwahati",
                in_office: null,
                out_office: officeName
            };
            axiosInstance
                .post("/add-attendance", req)
                .then((response) => {
                    handleClose();
                    const { data } = response
                    toast.success("Successfully submitted !", {
                        duration: 3000,
                        position: 'bottom-center',
                        className: "facultyToast"
                    });
                    // -----------code changes-----------
                    setCheckIn(null)
                    // setCheckIn(data)
                })
                .catch((err) => {
                    console.error(err);
                });
            handleUserCheckIn()
        }

    }
    // --------------------Activities Function--------------------------------------
    const dailyActivitiesFun = () => {
        if (activity1.length > 0 && activity2.length > 0) {
            const req = {
                user_id: userData.user_id,
                date: todayDate,
                activity: totalActivityList,
            };
            axiosInstance
                .post("/add-activities", req)
                .then((response) => {
                    const { data } = response
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            toast.error("Please Fill Mendatory Fields !", {
                duration: 3000,
                position: 'bottom-center',
                className: "facultyToast"
            });
        }
    }

    return (
        <div>
            <Dialog
                open={checkOutPopUpMesgBox}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <span className='checkout-activities-mesg'>
                            <span className='daily_activity_heading'>Fill daily activities</span>
                            <span className='checkout-activities_span'>
                                <label>Activity : 1<span className='required_field'>*</span></label>
                                <input type="text" placeholder='Your answer' onChange={(e) => activity1Fun(e)} maxLength="100" />
                                <span className='counter_span'>{activity1Length}/{activity1MaxLengthMesg}</span>
                            </span>
                            <span className='checkout-activities_span'>
                                <label>Activity : 2<span className='required_field'>*</span></label>
                                <input type="text" placeholder='Your answer' onChange={(e) => activity2Fun(e)} maxLength="100" />
                                <span className='counter_span'>{activity2Length}/{activity2MaxLengthMesg}</span>
                            </span>
                            <span className='checkout-activities_span'>
                                <label>Activity : 3</label>
                                <input type="text" placeholder='Your answer' onChange={(e) => activity3Fun(e)} maxLength="100" />
                                <span className='counter_span'>{activity3Length}/{activity3MaxLengthMesg}</span>
                            </span>
                            <span className='checkout-activities_span'>
                                <label>Activity : 4</label>
                                <input type="text" placeholder='Your answer' onChange={(e) => activity4Fun(e)} maxLength="100" />
                                <span className='counter_span'>{activity4Length}/{activity4MaxLengthMesg}</span>
                            </span>
                            <span className='checkout-activities_span'>
                                <label>Activity : 5</label>
                                <input type="text" placeholder='Your answer' onChange={(e) => activity5Fun(e)} maxLength="100" />
                                <span className='counter_span'>{activity5Length}/{activity5MaxLengthMesg}</span>
                            </span>
                        </span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button
                        variant="contained" size="small" sx={{ mb: 2 }}
                        onClick={() => { facultyCheckOutFun(); dailyActivitiesFun() }}
                        className={(activity1.trim().length <= 5 && activity2.trim().length <= 5) ? "disableClass" : "ableClass"}
                    >
                        submit
                    </Button>
                </DialogActions>
            </Dialog>
            <Toaster />
        </div>
    )
}

export default CheckOutPopUpMesg