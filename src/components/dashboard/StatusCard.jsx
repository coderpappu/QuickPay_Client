import React from "react";

import { IoArrowUpOutline } from "react-icons/io5";

const StatusCard = ({ title, count, percentage, icon: Icon, color }) => {
  return (
    <div className="w-[235px] h-[100px] bg-[#d6deff] dark:bg-dark-card dark:border dark:border-dark-border-color dark:border-opacity-5 py-3 px-3 mr-3 rounded-md flex flex-wrap items-center justify-between">
      <div className=" h-[80px] flex flex-col justify-between ">
        <h2 className="text-[#6c28d997] dark:text-dark-heading-color">
          {title}
        </h2>
        <div className="flex flex-wrap items-center justify-between pr-3">
          <h2 className="text-3xl font-semibold text-[#5d22bc] dark:text-dark-heading-color">
            {count}
          </h2>
          <div className="w-[50px] h-[23px] rounded-xl bg-[#6c28d92e] dark:bg-dark-box  ml-2 text-center text-sm text-[#6c28d997] dark:text-dark-heading-color flex-wrap grid grid-flow-col place-items-center px-1">
            <IoArrowUpOutline className="text-sm" />
            {percentage}%
          </div>
        </div>
      </div>
      <div className="w-[60px] h-[60px] bg-[#6c28d92e] rounded-full flex flex-row justify-center items-center">
        {/* logo  */}
        <Icon className={`text-[35px] text-[#ff5e00]`} />
      </div>
    </div>
  );
};

export default StatusCard;
