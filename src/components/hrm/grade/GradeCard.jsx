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
  useDeleteGradeMutation,
  useGetCompanyIdQuery,
  useGetGradeListQuery,
} from "../../../features/api";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import toast from "react-hot-toast";
import CardSkeleton from "../../skeletons/hrm-card-skeletons/card";
import ErrorMessage from "../../../utils/ErrorMessage";

import { useState } from "react";
import GradeForm from "./GradeForm";

const GradeCard = () => {
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
  const [deletegrade] = useDeleteGradeMutation();

  //   const {
  //     data: gradeList,
  //     isLoading,
  //     isError,
  //     error,
  //   } = useGetgradeListQuery(companyId);

  const {
    data: gradeList,
    isLoading,
    isError,
    error,
  } = useGetGradeListQuery(companyId);

  const handleDeleteGrade = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deletegrade(id).then((res) => {
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
            onCancel={() => toast.dismiss(t.id)}
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

  if (!isLoading && !isError && gradeList?.data)
    content = gradeList?.data?.map((grade) => (
      <div
        key={grade?.id}
        className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
      >
        <div className="dark:text-white w-[20%]">
          <h3>{grade?.name}</h3>
        </div>
        <div className="dark:text-white w-[20%]">
          <h3>{grade?.basic_salary}</h3>
        </div>
        <div className="dark:text-white w-[20%]">
          <h3>{grade?.overtime_rate}</h3>
        </div>

        <div className="dark:text-white w-[15%]">
          <div className="flex flex-wrap justify-start gap-2">
            {/* edit button  */}
            <div className="w-8 h-8 bg-indigo-600 rounded-sm p-2 flex justify-center items-center cursor-pointer">
              <CiEdit size={20} onClick={() => handleOpen(grade?.id)} />
            </div>

            {/* delete button  */}
            <div className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer">
              <AiOutlineDelete
                size={20}
                onClick={() => handleDeleteGrade(grade?.id)}
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
          title="grade"
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
              <h3>Basic Salary</h3>
            </div>

            <div className="dark:text-white w-[20%]">
              <h3>Over Rate </h3>
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

export default GradeCard;