import { useState } from "react";
import { AttendContext } from "./attenContext"


const AttenProvider = (props) => {
    const [currTime, setCurrTime] = useState("");
    const [currDate, setCurrDate] = useState("")
    const [getDist, setGetDist] = useState("")
    const [showMesgBox, setShowMesgBox] = useState(false)
    const [signIn, setSignIn] = useState(false)
    const [facultyHistoryData, setFacultyHistoryData] = useState([])
    const [totalActivityList, setTotalActivityList] = useState([])
    const [uploadProfileImg, setUploadProfileImg] = useState(null)
    const [updateAttendanceStatus, setUpdateAttendanceStatus] = useState(false)




    return (
        <AttendContext.Provider
            value={{
                currTime,
                currDate, getDist,
                setCurrTime,
                setCurrDate,
                setGetDist,
                setSignIn,
                signIn,
                showMesgBox,
                setShowMesgBox,
                setFacultyHistoryData,
                facultyHistoryData,
                totalActivityList,
                setTotalActivityList,
                uploadProfileImg,
                setUploadProfileImg,
                updateAttendanceStatus,
                setUpdateAttendanceStatus,
            }}
        >
            {props.children}
        </AttendContext.Provider>
    )
}

export default AttenProvider