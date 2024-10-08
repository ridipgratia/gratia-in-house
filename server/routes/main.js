//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//IMPORT THINGS ON THE TOP
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require("express");
const router = express.Router();
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const { upload, moveImage } = require('../middleware/upload_middleware');
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const AuthController = require('../controllers/AuthController');
const AttendanceController = require('../controllers/AttendanceController');
const LeaveController = require('../controllers/LeaveController');
const AdminController = require('../controllers/AdminController');
const HolidayController = require('../controllers/HolidayController');
const SalaryController = require('../controllers/SalaryController');
const UserController = require('../controllers/UserController');
const HelperController = require('../controllers/HelperController');






//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//AuthController
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.route('/otp').post(AuthController.otp);
router.route('/login').post(AuthController.login);
router.route("/register").post(AuthController.register);
router.route("/update").post(AuthController.update)
router.post("/profile-img", upload.single('user_image'), AuthController.profileImage); // Different route method is used for image upload
router.route("/get-profile-url").post(AuthController.user_image);
router.route('/resend-otp').post(AuthController.resend_opt);
router.route('/change-password').post(AuthController.change_password);
router.route('/reset-password').post(AuthController.resetPassword);
router.route('/update-password/:token').post(AuthController.updatePasswordusingToken);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//AttendanceController
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.route('/add-attendance').post(AttendanceController.addAttendance);
router.route('/list-attendance').post(AttendanceController.listAttendance);
router.route('/list-all-attendance').post(AttendanceController.listAllAttendance);
router.route('/add-activities').post(AttendanceController.addActivities);
router.route('/monthly-attendance-count').post(AttendanceController.countAttendanceBymonth);
router.route('/monthly-late-users-count').post(AttendanceController.countLateUsersBymonth);



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//AdminController
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.route('/admin-login').post(AdminController.Adminlogin);
router.route('/all-employee').post(AdminController.allEmployee);
router.route('/all-registered-employee').post(AdminController.allEmployeeCount);
router.route('/daily-attendance-count').post(AdminController.countAttendanceOnDate);
router.route('/find-attendance').post(AdminController.attendanceExporter);
router.route('/attendance-on-date').post(AdminController.latestAttendance);
router.route('/activity-on-date').post(AdminController.activityExporter);
router.route("/late-users").post(AdminController.countLateUsers);
router.route("/late-users-get").post(AdminController.LateUsers);
router.route("/delete-user").post(AdminController.deleteUser);
router.route("/clean-attendance").post(AdminController.cleanAttendance);
router.route("/clean-activity").post(AdminController.cleanActivity);
router.route("/daily-absent-count").post(AdminController.countAbsentUsers);
router.route("/daily-absent-users").post(AdminController.findAbsentUsers);
router.route("/attendance-by-user").post(AdminController.UserattendanceExporter);
router.route("/activity-by-user").post(AdminController.UseractivityExporter);
router.route("/leave-applied-users").post(AdminController.leaveRequests);
router.route("/count-leave-applied").post(AdminController.leaveCountForSevenDays);
router.route("/on-leave-today").post(AdminController.onleaveCount);
router.route("/all-leave-balance").post(AdminController.calculateAllUsersleaveBalance);
router.route("/user-details").post(AdminController.getAlluserDetails);
router.route("/update-user-details").post(AdminController.updateAllUserDetails);
router.route("/view-user-data").post(AdminController.viewUserDetails);
// Edit Employee Details 
router.route("/edit-user-details").post(AdminController.editEmployeeDetails);
router.route("/edit-user-details-submit").post(AdminController.editEmployeeDetailsSubmit);
// Search By On Input Name And Emp ID 
router.route('/search-on-input').post(AdminController.searchOnInput);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//LeaveController
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.route('/apply-leave').post(LeaveController.applyForLeave);
router.route('/calculate-leave').post(LeaveController.calculateLeaves);
router.post("/upload-document", upload.single('document'), LeaveController.uploadDocument); // Different route method is used for image upload
router.post("/approved-leave", LeaveController.changeStatus);
router.post("/cancel-leave", LeaveController.cancelledStatus);
router.post("/get-all-leaves", LeaveController.getAllleaves);


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//HolidayController
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.route('/all-holidays').get(HolidayController.getHolidays);
router.route('/create-holiday').post(HolidayController.createHoliday);
router.route('/update-holiday/:id').post(HolidayController.updateHoliday);
router.route('/delete-holiday/:id').post(HolidayController.deleteHoliday);
router.route('/upcoming-holiday').post(HolidayController.upcomingHoliday);


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//SalaryController
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.route('/add-salary-structure').post(SalaryController.addSalaryStructure);
router.route("/salary-generate").post(SalaryController.generateSalarySlips);
router.route("/update-salary").post(SalaryController.updateUserSalaryEntry);
router.route("/export-salaries").post(SalaryController.salariesByMonthAndYear);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//UserController
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.route('/personal-details').post(UserController.addPersonalDetails);
router.route('/bank-details').post(UserController.addBankDetails);
router.route('/add-education').post(UserController.addUserEducation);
router.post("/upload-documents", upload.array('documents', 10), UserController.documentsUpload);



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//HelperController
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.route('/leave-deductions').post(HelperController.getLeaveDeductions);
router.route('/paid-leave-balance').post(HelperController.getLeaveBalance);


// Generate New Hash Password 
router.route('/generate-password').post(AdminController.generatePassword);


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = router;
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++