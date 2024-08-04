import React from "react";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineCheckCircle } from "react-icons/md";
import {
  useGetShiftListQuery,
  useDeleteShiftMutation,
} from "../../features/api";

import { useState } from "react";

const ManualAttendance = () => {
  const [editMode, setEditMode] = useState(false);

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
        <div>
          <table className="w-full h-auto ">
            <thead className="border-b border-slate-200 text-left">
              <tr>
                <th className="pb-2 text-base text-center w-[8%]">SL</th>
                <th className="pb-2 text-base pl-10 w-[22%]">Name</th>
                <th className="pb-2 text-base text-center w-[14%]">Check In</th>
                <th className="pb-2 text-base text-center w-[14%]">
                  Check Out
                </th>
                <th className="pb-2 text-base text-center w-[14%]">
                  Total Hour{" "}
                </th>
                <th className="pb-2 text-base text-center w-[14%]">Update </th>
                <th className="pb-2 text-base text-center w-[14%]">Delete </th>
              </tr>
            </thead>

            <tbody>
              <tr
                // key={shift._id}
                // className={index % 2 === 0 ? "" : "bg-gray-50 rounded-sm"}
                className="w-full "
              >
                <td className="py-2 text-sm text-center ">1</td>
                <td className="py-2 text-sm font-semibold pl-10 ">Pappu Dey</td>
                <td className="py-2 text-sm text-center">
                  {editMode ? (
                    <input
                      type="text"
                      placeholder="10.00"
                      className="p-2 w-[80px] bg-[#F0F3FF] rounded-sm focus:outline-[#6D28D8] text-center"
                    />
                  ) : (
                    <lebel className="p-2">10.00</lebel>
                  )}
                </td>
                <td className="py-2 text-sm text-center">
                  {editMode ? (
                    <input
                      type="text"
                      placeholder="03.00"
                      className="p-2 w-[80px] bg-[#F0F3FF] rounded-sm focus:outline-[#6D28D8] text-center"
                    />
                  ) : (
                    <lebel>03.00</lebel>
                  )}
                </td>
                <td className="py-2 text-sm text-center">04.00</td>
                {!editMode ? (
                  <td className="py-2 text-sm ">
                    <Link
                      // to={`/company/edit/shift/${0}`}
                      onClick={() => setEditMode(true)}
                    >
                      <div className="grid place-items-center">
                        <TbEdit className="text-2xl text-[#6D28D9]" />
                      </div>
                    </Link>
                  </td>
                ) : (
                  <td className="py-2 text-sm ">
                    <div className="grid place-items-center">
                      <MdOutlineCheckCircle
                        className="text-2xl text-green-600 cursor-pointer"
                        onClick={() => setEditMode(false)}
                      />
                    </div>
                  </td>
                )}
                <td
                  className="py-2 text-sm "
                  // onClick={() => handleDeleteShift(shift._id)}
                >
                  <div className="grid place-items-center">
                    <MdOutlineDeleteOutline className="text-2xl text-red-600 cursor-pointer" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManualAttendance;
