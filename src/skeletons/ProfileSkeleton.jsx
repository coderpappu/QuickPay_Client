import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="w-full mt-5 mb-2 animate-pulse">
      {/* Header Section */}
      <div>
        <div className="h-6 w-1/3 bg-gray-200 dark:bg-dark-box rounded-md mb-5"></div>
        <div className="flex flex-wrap justify-end gap-2 mb-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="px-6 py-3 bg-gray-100 dark:bg-dark-box rounded-md w-fit flex justify-between items-center gap-3"
            >
              <div className="h-4 w-20 bg-gray-200 dark:bg-dark-box rounded-md"></div>
              <div className="w-4 h-4 bg-gray-200 dark:bg-dark-box rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Profile Card */}
      <div className="w-full p-5 mt-5 mb-1 rounded-md bg-white dark:bg-dark-card flex flex-wrap justify-between">
        {/* Left Section - Profile Image and Basic Info */}
        <div className="flex flex-wrap justify-between items-center w-[50%]">
          <div className="w-[20%] mr-4">
            <div className="w-[120px] h-[120px] ml-2 bg-gray-200 dark:bg-dark-box rounded-full"></div>
          </div>
          <div className="w-[75%]">
            <div className="h-6 w-2/3 bg-gray-200 dark:bg-dark-box rounded-md mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-dark-box rounded-md mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-dark-box rounded-md mb-3"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-dark-box rounded-md"></div>
          </div>
        </div>

        {/* Right Section - Contact and Other Info */}
        <div className="w-[50%] border-l-2 border-dotted dark:border-dark-box border-[#cacaca] pl-5">
          {["Birthday", "Address", "Gender", "Reports to"].map((_, index) => (
            <div key={index} className="mb-3">
              <div className="h-4 w-1/4 bg-gray-200 dark:bg-dark-box rounded-md mb-1"></div>
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-dark-box rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mt-5 mb-2 flex flex-wrap justify-between animate-pulse">
        {/* Personal Information Skeleton */}
        <div className="w-[49%] p-4 bg-white dark:bg-dark-card rounded-md relative">
          <div className="h-6 w-3/4 bg-gray-100 dark:bg-dark-box rounded-md mb-4"></div>

          {/* Skeleton for Personal Info Items */}
          <div className="mb-2">
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-dark-box rounded-md mb-1"></div>
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-dark-box rounded-md"></div>
          </div>
          <div className="mb-2">
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-dark-box rounded-md mb-1"></div>
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-dark-box rounded-md"></div>
          </div>
          <div className="mb-2">
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-dark-box rounded-md mb-1"></div>
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-dark-box rounded-md"></div>
          </div>

          {/* Edit Icon Skeleton */}
          <div className="absolute right-1 top-2 w-10 h-10 bg-gray-200 dark:bg-dark-box rounded-full"></div>
        </div>

        {/* Emergency Contact Skeleton */}
        <div className="w-[49%] p-4 bg-white dark:bg-dark-card rounded-md relative">
          <div className="h-6 w-3/4 bg-gray-100 dark:bg-dark-box rounded-md mb-4"></div>

          {/* Skeleton for Emergency Contact Items */}
          <div className="mb-2">
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-dark-box rounded-md mb-1"></div>
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-dark-box rounded-md"></div>
          </div>
          <div className="mb-2">
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-dark-box rounded-md mb-1"></div>
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-dark-box rounded-md"></div>
          </div>
          <div className="w-full h-[0.5px] my-3 bg-gray-300 dark:bg-dark-box"></div>

          {/* Secondary Emergency Contact */}
          <div className="mb-2">
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-dark-box rounded-md mb-1"></div>
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-dark-box rounded-md"></div>
          </div>
          <div className="mb-2">
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-dark-box rounded-md mb-1"></div>
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-dark-box rounded-md"></div>
          </div>

          {/* Edit Icon Skeleton */}
          <div className="absolute right-1 top-2 w-10 h-10 bg-gray-200 dark:bg-dark-box rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
