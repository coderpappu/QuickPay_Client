import React from "react";
import { useGetUserQuery } from "../../features/api";
import { FiEdit } from "react-icons/fi";

import ProfileImg from "../../assets/profile-placeholder.png";
import { Link } from "react-router-dom";
const Profile = () => {
  const { data, isError, isLoading, isSuccess } = useGetUserQuery();

  let content = null;

  if (isLoading) {
    content = "Loding...";
  }

  if (!isLoading && isError) content = "There is a error occured";

  if (isSuccess && !isError) {
    console.log(data);
    const { id, first_name, last_name, email, type, file } = data.data;

    content = (
      <div className="flex flex-wrap justify-between w-full">
        {" "}
        <div className="w-[15%] mr-4">
          <img
            src={file ? file : ProfileImg}
            alt="profile pic"
            className="w-[120px] h-[120px] rounded-full"
          />
        </div>
        <div className="w-[78%]">
          <h1 className="font-poppins text-2xl font-semibold">
            {first_name + " " + last_name}
          </h1>
          <h3 className="text-lg font-medium text-[#8b8b8b]">{type}</h3>
          <h2
            className="text-sm
"
          >
            <label className="font-medium ">Employee ID : </label>
            {id}
          </h2>
          <h2 className="text-sm">
            <label className="font-medium ">Email : </label> {email}
          </h2>

          <button className="bg-[#6D28D9] text-white font-poppins py-2 px-3 rounded-md font-medium mt-3">
            Send Message
          </button>
        </div>
        <div className="w-[2%] cursor-pointer">
          <Link to={`/profile/${data?.id}`}>
            <FiEdit />
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="font-semibold text-2xl">Profile</h1>
      <h2> Dashboard / Profile</h2>
      <div className="w-full p-5 m-5 rounded-md bg-white flex flex-wrap justify-between ">
        {content}
      </div>
    </div>
  );
};

export default Profile;
