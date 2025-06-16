import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useEmployeeCreateLeaveMutation,
  useGetEarnLeaveQuery,
  useGetLeaveTypeListQuery,
  useGetWeekendDetailsQuery,
  useUpdateWeekendMutation,
} from "../../features/api";
import FormSkeleton from "../../skeletons/FormSkeleton";

const leaveSchema = Yup.object().shape({
  leaveType_id: Yup.string().required("Leave Type is required"),
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
  reason: Yup.string().required("Reason is required"),
});

// leaveType_id String
// start_date   String
// end_date     String
// reason       String

const LeaveForm = ({ onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const companyId = useSelector((state) => state.company.companyId);

  const [createEmployeeLeave] = useEmployeeCreateLeaveMutation();
  const [updateWeekend] = useUpdateWeekendMutation();

  const {
    data: types,
    isLoading,
    isError,
  } = useGetLeaveTypeListQuery(companyId, {
    skip: !companyId,
  });

  const { data: earnLeave, isLoading: earnLeaveLoding } =
    useGetEarnLeaveQuery(companyId);

  const [initialValues, setInitialValues] = useState({
    leaveType_id: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const { data: weekend, isLoading: isWeekendLoading } =
    useGetWeekendDetailsQuery(id, { skip: !id });

  useEffect(() => {
    if (weekend?.data) {
      setInitialValues({
        leaveType_id: weekend?.data?.holiday_type_id,
        start_date: weekend?.data?.start_date || "",
        end_date: weekend?.data?.end_date || "",
        reason: weekend?.data?.description || "",
      });
    }
  }, [weekend]);

  if (isWeekendLoading || isLoading) {
    return <FormSkeleton />;
  }
  let allType;

  if (!isLoading && !earnLeaveLoding) {
    if (earnLeave?.data == null) {
      allType = types?.data;
    } else {
      allType = types?.data?.concat(earnLeave?.data);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-dark-card">
        {" "}
        {/* Added dark mode class for card */}
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-300 dark:hover:text-gray-100"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          {" "}
          {/* Added dark mode class for text */}
          {id ? "Edit Application" : "Leave Application"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            const { leaveType_id, start_date, end_date, reason } = values;
            try {
              if (!id) {
                await createEmployeeLeave({
                  leaveType_id,
                  start_date,
                  end_date,
                  reason,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Leave applied successfully");
                    navigate("/holiday");
                    onClose();
                  }
                });
              } else {
                await updateWeekend({
                  id,
                  leaveType_id,
                  start_date,
                  end_date,
                  reason,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Leave updated successfully");
                    navigate("/holiday");
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
                  htmlFor="leaveType_id"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Leave Type
                </label>
                <Field
                  as="select"
                  name="leaveType_id"
                  id="type"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-gray-600 dark:bg-dark-box dark:text-white"
                >
                  <option value="">Select Type</option>
                  {allType?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="leaveType_id"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="start_date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Start Date
                </label>
                <Field
                  type="date"
                  name="start_date"
                  id="start_date"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-gray-600 dark:bg-dark-box dark:text-white"
                />
                <ErrorMessage
                  name="start_date"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="end_date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  End Date
                </label>
                <Field
                  type="date"
                  name="end_date"
                  id="end_date"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-gray-600 dark:bg-dark-box dark:text-white"
                />
                <ErrorMessage
                  name="end_date"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Reason
                </label>
                <Field
                  type="text"
                  name="reason"
                  id="description"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-gray-600 dark:bg-dark-box dark:text-white"
                />
                <ErrorMessage
                  name="reason"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="dark:bg-dark-button dark:hover:bg-dark-button-hover mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-400 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="dark:bg-dark-primary dark:hover:bg-dark-primary-hover rounded-md bg-[#3686FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5A21B3]"
                >
                  {id ? "Update" : "Apply"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LeaveForm;
