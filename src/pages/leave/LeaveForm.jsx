// Insert at the top near imports
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  leave_type_id: Yup.string().required("Leave Type is required"),
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
  reason: Yup.string().required("Reason is required"),
});

const LeaveForm = ({ leaveReport, onClose }) => {
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
    leave_type_id: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const { data: weekend, isLoading: isWeekendLoading } =
    useGetWeekendDetailsQuery(id, { skip: !id });

  const [selectedType, setSelectedType] = useState("");
  const [leaveStatus, setLeaveStatus] = useState({
    message: "",
    unpaid: false,
  });

  const leaveQuotaMap = useMemo(() => {
    const map = {};
    leaveReport?.data?.forEach((item) => {
      map[item.leaveTypeId] = item;
    });
    return map;
  }, [leaveReport]);

  const calculateLeaveDays = (start, end) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    return Math.max(0, Math.ceil((e - s + 1) / (1000 * 60 * 60 * 24)));
  };

  const evaluateLeaveStatus = useCallback(
    (leaveTypeId, start, end) => {
      if (!leaveTypeId) return setLeaveStatus({ message: "", unpaid: false });

      const leaveInfo = leaveQuotaMap[leaveTypeId];

      if (leaveInfo) {
        const remaining = leaveInfo.remainingDays;
        const msg = `You have ${remaining} day(s) remaining in ${leaveInfo.leaveTypeName}.`;
        setLeaveStatus({ message: msg, unpaid: false });
      }

      const days = calculateLeaveDays(start, end);
      if (leaveInfo) {
        const remaining = leaveInfo.remainingDays;
        const msg =
          remaining >= days
            ? `You have ${remaining} day(s) remaining in ${leaveInfo.leaveTypeName}.`
            : `You have exceeded your ${leaveInfo.leaveTypeName} quota. This will be unpaid leave.`;
        setLeaveStatus({ message: msg, unpaid: remaining < days });
      } else {
        setLeaveStatus({ message: "", unpaid: false });
      }
    },
    [leaveQuotaMap],
  );

  const handleLeaveTypeChange = (e, setFieldValue, values) => {
    const typeId = e.target.value;
    setFieldValue("leave_type_id", typeId);
    setSelectedType(typeId);
    evaluateLeaveStatus(typeId, values.start_date, values.end_date);
  };

  useEffect(() => {
    if (weekend?.data) {
      setInitialValues({
        leave_type_id: weekend?.data?.holiday_type_id,
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
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-300 dark:hover:text-gray-100"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          {id ? "Edit Application" : "Leave Application"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            const { leave_type_id, start_date, end_date, reason } = values;
            const paid_status = leaveStatus.unpaid ? "UNPAID" : "PAID";
            try {
              if (!id) {
                await createEmployeeLeave({
                  leave_type_id,
                  start_date,
                  end_date,
                  reason,
                  paid_status,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Leave applied successfully");
                    navigate("/employee/leave/application");
                    onClose();
                  }
                });
              } else {
                await updateWeekend({
                  id,
                  leave_type_id,
                  start_date,
                  end_date,
                  reason,
                  paid_status,
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
          {({ isSubmitting, values, setFieldValue }) => {
            useEffect(() => {
              evaluateLeaveStatus(
                values.leave_type_id,
                values.start_date,
                values.end_date,
              );
            }, [
              values.leave_type_id,
              values.start_date,
              values.end_date,
              evaluateLeaveStatus,
            ]);

            return (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="leave_type_id"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Leave Type
                  </label>
                  <Field
                    as="select"
                    name="leave_type_id"
                    id="type"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-gray-600 dark:bg-dark-box dark:text-white"
                    onChange={(e) =>
                      handleLeaveTypeChange(e, setFieldValue, values)
                    }
                  >
                    <option value="">Select Type</option>
                    {allType?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="leave_type_id"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                  {leaveStatus.message && (
                    <div
                      className={
                        leaveStatus.unpaid
                          ? "mt-1 text-sm text-yellow-600"
                          : "mt-1 text-sm text-green-600"
                      }
                    >
                      {leaveStatus.message}
                    </div>
                  )}
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
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default LeaveForm;
