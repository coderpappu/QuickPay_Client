import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="mb-2 mt-5 w-full animate-pulse">
      {/* Header Section */}
      <div>
        <div className="mb-5 h-6 w-1/3 rounded-md bg-gray-200 dark:bg-dark-box"></div>
        <div className="mb-4 flex flex-wrap justify-end gap-2">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex w-fit items-center justify-between gap-3 rounded-md bg-gray-100 px-6 py-3 dark:bg-dark-box"
            >
              <div className="h-4 w-20 rounded-md bg-gray-200 dark:bg-dark-box"></div>
              <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-dark-box"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Profile Card */}
      <div className="mb-1 mt-5 flex w-full flex-wrap justify-between rounded-md bg-white p-5 dark:bg-dark-card">
        {/* Left Section - Profile Image and Basic Info */}
        <div className="flex w-[50%] flex-wrap items-center justify-between">
          <div className="mr-4 w-[20%]">
            <div className="ml-2 h-[120px] w-[120px] rounded-full bg-gray-200 dark:bg-dark-box"></div>
          </div>
          <div className="w-[75%]">
            <div className="mb-2 h-6 w-2/3 rounded-md bg-gray-200 dark:bg-dark-box"></div>
            <div className="mb-2 h-4 w-1/2 rounded-md bg-gray-200 dark:bg-dark-box"></div>
            <div className="mb-3 h-4 w-1/2 rounded-md bg-gray-200 dark:bg-dark-box"></div>
            <div className="h-4 w-1/2 rounded-md bg-gray-200 dark:bg-dark-box"></div>
          </div>
        </div>

        {/* Right Section - Contact and Other Info */}
        <div className="w-[50%] border-l-2 border-dotted border-[#cacaca] pl-5 dark:border-dark-box">
          {["Birthday", "Address", "Gender", "Reports to"].map((_, index) => (
            <div key={index} className="mb-3">
              <div className="mb-1 h-4 w-1/4 rounded-md bg-gray-200 dark:bg-dark-box"></div>
              <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-dark-box"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-2 mt-5 flex w-full animate-pulse flex-wrap justify-between">
        {/* Personal Information Skeleton */}
        <div className="relative w-[49%] rounded-md bg-white p-4 dark:bg-dark-card">
          <div className="mb-4 h-6 w-3/4 rounded-md bg-gray-100 dark:bg-dark-box"></div>

          {/* Skeleton for Personal Info Items */}
          <div className="mb-2">
            <div className="mb-1 h-4 w-1/4 rounded-md bg-gray-200 dark:bg-dark-box"></div>
            <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-dark-box"></div>
          </div>
          <div className="mb-2">
            <div className="mb-1 h-4 w-1/4 rounded-md bg-gray-200 dark:bg-dark-box"></div>
            <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-dark-box"></div>
          </div>
          <div className="mb-2">
            <div className="mb-1 h-4 w-1/4 rounded-md bg-gray-200 dark:bg-dark-box"></div>
            <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-dark-box"></div>
          </div>

          {/* Edit Icon Skeleton */}
          <div className="absolute right-1 top-2 h-10 w-10 rounded-full bg-gray-200 dark:bg-dark-box"></div>
        </div>

        {/* Emergency Contact Skeleton */}
        <div className="relative w-[49%] rounded-md bg-white p-4 dark:bg-dark-card">
          <div className="mb-4 h-6 w-3/4 rounded-md bg-gray-100 dark:bg-dark-box"></div>

          {/* Skeleton for Emergency Contact Items */}
          <div className="mb-2">
            <div className="mb-1 h-4 w-1/4 rounded-md bg-gray-200 dark:bg-dark-box"></div>
            <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-dark-box"></div>
          </div>
          <div className="mb-2">
            <div className="mb-1 h-4 w-1/4 rounded-md bg-gray-200 dark:bg-dark-box"></div>
            <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-dark-box"></div>
          </div>
          <div className="my-3 h-[0.5px] w-full bg-gray-300 dark:bg-dark-box"></div>

          {/* Secondary Emergency Contact */}
          <div className="mb-2">
            <div className="mb-1 h-4 w-1/4 rounded-md bg-gray-200 dark:bg-dark-box"></div>
            <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-dark-box"></div>
          </div>
          <div className="mb-2">
            <div className="mb-1 h-4 w-1/4 rounded-md bg-gray-200 dark:bg-dark-box"></div>
            <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-dark-box"></div>
          </div>

          {/* Edit Icon Skeleton */}
          <div className="absolute right-1 top-2 h-10 w-10 rounded-full bg-gray-200 dark:bg-dark-box"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
