import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import {
  useCreateBranchMutation,
  useGetBranchDetailsQuery,
  useGetCompanyIdQuery,
  useUpdateBranchMutation,
} from "../../../features/api";

import FormSkeleton from "../../../skeletons/FormSkeleton";

const branchSchema = Yup.object().shape({
  name: Yup.string().required("Department Name is required"),
});

// eslint-disable-next-line react/prop-types
const BranchForm = ({ branchId, setIsPopupOpen }) => {
  const { id } = useParams();

  const [createBranch, { isLoading, isError, isSuccess, error }] =
    useCreateBranchMutation();

  const [updateBranch] = useUpdateBranchMutation();

  const { data: company_id } = useGetCompanyIdQuery();

  const {
    data: branchData,
    isLoading: branchLoading,
    isError: branchError,
  } = useGetBranchDetailsQuery(branchId, { skip: !branchId });

  if (branchLoading && !branchError) return <FormSkeleton />;

  if (!branchLoading && branchError)
    return <ErrorMessage message={error?.data?.message} />;

  let name = branchData?.data?.name;

  const initialValues = {
    name: name || "",
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={branchSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (branchId == null) {
              await createBranch({
                ...values,
                company_id: company_id,
              }).unwrap(); // Unwrap the promise for proper error handling
              setIsPopupOpen(false);
              resetForm(); // Reset Formik form state\
            } else {
              await updateBranch({
                id: branchId,
                ...values,
                company_id: company_id,
              }).unwrap(); // Unwrap the promise for proper error handling
              setIsPopupOpen(false);
              resetForm(); // Reset Formik form state
            }

            toast.success("Branch saved successfully!");
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
                  Branch Name
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

export default BranchForm;
