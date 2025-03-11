import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import {
  useDeleteDocsTypeMutation,
  useGetAllDocsTypeListQuery,
} from "../../../features/api";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import CardSkeleton from "../../../skeletons/card";
import ErrorMessage from "../../../utils/ErrorMessage";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../company/SettingCardHeader";
import DocsTypeForm from "./DocsForm";
const DocsTypeCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectDocsTypeId, setSelectDocsTypeId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectDocsTypeId(id);
  };

  const companyId = useSelector((state) => state.company.companyId);
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
        },
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
        className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
      >
        <div className="w-[20%] dark:text-white">
          <h3>{docsType?.name}</h3>
        </div>
        <div className="w-[20%] dark:text-white">
          <h3>
            {docsType?.status == "IS_REQUIRED" ? "Required" : "Not Required"}
          </h3>
        </div>

        <div className="w-[15%] dark:text-white">
          <div className="flex flex-wrap justify-start gap-2">
            {/* edit button  */}
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-600 p-2">
              <CiEdit size={20} onClick={() => handleOpen(docsType?.id)} />
            </div>

            {/* delete button  */}
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center">
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
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[20%] dark:text-white">
              <h3>Name</h3>
            </div>

            <div className="w-[20%] dark:text-white">
              <h3>Status</h3>
            </div>

            <div className="w-[15%] dark:text-white">
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
                  Docs Type
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <DocsTypeForm docsTypeId={selectDocsTypeId} onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default DocsTypeCard;
