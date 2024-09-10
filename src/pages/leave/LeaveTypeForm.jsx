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
    useUpdateLeaveTypeMutation
} from "../../features/api";

import FormSkeleton from "../../skeletons/FormSkeleton";

const LeaveTypeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  code: Yup.string().required("Code is required"),
  // type: Yup.string().required("Leave Type is required"),
  day: Yup.string().required("Day is required"),
});

const LeaveTypeForm = ({ onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();
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
    useGetLeaveTypeDetailsQuery(id, { skip: !id });

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

  if (companyId == null) {
    navigate("/");
  }

  if (isWeekendLoading || isLoading) {
    return <FormSkeleton />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {id ? "Edit Leave Type" : "Add Leave Type"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={LeaveTypeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, code, type, day, description } = values;

            try {
              if (!id) {
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
                    navigate("/company/leave/type");
                    onClose();
                  }
                });
              } else {
                await updateLeaveType({
                  id,
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
                    navigate("/company/leave/type");
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
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6D28D9] focus:border-[#6D28D9] sm:text-sm"
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
                  className="block text-sm font-medium text-gray-700"
                >
                  Code
                </label>
                <Field
                  type="text"
                  name="code"
                  id="code"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6D28D9] focus:border-[#6D28D9] sm:text-sm"
                />
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <Field
                  as="select"
                  name="type"
                  id="type"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6D28D9] focus:border-[#6D28D9] sm:text-sm"
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
                  className="block text-sm font-medium text-gray-700"
                >
                  Day
                </label>
                <Field
                  type="text"
                  name="day"
                  id="day"
                  placeHolder="Number of day"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6D28D9] focus:border-[#6D28D9] sm:text-sm"
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
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Field
                  type="text"
                  name="description"
                  id="description"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6D28D9] focus:border-[#6D28D9] sm:text-sm"
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
                  onClick={onClose}
                  className="mr-4 px-4 py-2 bg-gray-300 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#6D28D9] rounded-md text-sm font-medium text-white hover:bg-[#5A21B3]"
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

export default LeaveTypeForm;
