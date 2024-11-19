import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateEmployeeeAllowanceMutation,
  useGetAllowanceDetailsQuery,
  useGetAllowanceTypeListQuery,
  useGetCompanyIdQuery,
  useUpdateAllowanceMutation,
} from "../../features/api";

import FormSkeleton from "../../skeletons/FormSkeleton";
import { InputBox, SelectOptionBox } from "../company/BrandInput";
const allowanceSchema = Yup.object().shape({
  nameId: Yup.string().required("Name is required"),
  type: Yup.string().required("Type is required"),
  basic_percentage: Yup.number().optional("Basic percentage is required"),
  amount: Yup.number().optional("Limit per month is required"),
});

const EmployeeAllowanceForm = ({ allowanceId, onClose }) => {
  const navigate = useNavigate();
  const { id: employee_id } = useParams();

  const { data: companyId } = useGetCompanyIdQuery();

  const [createEmployeeAllowance] = useCreateEmployeeeAllowanceMutation();
  const { data: allowanceType } = useGetAllowanceTypeListQuery(companyId);
  const [updateAllowance] = useUpdateAllowanceMutation();

  const {
    data: types,
    isLoading,
    isError,
  } = useGetAllowanceTypeListQuery(companyId, {
    skip: !companyId,
  });

  const [initialValues, setInitialValues] = useState({
    nameId: "",
    type: "",
    basic_percentage: "",
    amount: "",
  });

  const { data: allowanceDetails, isLoading: isWeekendLoading } =
    useGetAllowanceDetailsQuery(allowanceId, { skip: !allowanceId });

  useEffect(() => {
    if (allowanceDetails?.data) {
      setInitialValues({
        nameId: allowanceDetails?.data?.nameId,
        type: allowanceDetails?.data?.type,
        basic_percentage: allowanceDetails?.data?.basic_percentage,
        amount: allowanceDetails?.data?.amount,
      });
    }
  }, [allowanceDetails]);

  if (companyId == null) {
    navigate("/");
  }

  if (isWeekendLoading || isLoading) {
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
          {allowanceId ? "Edit Allowance" : "Add Allowance"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={allowanceSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { nameId, type, basic_percentage, amount } = values;

            try {
              if (!allowanceId) {
                await createEmployeeAllowance({
                  nameId,
                  type,
                  basic_percentage,
                  amount,
                  employee_id,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Allowance added successfully");
                    navigate(`/employee/setsalary/update/${employee_id}`);
                    onClose();
                  }
                });
              } else {
                await updateAllowance({
                  id: allowanceId,
                  nameId,
                  type,
                  basic_percentage,
                  amount,
                  employee_id,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Allowance updated successfully");
                    navigate(`/employee/setsalary/update/${employee_id}`);
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
          {({ values, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="nameId"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Name
                </label>

                <Field
                  as="select"
                  name="nameId"
                  className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
                >
                  {types?.data?.map((option, index) => (
                    <option key={index} value={option?.id} name="nameId">
                      {option?.name}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="nameId"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Allowance Type
                </label>

                <SelectOptionBox values={["PERCENTAGE", "FIXED"]} name="type" />

                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {values?.type == "PERCENTAGE" ? (
                <div className="mb-4">
                  <label
                    htmlFor="basic_percentage"
                    className="block text-sm font-medium dark:text-dark-text-color"
                  >
                    Basic Percentage
                  </label>

                  <InputBox
                    name="basic_percentage"
                    type="number"
                    placeholder="Basic Percentage"
                  />
                  <ErrorMessage
                    name="basic_percentage"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium dark:text-dark-text-color"
                  >
                    Amount
                  </label>

                  <InputBox
                    name="amount"
                    type="number"
                    placeholder="Limit per month"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

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

export default EmployeeAllowanceForm;
