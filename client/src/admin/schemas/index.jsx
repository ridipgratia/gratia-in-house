import * as Yup from "yup";

export const salaryFormSchema = Yup.object({
    basic_salary: Yup.number().min(2).required("Please enter basic salary"),
    hra: Yup.number().min(2).required("Please enter hra"),
    conveyance: Yup.number().min(2).required("Please enter conveyance"),
    special_allowance: Yup.number().min(2).required("Please enter special allowance"),
    gross_monthly_amount: Yup.number().min(2).required("Please enter gross amount"),
    performance_allowance: Yup.number().min(2).required("Please enter performance allowance"),
    bonus: Yup.number().min(1).required("Please enter bonus"),
    epf: Yup.number().min(2).required("Please enter epf"),
    esic: Yup.number().min(2).required("Please enter esic"),
    professional_tax: Yup.number().min(2).required("Please enter professional tax"),
    ctc_per_month: Yup.number().min(2).required("Please enter ctc per month"),
    ctc_per_annum: Yup.number().min(2).required("Please enter ctc per annum")
});