import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth/authProvider";
import AttenProvider from "./context/attendance/attenProvider";
import LeaveProvider from "./context/leave/leaveProvider";
import ImageProvider from "./context/imgContext/imageProvider";
import StepsProvider from "./context/steps/stepsProvider";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <AttenProvider>
                <LeaveProvider>
                    <ImageProvider>
                        <StepsProvider>
                            <BrowserRouter>
                                <App />
                            </BrowserRouter>
                        </StepsProvider>
                    </ImageProvider>
                </LeaveProvider>
            </AttenProvider>
        </AuthProvider>
    </React.StrictMode>
);
