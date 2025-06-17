import { useState } from "react";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../components/company/SettingCardHeader";
import MonthYearSelector from "../../components/payroll/payslip/MonthYearSelector";

import { motion } from "framer-motion";
import { BarChart2, CalendarCheck, Clock } from "lucide-react";
import { useSelector } from "react-redux";
import {
  useCalculationLeaveDaysQuery,
  useGetEmployeeLeaveListQuery,
  useGetUserQuery,
} from "../../features/api";
import CardSkeleton from "../../skeletons/card";
import { convertToTimeZone } from "../../utils/DatePicker";
import ErrorMessage from "../../utils/ErrorMessage";
import LeaveForm from "./LeaveForm";

const EmployeeLeaveApplication = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectAllowanceId, setSelectAllowanceId] = useState(null);
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.toISOString().slice(5, 7));
  const [year, setYear] = useState(currentDate.getFullYear().toString());
  const [statusFilter, setStatusFilter] = useState("");

  const { data: employee } = useGetUserQuery();

  const employeeId = employee?.data?.id;

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectAllowanceId(id);
  };

  const companyId = useSelector((state) => state.company.companyId);

  const {
    data: leaveApplications,
    isLoading,
    isError,
    error,
  } = useGetEmployeeLeaveListQuery({ companyId, employeeId, month, year });

  const {
    data: reportLeave,
    isLoading: isReportLoading,
    isError: isReportError,
    error: reportError,
  } = useCalculationLeaveDaysQuery({
    year,
    company_id: companyId,
  });

  const statusColorHandler = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-300 text-black";
      case "APPROVED":
        return "bg-green-500 text-white";
      case "REJECTED":
        return "bg-red-500 text-white";
      default:
        return "text-gray-500";
    }
  };

  const getUsageLevel = (percentage) => {
    if (percentage < 50) return { label: "Healthy", color: "bg-green-500" };
    if (percentage < 80) return { label: "Moderate", color: "bg-yellow-500" };
    return { label: "Critical", color: "bg-red-500" };
  };
  const filteredData = leaveApplications?.data?.filter((application) => {
    const isMatchingStatus =
      !statusFilter || application.status === statusFilter;
    return isMatchingStatus;
  });

  let content;

  if (isLoading && !isError) return <CardSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && filteredData)
    content = filteredData.map((application) => (
      <div
        key={application?.id}
        className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
      >
        <div className="w-[14%] dark:text-white">
          <h3>{application?.LeaveType?.name}</h3>
        </div>

        <div className="w-[14%] dark:text-white">
          <h3>{convertToTimeZone(application?.start_date)}</h3>
        </div>

        <div className="w-[14%] dark:text-white">
          <h3>{convertToTimeZone(application?.end_date)}</h3>
        </div>
        <div className="w-[14%] dark:text-white">
          <h3>{convertToTimeZone(application?.created_at)}</h3>
        </div>
        <div className="w-[14%] dark:text-white">
          <h3>{application?.reason}</h3>
        </div>
        <div className="w-[14%] dark:text-white">
          <h3>{application?.note}</h3>
        </div>
        <div className="w-[10%] dark:text-white">
          <div
            className={` ${statusColorHandler(application?.status)} w-32 rounded-full px-1 py-2 text-center text-xs font-bold text-gray-700`}
          >
            {application?.status}
          </div>
        </div>
      </div>
    ));

  return (
    <>
      {/* Leave Report Section */}
      <div className="py-3">
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          Leave Report
        </h2>

        {isReportLoading && <CardSkeleton />}
        {isReportError && (
          <ErrorMessage
            message={
              reportError?.data?.message || "Failed to load leave report."
            }
          />
        )}

        {!isReportLoading && !isReportError && reportLeave?.data && (
          <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-2 xl:grid-cols-4">
            {reportLeave.data.map((report, i) => {
              const { color, label } = getUsageLevel(report.percentageUsed);
              return (
                <motion.div
                  key={report.leaveTypeId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-lg border border-gray-300 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:border-gray-700 dark:bg-dark-card"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {report.leaveTypeName}
                    </h3>
                    <span
                      className={`text-xs font-medium ${color} rounded-full px-3 py-1 text-white`}
                    >
                      {label}
                    </span>
                  </div>

                  <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                    <div
                      className={`h-2 ${color} rounded-full transition-all`}
                      style={{ width: `${report.percentageUsed}%` }}
                      title={`${report.percentageUsed}% used`}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <CalendarCheck size={16} /> {report.totalDays}{" "}
                      <span className="hidden sm:inline">Total</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} /> {report.usedDays}{" "}
                      <span className="hidden sm:inline">Used</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart2 size={16} /> {report.remainingDays}{" "}
                      <span className="hidden sm:inline">Remaining</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Leave Application"
          handleOpen={handleOpen}
          isPopupOpen={isPopupOpen}
        />

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-end gap-4 px-6 py-2">
          <MonthYearSelector
            month={month}
            year={year}
            onMonthChange={setMonth}
            onYearChange={setYear}
          />
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-12 rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-dark-card dark:text-white"
            >
              <option value="">All</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table Header */}
        <div className="px-6 py-3">
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[14%] dark:text-white">
              <h3>Leave Type</h3>
            </div>

            <div className="w-[14%] dark:text-white">
              <h3>Start Date</h3>
            </div>

            <div className="w-[14%] dark:text-white">
              <h3>End Date</h3>
            </div>
            <div className="w-[14%] dark:text-white">
              <h3>Apply Date</h3>
            </div>
            <div className="w-[14%] dark:text-white">
              <h3>Reason</h3>
            </div>
            <div className="w-[14%] dark:text-white">
              <h3>Note</h3>
            </div>
            <div className="w-[10%] dark:text-white">
              <h3>Status</h3>
            </div>
          </div>

          {/* Table Body */}

          {content}
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="text-lg font-medium text-gray-800">
                  Allowance List
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)}
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <LeaveForm leaveReport={reportLeave} onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default EmployeeLeaveApplication;
