import { format, isValid, parse } from "date-fns";
import {
  AlertCircle,
  Calendar,
  Clock,
  MessageSquare,
  Send,
} from "lucide-react";
import React, { useState } from "react";

const ReconciliationForm = ({ selectedDate, onDateChange }) => {
  const [activeTab, setActiveTab] = useState("in");
  const [inTime, setInTime] = useState("09:00");
  const [outTime, setOutTime] = useState("17:00");
  const [remarks, setRemarks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if ((activeTab === "in" || activeTab === "both") && !inTime) {
      newErrors.inTime = "In time is required";
    }

    if ((activeTab === "out" || activeTab === "both") && !outTime) {
      newErrors.outTime = "Out time is required";
    }

    if (activeTab === "both" && inTime && outTime) {
      const inTimeDate = parse(inTime, "HH:mm", new Date());
      const outTimeDate = parse(outTime, "HH:mm", new Date());

      if (
        isValid(inTimeDate) &&
        isValid(outTimeDate) &&
        inTimeDate >= outTimeDate
      ) {
        newErrors.outTime = "Out time must be after in time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        if (activeTab === "in") setInTime("09:00");
        else if (activeTab === "out") setOutTime("17:00");
        else {
          setInTime("09:00");
          setOutTime("17:00");
        }
        setRemarks("");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
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
      onClick={() => {
        setActiveTab(tab);
        setErrors({});
      }}
    >
      {label}
    </button>
  );

  const FormField = ({ label, error, icon: Icon, children }) => (
    <div className="mb-6">
      <div className="mb-2 flex items-center gap-2 font-medium text-gray-700 dark:text-dark-text-color">
        <Icon size={18} className="shrink-0" />
        <span>{label}</span>
      </div>
      {children}
      {error && (
        <div className="mt-2 flex items-center text-sm text-red-600 dark:text-red-400">
          <AlertCircle size={14} className="mr-1" />
          {error}
        </div>
      )}
    </div>
  );

  return (
    <div className="m-auto w-[60%] overflow-hidden rounded-lg bg-white shadow-md dark:border dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-card">
      <div className="border-b dark:border-dark-border-color dark:border-opacity-10">
        <div className="flex">
          <TabButton tab="in" label="In Time" />
          <TabButton tab="out" label="Out Time" />
          <TabButton tab="both" label="Both" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {submitted && (
          <div className="mb-6 flex items-center rounded border border-green-200 bg-green-50 px-4 py-3 text-green-700 dark:border-green-800/30 dark:bg-green-900/20 dark:text-green-400">
            <div className="mr-2 rounded-full bg-green-100 p-1 dark:bg-green-800/30">
              ✓
            </div>
            <span>Attendance reconciliation successfully submitted!</span>
          </div>
        )}

        {/* Selected Date */}
        <FormField label="Selected Date" icon={Calendar}>
          <div className="relative">
            <input
              type="date"
              value={
                selectedDate ? format(new Date(selectedDate), "yyyy-MM-dd") : ""
              }
              onChange={(e) => {
                if (onDateChange) onDateChange(e.target.value);
              }}
              className="w-full rounded-sm border-none bg-light-bg px-4 py-3 text-gray-700 outline-none dark:bg-dark-box dark:text-white"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Calendar
                size={18}
                className="text-gray-400 dark:text-gray-500"
              />
            </div>
          </div>
        </FormField>

        {(activeTab === "in" || activeTab === "both") && (
          <FormField label="In Time" icon={Clock} error={errors.inTime}>
            <div className="relative">
              <input
                type="time"
                value={inTime}
                onChange={(e) => setInTime(e.target.value)}
                className={`w-full rounded-sm border-none bg-light-bg px-4 py-3 ${
                  errors.inTime ? "ring-2 ring-red-500" : ""
                } text-gray-700 outline-none dark:bg-dark-box dark:text-white`}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <Clock size={18} className="text-gray-400 dark:text-gray-500" />
              </div>
            </div>
          </FormField>
        )}

        {(activeTab === "out" || activeTab === "both") && (
          <FormField label="Out Time" icon={Clock} error={errors.outTime}>
            <div className="relative">
              <input
                type="time"
                value={outTime}
                onChange={(e) => setOutTime(e.target.value)}
                className={`w-full rounded-sm border-none bg-light-bg px-4 py-3 ${
                  errors.outTime ? "ring-2 ring-red-500" : ""
                } text-gray-700 outline-none dark:bg-dark-box dark:text-white`}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <Clock size={18} className="text-gray-400 dark:text-gray-500" />
              </div>
            </div>
          </FormField>
        )}

        {/* Remarks */}
        <FormField label="Remarks" icon={MessageSquare}>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={4}
            className="w-full rounded-sm border-none bg-light-bg px-4 py-3 text-gray-700 outline-none dark:bg-dark-box dark:text-white"
            placeholder="Add any additional information or explanation here..."
          />
        </FormField>

        {/* Submit Button */}
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
      </form>
    </div>
  );
};

export default ReconciliationForm;
