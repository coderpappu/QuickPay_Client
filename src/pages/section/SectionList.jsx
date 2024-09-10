import { Link } from "react-router-dom";

import {
    useDeleteSectionMutation,
    useGetCompanyIdQuery,
    useGetSectionsQuery,
} from "../../features/api";

import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";

const SectionList = () => {
  const { data: companyId } = useGetCompanyIdQuery();

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
        }
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
        className={index % 2 === 0 ? "" : "bg-gray-50 rounded-sm"}
      >
        <td className="py-2 text-sm text-center">{++index}</td>
        <td className="py-2 text-sm font-semibold pl-10">{section.name}</td>
        <td className="py-2 text-sm text-center">{section.user_id}</td>

        <td className="py-2 text-sm ">
          <Link to={`/section/update/${section.id}`}>
            <div className="grid place-items-center">
              <TbEdit className="text-2xl text-[#6D28D9]" />
            </div>
          </Link>
        </td>
        <td
          className="py-2 text-sm "
          onClick={() => handleDeleteSection(section.id)}
        >
          <div className="grid place-items-center">
            <MdOutlineDeleteOutline className="text-2xl text-red-600 cursor-pointer" />
          </div>
        </td>
      </tr>
    ));

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center pb-2">
        <div>
          <h2 className="font-semibold text-lg pb-2"> Sections</h2>
        </div>
      </div>

      {/* {content} */}
      <div className="border-solid border-[1px] border-slate-200 bg-white rounded-md p-5 w-full h-auto">
        {/* Heading And Btn */}
        <div className="flex flex-wrap justify-between mb-4">
          <div className="font-medium text-base ">
            {" "}
            {sections?.data?.length | 0} Section Available for Now
          </div>
          <div>
            <Link
              to="/section/create"
              className="px-5 py-2 rounded-[3px] text-white bg-[#6D28D9] transition hover:bg-[#7f39f0]"
            >
              Add Section
            </Link>
          </div>
        </div>
        <div>
          <table className="w-full h-auto ">
            {!isError && (
              <thead className="border-b border-slate-200 text-left mb-8">
                <tr>
                  <th className="pb-2 text-base text-center">SL</th>
                  <th className="pb-2 text-base pl-10">Name</th>
                  <th className="pb-2 text-base text-center">Created By</th>
                  <th className="pb-2 text-base text-center">Update </th>
                  <th className="pb-2 text-base text-center">Delete </th>
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
