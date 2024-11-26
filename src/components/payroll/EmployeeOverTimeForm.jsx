import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateEmployeeOverTimeMutation,
  useGetCompanyIdQuery,
  useGetEmployeeBasicSalaryDetailsQuery,
  useGetGradeListQuery,
} from "../../features/api";

import toast from "react-hot-toast";
import FormSkeleton from "../../skeletons/FormSkeleton";

const employeeOverTimeSchema = Yup.object().shape({
  hour: Yup.string().required("Hour is required"),
  rate: Yup.number().required("Rate is required"),
});

const EmployeeOverTimeForm = ({ onClose }) => {
  const navigate = useNavigate();

  const { id: employee_id } = useParams();

  const { data: companyId } = useGetCompanyIdQuery();

  const [createEmployeeOverTime] = useCreateEmployeeOverTimeMutation();

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
    hour: basicSalaryDetails?.data?.[0]?.hour || "",
    rate: basicSalaryDetails?.data?.[0]?.rate || "",
  };

  if (companyId == null) {
    navigate("/");
  }

  if (isLoading && !isError) {
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
          Add over time
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={employeeOverTimeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            // Form submission logic
            const { hour, rate } = values;
            try {
              await createEmployeeOverTime({
                hour,
                rate,
                employee_id,
                company_id: companyId,
              }).then((res) => {
                if (res.error) {
                  toast.error(res?.error?.data?.message);
                } else {
                  toast.success("Over time added successfully");
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
                  htmlFor="hour"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Hour
                </label>
                <Field
                  as="input"
                  name="hour"
                  className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
                  placeholder="01"
                />

                <ErrorMessage
                  name="hour"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="rate"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Rate
                </label>

                <Field
                  name="rate"
                  type="number"
                  placeholder="10,000"
                  className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
                />
                <ErrorMessage
                  name="rate"
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

export default EmployeeOverTimeForm;
