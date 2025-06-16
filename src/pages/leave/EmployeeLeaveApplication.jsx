import { useState } from "react";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../components/company/SettingCardHeader";

import { useSelector } from "react-redux";
import {
  useGetEmployeeLeaveListQuery,
  useGetUserQuery,
} from "../../features/api";
import CardSkeleton from "../../skeletons/card";
import { convertToTimeZone } from "../../utils/DatePicker";
import ErrorMessage from "../../utils/ErrorMessage";
import LeaveForm from "../employee/LeaveForm";

const EmployeeLeaveApplication = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectAllowanceId, setSelectAllowanceId] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("");

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
  } = useGetEmployeeLeaveListQuery({ companyId, employeeId });

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

  const filteredData = leaveApplications?.data?.filter((application) => {
    const startDate = new Date(application.start_date);
    const isWithinDateRange =
      (!fromDate || new Date(fromDate) <= startDate) &&
      (!toDate || startDate <= new Date(toDate));
    const isMatchingStatus =
      !statusFilter || application.status === statusFilter;
    const isMatchingEmployee =
      !employeeFilter ||
      application.employeeName
        ?.toLowerCase()
        .includes(employeeFilter.toLowerCase()) ||
      application.employeeId?.toString().includes(employeeFilter);

    return isWithinDateRange && isMatchingStatus && isMatchingEmployee;
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
      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Leave Application"
          handleOpen={handleOpen}
          isPopupOpen={isPopupOpen}
        />

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-end gap-4 px-6 py-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-dark-card dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-dark-card dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-dark-card dark:text-white"
            >
              <option value="">All</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Employee
            </label>
            <input
              type="text"
              value={employeeFilter}
              onChange={(e) => setEmployeeFilter(e.target.value)}
              placeholder="Search by name or ID"
              className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-dark-card dark:text-white"
            />
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
                <LeaveForm allowanceId={selectAllowanceId} onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default EmployeeLeaveApplication;
