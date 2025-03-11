import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateDepartmentMutation,
  useGetAllowanceDetailsQuery,
  useGetTypeListQuery,
  useUpdateDepartmentMutation,
} from "../../features/api";

import { useSelector } from "react-redux";
import FormSkeleton from "../../skeletons/FormSkeleton";
import { InputBox } from "../company/BrandInput";

const departmentSchema = Yup.object().shape({
  name: Yup.string().required("Department name is required"),
});
const DepartmentForm = ({ onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const companyId = useSelector((state) => state.company.companyId);
  const [createDepartment] = useCreateDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();

  const {
    data: types,
    isLoading,
    isError,
  } = useGetTypeListQuery(companyId, {
    skip: !companyId,
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
  });

  const { data: allowanceDetails, isLoading: isWeekendLoading } =
    useGetAllowanceDetailsQuery(id, { skip: !id });

  useEffect(() => {
    if (allowanceDetails?.data) {
      setInitialValues({
        name: allowanceDetails?.data?.name,
        type: allowanceDetails?.data?.type,
        basic_percentage: allowanceDetails?.data?.basic_percentage,
        limit_per_month: allowanceDetails?.data?.limit_per_month,
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
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-dark-card">
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="mb-4 text-xl font-semibold dark:text-dark-heading-color">
          {id ? "Edit Allowance" : "Add Allowance"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={allowanceSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, type, basic_percentage, limit_per_month } = values;

            try {
              if (!id) {
                await createAllowance({
                  name,
                  type,
                  basic_percentage,
                  limit_per_month,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Allowance added successfully");
                    navigate("/company/allowance");
                    onClose();
                  }
                });
              } else {
                await updateAllowance({
                  id,
                  name,
                  type,
                  basic_percentage,
                  limit_per_month,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Allowance updated successfully");
                    navigate("/company/allowance");
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
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Name
                </label>

                <InputBox name="name" type="text" placeholder="Name" />
                <ErrorMessage
                  name="name"
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

                <InputBox name="type" type="text" placeholder="Type" />
                <ErrorMessage
                  name="type"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

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
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="limit_per_month"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Limit Per Month
                </label>

                <InputBox
                  name="limit_per_month"
                  type="number"
                  placeholder="Limit per month"
                />
                <ErrorMessage
                  name="limit_per_month"
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

export default DepartmentForm;
