import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateLeaveTypeMutation,
  useGetCompanyIdQuery,
  useGetLeaveTypeDetailsQuery,
  useGetTypeListQuery,
  useUpdateLeaveTypeMutation,
} from "../../../features/api";

import FormSkeleton from "../../../skeletons/FormSkeleton";

const LeaveTypeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  code: Yup.string().required("Code is required"),
  type: Yup.string().required("Leave Type is required"),
  day: Yup.string().required("Day is required"),
});

const LeaveTypeForm = ({ leaveTypeId, setIsPopupOpen }) => {
  const { data: companyId } = useGetCompanyIdQuery();
  const [createLeaveType] = useCreateLeaveTypeMutation();
  const [updateLeaveType] = useUpdateLeaveTypeMutation();

  const {
    data: types,
    isLoading,
    isError,
  } = useGetTypeListQuery(companyId, {
    skip: !companyId,
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    code: "",
    type: "",
    day: "",
    description: "",
  });

  const { data: leaveType, isLoading: isWeekendLoading } =
    useGetLeaveTypeDetailsQuery(leaveTypeId, { skip: !leaveTypeId });

  useEffect(() => {
    if (leaveType?.data) {
      setInitialValues({
        name: leaveType?.data?.name,
        code: leaveType?.data?.code,
        type: leaveType?.data?.type,
        day: leaveType?.data?.day,

        description: leaveType?.data?.description,
      });
    }
  }, [leaveType]);

  //   if (companyId == null) {
  //     navigate("/");
  //   }

  if (isWeekendLoading || isLoading) {
    return <FormSkeleton />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => setIsPopupOpen(false)}
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          {leaveTypeId ? "Edit Leave Type" : "Add Leave Type"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={LeaveTypeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, code, type, day, description } = values;

            try {
              if (!leaveTypeId) {
                await createLeaveType({
                  name,
                  code,
                  type,
                  day,
                  description,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Leave Type added successfully");

                    setIsPopupOpen(false);
                  }
                });
              } else {
                await updateLeaveType({
                  id: leaveTypeId,
                  name,
                  code,
                  type,
                  day,
                  description,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Leave type updated successfully");

                    setIsPopupOpen(false);
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
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm dark:bg-dark-box dark:border-none dark:text-dark-text-color"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700  dark:text-dark-text-color"
                >
                  Code
                </label>
                <Field
                  type="text"
                  name="code"
                  id="code"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm dark:bg-dark-box dark:border-none dark:text-dark-text-color"
                />
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-red-500 text-sm mt-1 "
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700  dark:text-dark-text-color"
                >
                  Type
                </label>
                <Field
                  as="select"
                  name="type"
                  id="type"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm dark:bg-dark-box dark:border-none dark:text-dark-text-color"
                >
                  <option value="">Select</option>
                  <option value="Paid">Paid</option>
                  <option value="UnPaid">Unpaid</option>
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="day"
                  className="block text-sm font-medium text-gray-700  dark:text-dark-text-color"
                >
                  Day
                </label>
                <Field
                  type="text"
                  name="day"
                  id="day"
                  placeHolder="Number of day"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm dark:bg-dark-box dark:border-none dark:text-dark-text-color"
                />
                <ErrorMessage
                  name="day"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700  dark:text-dark-text-color"
                >
                  Description
                </label>
                <Field
                  type="text"
                  name="description"
                  id="description"
                  className="mt-1 block w-full px-3 py-2 border border-g ray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm dark:bg-dark-box dark:border-none dark:text-dark-text-color"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="mr-4 px-4 py-2 bg-gray-300 dark:bg-dark-box dark:text-white rounded-md text-sm font-medium text-gray-800 "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#3686FF] rounded-md text-sm font-medium text-white hover:bg-[#5A21B3]"
                >
                  {leaveTypeId ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LeaveTypeForm;
