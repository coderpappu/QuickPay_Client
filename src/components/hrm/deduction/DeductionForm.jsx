import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateAllowanceMutation,
  useCreateDeductionMutation,
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
import { InputBox } from "../../company/BrandInput";

const deductionSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  type: Yup.string().required("Type is required"),
  basic_percentage: Yup.number().required("Basic percentage is required"),
  limit_per_month: Yup.number().required("Limit per month is required"),
});

const DeductionForm = ({ deductionId, onClose }) => {
  const navigate = useNavigate();

  const { data: companyId } = useGetCompanyIdQuery();
  const [createDeduction] = useCreateDeductionMutation();
  const [updateDeduction] = useUpdateDeductionMutation();

  const {
    data: deductionTypes,
    isLoading,
    isError,
  } = useGetDeductionListQuery(companyId, {
    skip: !companyId,
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    type: "",
    basic_percentage: "",
    limit_per_month: "",
  });

  const { data: deductionDetails, isLoading: isWeekendLoading } =
    useGetDeductionDetailsQuery(deductionId, { skip: !deductionId });

  useEffect(() => {
    if (deductionDetails?.data) {
      setInitialValues({
        name: deductionDetails?.data?.name,
        type: deductionDetails?.data?.type,
        basic_percentage: deductionDetails?.data?.basic_percentage,
        limit_per_month: deductionDetails?.data?.limit_per_month,
      });
    }
  }, [deductionDetails]);

  if (companyId == null) {
    navigate("/");
  }

  if (isWeekendLoading || isLoading) {
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
          {deductionId ? "Edit Allowance" : "Add Allowance"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={deductionSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, type, basic_percentage, limit_per_month } = values;

            try {
              if (!deductionId) {
                await createDeduction({
                  name,
                  type,
                  basic_percentage,
                  limit_per_month,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Allowance added successfully");
                    navigate("/company/allowance");
                    onClose();
                  }
                });
              } else {
                await updateDeduction({
                  id: deductionId,
                  name,
                  type,
                  basic_percentage,
                  limit_per_month,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Deduction updated successfully");
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
                  htmlFor="type"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Deduction Type
                </label>

                <InputBox name="type" type="text" placeholder="Type" />
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="basic_percentage"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Basic Percentage
                </label>

                <InputBox
                  name="basic_percentage"
                  type="number"
                  placeholder="Basic Percentage"
                />
                <ErrorMessage
                  name="basic_percentage"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="limit_per_month"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Limit Per Month
                </label>

                <InputBox
                  name="limit_per_month"
                  type="number"
                  placeholder="Limit per month"
                />
                <ErrorMessage
                  name="limit_per_month"
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
                  {deductionId ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DeductionForm;