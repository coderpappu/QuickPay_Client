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
  useGetGradeDetailsQuery,
  useGetLeaveTypeDetailsQuery,
  useGetTypeListQuery,
  useUpdateAllowanceMutation,
  useUpdateDeductionMutation,
  useUpdateGradeMutation,
  useUpdateLeaveTypeMutation,
} from "../../../features/api";

import FormSkeleton from "../../../skeletons/FormSkeleton";

const deductionSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  type: Yup.string().required("Type is required"),
  basic_percentage: Yup.number().required("Basic percentage is required"),
  limit_per_month: Yup.number().required("Limit per month is required"),
});

const DeductionForm = ({ onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: companyId } = useGetCompanyIdQuery();
  const [createDeduction] = useCreateDeductionMutation();
  const [updateDeduction] = useUpdateDeductionMutation();

  const {
    data: types,
    isLoading,
    isError,
  } = useGetTypeListQuery(companyId, {
    skip: !companyId,
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    type: "",
    basic_percentage: "",
    limit_per_month: "",
  });

  const { data: deductionDetails, isLoading: isWeekendLoading } =
    useGetDeductionDetailsQuery(id, { skip: !id });

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
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {id ? "Edit Grade" : "Add Grade"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={deductionSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, type, basic_percentage, limit_per_month } = values;

            try {
              if (!id) {
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
                    toast.success("Deduction added successfully");
                    navigate("/company/deduction");
                    onClose();
                  }
                });
              } else {
                await updateDeduction({
                  id,
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
                    navigate("/company/deduction");
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
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Allowance Type
                </label>
                <Field
                  type="text"
                  name="type"
                  id="type"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm"
                />
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="basic_percentage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Basic Percentage
                </label>
                <Field
                  type="number"
                  name="basic_percentage"
                  id="basic_percentage"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm"
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
                  className="block text-sm font-medium text-gray-700"
                >
                  Limit Per Month
                </label>
                <Field
                  type="number"
                  name="limit_per_month"
                  id="limit_per_month"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm"
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
                  className="mr-4 px-4 py-2 bg-gray-300 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#3686FF] rounded-md text-sm font-medium text-white hover:bg-[#5A21B3]"
                >
                  {id ? "Update" : "Add"}
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
