import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { VscEye } from "react-icons/vsc";
import { Link } from "react-router-dom";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";

import {
  useDeleteCompanyMutation,
  useGetCompaniesQuery,
  useGetCompanyIdQuery,
  useSetCompanyIdMutation,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import CardSkeleton from "../../skeletons/card";
import ListSkeleton from "../../skeletons/ListSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";

const CompanyList = () => {
  const [deleteCompany] = useDeleteCompanyMutation();
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [leaveTypeId, setleaveTypeId] = useState(null);

  const handleOpen = (id) => {
    setIsPopupOpen(true);
    setleaveTypeId(id);
  };

  const { data: companyId } = useGetCompanyIdQuery();

  const {
    data: companyData,
    isLoading,
    isError,
    error,
  } = useGetCompaniesQuery();
  const [setCompanyId] = useSetCompanyIdMutation();

  // Effect to set company ID from local storage on component mount
  useEffect(() => {
    const storedCompanyId = localStorage.getItem("companyId");
    if (storedCompanyId) {
      setCompanyId(storedCompanyId)
        .unwrap()
        .catch((error) => {
          console.error("Failed to set company ID:", error);
        });
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

  // Render loading or error states
  if (isLoading) return <CardSkeleton />;
  if (isError) return <div>Error: {error.message}</div>;
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

  if (!isLoading && !isError) {
    content = (
      <>
        {companyData?.data?.map((company, index) => (
          <>
            <div
              key={company?.id}
              className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
            >
              <div className="dark:text-white w-[5%]">
                <h3>{++index}</h3>
              </div>

              <div className="dark:text-white w-[15%]">
                <h3>{company?.company_name}</h3>
              </div>

              <div className="dark:text-white w-[13%]">
                <h3>{company?.phone_number}</h3>
              </div>
              <div className="dark:text-white w-[13%]">
                <h3>{company?.company_registration_no}</h3>
              </div>
              <div className="dark:text-white w-[13%]">
                <h3>{company?.country}</h3>
              </div>
              <div className="dark:text-white w-[13%]">
                <h3>{company?.city}</h3>
              </div>
              <div className="dark:text-white w-[10%]">
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
              </div>
              <div className="dark:text-white w-[10%]">
                <div className="flex flex-wrap justify-start gap-2">
                  {/* edit button  */}
                  <div className="w-8 h-8 bg-orange-400 rounded-sm p-2 flex justify-center items-center cursor-pointer">
                    <Link to={`/company/details/${company.id}`}>
                      <VscEye size={20} />
                    </Link>
                  </div>

                  <div className="w-8 h-8 bg-green-400 rounded-sm p-2 flex justify-center items-center cursor-pointer">
                    <Link to={`/company/update/${company.id}`}>
                      <CiEdit size={20} />
                    </Link>
                  </div>

                  {/* delete button  */}
                  <div
                    onClick={() => handleDeleteCompany(company?.id)}
                    className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer"
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
        <div className="flex justify-between items-center border-b border-dark-box border-opacity-5 dark:border-dark-border-color dark:border-opacity-5 px-6 py-4">
          <div>
            <h3 className="text-base leading-6 dark:text-dark-heading-color">
              Company List
            </h3>
            {/* <p className="text-xs text-light-text-color">{subTitle}</p> */}
          </div>

          <div
            className="w-8 h-8 bg-green-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer"
            onClick={() => handleOpen()}
          >
            <Link to="/company/create">
              <IoAdd color="#fff" />
            </Link>
          </div>
        </div>
        <div className="px-6 py-3">
          {/* header  */}
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[5%]">
              <h3>SL</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Name</h3>
            </div>
            <div className="dark:text-white w-[13%]">
              <h3>Phone</h3>
            </div>

            <div className="dark:text-white w-[13%]">
              <h3>Reg. No</h3>
            </div>

            <div className="dark:text-white w-[13%]">
              <h3>Country</h3>
            </div>
            <div className="dark:text-white w-[13%]">
              <h3>City</h3>
            </div>

            <div className="dark:text-white w-[10%]">
              <h3>Status</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Action</h3>
            </div>
          </div>

          {/* body  */}
          {content}
        </div>
      </BrandCardWrapper>
    </>
  );
};

export default CompanyList;
