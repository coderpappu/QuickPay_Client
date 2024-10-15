import React from "react";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";
import SettingCardHeader, {
  HrmSetupCardHeader,
} from "../../components/company/SettingCardHeader";
import SettingCardFooter from "../../components/company/SettingCardFooter";
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
// import AllowanceForm from "./AllowanceForm";
// import {
//   useDeleteAllowanceMutation,
//   useGetAllowanceListQuery,
//   useGetCompanyIdQuery,
// } from "../../../features/api";

import ConfirmDialog from "../../helpers/ConfirmDialog";
import toast from "react-hot-toast";

import CardSkeleton from "../../components/skeletons/hrm-card-skeletons/card";
import ErrorMessage from "../../utils/ErrorMessage";
import {
  useGetAllEmployeeLeaveListQuery,
  useGetAllLeaveApplicationQuery,
  useGetCompanyIdQuery,
} from "../../features/api";
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
  } = useGetAllLeaveApplicationQuery(companyId);

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
        className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
      >
        <div className="dark:text-white w-[14%]">
          <h3>{application?.LeaveType?.name}</h3>
        </div>

        <div className="dark:text-white w-[14%]">
          <h3>{application?.start_date}</h3>
        </div>

        <div className="dark:text-white w-[14%]">
          <h3>{application?.end_date}</h3>
        </div>
        <div className="dark:text-white w-[14%]">
          <h3>{application?.created_at}</h3>
        </div>
        <div className="dark:text-white w-[14%]">
          <h3>{application?.reason}</h3>
        </div>
        <div className="dark:text-white w-[14%]">
          <h3>{application?.note}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <div
            className={` ${statusColorHandler(application?.status)} w-32  px-1 py-2 rounded-full text-center text-gray-700 font-bold text-xs`}
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
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[14%]">
              <h3>Leave Type</h3>
            </div>

            <div className="dark:text-white w-[14%]">
              <h3>Start Date</h3>
            </div>

            <div className="dark:text-white w-[14%]">
              <h3>End Date</h3>
            </div>
            <div className="dark:text-white w-[14%]">
              <h3>Apply Date</h3>
            </div>
            <div className="dark:text-white w-[14%]">
              <h3>Reason</h3>
            </div>
            <div className="dark:text-white w-[14%]">
              <h3>Note</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Status</h3>
            </div>
          </div>

          {/* body  */}
          {content}
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
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
