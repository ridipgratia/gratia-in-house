import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { salaryValidationSchema } from './ThirdStepValidation/thirdStepValidation';
import axiosInstance from "../../../utils/axios"
import { useStep } from '../../../context/steps/stepsContext'
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

const ThirdStep = () => {
    const { formStepsFun, formStepsBackFun } = useStep()
    const [loading, setLoading] = useState(false)

    // ----------------------------------form handling---------------------------------------
    let getID = JSON.parse(localStorage.getItem("userId"));
    // console.log(getID)

    const initialValues = {
        basic_salary: "",
        hra: "",
        conveyance: '',
        special_allowance: '',
        bonus: '',
        performance_allowance: '',
        epf: '',
        esic: '',
        professional_tax: '',
        gross_monthly_amount: '',
        ctc_per_month: '',
        ctc_per_annum: '',
    };


    const handleSubmit = (values) => {
        setLoading(true)
        const req = {
            user_id: getID,
            basic: values.basic_salary,
            hra: values.hra,
            conveyance: values.conveyance,
            special_allowance: values.special_allowance,
            bonus: values.bonus,
            performance_allowance: values.performance_allowance,
            epf: values.epf,
            esic: values.esic,
            professional_tax: values.professional_tax,
            gross_monthly_amount: values.gross_monthly_amount,
            ctc_per_month: values.ctc_per_month,
            ctc_per_annum: values.ctc_per_annum
        }

        axiosInstance
            .post("/add-salary-structure", req)
            .then((response) => {
                // console.log(response)
                setTimeout(() => {
                    setLoading(false)
                    toast.success("Successfully submitted !", {
                        duration: 3000,
                        position: 'bottom-center',
                        className: "facultyToast"
                    });
                    formik.resetForm();
                }, 1500)
                setTimeout(() => {
                    formStepsFun()
                }, 2500);
            })
            .catch((err) => {
                setTimeout(() => {
                    toast.error(err.message, {
                        duration: 3000,
                        position: 'bottom-center',
                        className: "facultyToast"
                    });
                }, 2000)

            });
    };

    const formik = useFormik({
        initialValues,
        validationSchema: salaryValidationSchema,
        onSubmit: handleSubmit
    });

    return (
        <div className='admin_emp_details_container'>
            <div className='admin_emp_basic_details_container'>
                <form onSubmit={formik.handleSubmit}>
                    {/* -------------------bank details------------------ */}
                    <div className='admin_emp_personal_details_container'>
                        <h5 style={{ marginTop: '20px', marginBottom: '15px' }}>Salary Details</h5>
                        <div className='admin_emp_basic_details' style={{ paddingTop: '10px' }}>
                            <div>
                                <label className='label'>Basic</label>
                                <input type="number"
                                    placeholder='Basic Salary'
                                    name="basic_salary"
                                    value={formik.values.basic_salary}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                />
                                {formik.touched.basic_salary && formik.errors.basic_salary ? (
                                    <div className='first_step_error_message'>{formik.errors.basic_salary}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='label'>HRA</label>
                                <input type="number"
                                    placeholder='HRA'
                                    name="hra"
                                    value={formik.values.hra}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                />
                                {formik.touched.hra && formik.errors.hra ? (
                                    <div className='first_step_error_message'>{formik.errors.hra}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='label'>Conveyance</label>
                                <input type="number"
                                    placeholder='Conveyance'
                                    name="conveyance"
                                    value={formik.values.conveyance}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                    maxLength={10}
                                />
                                {formik.touched.conveyance && formik.errors.conveyance ? (
                                    <div className='first_step_error_message'>{formik.errors.conveyance}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='label'>Special allowance</label>
                                <input type="number"
                                    placeholder='Special Allowance'
                                    name="special_allowance"
                                    value={formik.values.special_allowance}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                />
                                {formik.touched.special_allowance && formik.errors.special_allowance ? (
                                    <div className='first_step_error_message'>{formik.errors.special_allowance}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='label'>bonus</label>
                                <input type="number"
                                    placeholder='Bonus'
                                    name="bonus"
                                    value={formik.values.bonus}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete='off'
                                />
                                {formik.touched.bonus && formik.errors.bonus ? (
                                    <div className='first_step_error_message'>{formik.errors.bonus}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='label'>PERFORMANCE ALLOWANCE</label>
                                <input type="number"
                                    placeholder='Performance Allowance'
                                    name="performance_allowance"
                                    value={formik.values.performance_allowance}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                />
                                {formik.touched.performance_allowance && formik.errors.performance_allowance ? (
                                    <div className='first_step_error_message'>{formik.errors.performance_allowance}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='label'>Epf</label>
                                <input type="number"
                                    placeholder='EPF'
                                    name="epf"
                                    value={formik.values.epf}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                />
                                {formik.touched.epf && formik.errors.epf ? (
                                    <div className='first_step_error_message'>{formik.errors.epf}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='label'>Esic</label>
                                <input type="number"
                                    placeholder='ESIC'
                                    name="esic"
                                    value={formik.values.esic}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                />
                                {formik.touched.esic && formik.errors.esic ? (
                                    <div className='first_step_error_message'>{formik.errors.esic}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='label'>Professional Tax</label>
                                <input type="number"
                                    placeholder='Professional Tax'
                                    name="professional_tax"
                                    value={formik.values.professional_tax}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                />
                                {formik.touched.professional_tax && formik.errors.professional_tax ? (
                                    <div className='first_step_error_message'>{formik.errors.professional_tax}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='label'>Gross Ammount</label>
                                <input type="number"
                                    placeholder='Gross amount'
                                    name="gross_monthly_amount"
                                    value={formik.values.gross_monthly_amount}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                />
                                {formik.touched.gross_monthly_amount && formik.errors.gross_monthly_amount ? (
                                    <div className='first_step_error_message'>{formik.errors.gross_monthly_amount}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='label'>ctc per month</label>
                                <input type="number"
                                    placeholder='CTC Per Month'
                                    name="ctc_per_month"
                                    value={formik.values.ctc_per_month}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                />
                                {formik.touched.ctc_per_month && formik.errors.ctc_per_month ? (
                                    <div className='first_step_error_message'>{formik.errors.ctc_per_month}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='label'>CTC Per Annum</label>
                                <input type="number"
                                    placeholder='CTC Per Annum'
                                    name="ctc_per_annum"
                                    value={formik.values.ctc_per_annum}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                />
                                {formik.touched.ctc_per_annum && formik.errors.ctc_per_annum ? (
                                    <div className='first_step_error_message'>{formik.errors.ctc_per_annum}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" color="secondary" style={{ width: '90px', height: '36px' }}>{loading === true ? <CircularProgress color="inherit" size={15} /> : "Submit"}</Button>
                    </div>
                    <div className='admin_emp_basic_details_btn_div'>
                        <Button onClick={formStepsBackFun} variant="contained" color='error' size='small'>Prev</Button>
                        <Button onClick={formStepsFun} variant="contained" size='small'>Next</Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ThirdStep