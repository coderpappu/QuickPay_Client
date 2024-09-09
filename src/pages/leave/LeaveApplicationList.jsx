import React, { useState } from "react";
import {
  useGetAllLeaveApplicationQuery,
  useGetCompanyIdQuery,
} from "../../features/api";
import ListSkeleton from "../../skeletons/ListSkeleton";
import { ErrorMessage } from "formik";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const LeaveApplicationList = () => {
  // Manage edit state for individual rows
  const [editRow, setEditRow] = useState(null);

  const { data: companyId } = useGetCompanyIdQuery();
  const {
    data: leaveApplicationList,
    isLoading,
    isError,
  } = useGetAllLeaveApplicationQuery(companyId);

  let content;

  if (isLoading && !isError) content = <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  const statusColorHandler = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500";
      case "APPROVED":
        return "bg-green-500";
      case "REJECTED":
        return "bg-red-500";
      default:
        return "text-gray-500";
    }
  };

  // Handle toggling between edit and checkmark for a specific row
  const toggleEdit = (id) => {
    if (editRow === id) {
      // If the row is already in edit mode, reset it
      setEditRow(null);
    } else {
      // Otherwise, set this row to be edited
      setEditRow(id);
    }
  };

  if (!isLoading && !isError) {
    content = (
      <tbody>
        {leaveApplicationList?.data?.map((leave) => (
          <tr key={leave?.id} className={" rounded-sm"}>
            <td className="py-2 text-sm ">{leave?.LeaveType?.name}</td>
            <td className="py-2 text-sm ">{leave?.start_date}</td>
            <td className="py-2 text-sm ">{leave?.end_date}</td>
            <td className="py-2 text-sm ">2</td>
            <td className="py-2 text-sm ">{leave?.reason}</td>
            <td className="py-2 text-sm ">Manager</td>
            <td className="py-2 text-sm  flex-wrap justify-center items-center">
              {editRow === leave.id ? (
                <div className="m-auto w-32 h-[36px]">
                  <select className="border border-[#ddd] w-full   px-2 py-1 rounded-[5px] ">
                    <option>{leave.status}</option>
                    <option>PENDING</option>
                    <option>REJECTED</option>
                  </select>
                </div>
              ) : (
                <div
                  className={` ${statusColorHandler(leave.status)} w-32 m-auto  px-1 py-2 rounded-full text-center text-gray-700 font-medium`}
                >
                  {leave?.status}
                </div>
              )}
            </td>
            <td className=" py-2 text-sm text-center flex flex-wrap justify-center items-center ">
              {editRow === leave?.id ? (
                <IoMdCheckmarkCircleOutline
                  size={23}
                  color="green"
                  onClick={() => toggleEdit(leave?.id)}
                />
              ) : (
                <LiaEditSolid
                  size={23}
                  color="#6D28D9"
                  onClick={() => toggleEdit(leave?.id)}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <div className="border-solid border-[1px] mt-3 border-slate-200 bg-white rounded-md p-5 w-full h-auto">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div>All Leave Request</div>
      </div>
      <table className="w-full h-auto">
        <thead className="border-b border-slate-200 text-left mt-8">
          <tr>
            <th className="pb-2 text-base ">Leave Type</th>
            <th className="pb-2 text-base ">From</th>
            <th className="pb-2 text-base ">To</th>
            <th className="pb-2 text-base ">Days</th>
            <th className="pb-2 text-base ">Reason</th>
            <th className="pb-2 text-base ">Approved By</th>
            <th className="pb-2 text-base text-center">Status</th>
            <th className="pb-2 text-base text-center">Action</th>
          </tr>
        </thead>
        {content}
      </table>
    </div>
  );
};

export default LeaveApplicationList;
