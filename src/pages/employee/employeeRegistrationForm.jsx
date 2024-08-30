import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EmployeeSchema from "./EmployeeSchema";
import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  useCreateNewEmployeeMutation,
  useGetCompanyIdQuery,
  useGetDepartmentsQuery,
  useGetDesignationsQuery,
  useGetSectionsQuery,
  useGetShiftListQuery,
} from "../../features/api";
import UploadForm from "../../helpers/UploadForm";
import { useState } from "react";
import Box from "@mui/material/Box";

const steps = ["Personal Information", "Status", "Contacts", "Job Details"];

const EmployeeRegistrationForm = () => {
  const { data: CompanyId } = useGetCompanyIdQuery();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // State to track current step
  const { data: departments } = useGetDepartmentsQuery(CompanyId);
  const { data: designations } = useGetDesignationsQuery(CompanyId);
  const { data: sections } = useGetSectionsQuery(CompanyId);
  const { data: shifts } = useGetShiftListQuery(CompanyId);
  const [createEmployee] = useCreateNewEmployeeMutation();

  // multi form state
  const [activeStep, setActiveStep] = useState(0);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    present_address: "",
    permanent_address: "",
    gender: "",
    religion: "MUSLIM",
    birth_date: "",
    joining_date: "",
    terminate_date: "",
    image: "",
    job_status: "PERMANENT",
    reference: "",
    spouse_name: "",
    emergency_contact: "",
    id_type: "NID",
    id_number: "",
    status: "ACTIVE",
    company_id: CompanyId,
    fingerprint_id: "",
    designationId: "",
    departmentId: "",
    sectionId: "",
    shiftId: "",
  };

  const isLastStep = step === 4;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box>
      <div className="w-full  text-center mt-3 mb-7">
        <h2 className="text-2xl font-semibold text-[#0c2580]">
          Employee Registration{" "}
        </h2>
      </div>
      <Stepper activeStep={activeStep} className="my-5">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Button onClick={handleReset}>Reset</Button>
        </React.Fragment>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={EmployeeSchema(step)}
        onSubmit={async (values, { setSubmitting }) => {
          if (isLastStep) {
            try {
              await createEmployee({
                ...values,
                fingerprint_id: "62ad936a-1ccd-418f-84f9-1739abc295b7",
              }).unwrap();
              toast.success("Employee registered successfully");
              navigate("/employee/list");
            } catch (error) {
              toast.error(error?.data?.message);
            } finally {
              setSubmitting(false);
            }
          } else {
            handleNext();
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>

                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    id="phone"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="present_address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Present Address
                  </label>
                  <Field
                    type="text"
                    name="present_address"
                    id="present_address"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="present_address"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="permanent_address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Permanent Address
                  </label>
                  <Field
                    type="text"
                    name="permanent_address"
                    id="permanent_address"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="permanent_address"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    id="gender"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="religion"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Religion
                  </label>
                  <Field
                    as="select"
                    name="religion"
                    id="religion"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Select</option>
                    <option value="ISLAM">ISLAM</option>
                    <option value="HINDUISM">HINDUISM</option>
                    <option value="BUDDHISM">BUDDHISM</option>
                    <option value="OTHER">OTHER</option>
                  </Field>
                  <ErrorMessage
                    name="religion"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="birth_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Birth Date
                  </label>
                  <Field
                    type="date"
                    name="birth_date"
                    id="birth_date"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="birth_date"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="joining_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Joining Date
                  </label>
                  <Field
                    type="date"
                    name="joining_date"
                    id="joining_date"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="joining_date"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="terminate_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Terminate Date
                  </label>

                  <Field
                    type="date"
                    name="terminate_date"
                    id="terminate_date"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="terminate_date"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reference"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Reference
                  </label>

                  <Field
                    type="text"
                    name="reference"
                    id="reference"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="reference"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="job_status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Status
                  </label>

                  <Field
                    type="text"
                    name="job_status"
                    id="job_status"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="job_status"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="spouse_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Spouse Name
                  </label>

                  <Field
                    type="text"
                    name="spouse_name"
                    id="spouse_name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="spouse_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="emergency_contact"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Emergency Contact
                  </label>

                  <Field
                    type="text"
                    name="emergency_contact"
                    id="emergency_contact"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="emergency_contact"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="id_type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Id Type
                  </label>

                  <Field
                    as="select"
                    name="id_type"
                    id="id_type"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="PASSPORT">PASSPORT</option>
                    <option value="NID">NID</option>
                  </Field>

                  <ErrorMessage
                    name="id_type"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="id_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ID Number
                  </label>

                  <Field
                    type="text"
                    name="id_number"
                    id="id_number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="id_number"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="designationId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Designation
                  </label>
                  <Field
                    as="select"
                    name="designationId"
                    id="designationId"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Designation</option>
                    {designations?.data?.map((designation) => (
                      <option key={designation.id} value={designation.id}>
                        {designation.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="designationId"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="departmentId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <Field
                    as="select"
                    name="departmentId"
                    id="departmentId"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Department</option>
                    {departments?.data?.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="departmentId"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sectionId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Section
                  </label>
                  <Field
                    as="select"
                    name="sectionId"
                    id="sectionId"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Select Section</option>
                    {sections?.data?.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="sectionId"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="shiftId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shift
                  </label>
                  <Field
                    as="select"
                    name="shiftId"
                    id="shiftId"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Shift</option>
                    {shifts?.data?.map((shift) => (
                      <option key={shift.id} value={shift.id}>
                        {shift.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="shiftId"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={handlePrevious}
                  variant="outlined"
                >
                  Previous
                </Button>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                variant={isLastStep ? "contained" : "outlined"}
                size={"large"}
              >
                {isLastStep ? "Submit" : "Next"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EmployeeRegistrationForm;
