import React from "react";
import {
  useDeleteShiftMutation,
  useGetCompanyIdQuery,
  useGetShiftListQuery,
} from "../../../features/api";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ShiftList = () => {
  const { data } = useGetCompanyIdQuery();

  let company_Id = data;

  const {
    data: ShiftList,
    isLoading,
    isError,
  } = useGetShiftListQuery({
    company_Id: company_Id,
  });

  const [deleteShift, { isLoading: loding, isError: error }] =
    useDeleteShiftMutation();

  const handleDeleteShift = async (shiftId, company_Id) => {
    try {
      if (window.confirm("Are you sure you want to delete")) {
        await deleteShift({ shiftId, company_Id });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  let content = null;

  if (isLoading && !isError) content = "Loading...";
  if (isError && !isLoading) content = "There was an error ";
  if (!isLoading && !isError && Object.keys(ShiftList).length > 0)
    content = "No Shift Available";
  if (!isLoading && !isError) {
    const { data } = ShiftList;

    content = (
      <div>
        <table className="w-full h-auto ">
          <thead className="border-b border-slate-200 text-left">
            <tr>
              <th className="pb-2 text-base text-center">SL</th>
              <th className="pb-2 text-base pl-10">Name</th>
              <th className="pb-2 text-base text-center">Start Time</th>
              <th className="pb-2 text-base text-center">End Time</th>
              <th className="pb-2 text-base text-center">Late Time </th>
              <th className="pb-2 text-base text-center">Update </th>
              <th className="pb-2 text-base text-center">Delete </th>
            </tr>
          </thead>

          <tbody>
            {data.map((shift, index) => (
              <tr
                key={shift.id}
                className={index % 2 === 0 ? "" : "bg-gray-50 rounded-sm"}
              >
                <td className="py-2 text-sm text-center">{++index}</td>
                <td className="py-2 text-sm font-semibold pl-10">
                  {shift.name}
                </td>
                <td className="py-2 text-sm text-center">{shift.start_time}</td>
                <td className="py-2 text-sm text-center">{shift.end_time}</td>
                <td className="py-2 text-sm text-center">
                  {shift.late_time_count}
                </td>
                <td className="py-2 text-sm ">
                  <Link to={`/company/edit/shift/${shift.id}`}>
                    <div className="grid place-items-center">
                      <TbEdit className="text-2xl text-[#6D28D9]" />
                    </div>
                  </Link>
                </td>
                <td
                  className="py-2 text-sm "
                  onClick={() => handleDeleteShift(shift.id, company_Id)}
                >
                  <div className="grid place-items-center">
                    <MdOutlineDeleteOutline className="text-2xl text-red-600 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    return (
      <div>
        <div className="flex flex-wrap justify-between items-center pb-2">
          <div>
            <h2 className="font-semibold text-lg pb-2"> Shift</h2>
          </div>
        </div>

        <div className="border-solid border-[1px] border-slate-200 bg-white rounded-md p-5 w-full h-auto">
          {/* Heading And Btn */}
          <div className="flex flex-wrap justify-between mb-12">
            <div className="font-medium text-base ">
              {" "}
              Now {data?.length} shift are available
            </div>
            <div>
              <Link
                to="/company/add/shift"
                className="px-5 py-2 rounded-[3px] text-white bg-[#6D28D9] transition hover:bg-[#7f39f0]"
              >
                Add Shift
              </Link>
            </div>
          </div>
          {content}
        </div>
      </div>
    );
  }
};
export default ShiftList;
