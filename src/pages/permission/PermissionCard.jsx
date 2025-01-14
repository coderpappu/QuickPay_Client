import React, { useState } from "react";
import toast from "react-hot-toast";

import BrandCardWrapper from "../../components/company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../components/company/SettingCardHeader";
import { useGetCompanyIdQuery } from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import PermissionForm from "./PermissionForm";

const PermissionCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectAllowanceId, setSelectAllowanceId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectAllowanceId(id);
  };

  const { data: companyId } = useGetCompanyIdQuery();

  //   const [deleteAllowanceType] = useDeleteAllowanceTypeMutation();

  //   const {
  //     data: allowanceTypeList,
  //     isLoading,
  //     isError,
  //     error,
  //   } = useGetAllowanceTypeListQuery(companyId);

  const handleDeleteAllowance = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                // deleteAllowanceType(id).then((res) => {
                //   if (res.error != null) {
                //     toast.error(res.error.data.message);
                //   } else {
                //     toast.success("Allowance deleted successfully");
                //   }
                // });
              } catch (error) {
                toast.error(error.message || "Failed to delete allowance");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Allowance"
          />
        ),
        {
          duration: Infinity,
        },
      );

    confirm();
  };
  let content;

  //   if (isLoading && !isError) return <CardSkeleton />;
  //   if (!isLoading && isError)
  //     content = <ErrorMessage message={error?.data?.message} />;

  //   if (!isLoading && !isError && allowanceTypeList?.data)
  // content = allowanceTypeList?.data?.map((type) => (
  //   <div
  //     key={type?.id}
  //     className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
  //   >
  //     <div className="w-[20%] dark:text-white">
  //       <h3>{type?.name} </h3>
  //     </div>

  //     <div className="w-[15%] dark:text-white">
  //       <div className="flex flex-wrap justify-start gap-2">
  //         {/* edit button  */}
  //         <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-600 p-2">
  //           <CiEdit size={20} onClick={() => handleOpen(type?.id)} />
  //         </div>

  //         {/* delete button  */}
  //         <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center">
  //           <AiOutlineDelete
  //             size={20}
  //             onClick={() => handleDeleteAllowance(type?.id)}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // ));

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Permission Manager"
          handleOpen={handleOpen}
          isPopupOpen={isPopupOpen}
        />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[20%] dark:text-white">
              <h3>Module Name</h3>
            </div>
            <div className="w-[20%] dark:text-white">
              <h3>Slug</h3>
            </div>

            <div className="w-[20%] dark:text-white">
              <h3>Parent</h3>
            </div>

            <div className="w-[15%] dark:text-white">
              <h3>Action</h3>
            </div>
          </div>

          {/* body  */}
          {content}
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-dark-card">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Permission
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <PermissionForm typeId={selectAllowanceId} onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default PermissionCard;
