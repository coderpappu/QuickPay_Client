import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../company/SettingCardHeader";

import {
  useDeleteLeaveTypeMutation,
  useGetLeaveTypeListQuery,
} from "../../../features/api";

import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import CardSkeleton from "../../../skeletons/card";
import ErrorMessage from "../../../utils/ErrorMessage";
import LeaveTypeForm from "./LeaveTypeForm";


const LeaveCard = () => {
  
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [leaveTypeId, setleaveTypeId] = useState(null);
  const handleOpen = (id) => {
    setIsPopupOpen(true);
    setleaveTypeId(id);
  };

  const companyId = useSelector((state) => state.company.companyId);
  const [deleteLeaveType] = useDeleteLeaveTypeMutation();

  const {
    data: leaveTypes,
    isLoading,
    isError,
    error,
  } = useGetLeaveTypeListQuery(companyId);

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
        },
      );

    confirm();
  };
  let content;

  if (isLoading && !isError) content = <CardSkeleton />;

  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  let leaveTypesData;

  if (!isLoading && !isError) {
    leaveTypesData = leaveTypes?.data;
    content = (
      <>
        {leaveTypesData?.map((type, index) => (
          <div
            key={type.id}
            className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
          >
            <div className="w-[20%] dark:text-white">
              <h3>{type.name}</h3>
            </div>
            <div className="w-[15%] dark:text-white">
              <h3>{type.code}</h3>
            </div>
            <div className="w-[15%] dark:text-white">
              <h3>{type.type}</h3>
            </div>
            <div className="w-[15%] dark:text-white">
              <h3>{type.day}</h3>
            </div>
            <div className="w-[20%] dark:text-white">
              <h3>{type.description}</h3>
            </div>

            <div className="fex flex w-[10%] flex-wrap justify-end gap-2 space-x-2 dark:text-white">
              {/* edit button  */}
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-700 p-2">
                <CiEdit size={20} onClick={() => handleOpen(type?.id)} />
              </div>

              {/* delete button  */}
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center">
                <AiOutlineDelete
                  size={20}
                  onClick={() => handleDeleteLeaveType(type?.id)}
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
        <HrmSetupCardHeader title="Leave" handleOpen={handleOpen} />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[20%] dark:text-white">
              <h3>Name</h3>
            </div>

            <div className="w-[15%] dark:text-white">
              <h3>Code</h3>
            </div>

            <div className="w-[15%] dark:text-white">
              <h3>Type</h3>
            </div>

            <div className="w-[15%] dark:text-white">
              <h3>Day</h3>
            </div>
            <div className="w-[20%] dark:text-white">
              <h3>Description</h3>
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
                  Leave
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

export default LeaveCard;
