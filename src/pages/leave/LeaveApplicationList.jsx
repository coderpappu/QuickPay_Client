import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";

import BrandCardWrapper from "../../components/company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../components/company/SettingCardHeader";
import LeaveApplicationForm from "../../components/hrm/Leave/LeaveApplicationForm";
import MonthYearSelector from "../../components/payroll/payslip/MonthYearSelector";
import {
  useDeleteApplicationMutation,
  useGetAllLeaveApplicationQuery,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import CardSkeleton from "../../skeletons/card";
import { DateConverterFromUTC } from "../../utils/Converter";
import ErrorMessage from "../../utils/ErrorMessage";

const LeaveApplicationListCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const [month, setMonth] = useState(new Date().toISOString().slice(5, 7));
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [statusFilter, setStatusFilter] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("");

  const companyId = useSelector((state) => state.company.companyId);
  const [deleteLeaveApplication] = useDeleteApplicationMutation();

  const {
    data: leaveApplicationList,
    isLoading,
    isError,
    error,
  } = useGetAllLeaveApplicationQuery(
    { companyId, month, year },
    { keepPreviousData: true },
  );

  const handleOpen = (id) => {
    setIsPopupOpen(true);
    setSelectId(id);
  };

  const handleDeleteApplication = async (applicationId) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            title="application"
            onConfirm={async () => {
              toast.dismiss(t.applicationId);
              try {
                const res = await deleteLeaveApplication(applicationId);
                if (res.error) {
                  toast.error(res.error.data.message);
                } else {
                  toast.success("Application deleted successfully");
                }
              } catch (error) {
                toast.error(error.message || "Failed to delete application");
              }
            }}
            onCancel={() => toast.dismiss(t.applicationId)}
          />
        ),
        {
          duration: Infinity,
        },
      );
    confirm();
  };

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

  const filteredData = useMemo(() => {
    return leaveApplicationList?.data?.filter((application) => {
      const matchStatus = !statusFilter || application.status === statusFilter;
      const matchEmployee =
        !employeeFilter ||
        application.Employee?.name
          ?.toLowerCase()
          .includes(employeeFilter.toLowerCase()) ||
        application.Employee?.id?.toString().includes(employeeFilter);
      return matchStatus && matchEmployee;
    });
  }, [leaveApplicationList, statusFilter, employeeFilter]);

  const renderContent = () => {
    if (!filteredData || filteredData.length === 0) {
      return (
        <div className="p-6 text-center text-gray-600 dark:text-white">
          No leave applications found for this selection.
        </div>
      );
    }

    return filteredData.map((application, index) => (
      <div
        key={application?.id}
        className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
      >
        <div className="w-[1%] dark:text-white">
          <h3>{index + 1}</h3>
        </div>
        <div className="w-[8%] dark:text-white">
          <h3>{application.LeaveType?.name}</h3>
        </div>
        <div className="w-[8%] dark:text-white">
          <h3>{application?.Employee?.name}</h3>
        </div>
        <div className="w-[7%] dark:text-white">
          <h3>{DateConverterFromUTC(application?.created_at)}</h3>
        </div>
        <div className="w-[7%] dark:text-white">
          <h3>{DateConverterFromUTC(application?.start_date)}</h3>
        </div>
        <div className="w-[7%] dark:text-white">
          <h3>{DateConverterFromUTC(application?.end_date)}</h3>
        </div>
        <div className="w-[3%] dark:text-white">
          <h3>{application?.leaveDuration}</h3>
        </div>
        <div className="w-[8%] dark:text-white">
          <h3>{application?.reason}</h3>
        </div>
        <div className="w-[7%] dark:text-white">
          <h3>{application?.paid_status}</h3>
        </div>
        <div className="w-[10%] dark:text-white">
          <h3>{application?.note || "..."}</h3>
        </div>
        <div className="w-[5%] dark:text-white">
          <h3>Manager</h3>
        </div>
        <div className="w-[8%] dark:text-white">
          <div
            className={`${statusColorHandler(application?.status)} w-32 rounded-full px-1 py-2 text-center text-xs font-bold text-gray-700`}
          >
            {application?.status}
          </div>
        </div>
        <div className="fex flex w-[6%] flex-wrap gap-2 space-x-2 text-white">
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-700 p-2">
            <CiEdit size={20} onClick={() => handleOpen(application?.id)} />
          </div>
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center">
            <AiOutlineDelete
              size={20}
              onClick={() => handleDeleteApplication(application?.id)}
            />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <BrandCardWrapper>
      <HrmSetupCardHeader title="Leave Applications" handleOpen={handleOpen} />

      <div className="flex flex-wrap items-center justify-end gap-4 px-6 py-2">
        <div className="ml-auto flex items-center gap-4">
          <MonthYearSelector
            month={month}
            year={year}
            onMonthChange={setMonth}
            onYearChange={setYear}
          />
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
          <input
            type="text"
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
            placeholder="Search by name or ID"
            className="h-12 rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-dark-card dark:text-white"
          />
        </div>
      </div>

      <div className="px-6 py-3">
        <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
          {[
            "SL",
            "Leave Type",
            "EM Name",
            "Applied on",
            "Start Date",
            "End Date",
            "Days",
            "Reason",
            "Paid Status",
            "Note",
            "Approved By",
            "Status",
            "Action",
          ].map((label, i) => (
            <div
              key={i}
              className="dark:text-white"
              style={{
                width: [
                  "1%",
                  "8%",
                  "8%",
                  "7%",
                  "7%",
                  "7%",
                  "3%",
                  "8%",
                  "7%",
                  "10%",
                  "5%",
                  "8%",
                  "6%",
                ][i],
              }}
            >
              <h3>{label}</h3>
            </div>
          ))}
        </div>

        {isLoading && !leaveApplicationList ? (
          <CardSkeleton />
        ) : isError ? (
          <ErrorMessage message={error?.data?.message} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        )}
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-4xl rounded-lg bg-white p-6 dark:bg-dark-card">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color dark:border-opacity-5">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Leave Application
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsPopupOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <LeaveApplicationForm
                selectId={selectId}
                setIsPopupOpen={setIsPopupOpen}
              />
            </div>
          </div>
        </div>
      )}
    </BrandCardWrapper>
  );
};

export default LeaveApplicationListCard;
