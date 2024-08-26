import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EmployeeSchema from "./EmployeeSchema";
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

const EmployeeRegistrationForm = () => {
  const { data: CompanyId } = useGetCompanyIdQuery();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // State to track current step
  const [canSubmit, setCanSubmit] = useState(true);

  const { data: departments } = useGetDepartmentsQuery(CompanyId);
  const { data: designations } = useGetDesignationsQuery(CompanyId);
  const { data: sections } = useGetSectionsQuery(CompanyId);
  const { data: shifts } = useGetShiftListQuery(CompanyId);
  const [createEmployee] = useCreateNewEmployeeMutation();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    present_address: "",
    permanent_address: "",
    gender: "male",
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

  const handleNext = () => setStep((prev) => prev + 1, console.log(step));
  const handlePrevious = () => setStep((prev) => prev - 1);

  const isLastStep = step === 3;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EmployeeSchema}
      onSubmit={async (values, { setSubmitting }) => {
        if (isLastStep) {
          try {
            await createEmployee(values).unwrap();
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
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
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
                  <option value="MUSLIM">Muslim</option>
                  <option value="HINDU">Hindu</option>
                  <option value="CHRISTIAN">Christian</option>
                  <option value="BUDDHIST">Buddhist</option>
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
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <UploadForm onUpload={(url) => setFieldValue("image", url)} />
                <ErrorMessage
                  name="image"
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
                  htmlFor="job_status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Status
                </label>
                <Field
                  as="select"
                  name="job_status"
                  id="job_status"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="PERMANENT">Permanent</option>
                  <option value="PROBATION">Probation</option>
                  <option value="CONTRACT">Contract</option>
                </Field>
                <ErrorMessage
                  name="job_status"
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
                  ID Type
                </label>
                <Field
                  as="select"
                  name="id_type"
                  id="id_type"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="NID">NID</option>
                  <option value="PASSPORT">Passport</option>
                  <option value="DRIVING_LICENSE">Driving License</option>
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
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <Field
                  as="select"
                  name="status"
                  id="status"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-600 text-white rounded-md"
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              {isLastStep ? "Submit" : "Next"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeRegistrationForm;
