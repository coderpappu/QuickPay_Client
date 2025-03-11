import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateEmployeeCommissionMutation,
  useGetAllowanceTypeListQuery,
  useGetEmployeeCommissionDetailsQuery,
  useUpdateEmployeeCommissionMutation,
} from "../../features/api";

import { useSelector } from "react-redux";
import FormSkeleton from "../../skeletons/FormSkeleton";
import { InputBox, SelectOptionBox } from "../company/BrandInput";

const employeeCommissionSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  type: Yup.string().required("Type is required"),
  value: Yup.number().required("Basic value is required"),
});

const EmployeeCommissionForm = ({ commissionId, onClose }) => {
  const navigate = useNavigate();
  const { id: employee_id } = useParams();
  const companyId = useSelector((state) => state.company.companyId);

  const [createEmployeeCommission] = useCreateEmployeeCommissionMutation();

  const [updateEmployeeCommission] = useUpdateEmployeeCommissionMutation();

  const {
    data: types,
    isLoading,
    isError,
  } = useGetAllowanceTypeListQuery(companyId, {
    skip: !companyId,
  });

  const { data: employeeCommissionDetails, isLoading: isAllowanceLoading } =
    useGetEmployeeCommissionDetailsQuery(commissionId);

  const initialValues = {
    title: employeeCommissionDetails?.data?.title || "",
    type: employeeCommissionDetails?.data?.type || "",
    value: employeeCommissionDetails?.data?.value || "",
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
          {commissionId ? "Edit Commission" : "Add Commission"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={employeeCommissionSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { title, type, value } = values;

            try {
              if (!commissionId) {
                await createEmployeeCommission({
                  title,
                  type,
                  value,
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
                await updateEmployeeCommission({
                  id: commissionId,
                  title,
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
                  htmlFor="title"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Title
                </label>

                <Field
                  as="input"
                  name="title"
                  className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                  placeholder="Sale"
                ></Field>

                <ErrorMessage
                  name="title"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Commission Type
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
                  {commissionId ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeCommissionForm;
