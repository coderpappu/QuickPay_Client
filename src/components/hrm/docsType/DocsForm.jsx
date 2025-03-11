import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateDocsTypeMutation,
  useGetDocsTypeDetailsQuery,
  useUpdateDocsTypeMutation,
} from "../../../features/api";

import { useSelector } from "react-redux";
import FormSkeleton from "../../../skeletons/FormSkeleton";
import { InputBox } from "../../company/BrandInput";

const docsTypeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  status: Yup.string().required("Status is required"),
});
const DocsTypeForm = ({ docsTypeId, onClose }) => {
  const navigate = useNavigate();
  const companyId = useSelector((state) => state.company.companyId);
  const [createDocsType] = useCreateDocsTypeMutation();
  const [updateDocsType] = useUpdateDocsTypeMutation();

  const {
    data: docsTypeDetails,
    isLoading: isDocsTypeLoading,
    isError,
  } = useGetDocsTypeDetailsQuery(docsTypeId, { skip: !docsTypeId });

  if (isDocsTypeLoading && !isError) return <FormSkeleton />;

  const initialValues = {
    name: docsTypeDetails?.data?.name || "",
    status: docsTypeDetails?.data?.status || "",
  };

  if (companyId == null) {
    navigate("/hrm-setup");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-dark-card">
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="mb-4 text-xl font-semibold dark:text-dark-heading-color">
          {docsTypeId ? "Edit Docs Type" : "Add Docs Type"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={docsTypeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, status } = values;

            try {
              if (!docsTypeId) {
                await createDocsType({
                  name,
                  status,
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
                await updateDocsType({
                  id: docsTypeId,
                  name,
                  status,
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
                  Name
                </label>

                <InputBox name="name" type="text" placeholder="Name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="basic_salary"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Status
                </label>

                <Field
                  as="select"
                  name="status"
                  id="status"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-none dark:bg-dark-box dark:text-dark-text-color"
                >
                  <option value="">Select Status</option>
                  <option value="IS_REQUIRED">Is Required</option>
                  <option value="NOT_REQUIRED">Not Required </option>
                </Field>

                {/* <SelectOptionBox name="" values={["Active"]} /> */}

                <ErrorMessage
                  name="status"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 rounded-md border border-dark-border-color bg-white px-4 py-2 text-sm font-medium text-gray-800 dark:border-opacity-10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-[#3686FF] px-4 py-2 text-sm font-medium text-white"
                >
                  {docsTypeId ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DocsTypeForm;
