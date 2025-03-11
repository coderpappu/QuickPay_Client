import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import {
  useDeleteDesignationMutation,
  useGetDesignationsQuery,
} from "../../../features/api";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../company/SettingCardHeader";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import CardSkeleton from "../../../skeletons/card";
import ErrorMessage from "../../../utils/ErrorMessage";
import DesignationForm from "./DesignationForm";
const DesignationCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectedDesignationId, setSelectedDesignationId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectedDesignationId(id);
  };

  const companyId = useSelector((state) => state.company.companyId);
  const [deleteDesignation] = useDeleteDesignationMutation();

  const {
    data: designationList,
    isLoading,
    isError,
    error,
  } = useGetDesignationsQuery(companyId);

  const handleDeleteDesigantion = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteDesignation(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Designation deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete designation");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Designation"
          />
        ),
        {
          duration: Infinity,
        },
      );

    confirm();
  };
  let content;

  if (isLoading && !isError) return <CardSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && designationList?.data)
    content = (
      <>
        <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
          <div className="w-[35%] dark:text-white">
            <h3>Designation</h3>
          </div>

          <div className="w-[15%] dark:text-white">
            <h3>Actions</h3>
          </div>
        </div>

        {designationList?.data?.map((designation) => (
          <div
            key={designation?.id}
            className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
          >
            <div className="w-[35%] dark:text-white">
              <h3>{designation?.name}</h3>
            </div>
            <div className="w-[15%] dark:text-white">
              <div className="flex flex-wrap justify-start gap-2">
                {/* edit button  */}
                <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-700 p-2">
                  <CiEdit
                    size={20}
                    onClick={() => handleOpen(designation?.id)}
                  />
                </div>

                {/* delete button  */}
                <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center">
                  <AiOutlineDelete
                    size={20}
                    onClick={() => handleDeleteDesigantion(designation?.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader title="Designation" handleOpen={handleOpen} />
        <div className="px-6 py-3">
          {/* header  */}

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
                <DesignationForm
                  designationId={selectedDesignationId}
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

export default DesignationCard;
