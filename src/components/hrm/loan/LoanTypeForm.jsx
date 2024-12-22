import { ErrorMessage, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateLoanTypeMutation,
  useGetCompanyIdQuery,
  useGetLoanDetailsQuery,
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

  if (isLoading) return <FormSkeleton />;

  const initialValues = {
    name: loanTypeDetails?.data?.name || "",
    interestRate: loanTypeDetails?.data?.interestRate || "",
    maxAmount: loanTypeDetails?.data?.maxLoanAmount || "",
  };

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
                  className="mt-1 text-sm text-red-500"
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
                  className="mt-1 text-sm text-red-500"
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
