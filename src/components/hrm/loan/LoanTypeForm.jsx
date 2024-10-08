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
  useCreateLoanTypeMutation,
  useGetAllowanceDetailsQuery,
  useGetCompanyIdQuery,
  useGetDeductionDetailsQuery,
  useGetDeductionListQuery,
  useGetGradeDetailsQuery,
  useGetLeaveTypeDetailsQuery,
  useGetLoanDetailsQuery,
  useGetTypeListQuery,
  useUpdateAllowanceMutation,
  useUpdateDeductionMutation,
  useUpdateGradeMutation,
  useUpdateLeaveTypeMutation,
  useUpdateLoanTypeMutation,
} from "../../../features/api";

import FormSkeleton from "../../../skeletons/FormSkeleton";
import { InputBox } from "../../company/BrandInput";

const loanTypeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  interestRate: Yup.string().required("Interest rate is required"),
  maxAmount: Yup.string().required("Max amount is required"),
});

const LoanTypeForm = ({ loanTypeId, onClose }) => {
  const navigate = useNavigate();
  const { data: companyId } = useGetCompanyIdQuery();
  const [createLoanType] = useCreateLoanTypeMutation();
  const [updateLoanType] = useUpdateLoanTypeMutation();

  const {
    data: loanTypeDetails,
    isLoading,
    isError,
  } = useGetLoanDetailsQuery(loanTypeId, {
    skip: !loanTypeId,
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    interestRate: "",
    maxAmount: "",
  });

  useEffect(() => {
    if (loanTypeDetails?.data) {
      setInitialValues({
        name: loanTypeDetails?.data?.name,
        interestRate: loanTypeDetails?.data?.interestRate,
        maxAmount: loanTypeDetails?.data?.maxLoanAmount,
      });
    }
  }, [loanTypeDetails]);

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
          {loanTypeId ? "Edit Loan Type" : "Add Loan Type"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={loanTypeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, interestRate, maxAmount } = values;
            try {
              if (!loanTypeId) {
                await createLoanType({
                  name,
                  interestRate,
                  maxLoanAmount: maxAmount,
                  companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Loan type added successfully");
                    onClose();
                  }
                });
              } else {
                await updateLoanType({
                  id: loanTypeId,
                  name,
                  interestRate,
                  maxLoanAmount: maxAmount,
                  companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Loan type updated successfully");
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
                  htmlFor="interestRate"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Interest Rate
                </label>

                <InputBox name="interestRate" type="number" />
                <ErrorMessage
                  name="interestRate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="maxAmount"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Max Amount
                </label>

                <InputBox
                  name="maxAmount"
                  type="number"
                  placeholder="Max Loan Amount"
                />
                <ErrorMessage
                  name="maxAmount"
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
                  {loanTypeId ? "Update" : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoanTypeForm;
