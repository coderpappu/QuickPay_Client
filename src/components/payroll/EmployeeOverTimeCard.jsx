import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetEmployeeOverTimeDetailsQuery } from "../../features/api";

import { useSelector } from "react-redux";
import CardSkeleton from "../../skeletons/card";
import ErrorMessage from "../../utils/ErrorMessage";
import BrandCardWrapper from "../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../company/SettingCardHeader";
import EmployeeOverTimeForm from "./EmployeeOverTimeForm";
const EmployeeOverTimeCard = () => {
  const { id: employeeId } = useParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
  };

  const companyId = useSelector((state) => state.company.companyId);

  const {
    data: employeeOverTimeDetails,
    isLoading,
    isError,
    error,
  } = useGetEmployeeOverTimeDetailsQuery({ employeeId, companyId });

  let content;

  if (isLoading && !isError) return <CardSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && employeeOverTimeDetails?.data)
    content = employeeOverTimeDetails?.data?.map((overTime) => (
      <div
        key={overTime?.id}
        className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
      >
        <div className="w-[20%] dark:text-white">
          <h3>{overTime?.hour} </h3>
        </div>

        <div className="w-[20%] dark:text-white">
          <h3>{overTime?.rate}</h3>
        </div>
      </div>
    ));

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Hour Rate"
          handleOpen={handleOpen}
          isPopupOpen={isPopupOpen}
        />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[20%] dark:text-white">
              <h3>Hour</h3>
            </div>

            <div className="w-[20%] dark:text-white">
              <h3>Rate</h3>
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
                <EmployeeOverTimeForm onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default EmployeeOverTimeCard;
