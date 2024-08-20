import React from "react";
import { Form, Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineCheckCircle } from "react-icons/md";
import {
  useGetShiftListQuery,
  useDeleteShiftMutation,
  useGetCompaniesQuery,
  useGetCompanyIdQuery,
  useCreateAttendanceMutation,
  useGetEmployeesQuery,
} from "../../features/api";

import { useState } from "react";

const ManualAttendance = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [inUp, setInUp] = useState(false);

  // console.log(checkIn, checkOut);
  const [editMode, setEditMode] = useState(false);

  // api calls
  const { data: companyId } = useGetCompanyIdQuery();
  const [createCheck, { isError, isSuccess, error }] =
    useCreateAttendanceMutation();

  const {
    data: employees,
    isLoading,
    isError: employeeError,
    isSuccess: employeeSuccess,
  } = useGetEmployeesQuery(companyId);

  const handleCheck = async (employeeId, fingerprintId) => {
    const dateCheck = new Date();

    const nowDate = `${dateCheck.getFullYear()}-${String(
      dateCheck.getMonth() + 1
    ).padStart(2, "0")}-${String(dateCheck.getDate()).padStart(2, "0")}`;

    let checkInData = await createCheck({
      check_in_time: checkIn,
      check_out_time: checkOut,
      date: nowDate,
      late: false,
      status: "Success",
      companyId,
      employeeId,
      fingerprintId,
    });

    // if (checkInData?.data?.success == true) {
    //   setInUp(true);
    // }

    // if (isSuccess) console.log("Succes The adding");
  };

  let content;

  if (isLoading && !isError) content = "Loading...";
  if (!isLoading && isError) content = "Error Occured";
  if (!isLoading && !isError && employees?.data?.length >= 0)
    content = employees?.data?.map((employee, index) => (
      <>
        <tr
          // key={shift._id}
          // className={index % 2 === 0 ? "" : "bg-gray-50 rounded-sm"}
          className="w-full "
        >
          <td className="py-2 text-sm text-center ">{++index}</td>
          <td className="py-2 text-sm font-semibold pl-10 ">
            {employee?.name}
          </td>
          <td className="py-2 text-sm font-semibold pl-10 ">
            {employee?.EmployeeDepartment[0]?.department?.name}
          </td>
          <td className="py-2 text-sm font-semibold pl-10 ">
            {" "}
            {employee?.EmployeeShift[0]?.shift?.name}
          </td>
          <td className="py-2 text-sm text-center">
            <form onChange={(e) => setCheckIn(e.target.value)}>
              <input
                type="time"
                placeholder="00.00"
                value={checkIn}
                disabled={inUp}
                className="p-2 w-[80px] bg-[#F0F3FF] rounded-sm focus:outline-[#6D28D8] text-center"
              />
            </form>
          </td>

          <td className="py-2 text-sm text-center">
            <form onChange={(e) => setCheckOut(e.target.value)}>
              <input
                type="time"
                placeholder="03.00"
                value={checkOut}
                className="p-2 w-[80px] bg-[#F0F3FF] rounded-sm focus:outline-[#6D28D8] text-center"
              />
            </form>
          </td>

          <td className="py-2 text-sm ">
            <div className="grid place-items-center">
              <MdOutlineCheckCircle
                className="text-2xl text-green-600 cursor-pointer"
                onClick={() =>
                  handleCheck(employee?.id, employee?.fingerprint_id)
                }
              />
            </div>
          </td>

          {/* <td
className="py-2 text-sm "
// onClick={() => handleDeleteShift(shift._id)}
>
<div className="grid place-items-center">
<MdOutlineDeleteOutline className="text-2xl text-red-600 cursor-pointer" />
</div>
</td> */}
        </tr>
      </>
    ));

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center pb-2">
        <div>
          <h2 className="font-semibold text-lg pb-2"> Attendance</h2>
        </div>
      </div>

      {/* {content} */}
      <div className="border-solid border-[1px] border-slate-200 bg-white rounded-md p-5 w-full h-auto">
        {/* Heading And Btn */}
        <div className="flex flex-wrap justify-between mb-12">
          <div className="font-medium text-base ">
            {" "}
            Now 150 employees are available
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="p-2 border-solid  bg-[#F0F3FF] rounded-md focus:outline-[#6D28D8]"
            />
          </div>
        </div>
        {/* Data Body  */}
        <div>
          <table className="w-full h-auto ">
            {/* table head  */}
            <thead className="border-b border-slate-200 text-left">
              <tr>
                <th className="pb-2 text-base text-center w-[8%]">SL</th>
                <th className="pb-2 text-base pl-10 w-[22%]">Name</th>
                <th className="pb-2 text-base text-center w-[14%]">
                  Department
                </th>
                <th className="pb-2 text-base text-center w-[14%]">Shift</th>
                <th className="pb-2 text-base text-center w-[14%]">In Time</th>
                <th className="pb-2 text-base text-center w-[14%]">Out Time</th>
                <th className="pb-2 text-base text-center w-[14%]">Update</th>
              </tr>
            </thead>

            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManualAttendance;
