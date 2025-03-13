import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useCreateEmployeeOverTimeEnableMutation,
  useGetEmployeeOvertimeStatusQuery,
} from "../../features/api";
import BrandCardWrapper from "../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../company/SettingCardHeader";

const EmployeeOverTimeSettingCard = () => {
  const { id: employeeId } = useParams();
  const companyId = useSelector((state) => state.company.companyId);

  const [enableOvertime] = useCreateEmployeeOverTimeEnableMutation();
  const { data: employeeOvertimeStatus } = useGetEmployeeOvertimeStatusQuery({
    employeeId,
    companyId,
  });

  console.log(employeeOvertimeStatus);

  const [isOvertimeEnabled, setIsOvertimeEnabled] = useState(false);

  useEffect(() => {
    if (employeeOvertimeStatus?.data) {
      setIsOvertimeEnabled(employeeOvertimeStatus.data.status);
    }
  }, [employeeOvertimeStatus]);

  const handleToggle = async () => {
    const enable = await enableOvertime({
      status: !isOvertimeEnabled,
      company_id: companyId,
      employee_id: employeeId,
    }).unwrap();

    console.log(enable);

    setIsOvertimeEnabled(!isOvertimeEnabled);
  };

  return (
    <BrandCardWrapper>
      <HrmSetupCardHeader title="Employee Overtime Setting" />
      <div className="px-6 py-3">
        <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
          <div className="w-full dark:text-white">
            <h3>Employee Overtime Setting</h3>
            {employeeOvertimeStatus?.message && (
              <p>{employeeOvertimeStatus.message}</p>
            )}
          </div>
          <div className="flex w-full justify-end dark:text-white">
            <label className="flex cursor-pointer items-center space-x-3">
              <span>Enable Overtime</span>
              <div
                className={`relative inline-block h-6 w-12 rounded-full p-1 transition-colors duration-300 ${
                  isOvertimeEnabled ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isOvertimeEnabled}
                  onChange={handleToggle}
                  className="absolute h-full w-full cursor-pointer opacity-0"
                />
                <div
                  className={`absolute h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                    isOvertimeEnabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </BrandCardWrapper>
  );
};

export default EmployeeOverTimeSettingCard;
