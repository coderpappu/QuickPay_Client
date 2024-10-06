import React from "react";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import SettingCardHeader, {
  HrmSetupCardHeader,
} from "../../company/SettingCardHeader";
import SettingCardFooter from "../../company/SettingCardFooter";
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import {
  useGetCompanyIdQuery,
  useGetDepartmentsQuery,
  useDeleteDepartmentMutation,
  useDeleteDeductionMutation,
  useGetDesignationDetailsQuery,
  useGetDesignationsQuery,
  useDeleteDesignationMutation,
} from "../../../features/api";

import toast from "react-hot-toast";
import CardSkeleton from "../../skeletons/hrm-card-skeletons/card";
import ErrorMessage from "../../../utils/ErrorMessage";
import DesignationForm from "./DesignationForm";
import ConfirmDialog from "../../../helpers/ConfirmDialog";

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

  const { data: companyId } = useGetCompanyIdQuery();
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
        }
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
        <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
          <div className="dark:text-white w-[35%]">
            <h3>Designation</h3>
          </div>

          <div className="dark:text-white w-[15%]">
            <h3>Actions</h3>
          </div>
        </div>

        {designationList?.data?.map((designation) => (
          <div
            key={designation?.id}
            className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
          >
            <div className="dark:text-white w-[35%]">
              <h3>{designation?.name}</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <div className="flex flex-wrap justify-start gap-2">
                {/* edit button  */}
                <div className="w-8 h-8 bg-indigo-700 rounded-sm p-2 flex justify-center items-center cursor-pointer">
                  <CiEdit
                    size={20}
                    onClick={() => handleOpen(designation?.id)}
                  />
                </div>

                {/* delete button  */}
                <div className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer">
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
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">
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
