import { BanIcon as BankIcon, PencilIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { useGetEmployeeAccQuery } from "../../features/api";
import BrandCardWrapper from "../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../company/SettingCardHeader";
import BankAccountForm from "./EmployeeBankForm";
// Mock data - replace with actual API integration
const mockBankAccounts = [];

const BankAccountCard = () => {
  const { id: employee_id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState(null);

  const {
    data: employeeBankAcc,
    isError,
    isLoading,
  } = useGetEmployeeAccQuery(employee_id);

  const onClose = () => {
    setIsPopupOpen(false);
    setSelectedAccount(null);
  };

  const handleOpen = () => {
    setIsPopupOpen(true);
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setIsPopupOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bank account?")) {
      setBankAccounts(bankAccounts.filter((account) => account.id !== id));
    }
  };

  let content;

  if (isLoading && !isError) {
    content = (
      <div className="flex w-full justify-center p-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!isLoading && isError) {
    content = (
      <div className="w-full p-4 text-center text-red-500">
        {error?.message ||
          "An error occurred while fetching bank account data."}
      </div>
    );
  }

  if (!isLoading && !isError && employeeBankAcc?.data.length > 0) {
    content = employeeBankAcc?.data?.map((bankAccount) => (
      <div
        key={bankAccount.id}
        className="group relative mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="flex items-start space-x-4">
          {/* <div className="flex-shrink-0">
            <div className="h-12 w-12 overflow-hidden rounded-lg">
              <img
                src={bankAccount?.logo}
                alt={bankAccount?.bank_acc_no}
                className="h-full w-full object-cover"
              />
            </div>
          </div> */}

          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {bankAccount?.bank_name}
                {/* {bankAccount.isActive && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                    Active
                  </span>
                )} */}
              </h3>
              <div className="flex items-center space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => handleEdit(bankAccount)}
                  className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(bankAccount.id)}
                  className="rounded p-1 text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Branch
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {bankAccount?.branch_name}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Account Name
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {bankAccount?.employee?.name}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Account Number
                </p>
                <p className="mt-1 font-mono text-sm text-gray-900 dark:text-white">
                  {bankAccount.bank_acc_no}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Routing Number
                </p>
                <p className="mt-1 font-mono text-sm text-gray-900 dark:text-white">
                  {bankAccount.routing_no}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  } else if (
    !isLoading &&
    !isError &&
    (!employeeBankAcc || employeeBankAcc?.data.length === 0)
  ) {
    content = (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
        <BankIcon className="mb-4 h-12 w-12 text-gray-400 dark:text-gray-500" />
        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
          No Bank Accounts
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No bank account information found. Click "Add" to set up a bank
          account.
        </p>
      </div>
    );
  }

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Bank Account"
          handleOpen={handleOpen}
          isPopupOpen={isPopupOpen}
        />
        <div className="p-6">
          {/* header  */}
          <div className="mb-6 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 dark:bg-gray-800">
            <div className="flex items-center">
              <BankIcon className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Bank Account Information
              </h3>
            </div>
          </div>

          {/* body  */}
          {content}
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {selectedAccount ? "Edit Bank Account" : "Add Bank Account"}
                </h3>
                <button
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={onClose}
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <BankAccountForm
                onClose={onClose}
                initialData={selectedAccount}
              />
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default BankAccountCard;
