import { createContext, useContext } from "react";

export const ImageContext = createContext();

export function useImage() {
    return useContext(ImageContext);
}