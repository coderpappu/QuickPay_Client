import React from "react";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import SettingCardHeader, {
  HrmSetupCardHeader,
} from "../../company/SettingCardHeader";
import SettingCardFooter from "../../company/SettingCardFooter";
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useGetCompanyIdQuery,
  useDeleteSectionMutation,
  useGetSectionsQuery,
} from "../../../features/api";
import toast from "react-hot-toast";
import CardSkeleton from "../../skeletons/hrm-card-skeletons/card";
import ErrorMessage from "../../../utils/ErrorMessage";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import SectionForm from "./SectionForm";

const SectionCard = () => {
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectedSectionId, setSelectSectiontId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectSectiontId(id);
  };

  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteSection] = useDeleteSectionMutation();

  const {
    data: sectionList,
    isLoading,
    isError,
    error,
  } = useGetSectionsQuery(companyId);

  const handleDeleteSection = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteSection(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Section deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete section");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Section"
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

  if (!isLoading && !isError && sectionList?.data)
    content = sectionList?.data?.map((section, index) => (
      <div
        key={section?.id}
        className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
      >
        <div className="dark:text-white w-[35%]">
          <h3>{section?.name}</h3>
        </div>

        <div className="dark:text-white w-[15%]">
          <div className="flex flex-wrap justify-start gap-2">
            {/* edit button  */}
            <div className="w-8 h-8 bg-green-400 rounded-sm p-2 flex justify-center items-center cursor-pointer">
              <CiEdit size={20} onClick={() => handleOpen(section?.id)} />
            </div>

            {/* delete button  */}
            <div
              className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer"
              onClick={() => handleDeleteSection(section?.id)}
            >
              <AiOutlineDelete size={20} />
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader title="Section" handleOpen={handleOpen} />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[35%]">
              <h3>Sections</h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <h3>Actions</h3>
            </div>
          </div>

          {/* body  */}

          {content}
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Section
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <SectionForm
                  sectionId={selectedSectionId}
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

export default SectionCard;
