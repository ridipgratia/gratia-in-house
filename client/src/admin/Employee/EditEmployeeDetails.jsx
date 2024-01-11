import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import DocumentDownload from './DocumentDownload';
import "./EditEmployeeDetails.css"
import { BiChevronRight, BiChevronLeft } from "react-icons/bi"
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import axiosInstance from '../../utils/axios';
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




const EditEmployeeDetails = () => {
    const [loading, setLoading] = useState(false)
    const [getUserEditData, setGetUserEditData] = useState({})
    const [documentList, setDocumentList] = useState([])

    const navigate = useNavigate();
    let editId = localStorage.getItem('E_id')

    const [editData, setEditData] = useState({
        id: Number(editId),
        user: {
            id: "",
            first_name: "",
            last_name: "",
            dob: "",
            gender: "",
            email: "",
            emp_id: "",
            designation: "",
            label: "",
            date_of_joining: "",
            paid_leaves: "",
        },
        personal_details: {
            id: "",
            father_name: "",
            mother_name: "",
            aadhar_no: "",
            pan_no: "",
            uan_no: "",
            marital_status: "",
            phone_no: "",
            emergency_contact_no: "",
            present_address: "",
            permanent_address: "",
        },

        bank_details: {
            id: "",
            bank_name: "",
            account_holder_name: "",
            branch_name: "",
            ifsc: "",
            account_number: "",
        },
        salary_structure: {
            id: "",
            basic: "",
            hra: "",
            conveyance: "",
            special_allowance: "",
            bonus: "",
            performance_allowance: "",
            epf: "",
            esic: "",
            professional_tax: "",
            gross_monthly_amount: "",
            ctc_per_month: "",
            ctc_per_annum: ""
        }

    })

    useEffect(() => {
        setEditData((prevEditData) => ({
            ...prevEditData,
            id: Number(editId),
            user: {
                id: Number(editId),
                first_name: getUserEditData.user?.first_name || '',
                last_name: getUserEditData.user?.last_name || "",
                dob: getUserEditData.user?.dob || "",
                gender: getUserEditData.user?.gender || "",
                email: getUserEditData.user?.email || "",
                emp_id: getUserEditData.user?.emp_id || "",
                designation: getUserEditData.user?.designation || "",
                label: getUserEditData.user?.label || "",
                date_of_joining: getUserEditData.user?.date_of_joining || "",
                paid_leaves: getUserEditData.user?.paid_leaves || "",
            },
            personal_details: {
                id: Number(editId),
                marital_status: getUserEditData.user?.personal_details[0]?.marital_status || "",
                father_name: getUserEditData.user?.personal_details[0]?.father_name || "",
                mother_name: getUserEditData.user?.personal_details[0]?.mother_name || "",
                phone_no: getUserEditData.user?.personal_details[0]?.phone_no || "",
                emergency_contact_no: getUserEditData.user?.personal_details[0]?.emergency_contact_no || "",
                aadhar_no: getUserEditData.user?.personal_details[0]?.aadhar_no || "",
                pan_no: getUserEditData.user?.personal_details[0]?.pan_no || "",
                uan_no: getUserEditData.user?.personal_details[0]?.uan_no || "",
                present_address: getUserEditData.user?.personal_details[0]?.present_address || "",
                permanent_address: getUserEditData.user?.personal_details[0]?.permanent_address || "",
            },

            bank_details: {
                id: Number(editId),
                bank_name: getUserEditData.user?.bank_details?.bank_name || "",
                account_holder_name: getUserEditData.user?.bank_details?.account_holder_name || "",
                branch_name: getUserEditData.user?.bank_details?.branch_name || "",
                ifsc: getUserEditData.user?.bank_details?.ifsc || "",
                account_number: getUserEditData.user?.bank_details?.account_number || "",
            },

            salary_structure: {
                id: Number(editId),
                basic: getUserEditData.user?.salary_structure?.basic || 0,
                hra: getUserEditData.user?.salary_structure?.hra || 0,
                conveyance: getUserEditData.user?.salary_structure?.conveyance || 0,
                special_allowance: getUserEditData.user?.salary_structure?.special_allowance || 0,
                bonus: getUserEditData.user?.salary_structure?.bonus || 0,
                performance_allowance: getUserEditData.user?.salary_structure?.performance_allowance || 0,
                epf: getUserEditData.user?.salary_structure?.epf || 0,
                esic: getUserEditData.user?.salary_structure?.esic || 0,
                professional_tax: getUserEditData.user?.salary_structure?.professional_tax || 0,
                gross_monthly_amount: getUserEditData.user?.salary_structure?.gross_monthly_amount || 0,
                ctc_per_month: getUserEditData.user?.salary_structure?.ctc_per_month || 0,
                ctc_per_annum: getUserEditData.user?.salary_structure?.ctc_per_annum || 0
            }


        }));
    }, [getUserEditData]);

    // --------------------------get user all data------------------
    useEffect(() => {
        const req = {
            user_id: Number(editId),
        };
        axiosInstance
            .post("/user-details", req)
            .then((response) => {
                setDocumentList(response.data.user.user_documents)
                setGetUserEditData(response.data)

            })
            .catch((err) => {
                console.log(err)
            });

    }, [])

    // console.log({ ...editData })
    // --------------------------------edit employee data fun-------------------------
    const editEmployeeDetailFun = () => {
        setLoading(true);
        const req = {
            ...editData
        };
        axiosInstance
            .post("/update-user-details", req)
            .then((response) => {
                setTimeout(() => {
                    setLoading(false)
                    // console.log(response)
                    toast.success(response.data.message, {
                        duration: 3000,
                        position: 'bottom-center',
                        className: "facultyToast"
                    });
                    // setTimeout(() => {
                    //     navigate("/employee")
                    // }, 1500)
                }, 1000)
            })
            .catch((err) => {
                setTimeout(() => {
                    setLoading(false)
                    console.log(err)
                }, 1000)
            });
    }


    return (
        <div className='admin-home-container'>
            <div className='admin-home-container-top-div'>
                <Navbar />
            </div>
            <div className='admin-home-container-bottom-div'>
                <div className='admin-home-div-left'>
                    <Sidebar />
                </div>
                {/* ------------------------------------------------------ */}
                <div className='admin-home-div-right'>
                    <div className="admin_edit_employee_details_container">
                        <div className='admin_add_emp_heading'>
                            <span><BiChevronLeft /></span>
                            <span>Dashboard<span><BiChevronRight /></span> Edit Employee Details</span>
                        </div>
                        <div className="admin_edit_employee_details_div">
                            <h5>Personal Details</h5>
                            <div className="admin_edit_employee_details">
                                <div>
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={editData.user.first_name}
                                        onChange={(e) => setEditData({ ...editData, user: { ...editData.user, first_name: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={editData.user.last_name}
                                        onChange={(e) => setEditData({ ...editData, user: { ...editData.user, last_name: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Date of Birth</label>
                                    <input
                                        type="text"
                                        name="dob"
                                        value={editData.user.dob}
                                        onChange={(e) => setEditData({ ...editData, user: { ...editData.user, dob: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Gender</label>
                                    <input
                                        type="text"
                                        name="gender"
                                        value={editData.user.gender}
                                        onChange={(e) => setEditData({ ...editData, user: { ...editData.user, gender: e.target.value } })}
                                    // disabled
                                    />
                                </div>
                                <div>
                                    <label>Marital Status</label>
                                    <input
                                        type="text"
                                        name="marital_status"
                                        value={editData.personal_details.marital_status}
                                        onChange={(e) => setEditData({ ...editData, personal_details: { ...editData.personal_details, marital_status: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Father Name</label>
                                    <input
                                        type="text"
                                        name="father_name"
                                        value={editData.personal_details.father_name}
                                        onChange={(e) => setEditData({ ...editData, personal_details: { ...editData.personal_details, father_name: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Mother Name</label>
                                    <input
                                        type="text"
                                        name="mother_name"
                                        value={editData.personal_details.mother_name}
                                        onChange={(e) => setEditData({ ...editData, personal_details: { ...editData.personal_details, mother_name: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editData.user.email}
                                        onChange={(e) => setEditData({ ...editData, user: { ...editData.user, email: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Phone No</label>
                                    <input
                                        type="text"
                                        name="phone_no"
                                        value={editData.personal_details.phone_no}
                                        onChange={(e) => setEditData({ ...editData, personal_details: { ...editData.personal_details, phone_no: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Emergency Contact No</label>
                                    <input
                                        type="text"
                                        name="emergency_contact_no"
                                        value={editData.personal_details.emergency_contact_no}
                                        onChange={(e) => setEditData({ ...editData, personal_details: { ...editData.personal_details, emergency_contact_no: e.target.value } })} />
                                </div>
                                <div>
                                    <label>Employee ID</label>
                                    <input
                                        type="text"
                                        name="emp_id"
                                        value={editData.user.emp_id}
                                        onChange={(e) => setEditData({ ...editData, user: { ...editData.user, emp_id: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Designation</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        value={editData.user.designation}
                                        onChange={(e) => setEditData({ ...editData, user: { ...editData.user, designation: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Assign Center</label>
                                    <input
                                        type="text"
                                        name="label"
                                        value={editData.user.label}
                                        onChange={(e) => setEditData({ ...editData, user: { ...editData.user, label: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Date of Joining</label>
                                    <input
                                        type="text"
                                        name="date_of_joining"
                                        value={editData.user.date_of_joining}
                                        onChange={(e) => setEditData({ ...editData, user: { ...editData.user, date_of_joining: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Total Leave</label>
                                    <input
                                        type="number"
                                        name="paid_leaves"
                                        value={editData.user.paid_leaves}
                                        onChange={(e) => setEditData({ ...editData, user: { ...editData.user, paid_leaves: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Aadhar No</label>
                                    <input
                                        type="text"
                                        name="aadhar_no"
                                        value={editData.personal_details.aadhar_no}
                                        onChange={(e) => setEditData({ ...editData, personal_details: { ...editData.personal_details, aadhar_no: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Pan No</label>
                                    <input
                                        type="text"
                                        name="pan_no"
                                        value={editData.personal_details.pan_no}
                                        onChange={(e) => setEditData({ ...editData, personal_details: { ...editData.personal_details, pan_no: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Uan No</label>
                                    <input
                                        type="text"
                                        name="uan_no"
                                        value={editData.personal_details.uan_no}
                                        onChange={(e) => setEditData({ ...editData, personal_details: { ...editData.personal_details, uan_no: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Present Address</label>
                                    <textarea
                                        type="text"
                                        name="present_address"
                                        value={editData.personal_details.present_address}
                                        onChange={(e) => setEditData({ ...editData, personal_details: { ...editData.personal_details, present_address: e.target.value } })}
                                    >

                                    </textarea>
                                </div>
                                <div>
                                    <label>Permanent Address</label>
                                    <textarea
                                        type="text"
                                        name="permanent_address"
                                        value={editData.personal_details.permanent_address}
                                        onChange={(e) => setEditData({ ...editData, personal_details: { ...editData.personal_details, permanent_address: e.target.value } })}
                                    >

                                    </textarea>
                                </div>
                            </div>
                        </div>
                        {/* ----------------------------------------------------- */}
                        {/* ---------------------------bank details--------------------------- */}
                        <div className="admin_edit_employee_details_div">
                            <h5>Bank Details</h5>
                            <div className="admin_edit_employee_details">
                                <div>
                                    <label>Bank Name</label>
                                    <input
                                        type="text"
                                        name="bank_name"
                                        value={editData.bank_details.bank_name}
                                        onChange={(e) => setEditData({ ...editData, bank_details: { ...editData.bank_details, bank_name: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Account Holder Name</label>
                                    <input
                                        type="text"
                                        name="account_holder_name"
                                        value={editData.bank_details.account_holder_name}
                                        onChange={(e) => setEditData({ ...editData, bank_details: { ...editData.bank_details, account_holder_name: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Branch Name</label>
                                    <input
                                        type="text"
                                        name="branch_name"
                                        value={editData.bank_details.branch_name}
                                        onChange={(e) => setEditData({ ...editData, bank_details: { ...editData.bank_details, branch_name: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>IFSC Code</label>
                                    <input
                                        type="text"
                                        name="ifsc"
                                        value={editData.bank_details.ifsc}
                                        onChange={(e) => setEditData({ ...editData, bank_details: { ...editData.bank_details, ifsc: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Account Number</label>
                                    <input
                                        type="text"
                                        name="account_number"
                                        value={editData.bank_details.account_number}
                                        onChange={(e) => setEditData({ ...editData, bank_details: { ...editData.bank_details, account_number: e.target.value } })}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* ------------------------------------------------------ */}
                        {/* ----------------------------------------------------- */}
                        {/* ---------------------------Salary details--------------------------- */}
                        <div className="admin_edit_employee_details_div">
                            <h5>Salary Details</h5>
                            <div className="admin_edit_employee_details">
                                <div>
                                    <label>Basic</label>
                                    <input
                                        type="number"
                                        name="basic"
                                        value={editData.salary_structure.basic}
                                        onChange={(e) => setEditData({ ...editData, salary_structure: { ...editData.salary_structure, basic: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>HRA</label>
                                    <input
                                        type="number"
                                        name="hra"
                                        value={editData.salary_structure.hra}
                                        onChange={(e) => setEditData({ ...editData, salary_structure: { ...editData.salary_structure, hra: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Conveyance</label>
                                    <input
                                        type="number"
                                        name="conveyance"
                                        value={editData.salary_structure.conveyance}
                                        onChange={(e) => setEditData({ ...editData, salary_structure: { ...editData.salary_structure, conveyance: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Special Allowance</label>
                                    <input
                                        type="number"
                                        name="special_allowance"
                                        value={editData.salary_structure.special_allowance}
                                        onChange={(e) => setEditData({ ...editData, salary_structure: { ...editData.salary_structure, special_allowance: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Bonus</label>
                                    <input
                                        type="number"
                                        name="bonus"
                                        value={editData.salary_structure.bonus}
                                        onChange={(e) => setEditData({ ...editData, salary_structure: { ...editData.salary_structure, bonus: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Performance Allowance</label>
                                    <input
                                        type="number"
                                        name="performance_allowance"
                                        value={editData.salary_structure.performance_allowance}
                                        onChange={(e) => setEditData({ ...editData, salary_structure: { ...editData.salary_structure, performance_allowance: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>EPF</label>
                                    <input
                                        type="number"
                                        name="epf"
                                        value={editData.salary_structure.epf}
                                        onChange={(e) => setEditData({ ...editData, salary_structure: { ...editData.salary_structure, epf: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Esic</label>
                                    <input
                                        type="number"
                                        name="esic"
                                        value={editData.salary_structure.esic}
                                        onChange={(e) => setEditData({ ...editData, salary_structure: { ...editData.salary_structure, esic: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Professional Tax</label>
                                    <input
                                        type="number"
                                        name="professional_tax"
                                        value={editData.salary_structure.professional_tax}
                                        onChange={(e) => setEditData({ ...editData, salary_structure: { ...editData.salary_structure, professional_tax: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>Gross Amount</label>
                                    <input
                                        type="number"
                                        name="gross_monthly_amount"
                                        value={editData.salary_structure.gross_monthly_amount}
                                        onChange={(e) => setEditData({ ...editData, salary_structure: { ...editData.salary_structure, gross_monthly_amount: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>CTC Per Month</label>
                                    <input
                                        type="number"
                                        name="ctc_per_month"
                                        value={editData.salary_structure.ctc_per_month}
                                        onChange={(e) => setEditData({ ...editData, salary_structure: { ...editData.salary_structure, ctc_per_month: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label>CTC Per Annum</label>
                                    <input
                                        type="number"
                                        name="ctc_per_annum"
                                        value={editData.salary_structure.ctc_per_annum}
                                        onChange={(e) => setEditData({ ...editData, salary_structure: { ...editData.salary_structure, ctc_per_annum: e.target.value } })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="admin_edit_employee_details_div">
                            <h5>Documents</h5>
                            <div className="admin_edit_employee_details">
                                {
                                    documentList?.map((doc, index) => (
                                        <DocumentDownload doc={doc} key={index} />

                                    ))
                                }

                            </div>
                        </div>
                        {/* ------------------------------------------------------ */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '30px 0px' }}>
                            <Button variant="contained" onClick={editEmployeeDetailFun} style={{ width: '80px', height: '38px' }}>{loading === true ? <CircularProgress color="inherit" size={15} /> : "Save"}</Button>
                        </div>
                    </div>
                </div >
            </div >
            <Toaster />
        </div >
    )
}

export default EditEmployeeDetails