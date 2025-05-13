import { useState } from "react";
import { PiEyeLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../components/company/SettingCardHeader";
import {
  useDeleteReconciliationMutation,
  useGetEmployeeReconciliationsQuery,
} from "../../features/api";
import CardSkeleton from "../../skeletons/card";
import {
  DateConverterFromUTC,
  TimeConverterFromUTC,
} from "../../utils/Converter";
import ErrorMessage from "../../utils/ErrorMessage";
import EmployeeReconciliationView from "./EmployeeReconciliationView";
import ReconciliationForm from "./ReconciliationApplication";

const EmployeeReconciliationAppListCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isReconPopupOpen, setIsReconPopupOpen] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const companyId = useSelector((state) => state.company.companyId);
  const [deleteReconciliation] = useDeleteReconciliationMutation();

  const handleOpen = (id) => {
    setIsPopupOpen(true);
    setSelectId(id);
  };

  const handleReconOpen = (id) => {
    setIsReconPopupOpen(true);
    setSelectId(id);
  };

  const {
    data: reconciliationList,
    isLoading,
    isError,
    error,
  } = useGetEmployeeReconciliationsQuery();

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

  let content;

  if (isLoading) return <CardSkeleton />;
  if (isError) return <ErrorMessage message={error?.data?.message} />;

  const filteredData = reconciliationList?.data?.filter((app) => {
    const appDate = new Date(app.date);
    const isWithinDateRange =
      (!fromDate || new Date(fromDate) <= appDate) &&
      (!toDate || appDate <= new Date(toDate));
    const isMatchingStatus = !statusFilter || app.status === statusFilter;
    return isWithinDateRange && isMatchingStatus;
  });

  if (!isLoading && !isError) {
    content = (
      <>
        {filteredData?.map((app, index) => (
          <div
            key={app.id}
            className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
          >
            <div className="w-[3%] dark:text-white">{++index}</div>
            <div className="w-[10%] dark:text-white">
              {DateConverterFromUTC(app.date)}
            </div>
            <div className="w-[10%] dark:text-white">
              {app.approvedCheckIn
                ? TimeConverterFromUTC(app.approvedCheckIn)
                : "N/A"}
            </div>
            <div className="w-[10%] dark:text-white">
              {app.approvedCheckOut
                ? TimeConverterFromUTC(app.approvedCheckOut)
                : "N/A"}
            </div>
            <div className="w-[10%] dark:text-white">{app.reason}</div>
            <div className="w-[10%]">
              <div
                className={`w-24 rounded-full px-2 py-1 text-center text-xs font-bold ${statusColorHandler(app.status)}`}
              >
                {app.status}
              </div>
            </div>
            <div className="flex w-[10%] gap-2">
              <div
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-green-600 p-2 text-white"
                onClick={() => handleReconOpen(app.id)}
              >
                <PiEyeLight size={20} />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Reconciliation Applications"
          handleOpen={handleOpen}
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
        </div>

        {/* Table Header */}
        <div className="px-6 py-3">
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[3%] dark:text-white">SL</div>
            <div className="w-[10%] dark:text-white">Date</div>
            <div className="w-[10%] dark:text-white">Check In</div>
            <div className="w-[10%] dark:text-white">Check Out</div>
            <div className="w-[10%] dark:text-white">Reason</div>
            <div className="w-[10%] dark:text-white">Status</div>
            <div className="w-[10%] dark:text-white">Action</div>
          </div>
          {content}
        </div>

        {/* Popup for Add Form */}
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-4xl rounded-lg bg-white p-6 dark:bg-dark-card">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Reconciliation Form
                </h3>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <ReconciliationForm
                  selectId={selectId}
                  setIsPopupOpen={setIsPopupOpen}
                />
              </div>
            </div>
          </div>
        )}

        {/* Popup for View */}
        {isReconPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-4xl rounded-lg bg-white p-6 dark:bg-dark-card">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Reconciliation Form
                </h3>
                <button
                  onClick={() => setIsReconPopupOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <EmployeeReconciliationView
                  selectId={selectId}
                  setIsPopupOpen={setIsPopupOpen}
                />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default EmployeeReconciliationAppListCard;
