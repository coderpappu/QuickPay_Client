import React from "react";
import ProfileImg from "../../assets/profile-placeholder.png";
import InfoBox from "../../components/employee/InfoBox";
import Button from "../../components/company/Button";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import AboutCard from "../../components/employee/AboutCard";

import {
  useGetEmployeeDetailsQuery,
  useGetEmployeesQuery,
  useGetUserQuery,
} from "../../features/api";

import ListSkeleton from "../../skeletons/ListSkeleton";
import JobDetails from "../../components/employee/JobDetails";
import SalarySettingsForm from "./SalarySetting/SalarySetting";
import AdminDashboard from "../dashboard/AdminDashboard";
const EmployeeProfile = () => {
  const id = useParams()?.id;

  const { data: employeeData } = useGetUserQuery();

  const { data, isLoading, isError } = useGetEmployeeDetailsQuery(
    id || employeeData?.data?.id
  );

  const [selected, setSelected] = useState("1");

  // handle function for button state
  const handleSelect = (id) => {
    setSelected(id);
  };

  let content;

  if (isLoading && !isError) content = <ListSkeleton />;

  if (!isLoading && isError) content = <p>Error fetching data</p>;

  let employeeDetails = data?.data[0];

  return (
    <div>
      <h2> Employee / Profile</h2>
      <div className="w-full p-5 mx-5 mt-5 mb-1 rounded-md bg-white dark:bg-dark-card flex flex-wrap justify-between ">
        <div className="flex flex-wrap justify-between items-center w-[50%]">
          <div className="w-[20%] mr-4">
            <img
              src={employeeDetails?.image ? employeeDetails?.image : ProfileImg}
              alt="profile pic"
              className="w-[100px] h-[100px] rounded-full"
            />
          </div>
          <div className="w-[75%]">
            <h1 className="font-poppins text-2xl font-semibold dark:text-dark-heading-color">
              {employeeDetails?.name}
            </h1>

            <h3 className="text-[15px] font-medium  text-[#686767] dark:text-dark-text-color">
              Software Enginner
            </h3>
            <h3 className="text-[15px] mt-2 font-semibold  text-[#3c3c3c] dark:text-dark-text-color">
              Employee Id : 20.23.LA
              {/* {city + ", " + country} */}
            </h3>
            <h3 className="text-[15px] font-medium  text-[#686767] dark:text-dark-text-color">
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

      <div className="w-full mx-5 rounded-md bg-white dark:bg-dark-card flex flex-wrap ">
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
          isActive={selected == "3"}
          handleSelect={handleSelect}
          title={"Salary Details"}
        />
        <Button
          button_id="4"
          isActive={selected == "4"}
          handleSelect={handleSelect}
          title={"Bank etc"}
        />
      </div>

      {selected == "1" && <AboutCard employeeDetails={employeeDetails} />}
      {selected == "2" && <JobDetails employeeDetails={employeeDetails} />}
      {selected == "3" && <SalarySettingsForm />}
    </div>
  );
};

export default EmployeeProfile;