import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateDepartmentMutation,
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

  const company_id = useSelector((state) => state.company.companyId);
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
          <Form className="mx-auto max-w-4xl px-4 py-6">
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-none dark:bg-dark-box dark:text-dark-text-color"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#3686FF] px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
