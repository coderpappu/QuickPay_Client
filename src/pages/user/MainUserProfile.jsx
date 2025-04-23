import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ProfileImg from "../../assets/profile-placeholder.png";
import Button from "../../components/company/Button";

import ProfileSkeleton from "../../skeletons/ProfileSkeleton";
import PasswordChange from "./PasswordChange";

import { useGetUserQuery } from "../../features/api";

const MainUserProfile = () => {
  const id = useParams()?.id;

  const { data: userData2, isLoading, isError } = useGetUserQuery();

  const [selected, setSelected] = useState("1");

  const handleSelect = (id) => {
    setSelected(id);
  };

  if (isLoading && !isError) return <ProfileSkeleton />;

  if (!isLoading && isError) return <p>Error fetching data</p>;

  const userDetails = userData2?.data;

  return (
    <div>
      <h2 className="dark:text-dark-heading-color"> User / Profile</h2>
      <div className="mb-1 mt-5 flex w-full flex-wrap justify-between rounded-md bg-white p-5 dark:bg-dark-card">
        <div className="flex w-[50%] flex-wrap items-center justify-between">
          <div className="mr-4 w-[20%]">
            <img
              src={ProfileImg}
              alt="profile pic"
              className="h-[100px] w-[100px] rounded-full"
            />
          </div>
          <div className="w-[75%]">
            <h1 className="font-poppins text-2xl font-semibold dark:text-dark-text-color">
              {userDetails?.first_name + " " + userDetails?.last_name}
            </h1>
            <h3 className="text-[15px] font-medium text-[#686767] dark:text-dark-text-color">
              {userDetails?.type}
            </h3>
            <h3 className="text-[15px] font-medium text-[#686767] dark:text-dark-text-color">
              Acc Status : {userDetails?.status}
            </h3>

            <h3 className="mt-2 text-[15px] font-semibold text-[#3c3c3c] dark:text-dark-text-color">
              Phone : {userDetails?.phone}
            </h3>
            <h3 className="text-[15px] font-medium text-[#686767] dark:text-dark-text-color">
              Email : {userDetails?.email}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap rounded-md bg-white dark:bg-dark-card">
        <Button
          button_id="1"
          isActive={selected == "1"}
          handleSelect={handleSelect}
          title={"Password"}
        />
      </div>

      {selected == "1" && <PasswordChange />}
    </div>
  );
};

export default MainUserProfile;
