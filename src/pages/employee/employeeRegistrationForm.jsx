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
  const [canSubmit, setCanSubmit] = useState(true);

  const { data: departments, isLoading } = useGetDepartmentsQuery(CompanyId);
  const { data: designations } = useGetDesignationsQuery(CompanyId);
  const { data: sections } = useGetSectionsQuery(CompanyId);
  const { data: shifts } = useGetShiftListQuery(CompanyId);
  const [createEmployee] = useCreateNewEmployeeMutation();

  const handleDeleteLogo = () => {
    setCanSubmit(true);
    // setFieldValue("logo", null);
  };
  let content;

  if (
    !departments?.data?.length ||
    !designations?.data?.length ||
    !sections?.data?.length ||
    !shifts?.data?.length
  ) {
    content = "Please provide all the data first then create employee";
  } else {
    const initialValues = {
      name: "Nasifa",
      email: "nasifa@gmail.com",
      phone: "23341231231",
      present_address: "sdafsadf",
      permanent_address: "sdfsdaf",
      gender: "male",
      religion: "MUSLIME",
      birth_date: "",
      joining_date: "",
      terminate_date: "",
      image: "",
      job_status: "PERMANENT",
      reference: "pappu",
      spouse_name: "",
      emergency_contact: "012245851451",
      id_type: "NID",
      id_number: "234234234324234",
      status: "ACTIVE",
      company_id: CompanyId,
      fingerprint_id: "065e9d0a-5de2-4f46-bfb3-5e224a0536a3",
      designationId: "",
      departmentId: "",
      sectionId: "",
      shiftId: "",
    };

    content = (
      <Formik
        initialValues={initialValues}
        validationSchema={EmployeeSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Handle form submission logic here
            await createEmployee(values);
            toast.success("Employee registered successfully");
            // navigate("/employee/list");
          } catch (error) {
            toast.error("Something went wrong!");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone", name: "phone", type: "text" },
                {
                  label: "Present Address",
                  name: "present_address",
                  type: "text",
                },
                {
                  label: "Permanent Address",
                  name: "permanent_address",
                  type: "text",
                },
                { label: "Gender", name: "gender", type: "text" },
                { label: "Religion", name: "religion", type: "text" },
                { label: "Birth Date", name: "birth_date", type: "date" },
                { label: "Joining Date", name: "joining_date", type: "date" },
                {
                  label: "Terminate Date",
                  name: "terminate_date",
                  type: "date",
                },
                { label: "Job Status", name: "job_status", type: "text" },
                { label: "Reference", name: "reference", type: "text" },
                { label: "Spouse Name", name: "spouse_name", type: "text" },
                {
                  label: "Emergency Contact",
                  name: "emergency_contact",
                  type: "text",
                },
                { label: "ID Type", name: "id_type", type: "text" },
                { label: "ID Number", name: "id_number", type: "text" },
                { label: "Status", name: "status", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <Field
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="department"
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
                  <option value="">Select a Department</option>
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
                  <option value="">Select a Designation</option>
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
                  <option value="">Select a Section</option>
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
                  <option value="">Select a Shift</option>
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
            {/* <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(event) =>
                  setFieldValue("image", event.currentTarget.files[0])
                }
              />

              

              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div> */}
            <UploadForm
              setFieldValue={setFieldValue}
              canSubmit={canSubmit}
              setCanSubmit={setCanSubmit}
            />
            <div className="mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
  return content;
};

export default EmployeeRegistrationForm;
