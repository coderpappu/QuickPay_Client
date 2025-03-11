import { ErrorMessage } from "formik";
import React, { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiOutlinePlusSm } from "react-icons/hi";
import { TbDots } from "react-icons/tb";
import { useSelector } from "react-redux";
import {
  useCalculationLeaveDaysQuery,
  useGetAllEmployeeLeaveListQuery,
} from "../../features/api";
import ListSkeleton from "../../skeletons/ListSkeleton";
import LeaveForm from "./LeaveForm";

const Leave = () => {
  const [progressValue, setProgressValue] = useState(10);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const companyId = useSelector((state) => state.company.companyId);
  const {
    data: employeeLeave,
    isLoading,
    isError,
  } = useGetAllEmployeeLeaveListQuery();

  const {
    data: leaveCalculation,
    isLoading: leaveLoading,
    isError: leaveError,
    error,
  } = useCalculationLeaveDaysQuery({ year: 2024, company_id: companyId });

  let content;

  const statusColorHandler = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-[#ffffcd] text-[#f7d000]";
      case "APPROVED":
        return "bg-[#DDF6E1] text-[#1DCF33]";
      case "REJECTED":
        return "bg-[#ffd4d4] text-[#ff0d0d]";
      default:
        return "text-gray-500";
    }
  };

  if (isLoading && !isError) content = <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError) {
    content = (
      <tbody>
        {employeeLeave?.data?.map((leave, index) => (
          <tr
            key={leave?.id}
            className={index % 2 === 0 ? "" : "rounded-sm bg-gray-50"}
          >
            <td className="py-2 text-sm">{leave?.LeaveType?.name}</td>

            <td className="py-2 text-sm">
              {/* {employee?.name} */}
              {leave?.start_date}
            </td>
            <td className="py-2 text-sm">
              {/* {employee?.name} */}
              {leave?.end_date}
            </td>
            <td className="py-2 text-center text-sm">
              {/* {employee?.name} */}2
            </td>
            <td className="py-2 text-sm">
              {/* {employee?.name} */}
              {leave?.reason}
            </td>
            <td className="py-2 text-sm">
              {/* {employee?.name} */}
              {leave?.paid_status}
            </td>
            <td className="py-2 text-sm">
              {/* {employee?.name} */}
              {leave?.note || "..."}
            </td>
            <td className="py-2 text-sm">
              {/* {employee?.name} */}
              Manager
            </td>
            <td className="py-2 text-sm">
              <div
                className={` ${statusColorHandler(leave.status)} m-auto w-32 rounded-full px-1 py-2 text-center text-xs font-bold`}
              >
                {leave?.status}
              </div>
            </td>
            <td className="flex items-center justify-center py-2 text-sm">
              <TbDots />
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <div className="px-4 md:px-0">
      <div className="flex flex-wrap items-center justify-between pb-2">
        <div>
          <h2 className="pb-2 text-lg font-semibold">Leave Management</h2>
        </div>
      </div>

      <div className="h-[250px] w-full rounded-md border-[1px] border-solid border-slate-200 bg-white p-5">
        <div>
          <h2 className="font-semibold">Leaves</h2>
        </div>
        <div className="mt-2 flex h-[100px] w-full flex-wrap justify-around">
          <div className="h-[100px] w-[100px] text-center">
            <CircularProgressbar
              value={Math.round(leaveCalculation?.data?.[0]?.percentageUsed)}
              text={`${Number(leaveCalculation?.data?.[0]?.percentageUsed)}%`}
              strokeWidth={11}
              styles={buildStyles({
                textColor: "red",
                pathColor: "#4CCD99",
                trailColor: "#F2F5FF",
                strokeLinecap: "round",
              })}
            />
            <div className="mt-2">
              <h2>Sick Leave</h2>
              <h2>{`${Math.round(leaveCalculation?.data?.[0]?.usedDays)} / ${Number(leaveCalculation?.data?.[0]?.totalDays)}  `}</h2>
            </div>
          </div>

          <div className="h-[100px] w-[100px] text-center">
            <CircularProgressbar
              value={Math.round(leaveCalculation?.data?.[1]?.percentageUsed)}
              text={`${Math.round(leaveCalculation?.data?.[1]?.percentageUsed)}%`}
              strokeWidth={11}
              styles={buildStyles({
                textColor: "red",
                pathColor: "#7695FF",
                trailColor: "#F2F5FF",
                strokeLinecap: "round",
              })}
            />
            <div className="mt-2">
              <h2>Festible Leave</h2>
              <h2>{`${Math.round(leaveCalculation?.data?.[1]?.usedDays)} / ${Number(leaveCalculation?.data?.[1]?.totalDays)}  `}</h2>
            </div>
          </div>
          <div className="h-[100px] w-[100px] text-center">
            <CircularProgressbar
              value={Math.round(leaveCalculation?.data?.[2]?.percentageUsed)}
              text={`${Number(leaveCalculation?.data?.[2]?.percentageUsed)}%`}
              strokeWidth={11}
              styles={buildStyles({
                textColor: "red",
                pathColor: "#FF3838",
                trailColor: "#F2F5FF",
                strokeLinecap: "round",
              })}
            />
            <div className="mt-2">
              <h2>Casual Leave</h2>
              <h2>{`${Math.round(leaveCalculation?.data?.[2]?.usedDays)} / ${Number(leaveCalculation?.data?.[2]?.totalDays)}  `}</h2>
            </div>
          </div>
          <div className="h-[100px] w-[100px] text-center">
            <CircularProgressbar
              value={progressValue}
              text={`${progressValue}%`}
              strokeWidth={11}
              styles={buildStyles({
                textColor: "red",
                pathColor: "#FFD23F",
                trailColor: "#F2F5FF",
                strokeLinecap: "round",
              })}
            />
            <div className="mt-2">
              <h2>Sick Leave</h2>
              <h2>30 / 100 </h2>
            </div>
          </div>
          <div className="h-[150px] w-[200px] rounded-md bg-[#F2F5FF] p-2">
            <h1>Other Leaves</h1>
          </div>
        </div>
      </div>
      <div className="mt-3 h-auto w-full rounded-md border-[1px] border-solid border-slate-200 bg-white p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between">
          <div>All Leave Request</div>

          <button
            className="flex items-center justify-between rounded-md bg-[#3686FF] px-3 py-2 text-white"
            onClick={() => setIsPopupOpen(true)}
          >
            {" "}
            <HiOutlinePlusSm className="mr-1" /> Apply Leave
          </button>
        </div>
        <table className="h-auto w-full">
          {/* {!isError && ( */}
          <thead className="mt-8 border-b border-slate-200 text-left">
            <tr>
              <th className="pb-2 text-base">Leave Type</th>
              <th className="pb-2 text-base">From</th>
              <th className="pb-2 text-base">To</th>
              <th className="pb-2 text-base">Days</th>
              <th className="pb-2 text-base">Reason</th>
              <th className="pb-2 text-base">Paid Status</th>
              <th className="pb-2 text-base">Note</th>
              <th className="pb-2 text-base">Approved By</th>
              <th className="pb-2 text-center text-base">Status</th>
              <th className="pb-2 text-base">Action</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-lg font-medium text-gray-800">
                Add Holiday Type
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsPopupOpen(false)} // Close popup
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <LeaveForm onClose={onClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
