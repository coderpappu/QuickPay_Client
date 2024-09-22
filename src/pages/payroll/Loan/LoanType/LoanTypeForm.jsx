import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateGradeMutation,
  useCreateLeaveTypeMutation,
  useCreateLoanTypeMutation,
  useGetCompanyIdQuery,
  useGetGradeDetailsQuery,
  useGetLeaveTypeDetailsQuery,
  useGetTypeListQuery,
  useUpdateGradeMutation,
  useUpdateLeaveTypeMutation,
} from "../../../../features/api";

import FormSkeleton from "../../../../skeletons/FormSkeleton";

const loanTypeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  interestRate: Yup.number().required("Interest rate is required"),
  maxLoanAmount: Yup.number().required("Max Amount is required"),
});

const LoanTypeForm = ({ onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: companyId } = useGetCompanyIdQuery();
  const [createLoanType] = useCreateLoanTypeMutation();
  const [updateGrade] = useUpdateGradeMutation();

  const {
    data: types,
    isLoading,
    isError,
  } = useGetTypeListQuery(companyId, {
    skip: !companyId,
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    basic_salary: "",
    overtime_rate: "",
  });

  const { data: gradeDetails, isLoading: isWeekendLoading } =
    useGetGradeDetailsQuery(id, { skip: !id });

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
          {id ? "Edit Loan Type" : "Add Loan Type "}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={loanTypeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, interestRate, maxLoanAmount } = values;

            try {
              if (!id) {
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
                await updateGrade({
                  id,
                  name,
                  basic_salary,
                  overtime_rate,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Grade updated successfully");
                    navigate("/company/grade");
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
                  htmlFor="interestRate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Interest Rate
                </label>
                <Field
                  type="number"
                  name="interestRate"
                  id="interestRate"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm"
                />
                <ErrorMessage
                  name="interestRate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm"
                />
                <ErrorMessage
                  name="maxLoanAmount"
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

export default LoanTypeForm;
