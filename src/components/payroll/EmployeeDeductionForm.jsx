import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateEmployeeeDeductionMutation,
  useGetAllowanceTypeListQuery,
  useGetDeductionTypeListQuery,
  useGetEmployeeDeductionDetailsQuery,
  useUpdateEmployeeAllowanceMutation,
} from "../../features/api";

import { useSelector } from "react-redux";
import FormSkeleton from "../../skeletons/FormSkeleton";
import { InputBox, SelectOptionBox } from "../company/BrandInput";

const deductionSchema = Yup.object().shape({
  nameId: Yup.string().required("Name is required"),
  type: Yup.string().required("Type is required"),
  value: Yup.number().required("Basic value is required"),
});

const EmployeeDeductionForm = ({ deductionId, onClose }) => {
  const navigate = useNavigate();
  const { id: employee_id } = useParams();
  const companyId = useSelector((state) => state.company.companyId);

  const [createEmployeeDeduction] = useCreateEmployeeeDeductionMutation();
  const { data: allowanceType } = useGetAllowanceTypeListQuery(companyId);
  const [updateEmployeeAllowance] = useUpdateEmployeeAllowanceMutation();

  const {
    data: types,
    isLoading,
    isError,
  } = useGetDeductionTypeListQuery(companyId, {
    skip: !companyId,
  });

  const { data: allowanceDetails, isLoading: isAllowanceLoading } =
    useGetEmployeeDeductionDetailsQuery(deductionId);

  const initialValues = {
    nameId: allowanceDetails?.data?.DeductionType?.id || "", // Use ID instead of name
    type: allowanceDetails?.data?.type || "",
    value: allowanceDetails?.data?.value || "",
  };

  if (companyId == null) {
    navigate("/");
  }

  if (isAllowanceLoading || isLoading) {
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
          {deductionId ? "Edit Deduction" : "Add Deduction"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={deductionSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { nameId, type, value } = values;

            try {
              if (!deductionId) {
                await createEmployeeDeduction({
                  nameId,
                  type,
                  value,

                  employee_id,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Deduction added successfully");
                    navigate(`/employee/setsalary/update/${employee_id}`);
                    onClose();
                  }
                });
              } else {
                await updateEmployeeAllowance({
                  id: deductionId,
                  nameId,
                  type,
                  value,
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
                  className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
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
                  className="mt-1 text-sm text-red-500"
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
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <div className="mb-4">
                {values?.type == "PERCENTAGE" ? (
                  <label
                    htmlFor="value"
                    className="block text-sm font-medium dark:text-dark-text-color"
                  >
                    Basic Percentage
                  </label>
                ) : (
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium dark:text-dark-text-color"
                  >
                    Amount
                  </label>
                )}
                <InputBox name="value" type="number" placeholder="10" />
                <ErrorMessage
                  name="value"
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
                  {deductionId ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeDeductionForm;
