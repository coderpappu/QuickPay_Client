import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateEmployeeeAllowanceMutation,
  useGetAllowanceTypeListQuery,
  useGetCompanyIdQuery,
  useGetEmployeeAllowanceDetailsQuery,
  useGetGradeListQuery,
  useUpdateEmployeeAllowanceMutation,
} from "../../features/api";

import FormSkeleton from "../../skeletons/FormSkeleton";

const allowanceSchema = Yup.object().shape({
  grade: Yup.string().required("Grade is required"),
  amount: Yup.number().required("Amount is required"),
});

const BasicSalaryForm = ({ allowanceId, onClose }) => {
  const navigate = useNavigate();
  const { id: employee_id } = useParams();
  const { data: companyId } = useGetCompanyIdQuery();
  const [createEmployeeAllowance] = useCreateEmployeeeAllowanceMutation();
  const { data: gradeList } = useGetGradeListQuery(companyId);
  const [updateEmployeeAllowance] = useUpdateEmployeeAllowanceMutation();
  const {
    data: types,
    isLoading,
    isError,
  } = useGetAllowanceTypeListQuery(companyId, {
    skip: !companyId,
  });

  const { data: allowanceDetails, isLoading: isAllowanceLoading } =
    useGetEmployeeAllowanceDetailsQuery(allowanceId);

  const [basicSalary, setBasicSalary] = useState(
    allowanceDetails?.data?.value || ""
  ); // State for basic salary

  const initialValues = {
    grade: allowanceDetails?.data?.grade || "",
    amount: basicSalary,
  };

  if (companyId == null) {
    navigate("/");
  }

  if (isAllowanceLoading || isLoading) {
    return <FormSkeleton />;
  }

  const handleGradeChange = (event, setFieldValue) => {
    const selectedGradeId = event.target.value;

    // Find the selected grade in the list
    const selectedGrade = gradeList?.data?.find(
      (grade) => grade.id === selectedGradeId
    );

    // Update the Formik field value and other dependent state
    setFieldValue("grade", selectedGradeId); // Update the grade in Formik
    setFieldValue("amount", selectedGrade?.basic_salary || ""); // Dynamically set the amount field
  };

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
          {allowanceId ? "Edit Allowance" : "Add Allowance"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={{
            grade: allowanceDetails?.data?.AllowanceType?.id || "",
            amount: allowanceDetails?.data?.value || "",
          }}
          validationSchema={allowanceSchema}
          onSubmit={async (values, { setSubmitting }) => {
            // Form submission logic
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="grade"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Grade
                </label>

                <Field
                  as="select"
                  name="grade"
                  className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
                  onChange={(e) => handleGradeChange(e, setFieldValue)} // Handle changes dynamically
                >
                  <option value="" disabled>
                    Select a grade
                  </option>
                  {gradeList?.data?.map((option) => (
                    <option key={option?.id} value={option?.id}>
                      {option?.name}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="grade"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Amount
                </label>

                <Field
                  name="amount"
                  type="number"
                  placeholder="10,000"
                  className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
                  readOnly // Keep it read-only to prevent manual editing
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 px-4 py-2 bg-white rounded-md text-sm font-medium text-gray-800 border border-dark-border-color dark:border-opacity-10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#3686FF] rounded-md text-sm font-medium text-white"
                >
                  {allowanceId ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BasicSalaryForm;
