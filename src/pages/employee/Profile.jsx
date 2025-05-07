import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProfileImg from "../../assets/profile-placeholder.png";
import Button from "../../components/company/Button";
import AboutCard from "../../components/employee/AboutCard";
import InfoBox from "../../components/employee/InfoBox";

import {
  useGetEmployeeDetailsQuery,
  useGetUserQuery,
} from "../../features/api";

import { GrDownload } from "react-icons/gr";
import AssetCard from "../../components/employee/AssetCard";
import JobDetails from "../../components/employee/JobDetails";
import JobTimeLine from "../../components/employee/JobTimeLine";
import PromotionForm from "../../components/employee/PromotionForm";
import ProfileSkeleton from "../../skeletons/ProfileSkeleton";
const Profile = () => {
  const id = useParams()?.id;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
  };

  const { data: employeeData } = useGetUserQuery();

  const { data, isLoading, isError } = useGetEmployeeDetailsQuery(
    id || employeeData?.data?.id,
  );

  const [selected, setSelected] = useState("1");
  // handle function for button state
  const handleSelect = (id) => {
    setSelected(id);
  };

  let content;

  if (isLoading && !isError) return <ProfileSkeleton />;

  if (!isLoading && isError) content = <p>Error fetching data</p>;

  let employeeDetails = data?.data;

  return (
    <div>
      <h2 className="dark:text-dark-heading-color"> Employee / Profile</h2>
      <div className="flex flex-wrap justify-end gap-2">
        <div
          className="flex w-fit items-center justify-between gap-3 rounded-md border bg-white px-6 py-3 text-sm transition-all hover:bg-blue-500 hover:text-white dark:border-blue-500 dark:border-opacity-30 dark:bg-opacity-0 dark:text-dark-text-color"
          onClick={handleOpen}
        >
          Promotion
          <GrDownload size={15} />
        </div>

        <Link to={`/joiningletter/${id}`}>
          <div className="flex w-fit items-center justify-between gap-3 rounded-md border bg-white px-6 py-3 text-sm transition-all hover:bg-blue-500 hover:text-white dark:border-blue-500 dark:border-opacity-30 dark:bg-opacity-0 dark:text-dark-text-color">
            Joining Letter
            <GrDownload size={15} />
          </div>
        </Link>
        <Link to={`/experiencecertificate/${id}`}>
          <div className="flex w-fit items-center justify-between gap-3 rounded-md border border-dark-border-color bg-white px-6 py-3 text-sm transition-all hover:bg-blue-500 hover:text-white dark:border-blue-500 dark:border-opacity-30 dark:bg-opacity-0 dark:text-dark-text-color">
            Experience Certificate
            <GrDownload size={15} />
          </div>
        </Link>
        <Link to={`/nocletter/${id}`}>
          <div className="flex w-fit items-center justify-between gap-3 rounded-md border bg-white px-6 py-3 text-sm transition-all hover:bg-blue-500 hover:text-white dark:border-blue-500 dark:border-opacity-30 dark:bg-opacity-0 dark:text-dark-text-color">
            NOC
            <GrDownload size={15} />
          </div>
        </Link>
      </div>
      <div className="mb-1 mt-5 flex w-full flex-wrap justify-between rounded-md bg-white p-5 dark:bg-dark-card">
        <div className="flex w-[50%] flex-wrap items-center justify-between">
          <div className="mr-4 w-[20%]">
            <img
              src={employeeDetails?.image ? employeeDetails?.image : ProfileImg}
              alt="profile pic"
              className="h-[100px] w-[100px] rounded-full"
            />
          </div>
          <div className="w-[75%]">
            <h1 className="font-poppins text-2xl font-semibold dark:text-dark-text-color">
              {employeeDetails?.name}
            </h1>
            <h3 className="text-[15px] font-medium text-[#686767] dark:text-dark-text-color">
              {employeeDetails?.EmployeeDesignation[0]?.designation?.name}
            </h3>
            <h3 className="mt-2 text-[15px] font-semibold text-[#3c3c3c] dark:text-dark-text-color">
              Employee Id : {employeeDetails?.employeeId}
              {/* {city + ", " + country} */}
            </h3>
            <h3 className="text-[15px] font-medium text-[#686767] dark:text-dark-text-color">
              {/* {`Website : ${website_url}`} */}
              Date of Join : {employeeDetails?.joining_date}
            </h3>
          </div>
          {/* <div className="w-[40px] cursor-pointer  h-[40px] flex flex-col justify-center align-middle items-center rounded-full bg-[#85858512] mr-2">
            <Link to={`/company/update/${data._id}`}>
              <FiEdit />
            </Link>
          </div> */}
        </div>
        <div className="w-[50%] border-l-2 border-dotted border-[#cacaca]">
          <InfoBox title="Phone" data={employeeDetails?.phone} />
          <InfoBox title="Email" data={employeeDetails?.email} />
          <InfoBox title="BirthDay" data={employeeDetails?.birth_date} />
          <InfoBox title="Address" data={employeeDetails?.present_address} />
          <InfoBox title="Gender" data={employeeDetails?.gender} />
          <InfoBox title="Reports to " data="Sarwar " />
        </div>
      </div>

      <div className="flex w-full flex-wrap rounded-md bg-white dark:bg-dark-card">
        <Button
          button_id="1"
          isActive={selected == "1"}
          handleSelect={handleSelect}
          title={"About"}
        />
        <Button
          button_id="2"
          isActive={selected == "2"}
          handleSelect={handleSelect}
          title={"Job Details"}
        />

        <Button
          button_id="3"
          isActive={selected == "4"}
          handleSelect={handleSelect}
          title={"Assets"}
        />
        <Button
          button_id="4"
          isActive={selected == "5"}
          handleSelect={handleSelect}
          title={"Career Timeline"}
        />
      </div>

      {selected == "1" && <AboutCard employeeDetails={employeeDetails} />}
      {selected == "2" && <JobDetails employeeDetails={employeeDetails} />}
      {selected == "3" && <AssetCard />}
      {selected == "4" && <JobTimeLine />}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-4xl rounded-lg bg-white p-6 dark:bg-dark-card">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color dark:border-opacity-5">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Promotion Form
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsPopupOpen(false)} // Close popup
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <PromotionForm
                onClose={onClose}
                employeeDetails={employeeDetails}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
