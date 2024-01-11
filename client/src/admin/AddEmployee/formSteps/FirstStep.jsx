import React, { useState } from 'react'
import "./FirstStep.css"
import { useStep } from '../../../context/steps/stepsContext'
import { Select, message } from 'antd';
import { DatePicker } from 'antd';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { validationSchema } from "./FirstStepValidation/index"
import axiosInstance from "../../../utils/axios"
import toast, { Toaster } from 'react-hot-toast';
import dayjs from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const FirstStep = () => {

    const { Option } = Select;
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    // ----------------------------------form handling---------------------------------------
    const initialValues = {
        firstName: "",
        lastName: "",
        dob: '',
        employeeId: '',
        designation: '',
        selectField: '',
        dateOfJoin: '',
        totalLeave: '',
        email: '',
        uanNo: '',
        esic: '',
        selectGender: '',
        maritalStatus: '',
        phoneNumber: '',
        presentAddress: '',
        permanentAddress: '',

    };

    const handleSubmit = (values) => {
        basicDetailsFun(values)
    };

    // To Change Formik Value Manuly 
    // const handleChangeManual = (event) => {
    //     const { name, value } = event.target;
    //     const uppercaseValue = value.toUpperCase();
    //     formik.setFieldValue(name, uppercaseValue);
    // }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });
    // -----------------------------------api call for employee register-----------------------------------------------------/
    const basicDetailsFun = async (values) => {
        try {
            setLoading(true)
            const req = {
                first_name: values.firstName,
                last_name: values.lastName,
                dob: values.dob,
                gender: values.selectGender,
                emp_id: values.employeeId,
                designation: values.designation,
                label: values.selectField,
                date_of_joining: values.dateOfJoin,
                paid_leaves: Number(values.totalLeave),
                email: values.email,
                phoneNumber: values.phoneNumber,
                presentAddress: values.presentAddress,
                permanentAddress: values.permanentAddress,
            };
            const res_data = await axiosInstance.post("/register", req)
            if (res_data.data.status == 200) {
                toast.success(res_data.data.message, {
                    position: 'top-center',
                    className: "facultyToast"
                });
                setLoading(false);
                setTimeout(() => {
                    navigate("/employee")
                }, 1000)
            }
            if (res_data.data.status == 400) {
                toast.error(res_data.data.message, {
                    position: 'top-center',
                    className: "facultyToast"
                });
                setLoading(false)
            }
        } catch (error) {
            toast.error(error.data.message, {
                position: 'top-center',
                className: "facultyToast"
            });
            setLoading(false)
        }
    }
    // -----------------------------
    // const personalDetailsFun = (values, userID) => {
    //     localStorage.setItem("userId", JSON.stringify(userID))
    //     const req = {
    //         user_id: Number(userID),
    //         marital_status: values.maritalStatus,
    //         father_name: values.fatherName,
    //         mother_name: values.motherName,
    //         phone_no: values.phoneNumber,
    //         emergency_contact_no: values.emergencyNumber,
    //         pan_no: values.panNo,
    //         aadhar_no: values.aadharNo,
    //         uan_no: values.uanNo,
    //         esic: values.esic,
    //         present_address: values.presentAddress,
    //         permanent_address: values.permanentAddress,
    //         created_at: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
    //         updated_at: dayjs(new Date()).format('YYYY-MM-DD HH:mm')
    //     };
    //     axiosInstance
    //         .post("/personal-details", req)
    //         .then((response) => {
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         });
    // }

    // ---------------------------------

    // const bankDetailsFun = (values, userID) => {
    //     const req = {
    //         user_id: Number(userID),
    //         bank_name: values.bankName,
    //         account_holder_name: values.accountHolderName,
    //         branch_name: values.branchName,
    //         ifsc: values.ifscCode,
    //         account_number: values.accountNumber,
    //         created_at: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
    //         updated_at: dayjs(new Date()).format('YYYY-MM-DD HH:mm')
    //     };
    //     axiosInstance
    //         .post("/bank-details", req)
    //         .then((response) => {
    //             toast.success("Successfully submitted !", {
    //                 duration: 3000,
    //                 position: 'top-center',
    //                 className: "facultyToast"
    //             });
    //             setLoading(false)
    //             setTimeout(() => {
    //                 formStepsFun()
    //             }, 3200)
    //         })
    //         .catch((err) => {
    //             toast.error("got error !", {
    //                 duration: 3000,
    //                 position: 'top-center',
    //                 className: "facultyToast"
    //             });
    //         });
    // }
    // ----------------------------------------------------

    return (
        <div className='admin_emp_details_container'>
            <div className='admin_emp_basic_details_container'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='admin_emp_basic_details'>
                        <div>
                            <label className='label'>First Name</label>
                            <input type="text"
                                placeholder='First name'
                                name='firstName'
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="off"
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className='first_step_error_message'>{formik.errors.firstName}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='label'>Last Name</label>
                            <input type="text"
                                placeholder='Last name'
                                name='lastName'
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="off"
                            />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div className='first_step_error_message'>{formik.errors.lastName}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='label'>Date of Birth</label>
                            <DatePicker
                                name="selectedDate"
                                value={formik.values.dob}
                                onChange={(date) => formik.setFieldValue('dob', date)}
                                onBlur={formik.handleBlur}
                                className='dash_date_picker'
                            />
                            {formik.touched.dob && formik.errors.dob ? (
                                <div className='first_step_error_message'>{formik.errors.dob}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='label'>Gender</label>
                            <div className='dash_dropdown'>
                                <Select
                                    name="selectGender"
                                    value={formik.values.selectGender}
                                    onChange={(value) => formik.setFieldValue('selectGender', value)}
                                    onBlur={formik.handleBlur}
                                    style={{ width: '100%' }}
                                >
                                    <Option value="" disabled>Select an option</Option>
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>

                                </Select>
                                {formik.touched.selectGender && formik.errors.selectGender ? (
                                    <div className='first_step_error_message'>{formik.errors.selectGender}</div>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <label className='label'>Employee ID</label>
                            <input type="text"
                                placeholder='Employee ID'
                                name='employeeId'
                                value={formik.values.employeeId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="off"
                            />
                            {formik.touched.employeeId && formik.errors.employeeId ? (
                                <div className='first_step_error_message'>{formik.errors.employeeId}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='label'>Designation</label>
                            <input type="text"
                                placeholder='Designation'
                                name='designation'
                                value={formik.values.designation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="off"
                            />
                            {formik.touched.designation && formik.errors.designation ? (
                                <div className='first_step_error_message'>{formik.errors.designation}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='label'>Assign center</label>
                            <div className='dash_dropdown'>
                                <Select
                                    name="selectField"
                                    value={formik.values.selectField}
                                    onChange={(value) => formik.setFieldValue('selectField', value)}
                                    onBlur={formik.handleBlur}
                                    style={{ width: '100%' }}
                                >
                                    <Option value="">Select an option</Option>
                                    <Option value="GTPL">GTPL</Option>
                                    <Option value="TSCS">TSCS</Option>
                                    <Option value="TTMS">TTMS</Option>
                                    <Option value="THS">THS</Option>
                                    <Option value="HRMS">HRMS</Option>
                                </Select>
                                {formik.touched.selectField && formik.errors.selectField ? (
                                    <div className='first_step_error_message'>{formik.errors.selectField}</div>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <label className='label'>Date of joining</label>
                            <DatePicker
                                name="selectedDate"
                                value={formik.values.dateOfJoin}
                                onChange={(date) => formik.setFieldValue('dateOfJoin', date)}
                                onBlur={formik.handleBlur}
                                className='dash_date_picker'
                            />
                            {formik.touched.dateOfJoin && formik.errors.dateOfJoin ? (
                                <div className='first_step_error_message'>{formik.errors.dateOfJoin}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='label'>Total Leave</label>
                            <input type="number"
                                placeholder='Total Leave'
                                name='totalLeave'
                                value={formik.values.totalLeave}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="off"
                                maxLength={10}
                            />
                            {formik.touched.totalLeave && formik.errors.totalLeave ? (
                                <div className='first_step_error_message'>{formik.errors.totalLeave}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='label'>Email</label>
                            <input type="email"
                                placeholder='Email'
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="off"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className='first_step_error_message'>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='label'>Phone no.</label>
                            <input type="number"
                                placeholder='phone number'
                                name='phoneNumber'
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="off"

                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <div className='first_step_error_message'>{formik.errors.phoneNumber}</div>
                            ) : null}
                        </div>
                        <div style={{ opacity: 0 }}>
                            <label className='label'>Phone no.</label>
                            <input type="number"
                                placeholder='phone number'
                                autoComplete="off"
                            />

                        </div>


                        <div>
                            <label className='label'>present address</label>
                            <textarea
                                rows="5"
                                placeholder='Present address...'
                                name='presentAddress'
                                value={formik.values.presentAddress}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="off"
                            >
                            </textarea>
                            {formik.touched.presentAddress && formik.errors.presentAddress ? (
                                <div className='first_step_error_message'>{formik.errors.presentAddress}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='label'>permanent address</label>
                            <textarea
                                rows="5"
                                placeholder='Pemanent address...'
                                name='permanentAddress'
                                value={formik.values.permanentAddress}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="off"
                            >
                            </textarea>
                            {formik.touched.permanentAddress && formik.errors.permanentAddress ? (
                                <div className='first_step_error_message'>{formik.errors.permanentAddress}</div>
                            ) : null}
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
                        <button type="submit" className='submit-btn'>{loading === true ? <CircularProgress color="inherit" size={15} /> : "Submit"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FirstStep