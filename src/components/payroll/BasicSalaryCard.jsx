import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  useDeleteEmployeeAllowanceMutation,
  useGetCompanyIdQuery,
  useGetEmployeeBasicSalaryDetailsQuery,
} from "../../features/api";

import ConfirmDialog from "../../helpers/ConfirmDialog";
import CardSkeleton from "../../skeletons/card";
import ErrorMessage from "../../utils/ErrorMessage";
import BrandCardWrapper from "../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../company/SettingCardHeader";
import BasicSalaryForm from "./BasicSalaryForm";

const BasicSalaryCard = () => {
  const { id: employeeId } = useParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectAllowanceId, setSelectAllowanceId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectAllowanceId(id);
  };

  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteAllowance] = useDeleteEmployeeAllowanceMutation();

  const {
    data: basicSalaryDetails,
    isLoading,
    isError,
    error,
  } = useGetEmployeeBasicSalaryDetailsQuery({ employeeId, companyId });

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
                    toast.success("Allowance deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete allowance");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Allowance"
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

  if (!isLoading && !isError && basicSalaryDetails?.data)
    content = basicSalaryDetails?.data?.map((basicDetails) => (
      <div
        key={basicDetails?.id}
        className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
      >
        <div className="dark:text-white w-[20%]">
          <h3>{basicDetails?.Grade?.name} </h3>
        </div>

        <div className="dark:text-white w-[20%]">
          <h3>{basicDetails?.amount}</h3>
        </div>
      </div>
    ));

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Basic Salary"
          handleOpen={handleOpen}
          isPopupOpen={isPopupOpen}
        />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[20%]">
              <h3>Grade</h3>
            </div>

            <div className="dark:text-white w-[20%]">
              <h3>Amount</h3>
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
                  Basic Salary
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <BasicSalaryForm
                  allowanceId={selectAllowanceId}
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

export default BasicSalaryCard;
