import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import {
  useCreateNewSectionMutation,
  useGetCompanyIdQuery,
  useUpdateSectionMutation,
  useGetSectionDetailsQuery,
} from "../../../features/api";

import CardSkeleton from "../../skeletons/hrm-card-skeletons/card";

const sectionSchema = Yup.object().shape({
  name: Yup.string().required("Section name is required"),
});

const SectionForm = ({ sectionId, setIsPopupOpen }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [createSection, { isLoading, isError, isSuccess, error }] =
    useCreateNewSectionMutation();

  const [updateSection] = useUpdateSectionMutation();

  const { data: company_id } = useGetCompanyIdQuery();

  const {
    data: sectionDetails,
    isLoading: sectionLoading,
    isError: sectionError,
  } = useGetSectionDetailsQuery(sectionId, { skip: !sectionId });

  if (sectionLoading && !sectionError) return <CardSkeleton />;
  if (!sectionLoading && sectionError)
    return <ErrorMessage message={error?.data?.message} />;

  const initialValues = {
    name: sectionDetails?.data?.name || "",
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={sectionSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (sectionId == null) {
              await createSection({
                ...values,
                company_id: company_id,
              }).unwrap(); // Unwrap the promise for proper error handling
              setIsPopupOpen(false);
              resetForm(); // Reset Formik form state\
            } else {
              await updateSection({
                id: sectionId,
                ...values,
                company_id: company_id,
              }).unwrap(); // Unwrap the promise for proper error handling
              setIsPopupOpen(false);
              resetForm(); // Reset Formik form state
            }

            toast.success("Section saved successfully!");
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
              {/* Form field for section name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                >
                  Section Name
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

export default SectionForm;
