import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import {
  useCreateDepartmentMutation,
  useGetCompanyIdQuery,
  useGetDepartmentDetailsQuery,
  useUpdateDepartmentMutation,
} from "../../../features/api";
import CardSkeleton from "../../../skeletons/card";

const DepartmentSchema = Yup.object().shape({
  name: Yup.string().required("Department Name is required"),
});

// eslint-disable-next-line react/prop-types
const DepartmentForm = ({ departmentId, setIsPopupOpen }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [createDepartment, { isLoading, isError, isSuccess, error }] =
    useCreateDepartmentMutation();

  const [updateDept] = useUpdateDepartmentMutation();

  const { data: company_id } = useGetCompanyIdQuery();

  const {
    data: departmentData,
    isLoading: departmentLoading,
    isError: departmentError,
  } = useGetDepartmentDetailsQuery(departmentId, { skip: !departmentId });

  if (departmentLoading && !departmentError) return <CardSkeleton />;
  if (!departmentLoading && departmentError)
    return <ErrorMessage message={error?.data?.message} />;

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
            if (departmentId == null) {
              await createDepartment({
                ...values,
                company_id: company_id,
              }).unwrap(); // Unwrap the promise for proper error handling
              setIsPopupOpen(false);
              resetForm(); // Reset Formik form state\
            } else {
              await updateDept({
                id: departmentId,
                ...values,
                company_id: company_id,
              }).unwrap(); // Unwrap the promise for proper error handling
              setIsPopupOpen(false);
              resetForm(); // Reset Formik form state
            }

            toast.success("Department saved successfully!");
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
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                >
                  Department Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-dark-box dark:border-none dark:text-dark-text-color"
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
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3686FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
