import React from "react";
import BrandCardWrapper from "../company/BrandCardWrapper";
import SettingCardHeader, {
  HrmSetupCardHeader,
} from "../company/SettingCardHeader";
import SettingCardFooter from "../company/SettingCardFooter";
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import AllowanceForm from "./AllowanceForm";

const AllowanceCard = () => {
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
          title="Allowance"
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
          <div className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10">
            <div className="dark:text-white w-[20%]">
              <h3>Home </h3>
            </div>
            <div className="dark:text-white w-[20%]">
              <h3>Percentage</h3>
            </div>
            <div className="dark:text-white w-[20%]">
              <h3>20</h3>
            </div>
            <div className="dark:text-white w-[20%]">
              <h3>2000</h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <div className="flex flex-wrap justify-start gap-2">
                {/* edit button  */}
                <div className="w-8 h-8 bg-indigo-600 rounded-sm p-2 flex justify-center items-center cursor-pointer">
                  <CiEdit size={20} />
                </div>

                {/* delete button  */}
                <div className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer">
                  <AiOutlineDelete size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
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

export default AllowanceCard;
