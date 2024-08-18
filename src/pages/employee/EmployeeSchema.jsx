import * as Yup from "yup";

const EmployeeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone Number is required")
    .length(11, "Phone Number must be exactly 11 characters"),
  present_address: Yup.string().required("Present Address is required"),
  permanent_address: Yup.string().required("Permanent Address is required"),
  gender: Yup.string().required("Gender is required"),
  religion: Yup.string().required("Religion is required"),
  birth_date: Yup.date().required("Birth Date is required"),
  joining_date: Yup.date().required("Joining Date is required"),
  terminate_date: Yup.date().notRequired(),
  image: Yup.mixed().notRequired(),
  job_status: Yup.string().required("Job Status is required"),
  reference: Yup.string().required("Reference is required"),
  spouse_name: Yup.string().notRequired(),
  emergency_contact: Yup.string()
    .required("Emergency Contact is required")
    .length(11, "Emergency Contact must be exactly 11 characters"),
  id_type: Yup.string().required("ID Type is required"),
  id_number: Yup.string().required("ID Number is required"),
  status: Yup.string().required("Status is required"),
});

export default EmployeeSchema;
