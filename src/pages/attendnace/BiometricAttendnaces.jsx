import React, { useState } from "react";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";
import { useGetCompanyAttendanceQuery } from "../../features/api";
import CardSkeleton from "../../skeletons/card";
import { TimeConverterFromUTC } from "../../utils/Converter";
import DatePicker from "../../utils/DatePicker";
import ErrorMessage from "../../utils/ErrorMessage";

const BiometricAttendnaces = () => {
  const [date, setDate] = useState(DatePicker);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const {
    data: getAttendance,
    isLoading,
    isError,
    error,
  } = useGetCompanyAttendanceQuery(date);

  let content;

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
          <h3>{attendance?.employee_name || "Unknown"}</h3>
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
        <div className="flex items-center justify-between border-b border-dark-box border-opacity-5 px-6 py-4 dark:border-dark-border-color dark:border-opacity-5">
          <div>
            <h3 className="text-base leading-6 dark:text-dark-heading-color">
              Biometric Attendance
            </h3>
          </div>

          <div className="flex h-8 cursor-pointer items-center justify-center rounded-sm p-2 text-center">
            <div className="border dark:border-none">
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="rounded-sm border-none px-2 py-2 text-[15px] outline-none dark:bg-dark-box dark:text-white"
              />
            </div>
          </div>
        </div>
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
