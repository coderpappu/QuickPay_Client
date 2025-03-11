import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateEmployeeOverTimeMutation,
  useGetEmployeeOverTimeDetailsQuery,
  useGetGradeListQuery,
} from "../../features/api";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import FormSkeleton from "../../skeletons/FormSkeleton";

const employeeOverTimeSchema = Yup.object().shape({
  hour: Yup.string().required("Hour is required"),
  rate: Yup.number().required("Rate is required"),
});

const EmployeeOverTimeForm = ({ onClose }) => {
  const navigate = useNavigate();

  const { id: employeeId } = useParams();

  const companyId = useSelector((state) => state.company.companyId);

  const [createEmployeeOverTime] = useCreateEmployeeOverTimeMutation();

  const { data: gradeList } = useGetGradeListQuery(companyId);

  const {
    data: basicSalaryDetails,
    isLoading,
    isError,
  } = useGetEmployeeOverTimeDetailsQuery({ employeeId, companyId });

  const [basicSalary, setBasicSalary] = useState(
    basicSalaryDetails?.data?.value || "",
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
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-dark-card">
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="mb-4 text-xl font-semibold dark:text-dark-heading-color">
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
                employee_id: employeeId,
                company_id: companyId,
              }).then((res) => {
                if (res.error) {
                  toast.error(res?.error?.data?.message);
                } else {
                  toast.success("Over time added successfully");
                  navigate(`/employee/setsalary/update/${employeeId}`);
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
                  className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                  placeholder="01"
                />

                <ErrorMessage
                  name="hour"
                  component="div"
                  className="mt-1 text-sm text-red-500"
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
                  className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                />
                <ErrorMessage
                  name="rate"
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
