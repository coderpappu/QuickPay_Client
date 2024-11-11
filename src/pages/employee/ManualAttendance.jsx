import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineCheckCircle } from "react-icons/md";
import {
  useCreateAttendanceMutation,
  useGetCompanyIdQuery,
  useGetEmployeeSettingQuery,
  useGetEmployeesQuery,
} from "../../features/api";
import ListSkeleton from "../../skeletons/ListSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";
const ManualAttendance = () => {
  const [checkInTimes, setCheckInTimes] = useState({});
  const [checkOutTimes, setCheckOutTimes] = useState({});

  const { data: companyId } = useGetCompanyIdQuery();
  const [createCheck, { isError: addError }] = useCreateAttendanceMutation();
  const { data: employeeSetting } = useGetEmployeeSettingQuery(companyId);

  const {
    data: employees,
    isLoading,
    isError,
    error,
  } = useGetEmployeesQuery(companyId);

  const handleCheck = async (employeeId, fingerprintId) => {
    const dateCheck = new Date();
    const nowDate = `${dateCheck.getFullYear()}-${String(
      dateCheck.getMonth() + 1
    ).padStart(2, "0")}-${String(dateCheck.getDate()).padStart(2, "0")}`;

    let checkIn = checkInTimes[employeeId] || null;
    let checkOut = checkOutTimes[employeeId] || null;

    try {
      let addAttendance = await createCheck({
        check_in_time: checkIn,
        check_out_time: checkOut,
        date: nowDate,
        late: false,
        status: "Success",
        companyId,
        employeeId,
        fingerprintId,
      }).unwrap(); // Use unwrap to catch the error directly

      toast.success("Attendance added successfully!");
    } catch (error) {
      // Check for a specific error message or status

      if (addError) {
        // Backend specific error handling based on the message
        const errorMessage = error?.data?.message || "Failed to add attendance";
        toast.error(errorMessage);
      }
    }
  };

  const handleCheckInChange = (employeeId, time) => {
    setCheckInTimes((prev) => ({ ...prev, [employeeId]: time }));
  };

  const handleCheckOutChange = (employeeId, time) => {
    setCheckOutTimes((prev) => ({ ...prev, [employeeId]: time }));
  };

  let content;

  if (isLoading && !isError) return <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && employees?.data?.length >= 0)
    content = employees?.data?.map((employee, index) => (
      <tr key={employee?.id} className="w-full dark:text-dark-text-color">
        <td className="py-2 text-sm  ">{index + 1}</td>
        <td className="py-2 text-sm">{employee?.name}</td>
        <td className="py-2 text-sm ">
          {employee?.EmployeeDepartment?.[0]?.department?.name}
        </td>
        <td className="py-2 text-sm ">
          {employee?.EmployeeDepartment?.[0]?.department?.name}
        </td>
        <td className="py-2 text-sm  ">
          {employee?.EmployeeShift?.[0]?.shift?.name}
        </td>
        <td className="py-2 text-sm ">
          <input
            type="time"
            placeholder="00.00"
            value={checkInTimes[employee?.id] || ""}
            onChange={(e) => handleCheckInChange(employee?.id, e.target.value)}
            className="p-2 w-[80px] bg-[#F0F3FF] dark:bg-dark-box rounded-sm focus:outline-[#6D28D8] text-center"
          />
        </td>

        <td className="py-2 text-sm ">
          <input
            type="time"
            placeholder="03.00"
            value={checkOutTimes[employee?.id] || ""}
            onChange={(e) => handleCheckOutChange(employee?.id, e.target.value)}
            className="p-2 w-[80px] bg-[#F0F3FF] dark:bg-dark-box rounded-sm focus:outline-[#6D28D8] text-center"
          />
        </td>

        <td className="py-2 text-sm ">
          <div className="grid ">
            <MdOutlineCheckCircle
              className="text-2xl text-green-600 cursor-pointer"
              onClick={() =>
                handleCheck(employee?.id, employee?.fingerprint_id)
              }
            />
          </div>
        </td>
      </tr>
    ));

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center pb-2">
        <div>
          <h2 className="font-semibold text-lg pb-2 dark:text-dark-heading-color">
            {" "}
            All Employee Attendance{" "}
          </h2>
        </div>
      </div>

      <div className="border-solid border-[1px] border-slate-200 bg-white dark:bg-dark-card dark:border-none rounded-md p-5 px-8 w-full h-auto">
        <div className="flex flex-wrap justify-between mb-3">
          <div className="font-medium text-base dark:text-dark-text-color">
            Now 150 employees are available
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="p-2 border-solid bg-[#F0F3FF] dark:bg-dark-box rounded-md focus:outline-[#6D28D8]"
            />
          </div>
        </div>
        <div>
          <table className="w-full h-auto ">
            {!isError && (
              <thead className="border-b border-slate-200 dark:border-opacity-10 dark:text-white text-left  mt-12">
                <tr>
                  <th className="pb-2 text-sm  w-[8%]">SL</th>
                  <th className="pb-2 text-sm  w-[14%]">Name</th>
                  <th className="pb-2 text-sm  w-[14%]">Branch</th>
                  <th className="pb-2 text-sm  w-[14%]">Department</th>
                  <th className="pb-2 text-sm  w-[14%]">Shift</th>
                  <th className="pb-2 text-sm  w-[14%]">In Time</th>
                  <th className="pb-2 text-sm  w-[14%]">Out Time</th>
                  <th className="pb-2 text-sm  w-[5%]">Update</th>
                </tr>
              </thead>
            )}

            {!isError ? <tbody>{content}</tbody> : content}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManualAttendance;
