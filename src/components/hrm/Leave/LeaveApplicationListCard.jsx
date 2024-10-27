import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../company/SettingCardHeader";

import {
  useDeleteApplicationMutation,
  useGetAllLeaveApplicationQuery,
  useGetCompanyIdQuery,
} from "../../../features/api";

import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import DatePicker from "../../../utils/DatePicker";
import ErrorMessage from "../../../utils/ErrorMessage";
import CardSkeleton from "../../skeletons/hrm-card-skeletons/card";
import LeaveApplicationForm from "./LeaveApplicationForm";

const LeaveApplicationListCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectId, setSelectId] = useState(null);
  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteLeaveApplication] = useDeleteApplicationMutation();

  const handleOpen = (id) => {
    setIsPopupOpen(true);
    setSelectId(id);
  };
  const {
    data: leaveApplicationList,
    isLoading,
    isError,
    error,
  } = useGetAllLeaveApplicationQuery(companyId);

  let content;

  if (isLoading && !isError) content = <CardSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

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

  const handleDeleteApplication = async (applicationId) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            title="application"
            onConfirm={async () => {
              toast.dismiss(t.applicationId);
              try {
                await deleteLeaveApplication(applicationId).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Application deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete company");
              }
            }}
            onCancel={() => toast.dismiss(t.applicationId)}
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
              <h3>Manager</h3>
            </div>
            <div className="dark:text-white w-[8%]">
              <div
                className={` ${statusColorHandler(application?.status)} w-32  px-1 py-2 rounded-full text-center text-gray-700 font-bold text-xs`}
              >
                {application?.status}
              </div>
            </div>

            <div className=" dark:text-white w-[8%] flex  space-x-2 fex flex-wrap  gap-2">
              {/* edit button  */}
              <div className="w-8 h-8 bg-indigo-700 rounded-sm p-2 flex justify-center items-center cursor-pointer">
                <CiEdit size={20} onClick={() => handleOpen(application?.id)} />
              </div>

              {/* delete button  */}
              <div className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer">
                <AiOutlineDelete
                  size={20}
                  onClick={() => handleDeleteApplication(application?.id)}
                />
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
          title="Leave Applications"
          handleOpen={handleOpen}
        />
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
                <LeaveApplicationForm
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

export default LeaveApplicationListCard;
