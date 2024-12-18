import React from "react";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../components/company/SettingCardHeader";
import { useGetCompanyAttendanceQuery } from "../../features/api";
import CardSkeleton from "../../skeletons/card";
import { TimeConverterFromUTC } from "../../utils/Converter";
import ErrorMessage from "../../utils/ErrorMessage";

const BiometricAttendnaces = () => {
  const date = "2024-12-18";

  const {
    data: getAttendance,
    isLoading,
    isError,
    error,
  } = useGetCompanyAttendanceQuery(date);

  let content;

  console.log(getAttendance);

  if (isLoading && !isError) return <CardSkeleton />;

  if (!isLoading && isError) return <ErrorMessage message={error?.message} />;

  if (!isLoading && !isError)
    content = getAttendance?.data?.map((attendance, index) => (
      <div
        key={attendance}
        className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
      >
        <div className="w-[5%] dark:text-white">
          <h3>{++index}</h3>
        </div>
        <div className="w-[10%] dark:text-white">
          <h3>Name</h3>
        </div>
        <div className="w-[10%] dark:text-white">
          <h3>{attendance?.deviceUserId}</h3>
        </div>

        <div className="w-[10%] dark:text-white">
          <h3>{TimeConverterFromUTC(attendance?.CHECK_IN)}</h3>
        </div>
        <div className="w-[10%] dark:text-white">
          <h3>{TimeConverterFromUTC(attendance?.CHECK_OUT)}</h3>
        </div>
        <div className="w-[10%] dark:text-white">
          <h3>Late</h3>
        </div>
        <div className="w-[10%] dark:text-white">
          <h3>Over Time</h3>
        </div>
      </div>
    ));

  return (
    <div>
      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Allowance"
          //   handleOpen={handleOpen}
          //   isPopupOpen={isPopupOpen}
        />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[5%] dark:text-white">
              <h3>SL</h3>
            </div>
            <div className="w-[10%] dark:text-white">
              <h3>Name</h3>
            </div>
            <div className="w-[10%] dark:text-white">
              <h3>Device ID</h3>
            </div>

            <div className="w-[10%] dark:text-white">
              <h3>Check In</h3>
            </div>
            <div className="w-[10%] dark:text-white">
              <h3>Check Out</h3>
            </div>
            <div className="w-[10%] dark:text-white">
              <h3>Late</h3>
            </div>
            <div className="w-[10%] dark:text-white">
              <h3>Over Time</h3>
            </div>
          </div>

          {/* body  */}
          {content}
        </div>
      </BrandCardWrapper>
    </div>
  );
};

export default BiometricAttendnaces;
