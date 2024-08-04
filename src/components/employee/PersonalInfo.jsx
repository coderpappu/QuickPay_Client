import React from "react";

const PersonalInfo = ({ title, data }) => {
  return (
    <div className="w-full flex flex-wrap mt-1 items-center ">
      <div className="w-[30%] mt-1 font-semibold text-sm text-[#3c3c3c]">
        {title} :{" "}
      </div>
      <div className="w-[60%]  mt-1 text-sm">{data}</div>
    </div>
  );
};

export default PersonalInfo;
