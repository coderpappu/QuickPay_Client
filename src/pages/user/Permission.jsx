/* eslint-disable react/prop-types */
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useGetCompaniesQuery } from "../../features/api";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Permission = () => {
  const { data: companies } = useGetCompaniesQuery();

  const initialValues = {};

  const handleSubmit = async (values) => {
    // Handle form submission
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="rounded-mde mb-2 mt-5 flex w-full flex-wrap justify-between">
          <div className="relative w-[49%] rounded-md bg-white p-4 dark:bg-dark-card">
            <h1 className="mb-4 text-xl font-medium dark:text-dark-heading-color">
              Permission Manager
            </h1>
            <div>
              <label
                htmlFor="companyId"
                className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
              >
                Company
              </label>

              <Field
                as="select"
                name="companyId"
                id="companyId"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
              >
                <option value="">Select Company</option>
                {companies?.data?.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.company_name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="companyId"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-button-bg p-2 text-white"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Permission;
