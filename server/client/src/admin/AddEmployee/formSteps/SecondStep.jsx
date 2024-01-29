import React, { useState, useRef } from 'react'
import { useStep } from '../../../context/steps/stepsContext'
import Button from '@mui/material/Button';
import { MdOutlineDeleteOutline } from "react-icons/md"
// import { Space, Upload, Progress } from 'antd';
import { AiOutlineUpload, AiOutlinePlus } from "react-icons/ai"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import axiosInstance from "../../../utils/axios"
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';

const validationSchema = Yup.object().shape({
    employees: Yup.array().of(
        Yup.object().shape({
            board_name: Yup.string().required('This field is required'),
            degree_name: Yup.string().required('This field is required'),
            school_name: Yup.string().required('This field is required'),
            passing_year: Yup.string().required('This field is required'),
            percentage: Yup.string().required('This field is required'),
            marks: Yup.number().required('This field is required'),
        })
    )
})

const SecondStep = () => {
    // const docRef = useRef(null)
    // const [fileList, setFileList] = useState([]);
    // const [uploading, setUploading] = useState(false);
    // const [progress, setProgress] = useState(0);
    const { formStepsFun, formStepsBackFun } = useStep()
    const [loading, setLoading] = useState(false)
    // ----------------------------------uploaded multiple files--------------------------

    // ---------------------eduction details api call function --------------------
    const eductionDetailFun = (value) => {
        setLoading(true)
        axiosInstance
            .post("/add-education", value.employees)
            .then((response) => {
                // console.log(response)
                setTimeout(() => {
                    toast.success("Successfully submitted !", {
                        duration: 3000,
                        position: 'top-center',
                        className: "facultyToast"
                    });
                    setLoading(false)
                }, 1500)
                setTimeout(() => {
                    formStepsFun()
                }, 2500)
            })
            .catch((err) => {
                // console.log(err)
                setTimeout(() => {
                    toast.error(err, {
                        duration: 3000,
                        position: 'bottom-center',
                        className: "facultyToast"
                    });
                }, 2000)
            });
    }

    //    ---------------get user id from localstorage-------------------
    let getID = JSON.parse(localStorage.getItem("userId"));
    // console.log(getID)

    return (

        <div className='admin_emp_details_container'>
            <div className='admin_emp_basic_details_container'>
                <Formik
                    initialValues={{
                        employees: [
                            {
                                board_name: "",
                                degree_name: "",
                                school_name: '',
                                passing_year: '',
                                percentage: '',
                                marks: '',
                                user_id: getID,
                                updated_at: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
                                created_at: dayjs(new Date()).format('YYYY-MM-DD HH:mm')
                            }
                        ],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        eductionDetailFun(values)
                    }}
                >
                    {
                        (formik) => (
                            <Form>
                                <div className='admin_emp_personal_details_container'>
                                    <h5 style={{ marginTop: '20px', marginBottom: '15px' }}>Education/Other professional Qualification/Training Course etc/Degree Examination.</h5>
                                    <FieldArray name="employees" render={(arrayHelpers) => {
                                        return (
                                            <div>
                                                {formik.values.employees.map((employee, index) => (

                                                    <div className='admin_emp_basic_details' key={index}>
                                                        {
                                                            index > 0 && <div>

                                                            </div>
                                                        }
                                                        {
                                                            index > 0 && <div className='component_delete_btn_div'>
                                                                <button type="button" onClick={() => arrayHelpers.remove(index)}><MdOutlineDeleteOutline /></button>
                                                            </div>
                                                        }
                                                        <div>
                                                            <label htmlFor={`employees.${index}.board_name`} className='label'>Board Name</label>
                                                            <Field
                                                                type="text"
                                                                name={`employees.${index}.board_name`}
                                                                id={`employees.${index}.board_name`}
                                                                style={{ height: '35px' }}

                                                            />
                                                            <ErrorMessage
                                                                component="span"
                                                                name={`employees.${index}.board_name`}
                                                                className='first_step_error_message'
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor={`employees.${index}.degree_name`} className='label'>Degree Name</label>
                                                            <Field
                                                                type="text"
                                                                name={`employees.${index}.degree_name`}
                                                                id={`employees.${index}.degree_name`}
                                                                style={{ height: '35px' }}
                                                            />
                                                            <ErrorMessage
                                                                component="span"
                                                                name={`employees.${index}.degree_name`}
                                                                className='first_step_error_message'
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor={`employees.${index}.school_name`} className='label'>School or College Name</label>
                                                            <Field
                                                                type="text"
                                                                name={`employees.${index}.school_name`}
                                                                id={`employees.${index}.school_name`}
                                                                style={{ height: '35px' }}
                                                            />
                                                            <ErrorMessage
                                                                component="span"
                                                                name={`employees.${index}.school_name`}
                                                                className='first_step_error_message'
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor={`employees.${index}.passing_year`} className='label'>Passing year</label>
                                                            <Field
                                                                type="text"
                                                                name={`employees.${index}.passing_year`}
                                                                id={`employees.${index}.passing_year`}
                                                                style={{ height: '35px' }}
                                                            />
                                                            <ErrorMessage
                                                                component="span"
                                                                name={`employees.${index}.passing_year`}
                                                                className='first_step_error_message'
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor={`employees.${index}.percentage`} className='label'>Percentage</label>
                                                            <Field
                                                                type="text"
                                                                name={`employees.${index}.percentage`}
                                                                id={`employees.${index}.percentage`}
                                                                style={{ height: '35px' }}
                                                            />
                                                            <ErrorMessage
                                                                component="span"
                                                                name={`employees.${index}.percentage`}
                                                                className='first_step_error_message'
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor={`employees.${index}.marks`} className='label'>Marks</label>
                                                            <Field
                                                                type="number"
                                                                name={`employees.${index}.marks`}
                                                                id={`employees.${index}.marks`}
                                                                style={{ height: '35px' }}
                                                            />
                                                            <ErrorMessage
                                                                component="span"
                                                                name={`employees.${index}.marks`}
                                                                className='first_step_error_message'
                                                            />
                                                        </div>

                                                    </div>

                                                ))}
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0px 20px 30px 0px' }}>
                                                    <button type="button" onClick={() => arrayHelpers.insert(formik.values.employees.length + 1, {
                                                        board_name: "",
                                                        degree_name: "",
                                                        school_name: '',
                                                        passing_year: '',
                                                        percentage: '',
                                                        marks: '',
                                                        user_id: getID,
                                                        updated_at: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
                                                        created_at: new Date()
                                                    })} className='add_form_component_btn'><AiOutlinePlus /></button>
                                                </div>
                                            </div>
                                        )
                                    }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button type="submit" variant="contained" color="secondary" style={{ width: '90px', height: '36px' }}>{loading === true ? <CircularProgress color="inherit" size={15} /> : "Submit"}</Button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
                <div className='admin_emp_basic_details_btn_div'>
                    <Button onClick={formStepsBackFun} variant="contained" color='error' size='small'>prev</Button>
                    <Button onClick={formStepsFun} variant="contained" size='small'>Next</Button>
                </div>
            </div>
        </div>
    )
}

export default SecondStep