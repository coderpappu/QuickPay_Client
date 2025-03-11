import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import {
  useDeleteApplicationMutation,
  useGetAllLeaveApplicationQuery,
} from "../../../features/api";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../company/SettingCardHeader";

import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import CardSkeleton from "../../../skeletons/card";
import { DateConverterFromUTC } from "../../../utils/Converter";
import ErrorMessage from "../../../utils/ErrorMessage";
import LeaveApplicationForm from "./LeaveApplicationForm";
const LeaveApplicationListCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectId, setSelectId] = useState(null);
  const companyId = useSelector((state) => state.company.companyId);
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

  if (isLoading && !isError) return <CardSkeleton />;
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
        },
      );

    confirm();
  };

  if (!isLoading && !isError) {
    content = (
      <>
        {leaveApplicationList?.data?.map((application, index) => (
          <div
            key={application?.id}
            className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
          >
            <div className="w-[3%] dark:text-white">
              <h3>{++index}</h3>
            </div>

            <div className="w-[8%] dark:text-white">
              <h3>{application.LeaveType?.name}</h3>
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
            <div className="w-[5%] dark:text-white">
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
            <div className="w-[8%] dark:text-white">
              <h3>Manager</h3>
            </div>
            <div className="w-[8%] dark:text-white">
              <div
                className={` ${statusColorHandler(application?.status)} w-32 rounded-full px-1 py-2 text-center text-xs font-bold text-gray-700`}
              >
                {application?.status}
              </div>
            </div>

            <div className="fex flex w-[10%] flex-wrap gap-2 space-x-2 text-white">
              <div>
                <Link to={`/leave/application/${application?.id}`}>
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-green-600 p-2">
                    <PiEyeLight size={20} />
                  </div>
                </Link>
              </div>

              {/* edit button  */}
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-700 p-2">
                <CiEdit size={20} onClick={() => handleOpen(application?.id)} />
              </div>

              {/* delete button  */}
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center">
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
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[3%] dark:text-white">
              <h3>SL</h3>
            </div>

            <div className="w-[8%] dark:text-white">
              <h3>Leave Type</h3>
            </div>

            <div className="w-[7%] dark:text-white">
              <h3>Applied on</h3>
            </div>

            <div className="w-[7%] dark:text-white">
              <h3>Start Date</h3>
            </div>

            <div className="w-[7%] dark:text-white">
              <h3>End Date</h3>
            </div>
            <div className="w-[5%] dark:text-white">
              <h3>Days</h3>
            </div>
            <div className="w-[8%] dark:text-white">
              <h3>Reason</h3>
            </div>

            <div className="w-[7%] dark:text-white">
              <h3>Paid Status</h3>
            </div>
            <div className="w-[10%] dark:text-white">
              <h3>Note</h3>
            </div>
            <div className="w-[8%] dark:text-white">
              <h3>Approved By</h3>
            </div>
            <div className="w-[8%] dark:text-white">
              <h3>Status</h3>
            </div>
            <div className="w-[10%] dark:text-white">
              <h3>Action</h3>
            </div>
          </div>

          {/* body  */}
          {content}
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-dark-card">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color dark:border-opacity-5">
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
