import { isValid, parse } from "date-fns";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  AlertCircle,
  Calendar,
  Clock,
  MessageSquare,
  Send,
} from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import {
  useCreateAttendanceReconcilitionMutation,
  useGetUserQuery,
} from "../../features/api";

const ReconciliationForm = ({ selectedDate, setSelectedDate }) => {
  const [createReconciliatio, { isLoading, isError }] =
    useCreateAttendanceReconcilitionMutation();

  const { data: userData } = useGetUserQuery();

  const [activeTab, setActiveTab] = useState("in");
  const [submitted, setSubmitted] = useState(false);

  // Default the selected date if not provided
  const [selectedDateState, setSelectedDateState] = useState(
    selectedDate || new Date().toISOString().split("T")[0],
  );

  const initialValues = {
    inTime: "09:00",
    outTime: "17:00",
    reason: "", // Change 'remarks' to 'reason' to match the database
  };

  const validationSchema = Yup.object().shape({
    inTime: Yup.string().when("activeTab", {
      is: (val) => val === "in" || val === "both",
      then: Yup.string().required("In time is required"),
    }),
    outTime: Yup.string().when("activeTab", {
      is: (val) => val === "out" || val === "both",
      then: Yup.string().required("Out time is required"),
    }),
    reason: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Custom validation for inTime and outTime
    if (activeTab === "both" && values.inTime && values.outTime) {
      const inTimeDate = parse(values.inTime, "HH:mm", new Date());
      const outTimeDate = parse(values.outTime, "HH:mm", new Date());

      if (
        isValid(inTimeDate) &&
        isValid(outTimeDate) &&
        inTimeDate >= outTimeDate
      ) {
        alert("Out time must be after in time");
        setSubmitting(false);
        return;
      }
    }

    console.log(values);

    // Adjust the data sent to the backend based on the active tab
    const dataToSubmit = {
      date: selectedDateState,
      employeeId: userData?.data?.id,
      approvedCheckIn: activeTab === "in" ? values.inTime : undefined,
      approvedCheckOut: activeTab === "out" ? values.outTime : undefined,
      reason: values?.reason,
    };

    await createReconciliatio(dataToSubmit);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      resetForm();
    }, 2000);

    setSubmitting(false);
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
          className="w-full rounded-sm border-none bg-light-bg px-4 py-3 text-gray-700 outline-none dark:bg-dark-box dark:text-white"
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
    setSelectedDate(date); // Propagate to parent
  };

  return (
    <div className="m-auto w-[60%] overflow-hidden rounded-lg bg-white shadow-md dark:border-dark-border-color dark:border-opacity-5 dark:bg-dark-card">
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
      >
        {({ isSubmitting }) => (
          <Form className="p-6">
            {submitted && (
              <div className="mb-6 flex items-center rounded border border-green-200 bg-green-50 px-4 py-3 text-green-700 dark:border-green-800/30 dark:bg-green-900/20 dark:text-green-400">
                <div className="mr-2 rounded-full bg-green-100 p-1 dark:bg-green-800/30">
                  ✓
                </div>
                <span>Attendance reconciliation successfully submitted!</span>
              </div>
            )}

            {/* Date field */}
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
                  className="w-full rounded-sm border-none bg-light-bg px-4 py-3 text-gray-700 outline-none dark:bg-dark-box dark:text-white"
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
              label="Reason" // Changed to "Reason"
              name="reason" // Changed to "reason"
              icon={MessageSquare}
              component="textarea"
            />

            <button
              type="submit"
              className={`flex w-full items-center justify-center rounded-sm bg-light-bg px-6 py-3 font-medium text-gray-700 transition-all duration-300 dark:bg-dark-box dark:text-white ${
                isSubmitting
                  ? "cursor-not-allowed opacity-70"
                  : "hover:bg-light-bg/80 dark:hover:bg-dark-box/80"
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
