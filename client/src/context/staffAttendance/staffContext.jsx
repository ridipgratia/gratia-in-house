import { createContext, useContext } from "react";

export const StaffContext = createContext();

export function useStaff() {
    return useContext(StaffContext);
}