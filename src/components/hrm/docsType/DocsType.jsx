import React from "react";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import SettingCardHeader, {
  HrmSetupCardHeader,
} from "../../company/SettingCardHeader";
import SettingCardFooter from "../../company/SettingCardFooter";
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import {
  useDeleteDocsTypeMutation,
  useDeleteGradeMutation,
  useGetAllDocsTypeListQuery,
  useGetCompanyIdQuery,
  useGetGradeListQuery,
} from "../../../features/api";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import toast from "react-hot-toast";
import CardSkeleton from "../../skeletons/hrm-card-skeletons/card";
import ErrorMessage from "../../../utils/ErrorMessage";

import { useState } from "react";
import GradeForm from "./DocsForm";

const DocsTypeCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectgradeId, setSelectgradeId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectgradeId(id);
  };

  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteDocsType] = useDeleteDocsTypeMutation();

  //   const {
  //     data: gradeList,
  //     isLoading,
  //     isError,
  //     error,
  //   } = useGetgradeListQuery(companyId);

  const {
    data: docsTypeList,
    isLoading,
    isError,
    error,
  } = useGetAllDocsTypeListQuery(companyId);

  const handleDeleteGrade = async (docsTypeId) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.docsTypeId);
              try {
                deleteDocsType(docsTypeId).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("grade deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete grade");
              }
            }}
            onCancel={() => toast.dismiss(t.docsTypeId)}
            title="grade"
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

  if (!isLoading && !isError && docsTypeList?.data)
    content = docsTypeList?.data?.map((docsType) => (
      <div
        key={docsType?.id}
        className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
      >
        <div className="dark:text-white w-[20%]">
          <h3>{docsType?.name}</h3>
        </div>
        <div className="dark:text-white w-[20%]">
          <h3>
            {docsType?.status == "IS_REQUIRED" ? "Required" : "Not Required"}
          </h3>
        </div>

        <div className="dark:text-white w-[15%]">
          <div className="flex flex-wrap justify-start gap-2">
            {/* edit button  */}
            <div className="w-8 h-8 bg-indigo-600 rounded-sm p-2 flex justify-center items-center cursor-pointer">
              <CiEdit size={20} onClick={() => handleOpen(docsType?.id)} />
            </div>

            {/* delete button  */}
            <div className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer">
              <AiOutlineDelete
                size={20}
                onClick={() => handleDeleteGrade(docsType?.id)}
              />
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Document Type List"
          handleOpen={handleOpen}
          isPopupOpen={isPopupOpen}
        />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[20%]">
              <h3>Name</h3>
            </div>

            <div className="dark:text-white w-[20%]">
              <h3>Status</h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <h3>Action</h3>
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
                  Grade List
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <GradeForm gradeId={selectgradeId} onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default DocsTypeCard;