import React from "react";

import { IoArrowUpOutline } from "react-icons/io5";

const StatusCard = ({ title, count, percentage, icon: Icon, color }) => {
  return (
    <div className="mr-3 flex h-[100px] w-[235px] flex-wrap items-center justify-between rounded-md bg-[#d6deff] px-3 py-3 dark:border dark:border-dark-border-color dark:border-opacity-5 dark:bg-dark-card">
      <div className="flex h-[80px] flex-col justify-between">
        <h2 className="text-[#6c28d997] dark:text-dark-heading-color">
          {title}
        </h2>
        <div className="flex flex-wrap items-center justify-between pr-3">
          <h2 className="text-3xl font-semibold text-[#5d22bc] dark:text-dark-heading-color">
            {count}
          </h2>
          <div className="ml-2 grid h-[23px] w-[50px] grid-flow-col flex-wrap place-items-center rounded-xl bg-[#6c28d92e] px-1 text-center text-sm text-[#6c28d997] dark:bg-dark-box dark:text-dark-heading-color">
            <IoArrowUpOutline className="text-sm" />
            {percentage}%
          </div>
        </div>
      </div>
      <div className="flex h-[60px] w-[60px] flex-row items-center justify-center rounded-full bg-[#6c28d92e]">
        {/* logo  */}
        <Icon className={`text-[35px] text-[#ff5e00]`} />
      </div>
    </div>
  );
};

export default StatusCard;
