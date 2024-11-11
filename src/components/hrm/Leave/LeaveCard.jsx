import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../company/SettingCardHeader";

import {
  useDeleteLeaveTypeMutation,
  useGetCompanyIdQuery,
  useGetLeaveTypeListQuery,
} from "../../../features/api";

import { useState } from "react";
import toast from "react-hot-toast";
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

  const { data: companyId } = useGetCompanyIdQuery();
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
        }
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
            className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
          >
            <div className="dark:text-white w-[20%]">
              <h3>{type.name}</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>{type.code}</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>{type.type}</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>{type.day}</h3>
            </div>
            <div className="dark:text-white w-[20%]">
              <h3>{type.description}</h3>
            </div>

            <div className=" dark:text-white w-[10%] flex justify-end space-x-2 fex flex-wrap  gap-2">
              {/* edit button  */}
              <div className="w-8 h-8 bg-indigo-700 rounded-sm p-2 flex justify-center items-center cursor-pointer">
                <CiEdit size={20} onClick={() => handleOpen(type?.id)} />
              </div>

              {/* delete button  */}
              <div className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer">
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
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[20%]">
              <h3>Name</h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <h3>Code</h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <h3>Type</h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <h3>Day</h3>
            </div>
            <div className="dark:text-white w-[20%]">
              <h3>Description</h3>
            </div>

            <div className="dark:text-white w-[10%]">
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
