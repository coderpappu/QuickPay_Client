import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import {
  useDeleteShiftMutation,
  useGetCompanyIdQuery,
  useGetShiftListQuery,
} from "../../../features/api";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import ErrorMessage from "../../../utils/ErrorMessage";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../company/SettingCardHeader";

import CardSkeleton from "../../../skeletons/card";
import formatTimeTo12Hour from "../../../utils/timeConverter";
import ShiftForm from "./ShiftForm";

const ShiftCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectShiftId, setSelectShiftId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectShiftId(id);
  };

  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteShift] = useDeleteShiftMutation();

  const {
    data: shiftList,
    isLoading,
    isError,
    error,
  } = useGetShiftListQuery(companyId);

  const handleDeleteShift = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteShift({ shiftId: id, company_Id: companyId }).then(
                  (res) => {
                    if (res.error != null) {
                      toast.error(res.error.data.message);
                    } else {
                      toast.success("Shift deleted successfully");
                    }
                  }
                );
              } catch (error) {
                toast.error(error.message || "Failed to delete shift");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Shift"
          />
        ),
        {
          duration: Infinity,
        }
      );

    confirm();
  };
  let content;

  if (isLoading && !isError) return <CardSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && shiftList?.data)
    content = shiftList?.data?.map((shift) => (
      <div
        key={shift?.id}
        className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
      >
        <div className="dark:text-white w-[20%]">
          <h3>{shift?.name}</h3>
        </div>
        <div className="dark:text-white w-[20%]">
          <h3>{formatTimeTo12Hour(shift?.start_time)}</h3>
        </div>
        <div className="dark:text-white w-[20%]">
          <h3>{formatTimeTo12Hour(shift?.end_time)}</h3>
        </div>
        <div className="dark:text-white w-[20%]">
          <h3>{formatTimeTo12Hour(shift?.late_time_count)}</h3>
        </div>

        <div className="dark:text-white w-[15%]">
          <div className="flex flex-wrap justify-start gap-2">
            {/* edit button  */}
            <div className="w-8 h-8 bg-indigo-600 rounded-sm p-2 flex justify-center items-center cursor-pointer">
              <CiEdit size={20} onClick={() => handleOpen(shift?.id)} />
            </div>

            {/* delete button  */}
            <div className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer">
              <AiOutlineDelete
                size={20}
                onClick={() => handleDeleteShift(shift?.id)}
              />
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Deduction"
          handleOpen={handleOpen}
          isPopupOpen={isPopupOpen}
        />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[20%]">
              <h3>Name</h3>
            </div>

            <div className="dark:text-white w-[20%]">
              <h3>Type</h3>
            </div>

            <div className="dark:text-white w-[20%]">
              <h3>Basic Percentage</h3>
            </div>

            <div className="dark:text-white w-[20%]">
              <h3>Limit Per Month</h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <h3>Action</h3>
            </div>
          </div>

          {/* body  */}
          {content}
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-dark-card  rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Shift
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <ShiftForm shiftId={selectShiftId} onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default ShiftCard;
