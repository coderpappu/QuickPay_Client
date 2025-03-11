import { Link } from "react-router-dom";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";

const DepartmentList = () => {
  const companyId = useSelector((state) => state.company.companyId);

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
        },
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
        <td className="border-b px-4 py-2 text-left">{department?.name}</td>
        <td className="border-b px-4 py-2 text-left">{department?.user_id}</td>
        {/* <td className="py-2 px-4 border-b text-left">
          {department?.companyId}
        </td> */}
        <td className="border-b px-4 py-2 text-left">
          <Link to={`/department/update/${department?.id}`}>
            <button className="text-blue-500">
              <FontAwesomeIcon icon={faEdit} style={{ color: "#3686FF" }} />
            </button>
          </Link>
        </td>
        <td className="border-b px-4 py-2 text-left">
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
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-2xl font-bold">Total 0 departments.</h1>
        <Link to="/department/create">
          <button className="rounded bg-[#3686FF] px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">
            Add Department
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          {!isError && (
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left">Name</th>
                <th className="border-b px-4 py-2 text-left">Created By</th>
                {/* <th className="py-2 px-4 border-b text-left">Department Head</th> */}
                <th className="border-b px-4 py-2 text-left">Edit</th>
                <th className="border-b px-4 py-2 text-left">Delete</th>
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
