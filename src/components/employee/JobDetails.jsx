/* eslint-disable react/prop-types */
import React from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import PersonalInfo from "../../components/employee/PersonalInfo";

const JobDetails = ({ employeeDetails }) => {
  return (
    <div className="rounded-mde mb-2 mt-5 flex w-full flex-wrap justify-between">
      <div className="relative w-[49%] rounded-md bg-white p-4 dark:bg-dark-card">
        <h1 className="mb-4 text-xl font-medium dark:text-dark-heading-color">
          Job Details{" "}
        </h1>

        <PersonalInfo
          title="Department"
          data={
            employeeDetails?.EmployeeDepartment[
              employeeDetails?.EmployeeDepartment?.length - 1
            ]?.department?.name || "No Department"
          }
        />

        <PersonalInfo
          title="Designation"
          data={
            employeeDetails?.EmployeeDesignation[
              employeeDetails?.EmployeeDesignation?.length - 1
            ]?.designation?.name || "No Designation"
          }
        />
        <PersonalInfo
          title="Shift"
          data={employeeDetails?.EmployeeShift[0]?.shift?.name || "No Shift"}
        />
        <PersonalInfo
          title="Section"
          data={
            employeeDetails?.EmployeeSection[
              employeeDetails?.EmployeeSection?.length - 1
            ]?.section.name || "No Section"
          }
        />

        <PersonalInfo
          title="Branch"
          data={employeeDetails?.EmployeeBranch[0]?.branch.name || "No Branch"}
        />

        <div className="absolute right-1 top-2 mr-2 flex h-[40px] w-[40px] cursor-pointer flex-col items-center justify-center rounded-full bg-[#85858512] align-middle">
          <Link
          // to={`/company/update/${data._id}`}
          >
            <FiEdit className="text-[#3686FF]" />
          </Link>
        </div>
      </div>

      {/* <div className="w-[49%] relative p-4 bg-white rounded-md">
        <h1 className="text-xl font-medium mb-4">Emergency Contact</h1>
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
      </div> */}
    </div>
  );
};

export default JobDetails;
