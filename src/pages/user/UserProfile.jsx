import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProfileImg from "../../assets/profile-placeholder.png";
import Button from "../../components/company/Button";

import { useGetUserDetailsQuery } from "../../features/api";

import ProfileSkeleton from "../../skeletons/ProfileSkeleton";
import PasswordChange from "./PasswordChange";
import Permission from "./Permission";
const UserProfile = () => {
  const id = useParams()?.id;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
  };

  const { data: userData, isLoading, isError } = useGetUserDetailsQuery(id);

  const [selected, setSelected] = useState("1");
  // handle function for button state
  const handleSelect = (id) => {
    setSelected(id);
  };

  let content;

  if (isLoading && !isError) return <ProfileSkeleton />;

  if (!isLoading && isError) content = <p>Error fetching data</p>;

  let userDetails = userData?.data;

  return (
    <div>
      <h2 className="dark:text-dark-heading-color"> User / Profile</h2>
      <div className="flex flex-wrap justify-end gap-2"></div>
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
              {/* {city + ", " + country} */}
            </h3>
            <h3 className="text-[15px] font-medium text-[#686767] dark:text-dark-text-color">
              {/* {`Website : ${website_url}`} */}
              Email : {userDetails?.email}
            </h3>
          </div>
        </div>
        <div className="w-[50%] border-l-2 border-dotted border-[#cacaca]"></div>
      </div>

      <div className="flex w-full flex-wrap rounded-md bg-white dark:bg-dark-card">
        <Button
          button_id="1"
          isActive={selected == "1"}
          handleSelect={handleSelect}
          title={"Password"}
        />
        <Button
          button_id="2"
          isActive={selected == "2"}
          handleSelect={handleSelect}
          title={"Company Permission"}
        />
        <Button
          button_id="3"
          isActive={selected == "3"}
          handleSelect={handleSelect}
          title={"Module Permission"}
        />
      </div>

      {selected == "1" && <PasswordChange />}
      {selected == "2" && <Permission />}
    </div>
  );
};

export default UserProfile;
