import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useDeleteBonusTypeMutation,
  useGetBonusTypeListQuery,
} from "../../../features/api";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import BrandCardWrapper from "../../company/BrandCardWrapper";

const PolicyCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectBonusTypeId, setSelectBonusTypeId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectBonusTypeId(id);
  };

  const companyId = useSelector((state) => state.company.companyId);
  const [deleteBonusType] = useDeleteBonusTypeMutation();

  const {
    data: bonusTypeList,
    isLoading,
    isError,
    error,
  } = useGetBonusTypeListQuery(companyId);

  const handleDeleteBonusType = async (bonusTypeId) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.bonusTypeId);
              try {
                deleteBonusType(bonusTypeId).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Bonus type deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete bonus type");
              }
            }}
            onCancel={() => toast.dismiss(t.bonusTypeId)}
            title="bonus type"
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

  //   if (!isLoading && !isError && bonusTypeList?.data)
  //     content = bonusTypeList?.data?.map((bonusType) => (
  //       <div
  //         key={bonusType?.id}
  //         className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
  //       >
  //         <div className="w-[20%] dark:text-white">
  //           <h3>{bonusType?.title}</h3>
  //         </div>
  //         <div className="w-[20%] dark:text-white">
  //           <h3>{bonusType?.religion}</h3>
  //         </div>

  //         <div className="w-[15%] dark:text-white">
  //           <div className="flex flex-wrap justify-start gap-2">
  //             {/* edit button  */}
  //             <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-600 p-2">
  //               <CiEdit size={20} onClick={() => handleOpen(bonusType?.id)} />
  //             </div>

  //             {/* delete button  */}
  //             <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center">
  //               <AiOutlineDelete
  //                 size={20}
  //                 onClick={() => handleDeleteBonusType(bonusType?.id)}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     ));

  return (
    <>
      <BrandCardWrapper>
        <div className="flex items-center justify-between border-b border-dark-box border-opacity-5 px-6 py-4 dark:border-dark-border-color dark:border-opacity-5">
          <div>
            <h3 className="text-base leading-6 dark:text-dark-heading-color">
              Policy
            </h3>
          </div>
        </div>

        <div className="px-6 py-3">
          {/* header  */}
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[20%] dark:text-white">
              <h3>Name</h3>
            </div>

            <div className="w-[20%] dark:text-white">
              <h3>Status</h3>
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
                  Bonus Type List
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                {/* <BonusTypeForm
                  bonusTypeId={selectBonusTypeId}
                  onClose={onClose}
                /> */}
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default PolicyCard;
