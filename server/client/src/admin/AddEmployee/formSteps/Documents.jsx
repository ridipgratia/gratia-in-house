
import React, { useState, useRef } from 'react'
import "./Documents.css"
import Button from '@mui/material/Button';
import { useStep } from '../../../context/steps/stepsContext'
import { HiOutlinePlusSm } from "react-icons/hi"
import { MdDeleteOutline } from "react-icons/md"
import { BiCloudUpload } from "react-icons/bi"
import toast, { Toaster } from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
import axiosInstance from "../../../utils/axios"
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const Documents = () => {
    const [loading, setLoading] = useState(false)
    const [doc, setDoc] = useState([{ docName: "", document: null }])
    const navigate = useNavigate()

    // ----------------------useRef trigger----------
    const { formStepsBackFun } = useStep()
    const docRef = useRef("")
    const handleClickDocument = () => {
        docRef.current.click();
    };


    // --------------------added document field-------------------
    const handleAdd = () => {
        setDoc([...doc, { docName: "", document: null }])
    }

    const handleDelete = (i) => {
        const deleteVal = [...doc]
        deleteVal.splice(i, 1)
        setDoc(deleteVal)
    }

    const handleChange = (event, index, property) => {
        const value = property === "document" ? event.target.files[0] : event.target.value;
        const updatedDocList = [...doc];
        updatedDocList[index][property] = value;
        setDoc(updatedDocList);
    }


    let filterDocArray = doc?.filter((val) => val.docName != "" && val.document != null)

    //   ------------------document form validation----------------
    const docFormValidation = (valDoc) => {
        const data = [...valDoc];
        let valid = true;

        for (let index = 0; index < data.length; index++) {
            if (data[index].docName === "" || data[index].document === null) {
                valid = false;
                break; // Exit the loop early if any entry is invalid
            }
        }

        setDoc(data);
        return valid;

    }
    // --------------------image compress and api call---------------------
    const handleDocApi = async () => {
        const errorRes = docFormValidation(doc)

        if (errorRes) {
            try {
                // const compressedDocuments = await Promise.all(
                //     doc.map(async (val) => {
                //         if (val.document) {
                //             const options = {
                //                 maxSizeMB: 1,
                //                 maxWidthOrHeight: 600,
                //                 useWebWorker: true,
                //             };
                //             const compressedFile = await imageCompression(val.document, options);
                //             return {
                //                 docName: val.docName,
                //                 document: compressedFile,
                //             };
                //         }
                //         return val;
                //     })
                // );

                // ----------------get user-id from localstorage-------------
                let id = JSON.parse(localStorage.getItem("userId"));
                setLoading(true)
                const formData = new FormData();
                doc.forEach((doc) => {
                    formData.append("document_names", doc.docName);
                    formData.append("documents", doc.document);
                });
                formData.append("user_id", id)


                const config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                };

                let response = await axiosInstance.post("/upload-documents", formData, config);

                if (response.status === 201) {
                    setDoc([{ docName: "", document: null }])
                }
                setTimeout(() => {
                    setLoading(false)
                    toast.success("Successfully submitted !", {
                        duration: 3000,
                        position: 'top-center',
                        className: "facultyToast"
                    });
                    navigate("/employee")
                }, 1200)
                if (response?.status === 201) {
                    setDoc([{ docName: "", document: null }])
                }


            } catch (error) {
                console.log(error);
                setTimeout(() => {
                    setLoading(false)
                    toast.error(error.response.data.error, {
                        duration: 3000,
                        position: 'top-center',
                        className: "facultyToast"
                    });
                }, 1500)
            }
        }
        else {
            toast.error("All field are required.", {
                duration: 3000,
                position: 'top-center',
                className: "facultyToast"
            });
        }
    }
    //    --------------------------------------------------------------



    return (
        <div className='admin_emp_details_container'>
            <div className='admin_emp_basic_details_container'>
                <div className='admin_upload_documents_container'>
                    <h5 style={{ marginBottom: '35px' }}>Document Upload</h5>
                    {doc.map((val, i) => (
                        <div key={i} >
                            {
                                i > 0 &&
                                <div className='admin_doc_field_delete_btn_div'>
                                    <button onClick={() => handleDelete(i)}><MdDeleteOutline /></button>
                                </div>
                            }
                            <div className='admin_upload_input_field_div'>
                                <div className='admin_doc_field_name_div'>
                                    <input
                                        type="text"
                                        placeholder='Enter document name'
                                        name="docName"
                                        value={val.docName}
                                        onChange={(event) => handleChange(event, i, "docName")}
                                        autoComplete='off'
                                    />
                                </div>
                                <div className='admin_doc_upload_btn_div'>
                                    <input
                                        type="file"
                                        name="document"
                                        ref={docRef}
                                        onChange={(event) => handleChange(event, i, "document")}
                                        style={{ display: 'none' }} />
                                    <button onClick={handleClickDocument}><span><BiCloudUpload size={23} /></span> <span>Upload Document</span></button>
                                </div>
                            </div>
                        </div>

                    ))}

                    <div className='admin_doc_field_added_btn_div'>
                        <button onClick={handleAdd}><HiOutlinePlusSm /></button>
                    </div>
                    {
                        filterDocArray?.length > 0 && filterDocArray?.map((data, index) => (
                            <div key={index} className='admin_show_doc_Name'>
                                <div>
                                    <span>Name : </span>
                                    <span>{data?.docName}</span>
                                </div>
                                <div>
                                    <span>Document : </span>
                                    <span>{data?.document.name}</span>
                                </div>
                            </div>
                        ))
                    }
                    <div className='admin_emp_basic_details_btn_div' style={{ marginTop: '50px' }}>
                        <Button onClick={formStepsBackFun} variant="contained" color='error'>Prev</Button>
                        <Button variant="contained" color="secondary" onClick={handleDocApi} style={{ width: '90px', height: "36px" }}>{loading === true ? <CircularProgress color="inherit" size={15} /> : "Submit"}</Button>
                    </div>

                </div>
            </div>

        </div >
    )
}

export default Documents