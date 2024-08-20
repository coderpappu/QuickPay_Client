import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useDeleteEmployeeMutation,
  useGetCompaniesQuery,
  useSetCompanyIdMutation,
  useGetCompanyIdQuery,
  useGetEmployeesQuery,
  useGetAttendancesQuery,
  useDeleteAttendanceMutation,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";

const AttendanceList = () => {
  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [setCompanyId] = useSetCompanyIdMutation();
  const [deleteAttendance] = useDeleteAttendanceMutation();

  let dateCheck = new Date();
  const todayDate = `${dateCheck.getFullYear()}-${String(
    dateCheck.getMonth() + 1
  ).padStart(2, "0")}-${String(dateCheck.getDate()).padStart(2, "0")}`;

  const [date, setDate] = useState(todayDate);

  const {
    data: attendances,
    isLoading,
    isError,
  } = useGetAttendancesQuery({ companyId, date });

  const handleActivate = (id) => {
    setCompanyId(id);
  };

  const handleDeactivate = () => {
    // setCompanyId(null);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleDeleteCompany = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                await deleteAttendance(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Attendance deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete attendace");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
          />
        ),
        {
          duration: Infinity,
        }
      );

    confirm();
  };

  let content;

  if (isLoading && !isError) content = <ListSkeleton />;
  if (!isLoading && isError) content = "Error";

  if (!isLoading && !isError && attendances?.data?.length >= 0)
    content = attendances?.data?.map((attendance, index) => (
      <>
        <tr
          key={attendance?.id}
          className={index % 2 === 0 ? "" : "bg-gray-50 rounded-sm"}
        >
          <td className="py-2 text-sm text-center">{index + 1}</td>
          <td className="py-2 text-sm font-semibold pl-10">
            {attendance?.employee?.name}
          </td>
          <td className="py-2 text-sm text-center">
            {attendance?.check_in_time}
          </td>
          <td className="py-2 text-sm text-center">
            {attendance?.check_out_time}
          </td>
          <td className="py-2 text-sm text-center">
            {attendance?.late == false ? "No" : "Yes"}
          </td>
          <td className="py-2 text-sm text-center">
            {attendance?.over_time == null ? "No" : "Yes"}
          </td>

          <td className="py-2 text-sm text-center">{attendance?.status}</td>

          <td className="py-2 text-sm text-center">
            <Link to={`/company/employee/details/${attendance.employee.id}`}>
              <div className="grid place-items-center">
                <LuEye className="text-2xl text-green-500" />
              </div>
            </Link>
          </td>
          <td className="py-2 text-sm">
            <Link to={`/company/update/${attendance.id}`}>
              <div className="grid place-items-center">
                <TbEdit className="text-2xl text-[#6D28D9]" />
              </div>
            </Link>
          </td>
          <td
            className="py-2 text-sm"
            onClick={() => handleDeleteCompany(attendance.id)}
          >
            <div className="grid place-items-center">
              <MdOutlineDeleteOutline className="text-2xl text-red-600 cursor-pointer" />
            </div>
          </td>
        </tr>
      </>
    ));
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center pb-2">
        <div>
          <h2 className="font-semibold text-lg pb-2">Presents Employee</h2>
        </div>
      </div>

      <div className="border-solid border-[1px] border-slate-200 bg-white rounded-md p-5 w-full h-auto">
        <div className="flex flex-wrap justify-between mb-12">
          <div className="font-medium text-base">
            Now {attendances?.data?.length} Employee Available
          </div>
          <div className="border p-1">
            <input type="date" value={date} onChange={handleDateChange} />
          </div>
        </div>

        <div>
          <table className="w-full h-auto">
            <thead className="border-b border-slate-200 text-left">
              <tr>
                <th className="pb-2 text-base text-center">SL</th>
                <th className="pb-2 text-base pl-10">Name</th>
                <th className="pb-2 text-base text-center">In Time</th>
                <th className="pb-2 text-base text-center">Out Time</th>
                <th className="pb-2 text-base text-center">Late</th>
                <th className="pb-2 text-base text-center">Over Time</th>
                <th className="pb-2 text-base text-center">Status</th>
                <th className="pb-2 text-base text-center">View</th>
                <th className="pb-2 text-base text-center">Update</th>
                <th className="pb-2 text-base text-center">Delete</th>
              </tr>
            </thead>

            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
