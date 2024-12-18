import { useState } from "react";
import toast from "react-hot-toast";
import { LuEye } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  useDeleteAttendanceMutation,
  useGetAttendancesQuery,
  useGetCompanyIdQuery,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import DatePicker from "../../utils/DatePicker";
import ErrorMessage from "../../utils/ErrorMessage";
import formatTimeTo12Hour from "../../utils/timeConverter";

const AttendanceList = () => {
  
  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteAttendance] = useDeleteAttendanceMutation();

  // date pick

  const [date, setDate] = useState(DatePicker);

  const {
    data: attendances,
    isLoading,
    isError,
    error,
  } = useGetAttendancesQuery({ companyId, date });

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // update system of attendace
  const handleEditAttendance = async () => {
    // setEdit(!edit);
    alert("Edit System is not available");
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
        },
      );

    confirm();
  };

  let content;

  if (isLoading && !isError) return <ListSkeleton />;

  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && attendances?.data?.length >= 0)
    content = attendances?.data?.map((attendance, index) => (
      <>
        <tr
          key={attendance?.id}
          className={
            index % 2 === 0 ? "" : "rounded-sm bg-gray-50 dark:bg-dark-box"
          }
        >
          <td className="py-2 text-center text-sm">{index + 1}</td>
          <td className="py-2 text-center text-sm font-semibold">
            {attendance?.employee?.name}
          </td>
          <td className="py-2 text-center text-sm">
            {
              // edit ? (
              //   <input
              //     type="time"
              //     placeholder="03.00"
              //     value={attendance?.check_in_time}
              //     onChange={(e) => handleCheck(e.target.value)}
              //     className="p-2 w-[80px] bg-[#F0F3FF] rounded-sm focus:outline-[#6D28D8] text-center"
              //   />
              // ) : (
              formatTimeTo12Hour(attendance?.check_in_time || "")
              //)
            }
          </td>
          <td className="py-2 text-center text-sm">
            {formatTimeTo12Hour(attendance?.check_out_time || "")}
          </td>
          <td className="py-2 text-center text-sm">
            {attendance?.late == false ? "No" : "Yes"}
          </td>
          <td className="py-2 text-center text-sm">
            {attendance?.over_time > 0 ? "Yes" : "No"}
          </td>

          <td className="py-2 text-center text-sm">{attendance?.status}</td>

          <td className="py-2 text-center text-sm">
            <div className="m-auto flex flex-wrap justify-center gap-2 text-white">
              {/* edit button  */}
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-600 p-2">
                <Link
                  to={`/company/employee/details/${attendance?.employee?.id}`}
                >
                  <LuEye size={20} />
                </Link>
              </div>

              {/* delete button  */}
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center">
                <MdOutlineDeleteOutline
                  size={20}
                  onClick={() => handleDeleteCompany(attendance.id)}
                />
              </div>
            </div>
          </td>
        </tr>
      </>
    ));
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between pb-2">
        <div>
          <h2 className="pb-2 text-lg font-semibold dark:text-dark-heading-color">
            Presents Employee
          </h2>
        </div>
      </div>

      <div className="h-auto w-full rounded-md border-[1px] border-solid border-slate-200 bg-white p-5 dark:border-none dark:bg-dark-card">
        <div className="mb-2 flex flex-wrap justify-between">
          <div className="text-base font-medium dark:text-dark-text-color">
            Now {attendances?.data?.length || 0} Employee Available
          </div>
          <div className="border dark:border-none">
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="rounded-sm border-none px-2 py-1 text-[15px] outline-none dark:bg-dark-box dark:text-white"
            />
          </div>
        </div>

        <div>
          <table className="h-auto w-full table-auto">
            {!isError && (
              <thead className="mt-12 border-b border-slate-200 text-left dark:border-opacity-10 dark:text-white">
                <tr>
                  <th className="pb-2 text-center text-[14px]">SL</th>
                  <th className="pb-2 text-center text-[14px]">Name</th>
                  <th className="pb-2 text-center text-[14px]">In Time</th>
                  <th className="pb-2 text-center text-[14px]">Out Time</th>
                  <th className="pb-2 text-center text-[14px]">Late</th>
                  <th className="pb-2 text-center text-[14px]">Over Time</th>
                  <th className="pb-2 text-center text-[14px]">Status</th>
                  <th className="pb-2 text-center text-[14px]">Action</th>
                </tr>
              </thead>
            )}

            <tbody className="text-sm dark:text-dark-text-color">
              {content}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
