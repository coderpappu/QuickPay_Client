import { BarChart, Calendar, Clock, FileDown } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLazyGetMonthlyAttendanceReportQuery } from "../../features/api";

const MonthlyAttendanceReport = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [displayMonth, setDisplayMonth] = useState(""); // for MM-YYYY
  const [isLoading, setIsLoading] = useState(false);

  const companyId = useSelector((state) => state.company.companyId);
  const [triggerDownload] = useLazyGetMonthlyAttendanceReportQuery();

  const handleMonthChange = (e) => {
    const value = e.target.value; // YYYY-MM
    setSelectedMonth(value);
    if (value) {
      const [year, month] = value.split("-");
      setDisplayMonth(`${year}-${month}-25`);
    } else {
      setDisplayMonth("");
    }
  };

  console.log(displayMonth);
  const handleDownload = async () => {
    if (!selectedMonth) {
      toast.error("Please select a valid month.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await triggerDownload({
        companyId,
        selectedDate: displayMonth,
      });
      const blob = result.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `attendance-${selectedMonth}.pdf`;
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
          <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
            <div className="flex items-center gap-3">
              <BarChart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-medium text-emerald-900 dark:text-emerald-300">
                Monthly Analytics
              </h3>
            </div>
          </div>
          <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              <h3 className="text-sm font-medium text-amber-900 dark:text-amber-300">
                Time Tracking
              </h3>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-gray-900/5 dark:bg-gray-800">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Monthly Attendance Report
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate comprehensive monthly attendance reports with detailed
                analytics
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Month for Report
                </label>
                <div className="group relative">
                  <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-emerald-500" />
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-10 py-3 text-sm text-gray-700 shadow-sm transition duration-200 hover:border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:border-gray-600"
                  />
                  {displayMonth && (
                    <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">
                      Selected:{" "}
                      <span className="font-semibold">{displayMonth}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleDownload}
                disabled={!selectedMonth || isLoading}
                className="relative flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/20 transition duration-200 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-emerald-900/20 dark:focus:ring-offset-gray-900"
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
                  The monthly report includes comprehensive attendance
                  statistics, overtime analysis, and detailed employee
                  attendance patterns throughout the month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyAttendanceReport;
