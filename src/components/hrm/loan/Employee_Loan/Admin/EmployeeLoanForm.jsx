import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useGetAppliedLoanDetailsQuery,
  useGetCompanyIdQuery,
  useGetLoanTypeListQuery,
  useUpdateAppliedLoanMutation,
  useUpdateLoanApplicationApprovalMutation,
} from "../../../../../features/api";

const loanSchema = Yup.object().shape({
  loanType_id: Yup.string().required("Loan Type is required"),
  amount: Yup.number().required("Amount is required"),
  installment_month: Yup.number().required("Installment Month is required"),
  // approval_interest_rate: Yup.number().when("status", {
  //   is: "APPROVED",
  //   then: Yup.number().required("Approval Interest Rate is required"),
  //   otherwise: Yup.number().notRequired(),
  // }),
  // issue_date: Yup.date().when("status", {
  //   is: "APPROVED",
  //   then: Yup.date().required("Issue Date is required"),
  //   otherwise: Yup.date().notRequired(),
  // }),
  // repayment_start_date: Yup.date().when("status", {
  //   is: "APPROVED",
  //   then: Yup.date().required("Repayment Start Date is required"),
  //   otherwise: Yup.date().notRequired(),
  // }),
  // repayment_end_date: Yup.date().when("status", {
  //   is: "APPROVED",
  //   then: Yup.date().required("Repayment End Date is required"),
  //   otherwise: Yup.date().notRequired(),
  // }),
  status: Yup.string().required("Status is required"),
});

const EmployeeLoanForm = ({ selectId, setIsPopupOpen }) => {
  const { data: companyId } = useGetCompanyIdQuery();
  const { data: loanTypes } = useGetLoanTypeListQuery(companyId);
  const [loanApprovalUpdate] = useUpdateLoanApplicationApprovalMutation();
  const { data: loanDetails, isLoading } = useGetAppliedLoanDetailsQuery(
    selectId,
    {
      skip: !selectId,
    },
  );

  const [initialValues, setInitialValues] = useState({
    loanType_id: "",
    amount: "",
    installment_month: "",
    approval_interest_rate: "",
    issue_date: "",
    repayment_start_date: "",
    repayment_end_date: "",
    status: "PENDING",
  });

  const [updateLoan] = useUpdateAppliedLoanMutation();

  useEffect(() => {
    if (loanDetails?.data) {
      setInitialValues({
        loanType_id: loanDetails?.data?.loanType_id,
        amount: loanDetails?.data?.amount,
        installment_month: loanDetails?.data?.installment_month,
        approval_interest_rate: loanDetails?.data?.approval_interest_rate,
        issue_date: loanDetails?.data?.issue_date
          ? new Date(loanDetails?.data?.issue_date).toISOString().split("T")[0]
          : "",
        repayment_start_date: loanDetails?.data?.repayment_start_date
          ? new Date(loanDetails?.data?.repayment_start_date)
              .toISOString()
              .split("T")[0]
          : "",
        repayment_end_date: loanDetails?.data?.repayment_end_date
          ? new Date(loanDetails?.data?.repayment_end_date)
              .toISOString()
              .split("T")[0]
          : "",
        status: loanDetails?.data?.loan_status || "PENDING",
      });
    }
  }, [loanDetails]);

  const handleLoanTypeChange = (e, setFieldValue) => {
    const selectedLoanType = loanTypes?.data?.find(
      (type) => type.id === e.target.value,
    );
    if (selectedLoanType) {
      setFieldValue("amount", selectedLoanType.maxLoanAmount);
    }
    setFieldValue("loanType_id", e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-dark-card">
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => setIsPopupOpen(false)}
        >
          &#x2715;
        </button>
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          Apply for Loan
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={loanSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const {
              loanType_id,
              amount,
              installment_month,
              approval_interest_rate,
              issue_date,
              repayment_start_date,
              repayment_end_date,
              status,
            } = values;

            try {
              await loanApprovalUpdate({
                loanId: selectId,
                loanType_id,
                amount,
                installment_month,
                approval_interest_rate:
                  status === "APPROVED" ? approval_interest_rate : null,
                issue_date: status === "APPROVED" ? issue_date : null,
                repayment_start_date:
                  status === "APPROVED" ? repayment_start_date : null,
                repayment_end_date:
                  status === "APPROVED" ? repayment_end_date : null,
                loan_status: status,
                company_id: companyId,
              }).then((res) => {
                if (res.error) {
                  toast.error(res?.error?.data?.message);
                } else {
                  toast.success("Loan application updated successfully");
                  setIsPopupOpen(false);
                }
              });
            } catch (error) {
              toast.error("An error occurred while submitting the form.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="loanType_id"
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                >
                  Loan Type
                </label>
                <Field
                  as="select"
                  name="loanType_id"
                  id="loanType_id"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-none dark:bg-dark-box dark:text-dark-text-color"
                  onChange={(e) => handleLoanTypeChange(e, setFieldValue)}
                >
                  <option value="">Select Loan Type</option>
                  {loanTypes?.data?.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="loanType_id"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                >
                  Amount
                </label>
                <Field
                  type="number"
                  name="amount"
                  id="amount"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-none dark:bg-dark-box dark:text-dark-text-color"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="installment_month"
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                >
                  Installment Month
                </label>
                <Field
                  type="number"
                  name="installment_month"
                  id="installment_month"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-none dark:bg-dark-box dark:text-dark-text-color"
                />
                <ErrorMessage
                  name="installment_month"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                >
                  Status
                </label>
                <Field
                  as="select"
                  name="status"
                  id="status"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-none dark:bg-dark-box dark:text-dark-text-color"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {values.status === "APPROVED" && (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="approval_interest_rate"
                      className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                    >
                      Approval Interest Rate
                    </label>
                    <Field
                      type="number"
                      name="approval_interest_rate"
                      id="approval_interest_rate"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-none dark:bg-dark-box dark:text-dark-text-color"
                    />
                    <ErrorMessage
                      name="approval_interest_rate"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="issue_date"
                      className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                    >
                      Issue Date
                    </label>
                    <Field
                      type="date"
                      name="issue_date"
                      id="issue_date"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-none dark:bg-dark-box dark:text-dark-text-color"
                    />
                    <ErrorMessage
                      name="issue_date"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="repayment_start_date"
                      className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                    >
                      Repayment Start Date
                    </label>
                    <Field
                      type="date"
                      name="repayment_start_date"
                      id="repayment_start_date"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-none dark:bg-dark-box dark:text-dark-text-color"
                    />
                    <ErrorMessage
                      name="repayment_start_date"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="repayment_end_date"
                      className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                    >
                      Repayment End Date
                    </label>
                    <Field
                      type="date"
                      name="repayment_end_date"
                      id="repayment_end_date"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-none dark:bg-dark-box dark:text-dark-text-color"
                    />
                    <ErrorMessage
                      name="repayment_end_date"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 dark:bg-dark-box dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-[#3686FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5A21B3]"
                >
                  Apply
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeLoanForm;
