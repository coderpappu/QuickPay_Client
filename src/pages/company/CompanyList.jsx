import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useDeleteCompanyMutation,
  useGetCompaniesQuery,
  useSetCompanyIdMutation,
  useGetCompanyIdQuery,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import ErrorMessage from "../../utils/ErrorMessage";

const CompanyList = () => {
  const {
    data: companyData,
    isLoading,
    isError,
    error,
  } = useGetCompaniesQuery();

  const [deleteCompany] = useDeleteCompanyMutation();
  const [setCompanyId] = useSetCompanyIdMutation();
  const { data: companyId } = useGetCompanyIdQuery();

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("companyId");
    if (storedCompanyId) {
      setCompanyId(storedCompanyId);
    }
  }, [setCompanyId]);

  const handleActivate = (id) => {
    setCompanyId(id)
      .unwrap()
      .then(() => {
        localStorage.setItem("companyId", id);
      })
      .catch((error) => {
        console.error("Failed to set company ID:", error);
      });
  };

  const handleDeactivate = () => {
    setCompanyId(null)
      .unwrap()
      .then(() => {
        localStorage.removeItem("companyId");
      })
      .catch((error) => {
        console.error("Failed to clear company ID:", error);
      });
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
  let content;
  let companies;

  if (isLoading && !isError) content = <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError) companies = companyData?.data;
  content = (
    <>
      {" "}
      {companies?.map((company, index) => (
        <tr
          key={company.id}
          className={index % 2 === 0 ? "" : "bg-gray-50 rounded-sm"}
        >
          <td className="py-2 text-sm text-center">{index + 1}</td>
          <td className="py-2 text-sm font-semibold pl-10">
            {company.company_name}
          </td>
          <td className="py-2 text-sm text-center">{company.email}</td>
          <td className="py-2 text-sm text-center">
            {company.id === companyId ? (
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm w-28"
                onClick={handleDeactivate}
              >
                Deactivate
              </button>
            ) : (
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm w-28"
                onClick={() => handleActivate(company.id)}
              >
                Activate
              </button>
            )}
          </td>
          <td className="py-2 text-sm text-center">
            <Link to={`/company/details/${company.id}`}>
              <div className="grid place-items-center">
                <LuEye className="text-2xl text-green-500" />
              </div>
            </Link>
          </td>
          <td className="py-2 text-sm">
            <Link to={`/company/update/${company.id}`}>
              <div className="grid place-items-center">
                <TbEdit className="text-2xl text-[#6D28D9]" />
              </div>
            </Link>
          </td>
          <td
            className="py-2 text-sm"
            onClick={() => handleDeleteCompany(company.id)}
          >
            <div className="grid place-items-center">
              <MdOutlineDeleteOutline className="text-2xl text-red-600 cursor-pointer" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center pb-2">
        <div>
          <h2 className="font-semibold text-lg pb-2">Company</h2>
        </div>
      </div>

      <div className="border-solid border-[1px] border-slate-200 bg-[#ecf0f1] rounded-md p-5 w-full h-auto">
        <div className="flex flex-wrap justify-between mb-12">
          <div className="font-medium text-base">
            {(companies && companies?.length) || 0} Company Available for Now
          </div>
          <div>
            <Link
              to="/company/create"
              className="px-5 py-2 rounded-[3px] text-white bg-[#6D28D9] transition hover:bg-[#7f39f0]"
            >
              Add Company
            </Link>
          </div>
        </div>

        <div>
          <table className="w-full h-auto">
            {!isError && (
              <thead className="border-b border-slate-200 text-left">
                <tr>
                  <th className="pb-2 text-base text-center">SL</th>
                  <th className="pb-2 text-base pl-10">Company Name</th>
                  <th className="pb-2 text-base text-center">Email</th>
                  <th className="pb-2 text-base text-center">Status</th>
                  <th className="pb-2 text-base text-center">View</th>
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

export default CompanyList;
