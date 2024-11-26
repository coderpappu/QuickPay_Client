import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCompanyIdQuery,
  useGetEmployeeBasicSalaryDetailsQuery,
} from "../../features/api";

import CardSkeleton from "../../skeletons/card";
import ErrorMessage from "../../utils/ErrorMessage";
import BrandCardWrapper from "../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../company/SettingCardHeader";
import BasicSalaryForm from "./BasicSalaryForm";

const BasicSalaryCard = () => {
  const { id: employeeId } = useParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
  };

  const { data: companyId } = useGetCompanyIdQuery();

  const {
    data: basicSalaryDetails,
    isLoading,
    isError,
    error,
  } = useGetEmployeeBasicSalaryDetailsQuery({ employeeId, companyId });

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
                <BasicSalaryForm onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default BasicSalaryCard;
