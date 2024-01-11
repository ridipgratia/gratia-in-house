import React, { useState, useEffect } from "react";
import "./App.css";
import { BsWifiOff } from "react-icons/bs"
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import AdminLogin from "./admin/Login/Login";
// import AdminHome from "./admin/Home/Home"
import Employee from "./admin/Employee/Employee"
import EditEmployeeDetails from "./admin/Employee/EditEmployeeDetails";
import AddEmployee from "./admin/AddEmployee/AddEmployee";
import TodayPresentTable from "./admin/TodayPresentTable/TodayPresentTable";
import LateAttendTable from "./admin/LateAttendTable/LateAttendTable"
import Report from "./admin/Report/Report"
import Activity from "./admin/Activity/Activity"
import Clean from "./admin/Clean/Clean"
import DeleteAttendance from "./admin/DeleteAttendance/DeleteAttendance";
import DeleteActivity from "./admin/DeleteActivity/DeleteActivity";
import TotalAbsentUsers from "./admin/TotalAbsentUsers/TotalAbsentUsers";
import Leave from "./admin/Leave/Leave"
import Payroll from "./admin/Payroll/Payroll";
import SalaryHistory from "./admin/Salary_history/SalaryHistory";
import LeaveBalance from "./admin/LeaveBalance/LeaveBalance";
import Holidays from "./admin/Holidays/Holidays";

import LoadingBar from 'react-top-loading-bar'

// import Register from "./pages/Register/Register";
// import FacultyHome from "./pages/Home/Home";
import MyHistory from "./pages/MyHistory/MyHistory";
import FProfile from "./pages/FacultyProfile/FProfile";
import ApplyLeave from "./pages/ApplyLeave/ApplyLeave";
import FPUpdated from "./pages/FacultyProfile/FPUpdated";
import MainHome from "./mainPages/pages/index"
import PrivateRoute from "./components/Layout/PrivateRoute";
import LeaveForm from "./pages/LeaveForm/LeaveForm"

import Error from "./pages/Error/Error";
import ErrorBoundary from "./errorboundary/ErrorBoundary";

// import { useAuth } from "./context/auth/authContext";

import { Routes, Route, useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';



function App() {
  let { Token } = useParams();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  const location = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(40)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [location]);


  return (
    <>
      {
        isOnline ? (
          <ErrorBoundary key={location.pathname}>
            <div className="app-container">
              <LoadingBar
                color="#f11946"
                height={3}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
              />
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path='/reset-password' element={<ResetPassword />} />
                <Route exact path="/admin" element={<AdminLogin />} />
                <Route exact path="/home" element={<MainHome />} />

                {/* --------------------------User Route-------------------- */}
                {/* <Route path="/home" element={<FacultyHome />} /> */}
                <Route exact path="/history" element={<PrivateRoute role={0}><MyHistory /></PrivateRoute>} />
                {/* <Route path="/facultyleave" element={<ApplyLeave />} /> */}
                <Route exact path="/profile&1" element={<PrivateRoute role={0}><FProfile /></PrivateRoute>} />
                <Route exact path="/profile/edit" element={<PrivateRoute role={0}><FPUpdated /></PrivateRoute>} />
                <Route exact path="/leave" element={<PrivateRoute role={0}><ApplyLeave /></PrivateRoute>} />
                <Route exact path="/leave-form" element={<PrivateRoute role={0}><LeaveForm /></PrivateRoute>} />

                {/*-------------------------------Admin Route----------------------- */}
                {/* <Route path="/home" element={<AdminHome />} /> */}
                <Route exact path="/add-employee" element={<PrivateRoute role={1}><AddEmployee /></PrivateRoute>} />
                <Route exact path="/employee" element={<PrivateRoute role={1}><Employee /></PrivateRoute>} />
                <Route exact path="/edit" element={<PrivateRoute role={1}><EditEmployeeDetails /></PrivateRoute>} />
                <Route exact path="/attendance" element={<PrivateRoute role={1}><TodayPresentTable /></PrivateRoute>} />
                <Route exact path="/late" element={<PrivateRoute role={1}><LateAttendTable /></PrivateRoute>} />
                <Route exact path="/absent" element={<PrivateRoute role={1}><TotalAbsentUsers /></PrivateRoute>} />
                <Route exact path="/attendance-report" element={<PrivateRoute role={1}><Report /></PrivateRoute>} />
                <Route exact path="/activity" element={<PrivateRoute role={1}><Activity /></PrivateRoute>} />
                {/* <Route exact path="/clean" element={<PrivateRoute role={1}><Clean /></PrivateRoute>} /> */}
                {/* <Route exact path="/delete-attendance" element={<PrivateRoute role={1}><DeleteAttendance /></PrivateRoute>} /> */}
                {/* <Route exact path="/delete-activity" element={<PrivateRoute role={1}><DeleteActivity /></PrivateRoute>} /> */}
                <Route exact path="/leave-applied" element={<PrivateRoute role={1}><Leave /></PrivateRoute>} />
                <Route exact path="/salary-generate" element={<PrivateRoute role={1}><Payroll /></PrivateRoute>} />
                <Route exact path="/salary-history" element={<PrivateRoute role={1}><SalaryHistory /></PrivateRoute>} />
                <Route exact path="/leave-balance" element={<PrivateRoute role={1}><LeaveBalance /></PrivateRoute>} />
                <Route exact path="/holidays" element={<PrivateRoute role={1}><Holidays /></PrivateRoute>} />
                {/* ------------------------------------------------------------------ */}
                <Route path="*" element={<Error />} />
              </Routes>

            </div>
          </ErrorBoundary >

        ) : (
          <div className="check_internet_connection_div">
            <span><BsWifiOff /></span>
            <h4>No  Connection</h4>
            <p>Please check your internet connection</p>
          </div>
        )

      }
    </>


  );
}

export default App;
