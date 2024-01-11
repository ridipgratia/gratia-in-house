import { createContext, useContext } from "react";

export const StepContext = createContext();

export function useStep() {
    return useContext(StepContext);
}