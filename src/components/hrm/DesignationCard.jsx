import React from "react";
import BrandCardWrapper from "../company/BrandCardWrapper";
import SettingCardHeader, {
  HrmSetupCardHeader,
} from "../company/SettingCardHeader";
import SettingCardFooter from "../company/SettingCardFooter";
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
const DesignationCard = () => {
  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader title="Department" />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[35%]">
              <h3>Department</h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <h3>Actions</h3>
            </div>
          </div>

          {/* body  */}
          <div className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10">
            <div className="dark:text-white w-[35%]">
              <h3>Software Engineer</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <div className="flex flex-wrap justify-start gap-2">
                {/* edit button  */}
                <div className="w-8 h-8 bg-indigo-700 rounded-sm p-2 flex justify-center items-center cursor-pointer">
                  <CiEdit size={20} />
                </div>

                {/* delete button  */}
                <div className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer">
                  <AiOutlineDelete size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-between text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10">
            <div className="dark:text-white w-[35%]">
              <h3>Front-End Developer </h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <div className="flex flex-wrap justify-start gap-2">
                {/* edit button  */}
                <div className="w-8 h-8 bg-indigo-700 rounded-sm p-2 flex justify-center items-center cursor-pointer">
                  <CiEdit size={20} />
                </div>

                {/* delete button  */}
                <div className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer">
                  <AiOutlineDelete size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-between text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10">
            <div className="dark:text-white w-[35%]">
              <h3>Back-End Developer </h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <div className="flex flex-wrap justify-start gap-2">
                {/* edit button  */}
                <div className="w-8 h-8 bg-indigo-700 rounded-sm p-2 flex justify-center items-center cursor-pointer">
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
      </BrandCardWrapper>
    </>
  );
};

export default DesignationCard;
