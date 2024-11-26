import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateEmployeeCommissionMutation,
  useGetAllowanceTypeListQuery,
  useGetCompanyIdQuery,
  useGetEmployeeCommissionDetailsQuery,
  useUpdateEmployeeCommissionMutation,
} from "../../features/api";

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
  const { data: companyId } = useGetCompanyIdQuery();

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
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-semibold  dark:text-dark-heading-color mb-4">
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
                  className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
                ></Field>

                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
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
                  className="text-red-500 text-sm mt-1"
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
                  className="text-red-500 text-sm mt-1"
                />
              </div>
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
