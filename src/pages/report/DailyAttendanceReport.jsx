import { Calendar, Clock, FileDown, Users } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLazyGetDailyAttendanceReportQuery } from "../../features/api";

const DailyAttendanceReport = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const companyId = useSelector((state) => state.company.companyId);
  const [triggerDownload] = useLazyGetDailyAttendanceReportQuery();

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleDownload = async () => {
    if (!selectedDate) {
      toast.error("Please select a valid date.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await triggerDownload({ companyId, selectedDate });
      const blob = result.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `attendance-${selectedDate}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Download started successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="w-full max-w-2xl">
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300">
                Daily Overview
              </h3>
            </div>
          </div>
          <div className="rounded-xl bg-purple-50 p-4 dark:bg-purple-900/20">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-sm font-medium text-purple-900 dark:text-purple-300">
                Attendance Tracking
              </h3>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-gray-900/5 dark:bg-gray-800">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Daily Attendance Report
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate comprehensive daily attendance reports with detailed
                employee information
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Date for Report
                </label>
                <div className="group relative">
                  <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-blue-500" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-10 py-3 text-sm text-gray-700 shadow-sm transition duration-200 hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:border-gray-600"
                  />
                </div>
              </div>

              <button
                onClick={handleDownload}
                disabled={!selectedDate || isLoading}
                className="relative flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-blue-900/20 dark:focus:ring-offset-gray-900"
              >
                <FileDown
                  className={`h-5 w-5 ${isLoading ? "animate-bounce" : ""}`}
                />
                {isLoading ? "Preparing Report..." : "Download Report"}
              </button>
            </div>

            <div className="mt-6">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  The report will include detailed attendance records, including
                  check-in/out times, work hours, and attendance status for all
                  employees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyAttendanceReport;
