import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateBonusTypeMutation,
  useGetBonusTypeDetailsQuery,
  useGetCompanyIdQuery,
  useUpdateBonusTypeMutation,
} from "../../../features/api";

import FormSkeleton from "../../../skeletons/FormSkeleton";
import { InputBox } from "../../company/BrandInput";

const bonusTypeSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  religion: Yup.string().required("Religion is required"),
});

const BonusTypeForm = ({ bonusTypeId, onClose }) => {
  const navigate = useNavigate();
  const { data: companyId } = useGetCompanyIdQuery();

  const [createBonusType] = useCreateBonusTypeMutation();
  const [updateBonusType] = useUpdateBonusTypeMutation();

  const {
    data: bonusTypeDetails,
    isLoading: isDocsTypeLoading,
    isError,
  } = useGetBonusTypeDetailsQuery(bonusTypeId, { skip: !bonusTypeId });

  if (isDocsTypeLoading && !isError) return <FormSkeleton />;

  const initialValues = {
    title: bonusTypeDetails?.data?.title || "",
    religion: bonusTypeDetails?.data?.religion || "",
  };

  if (companyId == null) {
    navigate("/hrm-setup");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-semibold  dark:text-dark-heading-color mb-4">
          {bonusTypeId ? "Edit Docs Type" : "Add Docs Type"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={bonusTypeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { title, religion } = values;

            try {
              if (!bonusTypeId) {
                await createBonusType({
                  title,
                  religion,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Docs type added successfully");
                    navigate("/hrm-setup");
                    onClose();
                  }
                });
              } else {
                await updateBonusType({
                  bonusTypeId,
                  title,
                  religion,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Docs type updated successfully");
                    onClose();
                  }
                });
              }
            } catch (error) {
              toast.error("An error occurred while submitting the form.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Title
                </label>

                <InputBox name="title" type="text" placeholder="Title" />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="religion"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Religion
                </label>

                <Field
                  as="select"
                  name="religion"
                  id="religion"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm dark:bg-dark-box dark:border-none dark:text-dark-text-color"
                >
                  <option value="">Select Religion</option>
                  <option value="HINDUISM">Hindu</option>
                  <option value="BUDDHISM">Buddish </option>
                  <option value="ISLAM">Islam </option>
                  <option value="BOTH">Both </option>
                </Field>

                <ErrorMessage
                  name="religion"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 px-4 py-2 bg-white rounded-md text-sm font-medium text-gray-800 border border-dark-border-color dark:border-opacity-10 "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#3686FF] rounded-md text-sm font-medium text-white "
                >
                  {bonusTypeId ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BonusTypeForm;
