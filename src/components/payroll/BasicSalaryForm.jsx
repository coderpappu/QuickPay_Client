import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateBasicSalaryMutation,
  useGetCompanyIdQuery,
  useGetEmployeeBasicSalaryDetailsQuery,
  useGetGradeListQuery,
} from "../../features/api";

import toast from "react-hot-toast";
import FormSkeleton from "../../skeletons/FormSkeleton";

const basicSalarySchema = Yup.object().shape({
  grade_id: Yup.string().required("Grade is required"),
  amount: Yup.number().required("Amount is required"),
});

const BasicSalaryForm = ({ onClose }) => {
  const navigate = useNavigate();

  const { id: employee_id } = useParams();

  const { data: companyId } = useGetCompanyIdQuery();

  const [createBasicSalary] = useCreateBasicSalaryMutation();

  const { data: gradeList } = useGetGradeListQuery(companyId);

  const {
    data: basicSalaryDetails,
    isLoading,
    isError,
  } = useGetEmployeeBasicSalaryDetailsQuery({ employee_id, companyId });

  const [basicSalary, setBasicSalary] = useState(
    basicSalaryDetails?.data?.value || ""
  );

  const initialValues = {
    grade_id: basicSalaryDetails?.data?.[0]?.grade_id || "",
    amount: basicSalaryDetails?.data?.[0]?.amount || "",
  };

  if (companyId == null) {
    navigate("/");
  }

  if (isLoading && !isError) {
    return <FormSkeleton />;
  }

  const handleGradeChange = (event, setFieldValue) => {
    const selectedGradeId = event.target.value;

    // Find the selected grade in the list
    const selectedGrade = gradeList?.data?.find(
      (grade_id) => grade_id.id === selectedGradeId
    );

    setFieldValue("grade_id", selectedGradeId);

    if (selectedGrade?.basic_salary) {
      setFieldValue("amount", selectedGrade.basic_salary);
    }
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
          Add Basic Salary
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={basicSalarySchema}
          onSubmit={async (values, { setSubmitting }) => {
            // Form submission logic
            const { grade_id, amount } = values;
            try {
              await createBasicSalary({
                grade_id,
                amount,
                employee_id,
                company_id: companyId,
              }).then((res) => {
                if (res.error) {
                  toast.error(res?.error?.data?.message);
                } else {
                  toast.success("Basic salary added successfully");
                  navigate(`/employee/setsalary/update/${employee_id}`);
                  onClose();
                }
              });
            } catch (error) {
              toast.error("An error occurred while submitting the form.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="grade_id"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Grade
                </label>

                <Field
                  as="select"
                  name="grade_id"
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
                  name="grade_id"
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
                  Update
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
