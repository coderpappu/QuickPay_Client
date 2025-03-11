import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useSelector } from "react-redux";
import {
  useDeleteDesignationMutation,
  useGetDesignationsQuery,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";

const DesignationList = () => {
  const companyId = useSelector((state) => state.company.companyId);

  const [deleteDesignation] = useDeleteDesignationMutation();

  const handleDeleteDesignation = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteDesignation(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Designation deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete designation");
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
    data: designations,
    isLoading,
    isError,
    error,
  } = useGetDesignationsQuery(companyId, {
    skip: companyId == null,
  });

  let content;

  if (isLoading && !isError) content = <ListSkeleton />;

  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError)
    content = designations?.data ? (
      designations?.data?.map((designation, index) => (
        <tr
          key={designation?.id}
          className={index % 2 === 0 ? "" : "rounded-sm bg-gray-50"}
        >
          <td className="py-2 text-center text-sm">{++index}</td>
          <td className="py-2 pl-10 text-sm font-semibold">
            {designation?.name}
          </td>
          <td className="py-2 text-center text-sm">{designation?.user_id}</td>

          <td className="py-2 text-sm">
            <Link to={`/designation/update/${designation?.id}`}>
              <div className="grid place-items-center">
                <TbEdit className="text-2xl text-[#3686FF]" />
              </div>
            </Link>
          </td>
          <td
            className="py-2 text-sm"
            onClick={() => handleDeleteDesignation(designation?.id)}
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
    <div>
      <div className="flex flex-wrap items-center justify-between pb-2">
        <div>
          <h2 className="pb-2 text-lg font-semibold"> Designations</h2>
        </div>
      </div>

      <div className="h-auto w-full rounded-md border-[1px] border-solid border-slate-200 bg-white p-5">
        {/* Heading And Btn */}
        <div className="mb-4 flex flex-wrap justify-between">
          <div className="text-base font-medium">
            {" "}
            {designations?.data?.length | 0} Designation Available for Now
          </div>
          <div>
            <Link
              to="/designation/create"
              className="rounded-[3px] bg-[#3686FF] px-5 py-2 text-white transition hover:bg-[#7f39f0]"
            >
              Add Designation
            </Link>
          </div>
        </div>
        <div>
          <table className="h-auto w-full">
            {!isError && (
              <thead className="mt-8 border-b border-slate-200 text-left">
                <tr>
                  <th className="pb-2 text-center text-base">SL</th>
                  <th className="pb-2 pl-10 text-base">Name</th>
                  <th className="pb-2 text-center text-base">Created By</th>
                  <th className="pb-2 text-center text-base">Update </th>
                  <th className="pb-2 text-center text-base">Delete </th>
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

export default DesignationList;
