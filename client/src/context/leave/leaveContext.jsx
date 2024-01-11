import { createContext, useContext } from "react";

export const LeaveContext = createContext();

export function useLeave() {
    return useContext(LeaveContext);
}