import { Link } from "react-router-dom";

import {
  useDeleteSectionMutation,
  useGetSectionsQuery,
} from "../../features/api";

import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useSelector } from "react-redux";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";

const SectionList = () => {
  const companyId = useSelector((state) => state.company.companyId);

  const [deleteSection] = useDeleteSectionMutation();

  const handleDeleteSection = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteSection(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Section deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete section");
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
    data: sections,
    isLoading,
    isError,
    error,
  } = useGetSectionsQuery(companyId, {
    skip: companyId == null,
  });

  let content;

  if (isLoading && !isError) content = <ListSkeleton />;

  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError)
    content = sections?.data?.map((section, index) => (
      <tr
        key={section.id}
        className={index % 2 === 0 ? "" : "rounded-sm bg-gray-50"}
      >
        <td className="py-2 text-center text-sm">{++index}</td>
        <td className="py-2 pl-10 text-sm font-semibold">{section.name}</td>
        <td className="py-2 text-center text-sm">{section.user_id}</td>

        <td className="py-2 text-sm">
          <Link to={`/section/update/${section.id}`}>
            <div className="grid place-items-center">
              <TbEdit className="text-2xl text-[#3686FF]" />
            </div>
          </Link>
        </td>
        <td
          className="py-2 text-sm"
          onClick={() => handleDeleteSection(section.id)}
        >
          <div className="grid place-items-center">
            <MdOutlineDeleteOutline className="cursor-pointer text-2xl text-red-600" />
          </div>
        </td>
      </tr>
    ));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between pb-2">
        <div>
          <h2 className="pb-2 text-lg font-semibold"> Sections</h2>
        </div>
      </div>

      {/* {content} */}
      <div className="h-auto w-full rounded-md border-[1px] border-solid border-slate-200 bg-white p-5">
        {/* Heading And Btn */}
        <div className="mb-4 flex flex-wrap justify-between">
          <div className="text-base font-medium">
            {" "}
            {sections?.data?.length | 0} Section Available for Now
          </div>
          <div>
            <Link
              to="/section/create"
              className="rounded-[3px] bg-[#3686FF] px-5 py-2 text-white transition hover:bg-[#7f39f0]"
            >
              Add Section
            </Link>
          </div>
        </div>
        <div>
          <table className="h-auto w-full">
            {!isError && (
              <thead className="mb-8 border-b border-slate-200 text-left">
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

export default SectionList;
