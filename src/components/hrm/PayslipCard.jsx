import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import BrandCardWrapper from "../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../company/SettingCardHeader";

const PaySlipCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const onClose = () => {
    setIsPopupOpen(false);
  };
  const handleOpen = () => {
    setIsPopupOpen(true);
  };

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Loan "
          handleOpen={handleOpen}
          isPopupOpen={isPopupOpen}
        />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[85%] dark:text-white">
              <h3>Name</h3>
            </div>

            <div className="w-[15%] dark:text-white">
              <h3>Action</h3>
            </div>
          </div>

          {/* body  */}
          <div className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10">
            <div className="w-[85%] dark:text-white">
              <h3>Payslip Type</h3>
            </div>

            <div className="w-[15%] dark:text-white">
              <div className="flex flex-wrap justify-start gap-2">
                {/* edit button  */}
                <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-600 p-2">
                  <CiEdit size={20} />
                </div>

                {/* delete button  */}
                <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center">
                  <AiOutlineDelete size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="text-lg font-medium text-gray-800">
                  Allowance List
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <AllowanceForm onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default PaySlipCard;
