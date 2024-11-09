/* eslint-disable react/prop-types */
import React from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import PersonalInfo from "../../components/employee/PersonalInfo";

const AboutCard = ({ employeeDetails }) => {
  return (
    <div className="w-full mt-5 mb-2 rounded-mde flex flex-wrap justify-between ">
      <div className="w-[49%] relative p-4 bg-white dark:bg-dark-card rounded-md">
        <h1 className="text-xl font-medium mb-4 dark:text-dark-heading-color">
          Personal Information{" "}
        </h1>
        <PersonalInfo title="Mobile Number" data={employeeDetails?.phone} />
        {employeeDetails?.id_type == "NID" ? (
          <PersonalInfo title="ID Number" data={employeeDetails?.id_number} />
        ) : (
          <>
            <PersonalInfo title="Passport No." data={employeeDetails?.pas} />
            <PersonalInfo title="Passport Exp" data="9876543210" />
          </>
        )}
        <PersonalInfo title="Nationality" data="Bangladesh" />
        <PersonalInfo title="Religion" data={employeeDetails?.religion} />
        <PersonalInfo title="Marital status" data="Unmarried" />
        <PersonalInfo title="Nationality" data="Bangladesh" />
        <div className="absolute right-1 top-2  w-[40px] cursor-pointer  h-[40px] flex flex-col justify-center align-middle items-center rounded-full bg-[#85858512] mr-2">
          <Link
          // to={`/company/update/${data._id}`}
          >
            <FiEdit className="text-[#3686FF]" />
          </Link>
        </div>
      </div>

      <div className="w-[49%] relative p-4 bg-white dark:bg-dark-card rounded-md">
        <h1 className="text-xl font-medium mb-4 dark:text-dark-heading-color">
          Emergency Contact
        </h1>
        <PersonalInfo title="Primary Name" data="John Doe" />
        <PersonalInfo title="Relationship" data="Father" />
        <PersonalInfo title="Phone" data="9876543210, 9876543210" />
        <div className="w-full h-[0.5px] my-3 bg-[#e0e0e0]"></div>
        <PersonalInfo title="Secondary Name" data="Karen Wills" />
        <PersonalInfo title="Phone" data="9876543210, 9876543210" />
        <PersonalInfo title="Relations" data="Brother" />

        <div className="absolute right-1 top-2  w-[40px] cursor-pointer  h-[40px] flex flex-col justify-center align-middle items-center rounded-full bg-[#85858512] mr-2">
          <Link
          // to={`/company/update/${data._id}`}
          >
            <FiEdit className="text-[#3686FF]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
