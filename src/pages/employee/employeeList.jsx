import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useDeleteCompanyMutation,
  useGetCompaniesQuery,
  useSetCompanyIdMutation,
  useGetCompanyIdQuery,
  useGetEmployeesQuery,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";

const EmployeeList = () => {
  //   const {
  //     data: companyData,
  //     isLoading,
  //     isError,
  //     refetch,
  //   } = useGetCompaniesQuery();

  const [deleteCompany] = useDeleteCompanyMutation();
  const [setCompanyId] = useSetCompanyIdMutation();
  const { data: companyId } = useGetCompanyIdQuery();
  const { data, isLoading, isError } = useGetEmployeesQuery();

  const handleActivate = (id) => {
    setCompanyId(id);
  };

  const handleDeactivate = () => {
    // setCompanyId(null);
  };

  const handleDeleteCompany = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                await deleteCompany(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.msg);
                  } else {
                    if (companyId === id) {
                      setCompanyId(null);
                    }
                    toast.success("Company deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete company");
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

  if (isLoading) {
    return <ListSkeleton />;
  }

  let employees;

  if (!isLoading && !isError) {
    employees = data?.data;
  }

  console.log(employees);

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center pb-2">
        <div>
          <h2 className="font-semibold text-lg pb-2">Employee</h2>
        </div>
      </div>

      <div className="border-solid border-[1px] border-slate-200 bg-white rounded-md p-5 w-full h-auto">
        <div className="flex flex-wrap justify-between mb-12">
          <div className="font-medium text-base">
            {/* {companies && companies?.length} Company Available for Now */}
          </div>
          <div>
            <Link
              to="/company/create"
              className="px-5 py-2 rounded-[3px] text-white bg-[#6D28D9] transition hover:bg-[#7f39f0]"
            >
              Add Employee
            </Link>
          </div>
        </div>

        <div>
          <table className="w-full h-auto">
            <thead className="border-b border-slate-200 text-left">
              <tr>
                <th className="pb-2 text-base text-center">SL</th>
                <th className="pb-2 text-base pl-10">Name</th>
                <th className="pb-2 text-base text-center">Email</th>
                <th className="pb-2 text-base text-center">Status</th>
                <th className="pb-2 text-base text-center">View</th>
                <th className="pb-2 text-base text-center">Update</th>
                <th className="pb-2 text-base text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {employees?.map((employee, index) => (
                <tr
                  key={employee?.id}
                  className={index % 2 === 0 ? "" : "bg-gray-50 rounded-sm"}
                >
                  <td className="py-2 text-sm text-center">{index + 1}</td>
                  <td className="py-2 text-sm font-semibold pl-10">
                    {employee?.name}
                  </td>
                  <td className="py-2 text-sm text-center">{employee.email}</td>
                  <td className="py-2 text-sm text-center">
                    {employee.id === companyId ? (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm w-28"
                        onClick={handleDeactivate}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm w-28"
                        onClick={() => handleActivate(employee.id)}
                      >
                        Activate
                      </button>
                    )}
                  </td>
                  <td className="py-2 text-sm text-center">
                    <Link to={`/company/employee/details/${employee.id}`}>
                      <div className="grid place-items-center">
                        <LuEye className="text-2xl text-green-500" />
                      </div>
                    </Link>
                  </td>
                  <td className="py-2 text-sm">
                    <Link to={`/company/update/${employee.id}`}>
                      <div className="grid place-items-center">
                        <TbEdit className="text-2xl text-[#6D28D9]" />
                      </div>
                    </Link>
                  </td>
                  <td
                    className="py-2 text-sm"
                    onClick={() => handleDeleteCompany(employee.id)}
                  >
                    <div className="grid place-items-center">
                      <MdOutlineDeleteOutline className="text-2xl text-red-600 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
