import { createContext, useContext } from "react";

export const AttendContext = createContext();

export function useAttend() {
    return useContext(AttendContext);
}