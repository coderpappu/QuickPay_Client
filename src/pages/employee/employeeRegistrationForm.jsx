import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import {
  useCreateNewEmployeeMutation,
  useGetBranchListQuery,
  useGetCompanyDetailsQuery,
  useGetCompanyIdQuery,
  useGetDepartmentsQuery,
  useGetDesignationsQuery,
  useGetEmployeeDetailsQuery,
  useGetSectionsQuery,
  useGetShiftListQuery,
  useUpdateEmployeeMutation,
} from "../../features/api";

import Box from "@mui/material/Box";
import { useState } from "react";
import LogoUploadCard from "../../components/company/LogoUploadCard";
import EmployeeSchema from "./EmployeeSchema";

const steps = [
  "Personal Information",
  "Status",
  "Contacts",
  "Job Details",
  "Profile",
];

const EmployeeRegistrationForm = () => {
  const { id } = useParams();
  const { data: CompanyId } = useGetCompanyIdQuery();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // State to track current step
  const { data: departments } = useGetDepartmentsQuery(CompanyId);
  const { data: designations } = useGetDesignationsQuery(CompanyId);
  const { data: sections } = useGetSectionsQuery(CompanyId);
  const { data: shifts } = useGetShiftListQuery(CompanyId);
  const { data: branchs } = useGetBranchListQuery(CompanyId);

  const [createEmployee] = useCreateNewEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();

  const { data: companyId, isLoading: isCompanyIdLoading } =
    useGetCompanyIdQuery();

  const { data: companyData } = useGetCompanyDetailsQuery(companyId);

  const [editModeUploader, setEditModeUploader] = useState(false);

  const [imageUrl, setImageUrl] = useState(null);
  // multi form state
  const [activeStep, setActiveStep] = useState(0);

  const [canSubmit, setCanSubmit] = useState(false);

  const {
    data: employeeData,
    isLoading,
    isError,
    error,
  } = useGetEmployeeDetailsQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <ErrorMessage message={error} />;

  const initialValues = {
    name: employeeData?.data?.name || "",
    email: employeeData?.data?.email || "",
    phone: employeeData?.data?.phone || "",
    present_address: employeeData?.data?.present_address || "",
    permanent_address: employeeData?.data?.email || "",
    gender: employeeData?.data?.gender || "",
    religion: employeeData?.data?.religion || "MUSLIM",
    birth_date: employeeData?.data?.birth_date || "",
    joining_date: employeeData?.data?.joining_date || "",
    terminate_date: employeeData?.data?.terminate_date || "",
    image: employeeData?.data?.image || "",
    job_status: employeeData?.data?.job_status || "PERMANENT",
    reference: employeeData?.data?.reference || "",
    spouse_name: employeeData?.data?.spouse_name || "",
    emergency_contact: employeeData?.data?.emergency_contact || "",
    id_type: employeeData?.data?.id_type || "NID",
    id_number: employeeData?.data?.id_number || "",
    status: employeeData?.data?.status || "ACTIVE",
    company_id: CompanyId,
    deviceUserId: employeeData?.data?.deviceUserId || null,
    designationId:
      employeeData?.data?.EmployeeDesignation?.[0]?.designation_id || "",
    branchId: employeeData?.data?.EmployeeBranch?.[0]?.branch_id || "",

    departmentId:
      employeeData?.data?.EmployeeDepartment?.[0]?.department_id || "",
    sectionId: employeeData?.data?.EmployeeSection?.[0]?.section_id || "",
    shiftId: employeeData?.data?.EmployeeShift?.[0]?.shift_id || "",
  };

  const isLastStep = step === 5;

  const handleNext = async () => {
    event.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    event.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Handle file changes to show image preview
  const handleFileChange = (event, fileKey, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      // Set the file object for submission
      setFieldValue(fileKey, file);

      // Create a preview URL for the file and store it in a corresponding preview key
      const previewKey = `${fileKey}Preview`;
      setFieldValue(previewKey, URL.createObjectURL(file));
    }
  };

  /// delete the logo from any online storage.
  // const handleDeleteLogo = () => {
  //   initialValues({
  //     ...initialValues,
  //     image: null,
  //   });
  // };

  const handleUploadComplete = (uploadedImageUrl) => {
    setImageUrl(uploadedImageUrl); // Set uploaded image URL
    setCanSubmit(true); // Allow form submission now that upload is done
  };

  return (
    <Box className="rounded-md px-[10%] py-[5%] dark:bg-dark-card">
      <div className="mb-7 mt-3 w-full text-center">
        <h2 className="text-2xl font-semibold text-[#0c2580] dark:text-dark-heading-color">
          {id ? "Edit Employee" : "Employee Registration"}
        </h2>
      </div>
      <Stepper activeStep={activeStep} className="my-5">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <p className="dark:text-dark-text-color">{label}</p>
            </StepLabel>
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
        initialValues={initialValues} // Use the state that was set with employee data
        validationSchema={EmployeeSchema(step)}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const formData = new FormData();

            formData.append("companyName", companyData?.data?.company_name);
            // formData.append("id", id);

            Object.keys(values).forEach((key) => {
              formData.append(key, values[key]);
            });

            if (id) {
              // Update existing employee

              await updateEmployee(formData).unwrap();
              toast.success("Employee updated successfully");
            } else {
              // Create new employee
              await createEmployee(formData).unwrap();
              toast.success("Employee registered successfully");
            }

            navigate("/company/employee");
          } catch (error) {
            toast.error(error?.data?.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, validateForm, values }) => (
          <Form>
            {step === 1 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Name
                  </label>

                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Phone
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    id="phone"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="present_address"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Present Address
                  </label>
                  <Field
                    type="text"
                    name="present_address"
                    id="present_address"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="present_address"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="permanent_address"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Permanent Address
                  </label>
                  <Field
                    type="text"
                    name="permanent_address"
                    id="permanent_address"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="permanent_address"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Gender
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    id="gender"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  >
                    <option>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="religion"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Religion
                  </label>
                  <Field
                    as="select"
                    name="religion"
                    id="religion"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
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
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="birth_date"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Birth Date
                  </label>
                  <Field
                    type="date"
                    name="birth_date"
                    id="birth_date"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="birth_date"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="joining_date"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Joining Date
                  </label>
                  <Field
                    type="date"
                    name="joining_date"
                    id="joining_date"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="joining_date"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="terminate_date"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Terminate Date
                  </label>

                  <Field
                    type="date"
                    name="terminate_date"
                    id="terminate_date"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="terminate_date"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reference"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Reference
                  </label>

                  <Field
                    type="text"
                    name="reference"
                    id="reference"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="reference"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="job_status"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Job Status
                  </label>

                  <Field
                    type="text"
                    name="job_status"
                    id="job_status"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="job_status"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="spouse_name"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Spouse Name
                  </label>

                  <Field
                    type="text"
                    name="spouse_name"
                    id="spouse_name"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="spouse_name"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="emergency_contact"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Emergency Contact
                  </label>

                  <Field
                    type="text"
                    name="emergency_contact"
                    id="emergency_contact"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="emergency_contact"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="id_type"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Id Type
                  </label>

                  <Field
                    as="select"
                    name="id_type"
                    id="id_type"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  >
                    <option value="PASSPORT">PASSPORT</option>
                    <option value="NID">NID</option>
                  </Field>

                  <ErrorMessage
                    name="id_type"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="id_number"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    ID Number
                  </label>

                  <Field
                    type="text"
                    name="id_number"
                    id="id_number"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="id_number"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="designationId"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Designation
                  </label>
                  <Field
                    as="select"
                    name="designationId"
                    id="designationId"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
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
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="departmentId"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Department
                  </label>
                  <Field
                    as="select"
                    name="departmentId"
                    id="departmentId"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
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
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sectionId"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Section
                  </label>
                  <Field
                    as="select"
                    name="sectionId"
                    id="sectionId"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  >
                    <option value="">Select Section</option>
                    {sections?.data?.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="sectionId"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="shiftId"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Shift
                  </label>
                  <Field
                    as="select"
                    name="shiftId"
                    id="shiftId"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
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
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                {/* branch  */}
                <div>
                  <label
                    htmlFor="branchId"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Branch
                  </label>
                  <Field
                    as="select"
                    name="branchId"
                    id="branchId"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  >
                    <option value="">Select branch</option>
                    {branchs?.data?.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="bran"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="deviceUserId"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                  >
                    Fingerprint Device ID
                  </label>
                  <Field
                    type="string"
                    name="deviceUserId"
                    id="deviceUserId"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="deviceUserId"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <>
                <label htmlFor="image">Upload Image</label>
                <LogoUploadCard
                  title="Profile Photo"
                  handleFileChange={(event) =>
                    handleFileChange(event, "image", setFieldValue)
                  }
                  selectedFile={
                    values.imagePreview || employeeData?.data?.image
                  } // Show the preview image
                  name="image"
                />
              </>
            )}

            <div className="mt-6 flex justify-between">
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
                type="submit" // Always set to button
                onClick={async () => {
                  // Mark fields as touched to show validation messages

                  if (isLastStep) {
                    const errors = await validateForm(); // Validate the entire form
                    if (Object.keys(errors).length === 0) {
                      //handleSubmit(); // If no errors, submit the form
                    } else {
                      toast.error("Please fill all the required fields");
                    }
                  } else {
                    const errors = await validateForm(); // Validate the current step
                    if (Object.keys(errors).length === 0) {
                      handleNext(); // Move to the next step if no errors
                    } else {
                      // Optional: You can display a message or perform other actions here
                    }
                  }
                }}
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
