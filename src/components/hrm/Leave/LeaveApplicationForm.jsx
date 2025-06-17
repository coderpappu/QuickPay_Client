import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import {
  useGetLeaveApplicationDetailsQuery,
  useGetLeaveTypeListQuery,
  useGetUserQuery,
  useUpdateLeaveApplicationMutation,
} from "../../../features/api";

const applicationSchema = Yup.object().shape({
  leaveType_id: Yup.string().required("Leave type is required"),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date()
    .required("End date is required")
    .min(Yup.ref("start_date"), "End date cannot be before start date"),
  reason: Yup.string().required("Purpose is required"),
  status: Yup.string().required("Status is required"),
  paid_status: Yup.string().required("Paid Status is required"),
  note: Yup.string().required("Note is required"),
});

const LeaveApplicationForm = ({ selectId, setIsPopupOpen }) => {
  
  const companyId = useSelector((state) => state.company.companyId);

  const { data: userDetails } = useGetUserQuery();

  const { data: leaveApplicationDetails } = useGetLeaveApplicationDetailsQuery(
    selectId,
    { skip: !selectId },
  );

  const { data: leaveType } = useGetLeaveTypeListQuery(companyId);

  const [applicationUpdate, { isLoading }] =
    useUpdateLeaveApplicationMutation();

  const [initialValues, setInitialValues] = useState({
    leaveType_id: "",
    leaveDuration: "",
    start_date: "",
    end_date: "",
    reason: "",
    status: "",
    paid_status: "",
    note: "",
  });

  useEffect(() => {
    if (leaveApplicationDetails?.data) {
      const app = leaveApplicationDetails.data;
      setInitialValues({
        leaveType_id: app.leaveType_id || "",
        leaveDuration: app.leaveDuration || "",
        start_date: app.start_date?.split("T")[0] || "",
        end_date: app.end_date?.split("T")[0] || "",
        reason: app.reason || "",
        status: app.status || "",
        paid_status: app.paid_status || "",
        note: app.note || "",
      });
    }
  }, [leaveApplicationDetails]);

  // Function to calculate days between two dates
  const calculateLeaveDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

    // Calculate difference in days
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Adding 1 to include both start and end date

    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="bg-light-card mx-auto w-full space-y-6 rounded-lg p-6 shadow-md dark:bg-dark-card">
      <h2 className="text-light-text text-xl font-semibold dark:text-dark-text-color">
        Update Leave Application
      </h2>

      <div className="flex items-start justify-between rounded-md border bg-light-input p-4 dark:border-dark-border-color dark:border-opacity-5 dark:bg-dark-box">
        <div className="flex items-center gap-4">
          <div className="dark:bg-dark-muted h-16 w-16 rounded-full bg-gray-300"></div>
          <div>
            <h3 className="text-light-text font-semibold dark:text-dark-text-color">
              {leaveApplicationDetails?.data?.Employee?.name}
            </h3>
            <p className="text-light-subtext dark:text-dark-subtext text-sm">
              {leaveApplicationDetails?.data?.Employee?.employeeId}
            </p>
            <p className="text-light-subtext dark:text-dark-subtext text-sm">
              {
                leaveApplicationDetails?.data?.Employee?.EmployeeDesignation[0]
                  ?.designation?.name
              }
            </p>
          </div>
        </div>

        <div className="text-light-text grid grid-cols-2 gap-x-12 gap-y-1 text-sm dark:text-dark-text-color">
          <p>
            <strong>Join Date:</strong>{" "}
            {leaveApplicationDetails?.data?.Employee?.joining_date}
          </p>
          <p>
            <strong>Job Status:</strong>{" "}
            <label
              htmlFor=""
              className="ml-1 rounded-full bg-green-600 bg-opacity-55 px-2 py-1 text-xs text-white"
            >
              {leaveApplicationDetails?.data?.Employee?.job_status}
            </label>
          </p>
          <p>
            <strong>Branch:</strong> Tiger KOI
          </p>
          <p>
            <strong>Department:</strong>{" "}
            {
              leaveApplicationDetails?.data?.Employee?.EmployeeDepartment[0]
                ?.department?.name
            }
          </p>
        </div>
      </div>

      <div className="text-light-text flex items-center justify-between text-sm dark:text-dark-text-color">
        <div className="space-x-4">
          <span>
            Marriage Leave: <strong>10</strong>
          </span>
          <span>
            Annual Leave: <strong>10</strong>
          </span>
        </div>
        <div className="flex gap-4">
          {["Continuous", "Prefix", "Suffix", "Half Day"].map((type) => (
            <label
              key={type}
              className="text-light-text flex items-center dark:text-dark-text-color"
            >
              <input type="radio" name="leave_type_option" className="mr-1" />
              {type}
            </label>
          ))}
        </div>
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={applicationSchema}
        onSubmit={(values) => {
          applicationUpdate({ id: selectId, data: values });
          setIsPopupOpen(false);
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="text-light-text mb-1 block text-sm font-medium dark:text-dark-text-color">
                  Leave Type *
                </label>
                <Field
                  as="select"
                  name="leaveType_id"
                  className="w-full rounded border border-dark-box border-opacity-5 bg-light-input px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
                >
                  <option value="">Select Leave</option>
                  {leaveType?.data?.map((leave) => (
                    <option key={leave.id} value={leave.id}>
                      {leave.name}
                    </option>
                  ))}
                </Field>
                {errors.leaveType_id && touched.leaveType_id && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.leaveType_id}
                  </div>
                )}
              </div>
              <div>
                <label className="text-light-text mb-1 block text-sm font-medium dark:text-dark-text-color">
                  Day Count
                </label>

                <Field
                  type="number"
                  name="leaveDuration"
                  disabled={true}
                  className="w-full rounded border border-dark-box border-opacity-5 bg-light-input px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
                  readOnly
                />

                {errors.leaveDuration && touched.leaveDuration && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.leaveDuration}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 pt-6">
                <label className="text-light-text flex items-center dark:text-dark-text-color">
                  <input type="checkbox" className="mr-2" />
                  Foreign Leave Y/N
                </label>

                <label className="text-light-text flex items-center dark:text-dark-text-color">
                  <input type="checkbox" className="mr-2" />
                  Include Extra Work Dates
                </label>
              </div>

              <div>
                <label className="text-light-text mb-1 block text-sm font-medium dark:text-dark-text-color">
                  Start Date *
                </label>

                <Field
                  type="date"
                  name="start_date"
                  className="w-full rounded border border-dark-box border-opacity-5 bg-light-input px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
                  onChange={(e) => {
                    const newStartDate = e.target.value;
                    setFieldValue("start_date", newStartDate);

                    // Calculate new duration
                    if (values.end_date) {
                      const duration = calculateLeaveDuration(
                        newStartDate,
                        values.end_date,
                      );
                      setFieldValue("leaveDuration", duration);
                    }
                  }}
                />
                {errors.start_date && touched.start_date && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.start_date}
                  </div>
                )}
              </div>
              <div>
                <label className="text-light-text mb-1 block text-sm font-medium dark:text-dark-text-color">
                  End Date *
                </label>
                <Field
                  type="date"
                  name="end_date"
                  className="w-full rounded border border-dark-box border-opacity-5 bg-light-input px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
                  onChange={(e) => {
                    const newEndDate = e.target.value;
                    setFieldValue("end_date", newEndDate);

                    // Calculate new duration
                    if (values.start_date) {
                      const duration = calculateLeaveDuration(
                        values.start_date,
                        newEndDate,
                      );
                      setFieldValue("leaveDuration", duration);
                    }
                  }}
                />
                {errors.end_date && touched.end_date && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.end_date}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="text-light-text mb-1 block text-sm font-medium dark:text-dark-text-color">
                Reason
              </label>
              <Field
                as="textarea"
                name="reason"
                disabled={true}
                rows="3"
                className="w-full rounded border border-dark-box border-opacity-5 bg-light-input px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
              />
              {errors.reason && touched.reason && (
                <div className="mt-1 text-xs text-red-500">{errors.reason}</div>
              )}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-6">
              <div>
                <label className="text-light-text mb-1 block text-sm font-medium dark:text-dark-text-color">
                  Note *
                </label>
                <Field
                  as="textarea"
                  name="note"
                  rows="3"
                  className="w-full rounded border border-dark-box border-opacity-5 bg-light-input px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
                />
                {errors.reason && touched.reason && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.reason}
                  </div>
                )}
              </div>
              <div>
                <label className="text-light-text mb-1 block text-sm font-medium dark:text-dark-text-color">
                  Current Approver
                </label>
                <div className="mt-1 flex items-center gap-3 rounded border bg-light-input p-3 dark:border-dark-border-color dark:border-opacity-5 dark:bg-dark-box">
                  <div className="dark:bg-dark-muted h-10 w-10 rounded-full bg-gray-300"></div>
                  <div className="text-light-text text-sm dark:text-dark-text-color">
                    <p className="font-medium">
                      {userDetails?.data?.first_name +
                        " " +
                        userDetails?.data?.last_name}
                    </p>

                    <p className="text-light-subtext dark:text-dark-subtext text-xs">
                      {userDetails?.data?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-light-text mb-2 text-sm font-semibold dark:text-dark-text-color">
                APPROVAL HISTORY
              </h3>
              <div className="overflow-x-auto rounded border border-dark-bg border-opacity-0 dark:border-dark-border-color dark:border-opacity-5">
                <table className="text-light-text min-w-full text-left text-sm dark:text-dark-text-color">
                  <thead className="bg-light-input dark:bg-dark-box">
                    <tr>
                      <th className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                        Approver Code
                      </th>
                      <th className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                        Approver Name
                      </th>
                      <th className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                        Status
                      </th>
                      <th className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                        Operation Date
                      </th>
                      <th className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                        Comment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                        0376
                      </td>
                      <td className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                        Rajib Saha
                      </td>
                      <td className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                        Under Processing
                      </td>
                      <td className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                        27-04-2025
                      </td>
                      <td className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                        —
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <p className="text-light-subtext dark:text-dark-subtext text-sm">
                Apply Date: <strong>27-04-2025</strong>
              </p>
              <div className="space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setFieldValue("status", "REJECTED");
                    setFieldValue(
                      "paid_status",
                      values.paid_status || "UNPAID",
                    );
                    setTimeout(() => {
                      document.querySelector("form").dispatchEvent(
                        new Event("submit", {
                          cancelable: true,
                          bubbles: true,
                        }),
                      );
                    }, 100);
                  }}
                  className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-70"
                  disabled={isLoading}
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFieldValue("status", "APPROVED");
                    setFieldValue("paid_status", values.paid_status || "PAID");
                    setTimeout(() => {
                      document.querySelector("form").dispatchEvent(
                        new Event("submit", {
                          cancelable: true,
                          bubbles: true,
                        }),
                      );
                    }, 100);
                  }}
                  className="rounded bg-green-600 px-4 py-2 text-white transition-all hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-70"
                  disabled={isLoading}
                >
                  Approve
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LeaveApplicationForm;
