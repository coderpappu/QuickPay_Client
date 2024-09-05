import React from "react";
import {
  CircleProgress,
  CircleProgressLine,
  CircleProgressText,
} from "keep-react";
const Leave = () => {
  return (
    <div className="px-4 md:px-0">
      <div className="flex flex-wrap justify-between items-center pb-2">
        <div>
          <h2 className="font-semibold text-lg pb-2">Leave Management</h2>
        </div>
      </div>

      <div className="border-solid border-[1px] border-slate-200 bg-white rounded-md p-5 w-full h-auto overflow-x-auto">
        <CircleProgress progress={45}>
          <CircleProgressLine />
          <CircleProgressText>45%</CircleProgressText>
        </CircleProgress>
      </div>
    </div>
  );
};

export default Leave;
