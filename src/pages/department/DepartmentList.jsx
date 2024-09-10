import { Link } from "react-router-dom";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import {
    useDeleteDepartmentMutation,
    useGetCompanyIdQuery,
    useGetDepartmentsQuery,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";
const DepartmentList = () => {
  const {
    data: companyId,
    isLoading: loading,
    isError: errorStatus,
  } = useGetCompanyIdQuery();

  const [departmentDelete] = useDeleteDepartmentMutation();

  const handleDeleteDepartment = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                departmentDelete(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("department deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete department");
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
    data: allDepartment,
    isLoading,
    isError,
    error,
  } = useGetDepartmentsQuery(companyId || undefined);

  let content;

  if (isLoading && !isError) content = <ListSkeleton />;
  if (isError && !isLoading)
    content = <ErrorMessage message={error?.data?.message} />;
  if (!isLoading && !isError)
    content = allDepartment?.data?.map((department) => (
      <tr key={department.id}>
        <td className="py-2 px-4 border-b text-left">{department?.name}</td>
        <td className="py-2 px-4 border-b text-left">{department?.user_id}</td>
        {/* <td className="py-2 px-4 border-b text-left">
          {department?.companyId}
        </td> */}
        <td className="py-2 px-4 border-b text-left">
          <Link to={`/department/update/${department?.id}`}>
            <button className="text-blue-500 ">
              <FontAwesomeIcon icon={faEdit} style={{ color: "#6D28D9" }} />
            </button>
          </Link>
        </td>
        <td className="py-2 px-4 border-b text-left">
          <button
            className="text-red-500"
            type="button"
            onClick={() => handleDeleteDepartment(department?.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Total 0 departments.</h1>
        <Link to="/department/create">
          <button className="bg-[#6D28D9] text-white font-semibold py-1 px-2 rounded text-xs hover:bg-blue-700">
            Add Department
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          {!isError && (
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Created By</th>
                {/* <th className="py-2 px-4 border-b text-left">Department Head</th> */}
                <th className="py-2 px-4 border-b text-left">Edit</th>
                <th className="py-2 px-4 border-b text-left">Delete</th>
              </tr>
            </thead>
          )}
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentList;
