import { CalendarDays, Search } from "lucide-react";
import React, { useState } from "react";
import { useGetEmployeeAttendancesQuery } from "../../features/api";
import { TimeConverterFromUTC } from "../../utils/Converter";

function EmployeeAttendance() {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useGetEmployeeAttendancesQuery({
    employeeId: "3700f54c-7c86-4a1a-8470-d6d6a9b31e45",
    month: selectedMonth,
    year: selectedYear,
  });

  console.log(data);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Filter data based on search
  const filteredData =
    searchTerm && data?.data?.data
      ? data?.data?.data?.filter((record) => record.date.includes(searchTerm))
      : data?.data?.data || [];

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <CalendarDays className="mr-2" size={24} />
            <h2 className="text-xl font-bold">My Attendance</h2>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            {/* Month/Year Picker */}
            <div className="flex items-center rounded-lg bg-white/10 p-2">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="border-none bg-transparent text-white outline-none"
              >
                {months.map((month, index) => (
                  <option
                    key={index + 1}
                    value={index + 1}
                    className="text-gray-800"
                  >
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="ml-2 border-none bg-transparent text-white outline-none"
              >
                {[2023, 2024, 2025].map((year) => (
                  <option key={year} value={year} className="text-gray-800">
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-white/60"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg bg-white/10 py-2 pl-10 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-green-50 p-4">
            <div className="mb-1 text-sm text-green-600">Present Days</div>
            <div className="text-2xl font-bold text-gray-800">
              {data?.data?.summary?.totalPresent}
            </div>
          </div>
          <div className="rounded-lg bg-amber-50 p-4">
            <div className="mb-1 text-sm text-amber-600">Late Days</div>
            <div className="text-2xl font-bold text-gray-800">
              {data?.data?.summary?.totalLateDays}
            </div>
          </div>
          <div className="rounded-lg bg-red-50 p-4">
            <div className="mb-1 text-sm text-red-600">Over Time</div>
            <div className="text-2xl font-bold text-gray-800">
              {data?.data?.summary?.totalOvertimeDays}
            </div>
          </div>
          <div className="rounded-lg bg-red-100 p-4">
            <div className="mb-1 text-sm text-red-600">Absent Days</div>
            <div className="text-2xl font-bold text-gray-800">
              {data?.data?.summary?.workingDays -
                data?.data?.summary?.totalPresent}
            </div>
          </div>
        </div>

        {/* Error State */}
        {isError && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
            {error?.message || "Error loading attendance data"}
          </div>
        )}

        {/* Attendance List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-lg bg-gray-100"
              ></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredData.map((record, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between"></div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
                  <div className="">
                    <div className="text-sm text-gray-500">Date</div>

                    <span className="font-medium">{record.date}</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Check In</div>
                    <div className="font-medium">
                      {TimeConverterFromUTC(record.check_in) || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Check Out</div>
                    <div className="font-medium">
                      {TimeConverterFromUTC(record.check_out) || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Late</div>
                    <div className="font-medium text-amber-600">
                      {record.late || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Overtime</div>
                    <div className="font-medium text-green-600">
                      {record.overtime || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Working hour</div>
                    <div className="font-medium text-green-600">
                      {record.working_hour || "—"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeAttendance;
