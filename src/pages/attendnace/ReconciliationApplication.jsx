import { isValid, parse } from "date-fns";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  MessageSquare,
  Send,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  useCreateAttendanceReconcilitionMutation,
  useGetUserQuery,
} from "../../features/api";

import { toast } from "react-hot-toast";
const ReconciliationForm = ({ selectedDate, setIsPopupOpen }) => {
  const [createReconciliation] = useCreateAttendanceReconcilitionMutation();
  const { data: userData } = useGetUserQuery();

  const [activeTab, setActiveTab] = useState("in");
  const [submissionStatus, setSubmissionStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const [selectedDateState, setSelectedDateState] = useState(
    selectedDate || new Date().toISOString().split("T")[0],
  );

  // Reset submission status when changing tabs or dates
  useEffect(() => {
    if (submissionStatus.submitted) {
      setSubmissionStatus({
        submitted: false,
        success: false,
        message: "",
      });
    }
  }, [activeTab, selectedDateState]);

  // Reset submission status after 3 seconds
  useEffect(() => {
    let timer;
    if (submissionStatus.submitted) {
      timer = setTimeout(() => {
        setSubmissionStatus({
          submitted: false,
          success: false,
          message: "",
        });
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [submissionStatus.submitted]);

  const initialValues = {
    inTime: "09:00",
    outTime: "17:00",
    reason: "",
  };

  const validationSchema = Yup.object().shape({
    // inTime: Yup.string().when("$activeTab", {
    //   is: (activeTab) => activeTab === "in" || activeTab === "both",
    //   then: Yup.string().required("In time is required"),
    //   otherwise: Yup.string(),
    // }),
    // outTime: Yup.string().when("$activeTab", {
    //   is: (activeTab) => activeTab === "out" || activeTab === "both",
    //   then: Yup.string().required("Out time is required"),
    //   otherwise: Yup.string(),
    // }),
    reason: Yup.string().required("Please provide a reason for reconciliation"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Time validation for "both" tab
      if (activeTab === "both" && values.inTime && values.outTime) {
        const inTime = parse(values.inTime, "HH:mm", new Date());
        const outTime = parse(values.outTime, "HH:mm", new Date());

        if (!isValid(inTime) || !isValid(outTime)) {
          setSubmissionStatus({
            submitted: true,
            success: false,
            message: "Invalid time format",
          });
          setSubmitting(false);
          return;
        }

        if (inTime >= outTime) {
          setSubmissionStatus({
            submitted: true,
            success: false,
            message: "Out time must be after in time",
          });
          setSubmitting(false);
          return;
        }
      }

      const dataToSubmit = {
        date: selectedDateState,
        employeeId: userData?.data?.id,
        approvedCheckIn:
          activeTab === "in" || activeTab === "both"
            ? values.inTime
            : undefined,
        approvedCheckOut:
          activeTab === "out" || activeTab === "both"
            ? values.outTime
            : undefined,
        reason: values.reason,
      };

      const response = await createReconciliation(dataToSubmit).unwrap();

      setIsPopupOpen(false);
      toast.success("Attendance reconciliation successfully submitted!");
      resetForm();
    } catch (error) {
      toast.error("Failed to submit reconciliation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const TabButton = ({ tab, label }) => (
    <button
      type="button"
      className={`flex-1 px-6 py-4 text-center transition-all duration-200 ${
        activeTab === tab
          ? "bg-light-bg text-gray-800 dark:bg-dark-box dark:text-white"
          : "text-gray-600 hover:bg-light-bg/50 dark:text-dark-text-color dark:hover:bg-dark-box/50"
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {label}
    </button>
  );

  const FormField = ({ label, name, type = "text", icon: Icon, component }) => (
    <div className="mb-6">
      <div className="mb-2 flex items-center font-medium text-gray-700 dark:text-dark-text-color">
        <Icon size={16} className="mr-2" />
        <span>{label}</span>
      </div>
      <div className="relative">
        <Field
          name={name}
          type={type}
          as={component}
          className="w-full rounded-sm border-none bg-light-bg px-4 py-3 text-gray-700 outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 dark:bg-dark-box dark:text-white dark:ring-gray-700"
        />
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="mt-2 flex items-center text-sm text-red-600 dark:text-red-400"
      >
        {(msg) => (
          <>
            <AlertCircle size={14} className="mr-1" />
            {msg}
          </>
        )}
      </ErrorMessage>
    </div>
  );

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDateState(date);
    setSelectedDate(date);
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md dark:border-dark-border-color dark:border-opacity-5 dark:bg-dark-card">
      <div className="border-b border-dark-box border-opacity-5 dark:border-dark-border-color dark:border-opacity-5">
        <div className="flex">
          <TabButton tab="in" label="In Time" />
          <TabButton tab="out" label="Out Time" />
          <TabButton tab="both" label="Both" />
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={false}
        validateOnMount={false}
        enableReinitialize
        context={{ activeTab }}
      >
        {({ isSubmitting }) => (
          <Form className="p-6">
            {submissionStatus.submitted && (
              <div
                className={`mb-6 flex items-center rounded border px-4 py-3 ${
                  submissionStatus.success
                    ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800/30 dark:bg-green-900/20 dark:text-green-400"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-800/30 dark:bg-red-900/20 dark:text-red-400"
                }`}
              >
                <div
                  className={`mr-2 rounded-full p-1 ${
                    submissionStatus.success
                      ? "bg-green-100 dark:bg-green-800/30"
                      : "bg-red-100 dark:bg-red-800/30"
                  }`}
                >
                  {submissionStatus.success ? (
                    <CheckCircle size={16} />
                  ) : (
                    <XCircle size={16} />
                  )}
                </div>
                <span>{submissionStatus.message}</span>
              </div>
            )}

            {/* Date Field */}
            <div className="mb-6">
              <div className="mb-2 flex items-center font-medium text-gray-700 dark:text-dark-text-color">
                <Calendar size={16} className="mr-2" />
                <span>Selected Date</span>
              </div>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDateState}
                  onChange={handleDateChange}
                  className="w-full rounded-sm border-none bg-light-bg px-4 py-3 text-gray-700 outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 dark:bg-dark-box dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            {(activeTab === "in" || activeTab === "both") && (
              <FormField
                label="In Time"
                name="inTime"
                type="time"
                icon={Clock}
              />
            )}

            {(activeTab === "out" || activeTab === "both") && (
              <FormField
                label="Out Time"
                name="outTime"
                type="time"
                icon={Clock}
              />
            )}

            <FormField
              label="Reason"
              name="reason"
              icon={MessageSquare}
              component="textarea"
            />

            <button
              type="submit"
              className={`flex w-full items-center justify-center rounded-sm bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 ${
                isSubmitting
                  ? "cursor-not-allowed opacity-70"
                  : "hover:bg-blue-700 active:bg-blue-800"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Submit
                </>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReconciliationForm;
