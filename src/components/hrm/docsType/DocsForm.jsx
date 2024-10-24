import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateAllowanceMutation,
  useCreateDeductionMutation,
  useCreateDocsTypeMutation,
  useCreateGradeMutation,
  useCreateLeaveTypeMutation,
  useGetAllowanceDetailsQuery,
  useGetCompanyIdQuery,
  useGetDeductionDetailsQuery,
  useGetDeductionListQuery,
  useGetGradeDetailsQuery,
  useGetLeaveTypeDetailsQuery,
  useGetTypeListQuery,
  useUpdateAllowanceMutation,
  useUpdateDeductionMutation,
  useUpdateGradeMutation,
  useUpdateLeaveTypeMutation,
} from "../../../features/api";

import FormSkeleton from "../../../skeletons/FormSkeleton";
import { InputBox, SelectOptionBox } from "../../company/BrandInput";

const docsTypeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  status: Yup.string().required("Status is required"),
});

const DocsTypeForm = ({ gradeId, onClose }) => {
  const navigate = useNavigate();
  const { data: companyId } = useGetCompanyIdQuery();
  const [createDocsType] = useCreateDocsTypeMutation();
  const [updateGrade] = useUpdateGradeMutation();

  const {
    data: deductionTypes,
    isLoading,
    isError,
  } = useGetDeductionListQuery(companyId, {
    skip: !companyId,
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    status: "",
  });

  const { data: gradeDetails, isLoading: gradeLoading } =
    useGetGradeDetailsQuery(gradeId, { skip: !gradeId });

  useEffect(() => {
    if (gradeDetails?.data) {
      setInitialValues({
        name: gradeDetails?.data?.name,
        basic_salary: gradeDetails?.data?.basic_salary,
        overtime_rate: gradeDetails?.data?.overtime_rate,
      });
    }
  }, [gradeDetails]);

  if (companyId == null) {
    navigate("/");
  }

  if (gradeLoading || isLoading) {
    return <FormSkeleton />;
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
          {gradeId ? "Edit Docs Type" : "Add Docs Type"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={docsTypeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, status } = values;

            try {
              if (!gradeId) {
                await createDocsType({
                  name,
                  status,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Docs type added successfully");
                    navigate("/company/allowance");
                    onClose();
                  }
                });
              } else {
                await updateGrade({
                  id: gradeId,
                  name,
                  status,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Grade updated successfully");
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
                  className="text-red-500 text-sm mt-1"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm dark:bg-dark-box dark:border-none dark:text-dark-text-color"
                >
                  <option value="">Select Status</option>
                  <option value="IS_REQUIRED">Is Required</option>
                  <option value="NOT_REQUIRED">Not Required </option>
                </Field>

                {/* <SelectOptionBox name="" values={["Active"]} /> */}

                <ErrorMessage
                  name="status"
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
                  {gradeId ? "Update" : "Add"}
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
