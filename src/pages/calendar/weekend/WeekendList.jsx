import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import {
    useDeleteWeekendMutation,
    useGetCompanyIdQuery,
    useGetWeekendListQuery
} from "../../../features/api";

import toast from "react-hot-toast";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import ListSkeleton from "../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../utils/ErrorMessage";

const WeekendList = () => {
  const { data: companyId } = useGetCompanyIdQuery();
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
        }
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
          <td className="py-2 text-sm text-center">{++index}</td>
          <td className="py-2 text-sm font-semibold pl-4 md:pl-10">
            {weekend?.name}
          </td>
          <td
            className={` ${weekend.status === "INACTIVE" && "text-red-600"} py-2 text-sm text-center`}
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
              <MdOutlineDeleteOutline className="text-2xl text-red-600 cursor-pointer" />
            </div>
          </td>
        </tr>
      ))
    ) : (
      <h3 className="center py-6">No data to show</h3>
    );

  return (
    <div className="px-4 md:px-0">
      <div className="flex flex-wrap justify-between items-center pb-2">
        <div>
          <h2 className="font-semibold text-lg pb-2">Weekend</h2>
        </div>
      </div>

      <div className="border-solid border-[1px] border-slate-200 bg-white rounded-md p-5 w-full h-auto overflow-x-auto">
        {/* Heading And Btn */}
        <div className="flex flex-wrap justify-between mb-4">
          <div className="font-medium text-base">
            {weekends?.data?.length | 0} Weekend Available for Now
          </div>
          <div>
            <Link
              to="/company/weekend/create"
              className="px-5 py-2 rounded-[3px] text-white bg-[#3686FF] transition hover:bg-[#7f39f0]"
            >
              Add Weekend
            </Link>
          </div>
        </div>
        <div>
          <table className="w-full h-auto table-fixed">
            {!isError && (
              <thead className="border-b border-slate-200 text-left">
                <tr>
                  <th className="pb-2 text-base text-center">SL</th>
                  <th className="pb-2 text-base pl-4 md:pl-10">Name</th>
                  <th className="pb-2 text-base text-center">Status</th>
                  <th className="pb-2 text-base text-center">Update</th>
                  <th className="pb-2 text-base text-center">Delete</th>
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
