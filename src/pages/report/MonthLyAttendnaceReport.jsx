import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLazyGetAttendanceReportQuery } from "../../features/api";

const MonthlyAttendnaceReport = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const companyId = useSelector((state) => state.company.companyId);

  const [triggerDownload] = useLazyGetAttendanceReportQuery();

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleDownload = async () => {
    if (!selectedDate) {
      toast.error("Please select a valid date or month.");
      return;
    }

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

      toast.success("Download started.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download report.");
    }
  };

  return (
    <div className="m-auto w-[60%] rounded-md bg-white p-6 shadow-sm dark:bg-dark-card">
      <h2 className="mb-4 text-xl font-semibold dark:text-white">
        Monthly Attendance Report
      </h2>

      <div className="flex flex-wrap items-center justify-end gap-4">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="w-64 rounded-md bg-white px-3 py-3 text-sm focus:outline-none dark:bg-dark-box dark:text-white"
        />

        <button
          onClick={handleDownload}
          className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none"
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

export default MonthlyAttendnaceReport;
