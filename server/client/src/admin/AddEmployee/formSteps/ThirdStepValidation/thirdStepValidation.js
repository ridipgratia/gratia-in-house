import * as Yup from 'yup';

export const salaryValidationSchema = Yup.object().shape({
    basic_salary: Yup.number().required('Basic salary is required.'),
    hra: Yup.number().required('HRA is required.'),
    conveyance: Yup.number().required('Coneyance is required.'),
    special_allowance: Yup.number().required('Special allowance is required.'),
    bonus: Yup.number().required('bonus is required.'),
    performance_allowance: Yup.number().required('Performance allowance is required.'),
    epf: Yup.number().required('EPF is required.'),
    esic: Yup.number().required('ESIC is required.'),
    professional_tax: Yup.number().required('Tax field is required'),
    gross_monthly_amount: Yup.number().required('Gross salary  is required'),
    ctc_per_month: Yup.number().required('CTC per month is required'),
    ctc_per_annum: Yup.number().required('CTC per annum is required.')
});