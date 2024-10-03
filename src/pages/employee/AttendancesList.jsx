import { useState } from "react";
import toast from "react-hot-toast";
import { LuEye } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
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
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

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
        }
      );

    confirm();
  };

  let content;

  if (isLoading && !isError) content = <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && attendances?.data?.length >= 0)
    content = attendances?.data?.map((attendance, index) => (
      <>
        <tr
          key={attendance?.id}
          className={index % 2 === 0 ? "" : "bg-gray-50 rounded-sm"}
        >
          <td className="py-2 text-sm text-center">{index + 1}</td>
          <td className="py-2 text-sm font-semibold  text-center">
            {attendance?.employee?.name}
          </td>
          <td className="py-2 text-sm text-center">
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
              attendance?.check_in_time
              //)
            }
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
            <div className="flex flex-wrap justify-center gap-2 m-auto text-white">
              {/* edit button  */}
              <div className="w-8 h-8 bg-indigo-600 rounded-sm p-2 flex justify-center items-center cursor-pointer">
                <Link
                  to={`/company/employee/details/${attendance?.employee?.id}`}
                >
                  <LuEye size={20} />
                </Link>
              </div>

              {/* delete button  */}
              <div className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer">
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
      <div className="flex flex-wrap justify-between items-center pb-2">
        <div>
          <h2 className="font-semibold text-lg pb-2 dark:text-dark-heading-color">
            Presents Employee
          </h2>
        </div>
      </div>

      <div className="border-solid border-[1px] border-slate-200 bg-white dark:bg-dark-card dark:border-none rounded-md p-5 w-full h-auto">
        <div className="flex flex-wrap justify-between mb-2">
          <div className="font-medium text-base dark:text-dark-text-color">
            Now {attendances?.data?.length || 0} Employee Available
          </div>
          <div className="border dark:border-none">
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="dark:bg-dark-box border-none outline-none dark:text-white px-2 py-1 text-[15px] rounded-sm "
            />
          </div>
        </div>

        <div>
          <table className="w-full h-auto table-auto">
            {!isError && (
              <thead className="border-b border-slate-200 dark:border-opacity-10 dark:text-white text-left mt-12">
                <tr>
                  <th className="pb-2 text-[14px] text-center">SL</th>
                  <th className="pb-2 text-[14px] text-center">Name</th>
                  <th className="pb-2 text-[14px] text-center">In Time</th>
                  <th className="pb-2 text-[14px] text-center">Out Time</th>
                  <th className="pb-2 text-[14px] text-center">Late</th>
                  <th className="pb-2 text-[14px] text-center">Over Time</th>
                  <th className="pb-2 text-[14px] text-center">Status</th>
                  <th className="pb-2 text-[14px] text-center">Action</th>
                </tr>
              </thead>
            )}

            <tbody className="dark:text-dark-text-color text-sm">
              {content}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
