import React from "react";
import { Link } from "react-router-dom";

const ProfileSection = ({ id, icon, title }) => {
  return (
    <div className="flex flex-wrap align-middle items-center mt-2">
      <div className="w-[30px] cursor-pointer  h-[30px] flex flex-col justify-center align-middle items-center rounded-full bg-[#F5F6F7] mr-3">
        <Link to={`/company/update/${id}`}>{icon}</Link>
      </div>{" "}
      <lebel>{title}</lebel>
    </div>
  );
};

export default ProfileSection;
