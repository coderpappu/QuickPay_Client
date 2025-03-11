import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { VscEye } from "react-icons/vsc";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";

import {
  useCreateActiveCompanyMutation,
  useDeleteCompanyMutation,
  useGetActiveCompanyQuery,
  useGetCompaniesQuery,
  useGetUserQuery,
} from "../../features/api";

import { removeCompanyId, setCompanyId } from "../../features/companySlice";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";

const CompanyList = () => {
  const dispatch = useDispatch();

  const [deleteCompany] = useDeleteCompanyMutation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [leaveTypeId, setleaveTypeId] = useState(null);

  const [addActiveCompany] = useCreateActiveCompanyMutation();

  const { data: userData } = useGetUserQuery();

  const { data: activeCompanyId, refetch: refetchActiveCompany } =
    useGetActiveCompanyQuery();

  const companyId = activeCompanyId?.data?.company_id;

  const handleOpen = (id) => {
    setIsPopupOpen(true);
    setleaveTypeId(id);
  };

  const {
    data: companyData,
    isLoading,
    isError,
    error,
  } = useGetCompaniesQuery(userData?.data?.id);

  // Effect to set company ID from local storage on component mount
  useEffect(() => {
    if (companyId) {
      dispatch(setCompanyId(companyId)); // Dispatch action to set company ID in the store
    }
  }, [companyId, dispatch]);

  const handleToggleActive = async (id) => {
    try {
      if (companyId === id) {
        await addActiveCompany({ company_id: id }).unwrap();
        dispatch(removeCompanyId());
        toast.success("Company deactivated successfully");
      } else {
        await addActiveCompany({ company_id: id }).unwrap();
        dispatch(setCompanyId(id));
        toast.success("Company activated successfully");
      }
      refetchActiveCompany(); // Refetch the active company data
    } catch (error) {
      toast.error("Failed to toggle company status");
    }
  };

  // Render loading or error states

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
                      setCompanyLocalActive(0);
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
        },
      );

    confirm();
  };
  let content;
  let companies;

  if (isLoading && !isError) return <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError) {
    content = (
      <>
        {companyData?.data?.map((company, index) => (
          <>
            <div
              key={company?.id}
              className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
            >
              <div className="w-[5%] dark:text-white">
                <h3>{++index}</h3>
              </div>

              <div className="w-[15%] dark:text-white">
                <h3>{company?.company_name}</h3>
              </div>

              <div className="w-[13%] dark:text-white">
                <h3>{company?.phone_number}</h3>
              </div>
              <div className="w-[13%] dark:text-white">
                <h3>{company?.company_registration_no}</h3>
              </div>
              <div className="w-[13%] dark:text-white">
                <h3>{company?.country}</h3>
              </div>
              <div className="w-[13%] dark:text-white">
                <h3>{company?.city}</h3>
              </div>
              <div className="w-[10%] dark:text-white">
                <button
                  className={`w-28 rounded px-3 py-1 text-sm font-bold text-white ${companyId === company.id ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                  onClick={() => handleToggleActive(company.id)}
                >
                  {companyId === company.id ? "Deactivate" : "Activate"}
                </button>
              </div>
              <div className="w-[10%] dark:text-white">
                <div className="flex flex-wrap justify-start gap-2">
                  {/* edit button  */}
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-orange-400 p-2">
                    <Link to={`/company/details/${company.id}`}>
                      <VscEye size={20} />
                    </Link>
                  </div>

                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-green-400 p-2">
                    <Link to={`/company/update/${company.id}`}>
                      <CiEdit size={20} />
                    </Link>
                  </div>

                  {/* delete button  */}
                  <div
                    onClick={() => handleDeleteCompany(company?.id)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center"
                  >
                    <AiOutlineDelete size={20} />
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </>
    );
  }
  return (
    <>
      <BrandCardWrapper>
        <div className="flex items-center justify-between border-b border-dark-box border-opacity-5 px-6 py-4 dark:border-dark-border-color dark:border-opacity-5">
          <div>
            <h3 className="text-base leading-6 dark:text-dark-heading-color">
              Company List
            </h3>
            {/* <p className="text-xs text-light-text-color">{subTitle}</p> */}
          </div>

          <div
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-green-500 p-2 text-center"
            onClick={() => handleOpen()}
          >
            <Link to="/company/create">
              <IoAdd color="#fff" />
            </Link>
          </div>
        </div>
        <div className="px-6 py-3">
          {/* header  */}
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[5%] dark:text-white">
              <h3>SL</h3>
            </div>
            <div className="w-[15%] dark:text-white">
              <h3>Name</h3>
            </div>
            <div className="w-[13%] dark:text-white">
              <h3>Phone</h3>
            </div>

            <div className="w-[13%] dark:text-white">
              <h3>Reg. No</h3>
            </div>

            <div className="w-[13%] dark:text-white">
              <h3>Country</h3>
            </div>
            <div className="w-[13%] dark:text-white">
              <h3>City</h3>
            </div>

            <div className="w-[10%] dark:text-white">
              <h3>Status</h3>
            </div>
            <div className="w-[10%] dark:text-white">
              <h3>Action</h3>
            </div>
          </div>

          {/* body  */}
          <div>{content}</div>
        </div>
      </BrandCardWrapper>
    </>
  );
};

export default CompanyList;
