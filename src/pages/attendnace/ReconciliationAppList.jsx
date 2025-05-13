import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";
import {
  useDeleteReconciliationMutation,
  useGetReconciliationApplicationsQuery,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import CardSkeleton from "../../skeletons/card";
import {
  DateConverterFromUTC,
  TimeConverterFromUTC,
} from "../../utils/Converter";
import ErrorMessage from "../../utils/ErrorMessage";
import ReconciliationView from "./ReconciliationViewWithEdit";

const ITEMS_PER_PAGE = 20;

const ReconciliationApplicationListCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const companyId = useSelector((state) => state.company.companyId);
  const [deleteReconciliation] = useDeleteReconciliationMutation();

  // Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("PENDING");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const handleOpen = (id) => {
    setIsPopupOpen(true);
    setSelectId(id);
  };

  const {
    data: reconciliationList,
    isLoading,
    isError,
    error,
  } = useGetReconciliationApplicationsQuery(companyId);

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

  const handleDeleteReconciliation = async (id) => {
    toast(
      (t) => (
        <ConfirmDialog
          title="reconciliation"
          onConfirm={async () => {
            toast.dismiss(t.id);
            try {
              await deleteReconciliation(id).then((res) => {
                if (res.error) {
                  toast.error(res.error.data.message);
                } else {
                  toast.success("Reconciliation deleted successfully");
                }
              });
            } catch (error) {
              toast.error(error.message || "Failed to delete reconciliation");
            }
          }}
          onCancel={() => toast.dismiss(t.id)}
        />
      ),
      { duration: Infinity },
    );
  };

  const filteredData = reconciliationList?.data?.filter((item) => {
    const itemDate = new Date(item.date);
    const isInDateRange =
      (!startDate || new Date(startDate) <= itemDate) &&
      (!endDate || new Date(endDate) >= itemDate);
    const matchesUserId =
      !userId ||
      item.employee?.employeeId?.toLowerCase().includes(userId.toLowerCase());
    const matchesStatus =
      !status || item.status.toLowerCase() === status.toLowerCase();
    return isInDateRange && matchesUserId && matchesStatus;
  });

  const totalItems = filteredData?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  let content;
  if (isLoading) return <CardSkeleton />;
  if (isError) return <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError) {
    content = (
      <>
        {paginatedData?.length === 0 && (
          <div className="py-4 text-center text-gray-500 dark:text-gray-400">
            No reconciliation applications found.
          </div>
        )}
        {paginatedData?.map((app, index) => (
          <div
            key={app.id}
            className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
          >
            <div className="w-[3%] dark:text-white">
              {startIndex + index + 1}
            </div>
            <div className="w-[12%] dark:text-white">
              {app.employee?.employeeId}
            </div>
            <div className="w-[12%] dark:text-white">{app.employee?.name}</div>
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
            <div className="flex w-[13%] gap-2">
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-700 p-2 text-white">
                <CiEdit size={20} onClick={() => handleOpen(app.id)} />
              </div>
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-white">
                <AiOutlineDelete
                  size={20}
                  onClick={() => handleDeleteReconciliation(app.id)}
                />
              </div>
            </div>
          </div>
        ))}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="rounded bg-gray-200 px-3 py-1 text-sm disabled:opacity-50 dark:bg-gray-700 dark:text-white"
            >
              Previous
            </button>
            <span className="text-sm dark:text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="rounded bg-gray-200 px-3 py-1 text-sm disabled:opacity-50 dark:bg-gray-700 dark:text-white"
            >
              Next
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <BrandCardWrapper>
        <div className="flex items-center justify-between border-b border-dark-box border-opacity-5 px-6 py-4 dark:border-dark-border-color dark:border-opacity-5">
          <h3 className="text-base leading-6 dark:text-dark-heading-color">
            Reconciliation Applications
          </h3>
        </div>

        {/* Filter Controls */}
        <div className="mx-auto grid grid-cols-1 gap-4 bg-gray-50 px-6 py-4 md:grid-cols-4 dark:bg-dark-box">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-dark-card dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-dark-card dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Employee ID
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-dark-card dark:text-white"
              placeholder="Enter ID"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-dark-card dark:text-white"
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="">All</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-3">
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[3%] dark:text-white">SL</div>
            <div className="w-[12%] dark:text-white">Emp ID</div>
            <div className="w-[12%] dark:text-white">Name</div>
            <div className="w-[10%] dark:text-white">Date</div>
            <div className="w-[10%] dark:text-white">Check In</div>
            <div className="w-[10%] dark:text-white">Check Out</div>
            <div className="w-[10%] dark:text-white">Reason</div>
            <div className="w-[10%] dark:text-white">Status</div>
            <div className="w-[13%] dark:text-white">Action</div>
          </div>
          {content}
        </div>

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
                <ReconciliationView
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

export default ReconciliationApplicationListCard;
