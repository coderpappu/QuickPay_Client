import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
    useCreateDepartmentMutation,
    useGetCompanyIdQuery,
    useGetDepartmentDetailsQuery,
    useUpdateDepartmentMutation,
} from "../../features/api";

const DepartmentSchema = Yup.object().shape({
  name: Yup.string().required("Department Name is required"),
});

const DepartmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [createDepartment, { isLoading, isError, isSuccess, error }] =
    useCreateDepartmentMutation();

  const [updateDept] = useUpdateDepartmentMutation();

  const { data: company_id } = useGetCompanyIdQuery();

  const { data: departmentData } = useGetDepartmentDetailsQuery(id);

  let name = departmentData?.data?.name;

  const initialValues = {
    name: name || "",
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={DepartmentSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (!id) {
              await createDepartment({
                ...values,
                company_id: company_id,
              }).unwrap(); // Unwrap the promise for proper error handling

              resetForm(); // Reset Formik form state
            } else {
              await updateDept({
                id,
                ...values,
                company_id: company_id,
              }).unwrap(); // Unwrap the promise for proper error handling

              resetForm(); // Reset Formik form state
            }

            toast.success("Department saved successfully!");
            navigate("/department/list"); // Redirect to a list or another page
          } catch (error) {
            toast.error(error?.data?.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-4xl mx-auto px-4 py-6">
            <div className="space-y-4">
              {/* Form field for department name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department Name
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
            </div>
            <div className="mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? "Saving..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default DepartmentForm;
