import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateLoanTypeMutation,
  useGetLoanDetailsQuery,
  useGetTypeListQuery,
  useUpdateLoanTypeMutation,
} from "../../../../features/api";

import { useSelector } from "react-redux";
import FormSkeleton from "../../../../skeletons/FormSkeleton";

const loanTypeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  interestRate: Yup.number().required("Interest rate is required"),
  maxLoanAmount: Yup.number().required("Max Amount is required"),
});

const LoanTypeForm = ({ onClose, loanTypeId }) => {
  const navigate = useNavigate();

  const companyId = useSelector((state) => state.company.companyId);
  const [createLoanType] = useCreateLoanTypeMutation();
  const [updateLoanType] = useUpdateLoanTypeMutation();

  const {
    data: types,
    isLoading,
    isError,
  } = useGetTypeListQuery(companyId, {
    skip: !companyId,
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    interestRate: "",
    maxLoanAmount: "",
  });

  const { data: loanTypeDetails, isLoading: isWeekendLoading } =
    useGetLoanDetailsQuery(loanTypeId);

  useEffect(() => {
    if (loanTypeDetails?.data) {
      setInitialValues({
        name: loanTypeDetails?.data?.name,
        interestRate: loanTypeDetails?.data?.interestRate,
        maxLoanAmount: loanTypeDetails?.data?.maxLoanAmount,
      });
    }
  }, [loanTypeDetails]);

  if (companyId == null) {
    navigate("/");
  }

  if (isWeekendLoading || isLoading) {
    return <FormSkeleton />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          {loanTypeId ? "Edit Loan Type" : "Add Loan Type "}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={loanTypeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, interestRate, maxLoanAmount } = values;

            try {
              if (!loanTypeId) {
                await createLoanType({
                  name,
                  interestRate,
                  maxLoanAmount,
                  companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Loan added successfully");
                    navigate("/company/loan/type");
                    onClose();
                  }
                });
              } else {
                await updateLoanType({
                  id: loanTypeId,
                  name,
                  interestRate,
                  maxLoanAmount,
                  companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Loan type updated successfully");
                    navigate("/company/loan/type");
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="interestRate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Interest Rate
                </label>
                <Field
                  type="number"
                  name="interestRate"
                  id="interestRate"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm"
                />
                <ErrorMessage
                  name="interestRate"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="maxLoanAmount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Max Amount
                </label>
                <Field
                  type="number"
                  name="maxLoanAmount"
                  id="maxLoanAmount"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm"
                />
                <ErrorMessage
                  name="maxLoanAmount"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-[#3686FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5A21B3]"
                >
                  {loanTypeId ? "Update" : "Add"}
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
