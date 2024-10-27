import React from "react";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../company/SettingCardHeader";

import {
  useDeleteLeaveTypeMutation,
  useGetAllLeaveApplicationQuery,
  useGetCompanyIdQuery
} from "../../../features/api";

import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import DatePicker from "../../../utils/DatePicker";
import ErrorMessage from "../../../utils/ErrorMessage";
import CardSkeleton from "../../skeletons/hrm-card-skeletons/card";
import LeaveTypeForm from "./LeaveTypeForm";

const LeaveApplicationListCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [leaveTypeId, setleaveTypeId] = useState(null);
  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteLeaveType] = useDeleteLeaveTypeMutation();

  const handleOpen = (id) => {
    setIsPopupOpen(true);
    setleaveTypeId(id);
  };
  const {
    data: leaveApplicationList,
    isLoading,
    isError,
    error,
  } = useGetAllLeaveApplicationQuery(companyId);

  let content;

  if (isLoading && !isError) content = <CardSkeleton />;
  if (!isLoading && isError) content = <ErrorMessage  message={error?.data?.message}/>;
 

 
  const handleDeactivate = () => {
    // setCompanyId(null);
  };

  const handleDeleteLeaveType = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                await deleteLeaveType(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Company deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete company");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
          />
        ),
        {
          duration: Infinity,
        }
      );

    confirm();
  };
 


  if (!isLoading && !isError) {
   
    content = (
      <>
        {leaveApplicationList?.data?.map((application, index) => (
          <div
            key={application?.id}
            className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
          >
          <div className="dark:text-white w-[3%]">
              <h3>{++index}</h3>
            </div>

            <div className="dark:text-white w-[8%]">
              <h3>{application.LeaveType?.name}</h3>
            </div>

            <div className="dark:text-white w-[8%]">
              <h3>{DatePicker(application?.created_at)}</h3>
            </div>

            <div className="dark:text-white w-5%]">
              <h3>{DatePicker(application?.start_date)}</h3>
            </div>

            <div className="dark:text-white w-5%]">
              <h3>{DatePicker(application?.end_date)}</h3>
            </div>
            <div className="dark:text-white w-[5%]">
              <h3>{application?.leaveDuration}</h3>
            </div>
            <div className="dark:text-white w-[8%]">
              <h3>{application?.reason}</h3>
            </div>

            <div className="dark:text-white w-[8%]">
              <h3>{application?.paid_status}</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>{application?.note || "..."}</h3>
            </div>
            <div className="dark:text-white w-[8%]">
              <h3>Approved By</h3>
            </div>
            <div className="dark:text-white w-[8%]">
              <h3>Status</h3>
            </div>
            <div className="dark:text-white w-[8%]">
              <h3>Action</h3>
            </div>
            </div>
        
        ))}
      </>
    );
  }

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader title="Leave Applications" handleOpen={handleOpen} />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
          <div className="dark:text-white w-[3%]">
              <h3>SL</h3>
            </div>

            <div className="dark:text-white w-[8%]">
              <h3>Leave Type</h3>
            </div>

            <div className="dark:text-white w-[8%]">
              <h3>Applied on</h3>
            </div>

            <div className="dark:text-white w-5%]">
              <h3>Start Date</h3>
            </div>

            <div className="dark:text-white w-5%]">
              <h3>End Date</h3>
            </div>
            <div className="dark:text-white w-[5%]">
              <h3>Days</h3>
            </div>
            <div className="dark:text-white w-[8%]">
              <h3>Reason</h3>
            </div>

            <div className="dark:text-white w-[8%]">
              <h3>Paid Status</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Note</h3>
            </div>
            <div className="dark:text-white w-[8%]">
              <h3>Approved By</h3>
            </div>
            <div className="dark:text-white w-[8%]">
              <h3>Status</h3>
            </div>
            <div className="dark:text-white w-[8%]">
              <h3>Action</h3>
            </div>
          </div>

          {/* body  */}
          {content}
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-dark-card  rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Designation
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <LeaveTypeForm
                  leaveTypeId={leaveTypeId}
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

export default LeaveApplicationListCard;
