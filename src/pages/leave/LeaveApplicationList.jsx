import React from "react";
import {
  useGetAllLeaveApplicationQuery,
  useGetCompanyIdQuery,
} from "../../features/api";
import ListSkeleton from "../../skeletons/ListSkeleton";
import { ErrorMessage } from "formik";

const LeaveApplicationList = () => {
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

  let employees;

  if (!isLoading && !isError) {
    content = (
      <tbody>
        {leaveApplicationList?.data?.map((leave) => (
          <tr key={leave?.id} className={" rounded-sm"}>
            <td className="py-2 text-sm ">{leave?.LeaveType?.name}</td>

            <td className="py-2 text-sm ">
              {/* {employee?.name} */}
              {leave?.start_date}
            </td>
            <td className="py-2 text-sm ">
              {/* {employee?.name} */}
              {leave?.end_date}
            </td>
            <td className="py-2 text-sm">{/* {employee?.name} */}2</td>
            <td className="py-2 text-sm ">
              {/* {employee?.name} */}
              {leave?.reason}
            </td>
            <td className="py-2 text-sm ">
              {/* {employee?.name} */}
              Manager
            </td>
            <td className="py-2 text-sm ">
              {/* {employee?.name} */}
              Approved
            </td>
            <td className="py-2 text-sm text-center">{/* <TbDots /> */}</td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <div className="border-solid border-[1px] mt-3 border-slate-200 bg-white rounded-md p-5 w-full h-[250px]">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div>All Leave Request</div>
      </div>
      <table className="w-full h-auto">
        {/* {!isError && ( */}
        <thead className="border-b border-slate-200 text-left mt-8">
          <tr>
            <th className="pb-2 text-base ">Leave Type</th>
            <th className="pb-2 text-base ">From</th>
            <th className="pb-2 text-base ">To</th>
            <th className="pb-2 text-base ">Days</th>
            <th className="pb-2 text-base ">Reason</th>
            <th className="pb-2 text-base ">Approved By</th>
            <th className="pb-2 text-base ">Status</th>
            <th className="pb-2 text-base ">Action</th>
          </tr>
        </thead>
        {content}
      </table>
    </div>
  );
};

export default LeaveApplicationList;
