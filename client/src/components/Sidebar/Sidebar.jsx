import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineFileExcel, AiOutlineClear, AiOutlineHistory } from "react-icons/ai";
import { BiHistory, BiUserCircle, BiMessageDetail, BiCalendarExclamation, BiPaperPlane } from "react-icons/bi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { HiUserGroup, HiOutlineCurrencyRupee } from "react-icons/hi";
import { RiCalendarCheckFill } from "react-icons/ri";
import { FaBalanceScale } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FiUserPlus, FiUsers } from "react-icons/fi"
import { LuCircleEqual } from "react-icons/lu"



import { useAuth } from "../../context/auth/authContext";

const Sidebar = () => {
  const { userData } = useAuth();

  return (
    <div className="sidebar-container">
      <ul className="nav-ul">
        {/* ----------------------users -sidebar------------- */}
        {userData.role === 0 &&
          <>
            <li>
              <NavLink
                to="/home"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <AiOutlineHome className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/history"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <BiHistory className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>History</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/leave"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <RiCalendarCheckFill className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>Leave</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile&1"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <BiUserCircle className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>Profile</span>
              </NavLink>
            </li>
          </>
        }
        {/* -----------------------------------Admin sidebar------------------- */}
        {
          userData.role === 1 &&
          <>
            <li>
              <NavLink
                to="/home"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <MdOutlineDashboardCustomize className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/employee"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <FiUsers className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>Employee</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-employee"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <FiUserPlus className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}> Add Employee</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/attendance-report"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <AiOutlineFileExcel className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>Attendance</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/activity"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <BiMessageDetail className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>Activity</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/leave-applied"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <BiCalendarExclamation className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>Leave</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/leave-balance"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <LuCircleEqual className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>Leave Balance</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/salary-generate"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <HiOutlineCurrencyRupee className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>Generate Salary</span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/salary-history"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <AiOutlineHistory className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>Salary History</span>
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/holidays"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#5E17EB",
                })}
              >
                <span>
                  <BiPaperPlane className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>Holidays</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/clean"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#675cff" : "",
                  color: isActive ? "#fff" : "#212526",
                })}
              >
                <span>
                  <AiOutlineClear className="profile-icon" />
                </span>
                <span style={{ marginLeft: "6px" }}>Clean</span>
              </NavLink>
            </li> */}
          </>
        }
      </ul>
    </div>
  );
};

export default Sidebar;
