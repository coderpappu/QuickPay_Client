import React, { useState } from "react";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../components/company/SettingCardHeader";

import {
  useGetAllEmployeeLeaveListQuery,
  useGetCompanyIdQuery,
} from "../../features/api";
import CardSkeleton from "../../skeletons/card";
import { DateConverterFromUTC } from "../../utils/Converter";
import ErrorMessage from "../../utils/ErrorMessage";
import LeaveForm from "../employee/LeaveForm";
const EmployeeLeaveApplication = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectAllowanceId, setSelectAllowanceId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectAllowanceId(id);
  };

  const { data: companyId } = useGetCompanyIdQuery();

  const {
    data: leaveApplications,
    isLoading,
    isError,
    error,
  } = useGetAllEmployeeLeaveListQuery(companyId);

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

  if (isLoading && !isError) return <CardSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && leaveApplications?.data)
    content = leaveApplications?.data?.map((application) => (
      <div
        key={application?.id}
        className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
      >
        <div className="w-[14%] dark:text-white">
          <h3>{application?.LeaveType?.name}</h3>
        </div>

        <div className="w-[14%] dark:text-white">
          <h3>{DateConverterFromUTC(application?.start_date)}</h3>
        </div>

        <div className="w-[14%] dark:text-white">
          <h3>{DateConverterFromUTC(application?.end_date)}</h3>
        </div>
        <div className="w-[14%] dark:text-white">
          <h3>{DateConverterFromUTC(application?.created_at)}</h3>
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
        <div className="px-6 py-3">
          {/* header  */}
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

          {/* body  */}
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
                  onClick={() => setIsPopupOpen(false)} // Close popup
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
