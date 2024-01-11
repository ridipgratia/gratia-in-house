import React, { useState } from 'react'
import { StaffContext } from "./staffContext";

const StaffProvider = (props) => {
    const [isCurrTime, setIsCurrTime] = useState("");
    const [isCurrDate, setIsCurrDate] = useState("")
    const [isGetDist, setIsGetDist] = useState("")
    const [isShowMesgBox, setIsShowMesgBox] = useState(false)
    const [IsSignIn, setIsSignIn] = useState(false)
    const [staffHistoryData, setStaffHistoryData] = useState([])


    return (
        <StaffContext.Provider value={{
            isCurrTime, setIsCurrTime, isCurrDate, setIsCurrDate,
            isGetDist, setIsGetDist, isShowMesgBox, setIsShowMesgBox, IsSignIn, setIsSignIn,
            staffHistoryData, setStaffHistoryData
        }}> {props.children}
        </StaffContext.Provider>
    )
}

export default StaffProvider