import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useParams } from "react-router-dom";
import {
  useDeleteEmployeeDeductionMutation,
  useGetEmployeeDeductionQuery,
} from "../../features/api";

import { useSelector } from "react-redux";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import CardSkeleton from "../../skeletons/card";
import ErrorMessage from "../../utils/ErrorMessage";
import BrandCardWrapper from "../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../company/SettingCardHeader";
import EmployeeDeductionForm from "./EmployeeDeductionForm";

const EmployeeDeductionCard = () => {
  const { id: employeeId } = useParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectDeductionId, setSelectDeductionId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectDeductionId(id);
  };

  const companyId = useSelector((state) => state.company.companyId);
  const [deleteAllowance] = useDeleteEmployeeDeductionMutation();

  const {
    data: deductionList,
    isLoading,
    isError,
    error,
  } = useGetEmployeeDeductionQuery({ employeeId, companyId });

  const handleDeleteAllowance = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteAllowance(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Deduction deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete allowance");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Deduction"
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

  if (!isLoading && !isError && deductionList?.data)
    content = deductionList?.data?.map((deduction) => (
      <div
        key={deduction?.id}
        className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
      >
        <div className="w-[20%] dark:text-white">
          <h3>{deduction?.DeductionType?.name} </h3>
        </div>

        <div className="w-[20%] dark:text-white">
          <h3>{deduction?.type}</h3>
        </div>

        {deduction?.type == "PERCENTAGE" ? (
          <div className="w-[20%] dark:text-white">
            <h3>{deduction?.value}%</h3>
          </div>
        ) : (
          <div className="w-[20%] dark:text-white">0</div>
        )}

        {deduction?.type == "FIXED" ? (
          <div className="w-[20%] dark:text-white">
            <h3>{deduction?.value}</h3>
          </div>
        ) : (
          <div className="w-[20%] dark:text-white">0</div>
        )}

        <div className="w-[15%] dark:text-white">
          <div className="flex flex-wrap justify-start gap-2">
            {/* edit button  */}
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-600 p-2">
              <CiEdit size={20} onClick={() => handleOpen(deduction?.id)} />
            </div>

            {/* delete button  */}
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center">
              <AiOutlineDelete
                size={20}
                onClick={() => handleDeleteAllowance(deduction?.id)}
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
          title="Deduction"
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
              <h3>Type</h3>
            </div>

            <div className="w-[20%] dark:text-white">
              <h3>Basic Percentage</h3>
            </div>

            <div className="w-[20%] dark:text-white">
              <h3>Amount</h3>
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
                  Deduction
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <EmployeeDeductionForm
                  deductionId={selectDeductionId}
                  onClose={onClose}
                />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default EmployeeDeductionCard;
