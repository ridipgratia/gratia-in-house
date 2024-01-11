import { useState } from "react";
import { LeaveContext } from "./leaveContext"


const LeaveProvider = (props) => {
    const [userAttendUpdatePerDay, setUserAttendUpdatePerDay] = useState(false)

    return (
        <LeaveContext.Provider
            value={{ userAttendUpdatePerDay, setUserAttendUpdatePerDay }}
        >
            {props.children}
        </LeaveContext.Provider>
    )
}

export default LeaveProvider
