import React from "react";

const InfoBox = ({ title, data }) => {
  return (
    <div className="w-full flex flex-wrap items-center pl-5">
      <div className="w-[25%] mt-1 font-semibold text-sm text-[#5a5a5a]">
        {title}:{" "}
      </div>
      <div className="w-[55%]  mt-1 text-sm">{data}</div>
    </div>
  );
};

export default InfoBox;
