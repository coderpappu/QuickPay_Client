import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import {
  useDeleteWeekendMutation,
  useGetWeekendListQuery,
} from "../../../features/api";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import ListSkeleton from "../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../utils/ErrorMessage";

const WeekendList = () => {
  const companyId = useSelector((state) => state.company.companyId);
  const [deleteWeekend] = useDeleteWeekendMutation();

  const handleDeleteWeekend = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteWeekend(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("weekend deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete weekend");
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

  const {
    data: weekends,
    isLoading,
    isError,
    error,
  } = useGetWeekendListQuery(companyId, {
    skip: companyId == null,
  });

  let content;

  if (isLoading && !isError) content = <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError)
    content = weekends?.data ? (
      weekends?.data?.map((weekend, index) => (
        <tr
          key={weekend?.id}
          className={`${
            index % 2 === 0 ? "" : "bg-gray-50"
          } rounded-sm md:rounded-none`}
        >
          <td className="py-2 text-center text-sm">{++index}</td>
          <td className="py-2 pl-4 text-sm font-semibold md:pl-10">
            {weekend?.name}
          </td>
          <td
            className={` ${weekend.status === "INACTIVE" && "text-red-600"} py-2 text-center text-sm`}
          >
            {weekend?.status}
          </td>

          <td className="py-2 text-sm">
            <Link to={`/weekend/update/${weekend?.id}`}>
              <div className="grid place-items-center">
                <TbEdit className="text-2xl text-[#3686FF]" />
              </div>
            </Link>
          </td>
          <td
            className="py-2 text-sm"
            onClick={() => handleDeleteWeekend(weekend?.id)}
          >
            <div className="grid place-items-center">
              <MdOutlineDeleteOutline className="cursor-pointer text-2xl text-red-600" />
            </div>
          </td>
        </tr>
      ))
    ) : (
      <h3 className="center py-6">No data to show</h3>
    );

  return (
    <div className="px-4 md:px-0">
      <div className="flex flex-wrap items-center justify-between pb-2">
        <div>
          <h2 className="pb-2 text-lg font-semibold">Weekend</h2>
        </div>
      </div>

      <div className="h-auto w-full overflow-x-auto rounded-md border-[1px] border-solid border-slate-200 bg-white p-5">
        {/* Heading And Btn */}
        <div className="mb-4 flex flex-wrap justify-between">
          <div className="text-base font-medium">
            {weekends?.data?.length | 0} Weekend Available for Now
          </div>
          <div>
            <Link
              to="/company/weekend/create"
              className="rounded-[3px] bg-[#3686FF] px-5 py-2 text-white transition hover:bg-[#7f39f0]"
            >
              Add Weekend
            </Link>
          </div>
        </div>
        <div>
          <table className="h-auto w-full table-fixed">
            {!isError && (
              <thead className="border-b border-slate-200 text-left">
                <tr>
                  <th className="pb-2 text-center text-base">SL</th>
                  <th className="pb-2 pl-4 text-base md:pl-10">Name</th>
                  <th className="pb-2 text-center text-base">Status</th>
                  <th className="pb-2 text-center text-base">Update</th>
                  <th className="pb-2 text-center text-base">Delete</th>
                </tr>
              </thead>
            )}

            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WeekendList;
