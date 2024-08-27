import * as Yup from "yup";

// Step 1 Validation Schema
const Step1Schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone Number is required")
    .length(11, "Phone Number must be exactly 11 characters"),
  present_address: Yup.string().required("Present Address is required"),
  permanent_address: Yup.string().required("Permanent Address is required"),
  gender: Yup.string()
    .required("Gender is required")
    .notOneOf([""], "Please select a valid option"),
});

// Step 2 Validation Schema
const Step2Schema = Yup.object({
  religion: Yup.string().required("Religion is required"),
  birth_date: Yup.date().required("Birth Date is required"),
  joining_date: Yup.date().required("Joining Date is required"),
  terminate_date: Yup.date().notRequired(),
  reference: Yup.string().required("Reference is required"),
  status: Yup.string().required("Status is required"),
});

// Step 3 Validation Schema
const Step3Schema = Yup.object({
  spouse_name: Yup.string().notRequired(),
  emergency_contact: Yup.string()
    .required("Emergency Contact is required")
    .length(11, "Emergency Contact must be exactly 11 characters"),
  id_type: Yup.string().required("ID Type is required"),
  id_number: Yup.string().required("ID Number is required"),
});

const Step4Schema = Yup.object({
  designationId: Yup.string()
    .required("Designation is required")
    .notOneOf([""], "Please select a valid option"),
  departmentId: Yup.string()
    .required("Department is required")
    .notOneOf([""], "Please select a valid option"),
  sectionId: Yup.string()
    .required("Section is required")
    .notOneOf([""], "Please select a valid option"),
  shiftId: Yup.string()
    .required("Shift is required")
    .notOneOf([""], "Please select a valid option"),
  image: Yup.mixed().notRequired(),
});

const EmployeeSchema = (step) => {
  switch (step) {
    case 1:
      return Step1Schema;
    case 2:
      return Step2Schema;
    case 3:
      return Step3Schema;
    case 4:
      return Step3Schema;
    default:
      return Step1Schema;
  }
};

export default EmployeeSchema;
