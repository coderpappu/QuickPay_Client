import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import {
  useCreateNewDesignationMutation,
  useGetCompanyIdQuery,
  useGetDesignationDetailsQuery,
  useGetDesignationsQuery,
  useUpdateDesignationMutation,
} from "../../../features/api";

import CardSkeleton from "../../skeletons/hrm-card-skeletons/card";

const designationSchema = Yup.object().shape({
  name: Yup.string().required("Designation name is required"),
});

// eslint-disable-next-line react/prop-types
const DesignationForm = ({ designationId, setIsPopupOpen }) => {
  const navigate = useNavigate();

  const [createDesignation, { isLoading, isError, isSuccess, error }] =
    useCreateNewDesignationMutation();

  const [updateDesignation] = useUpdateDesignationMutation();

  const { data: company_id } = useGetCompanyIdQuery();

  const {
    data: designationData,
    isLoading: designationLoading,
    isError: designationError,
  } = useGetDesignationDetailsQuery(designationId, { skip: !designationId });

  if (designationLoading && !designationError) return <CardSkeleton />;
  if (!designationLoading && designationError)
    return <ErrorMessage message={error?.data?.message} />;

  let name = designationData?.data?.name;

  const initialValues = {
    name: name || "",
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={designationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (designationId == null) {
              await createDesignation({
                ...values,
                company_id: company_id,
              }).unwrap(); // Unwrap the promise for proper error handling
              setIsPopupOpen(false);
              resetForm(); // Reset Formik form state\
            } else {
              await updateDesignation({
                id: designationId,
                ...values,
                company_id: company_id,
              }).unwrap(); // Unwrap the promise for proper error handling
              setIsPopupOpen(false);
              resetForm(); // Reset Formik form state
            }

            toast.success("Desigantion saved successfully!");
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
              {/* Form field for designation name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                >
                  Designation Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-none dark:bg-dark-box dark:text-dark-text-color rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

export default DesignationForm;
