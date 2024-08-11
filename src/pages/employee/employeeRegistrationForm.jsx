import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

const EmployeeRegistrationForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "Nasifa",
    email: "nasifa@gmail.com",
    phone: "23341231231",
    present_address: "sdafsadf",
    permanent_address: "sdfsdaf",
    gender: "male",
    religion: "MUSLIM",
    birth_date: "",
    joining_date: "",
    terminate_date: "",
    image: null,
    job_status: "PERMANENT",
    reference: "pappu",
    spouse_name: "",
    emergency_contact: "012245851451",
    id_type: "NID",
    id_number: "234234234324234",
    status: "ACTIVE",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EmployeeSchema}
      onSubmit={(values, { setSubmitting }) => {
        try {
          // Handle form submission logic here
          toast.success("Employee registered successfully");
          navigate("/employee/list");
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
              { label: "Terminate Date", name: "terminate_date", type: "date" },
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
            </div>
          </div>
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
};

export default EmployeeRegistrationForm;
