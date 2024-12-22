import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  useDeleteAppliedLoanMutation,
  useGetApplyLoanListQuery,
  useGetCompanyIdQuery,
} from "../../../../features/api";

import ConfirmDialog from "../../../../helpers/ConfirmDialog";
import CardSkeleton from "../../../../skeletons/card";
import ErrorMessage from "../../../../utils/ErrorMessage";
import BrandCardWrapper from "../../../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../../company/SettingCardHeader";
import LoanApplicationForm from "./EmployeeLoanForm";

const EmployeeLoanList = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteLoan] = useDeleteAppliedLoanMutation();

  const handleOpen = (id) => {
    setIsPopupOpen(true);
    setSelectId(id);
  };

  const {
    data: loanList,
    isLoading,
    isError,
    error,
  } = useGetApplyLoanListQuery(companyId);

  let content;

  if (isLoading && !isError) return <CardSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  const handleDeleteLoan = async (loanId) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            title="loan"
            onConfirm={async () => {
              toast.dismiss(t.loanId);
              try {
                await deleteLoan(loanId).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Loan deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete loan");
              }
            }}
            onCancel={() => toast.dismiss(t.loanId)}
          />
        ),
        {
          duration: Infinity,
        },
      );

    confirm();
  };

  if (!isLoading && !isError) {
    content = (
      <>
        {loanList?.data?.map((loan, index) => (
          <div
            key={loan?.id}
            className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
          >
            <div className="w-[3%] dark:text-white">
              <h3>{++index}</h3>
            </div>

            <div className="w-[8%] dark:text-white">
              <h3>{loan.LoanType?.name}</h3>
            </div>

            <div className="w-[7%] dark:text-white">
              <h3>{loan?.amount}</h3>
            </div>

            <div className="w-[7%] dark:text-white">
              <h3>{loan?.installment_month}</h3>
            </div>

            <div className="w-[7%] dark:text-white">
              <h3>{loan?.loan_status}</h3>
            </div>

            <div className="fex flex w-[10%] flex-wrap gap-2 space-x-2 text-white">
              <div>
                <Link to={`/loan/application/${loan?.id}`}>
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-green-600 p-2">
                    <PiEyeLight size={20} />
                  </div>
                </Link>
              </div>

              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-700 p-2">
                <CiEdit size={20} onClick={() => handleOpen(loan?.id)} />
              </div>

              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center">
                <AiOutlineDelete
                  size={20}
                  onClick={() => handleDeleteLoan(loan?.id)}
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
        <HrmSetupCardHeader title="Loan Applications" handleOpen={handleOpen} />
        <div className="px-6 py-3">
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[3%] dark:text-white">
              <h3>SL</h3>
            </div>

            <div className="w-[8%] dark:text-white">
              <h3>Loan Type</h3>
            </div>

            <div className="w-[7%] dark:text-white">
              <h3>Amount</h3>
            </div>

            <div className="w-[7%] dark:text-white">
              <h3>Installments</h3>
            </div>

            <div className="w-[7%] dark:text-white">
              <h3>Status</h3>
            </div>

            <div className="w-[10%] dark:text-white">
              <h3>Action</h3>
            </div>
          </div>

          {content}
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-dark-card">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Loan Application
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)}
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <LoanApplicationForm
                  selectId={selectId}
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

export default EmployeeLoanList;
