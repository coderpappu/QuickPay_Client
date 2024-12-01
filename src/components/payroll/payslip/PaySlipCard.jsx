import React from "react";
import BrandCardWrapper from "../../company/BrandCardWrapper";

const PaySlipCard = () => {
  return (
    <div>
      <div className="w-full p-5 flex justify-end py-8 bg-dark-card rounded-md px-6">
        <div className="flex gap-2 flex-wrap items-center w-[50%] justify-end ">
          <select className="w-64 px-2 py-3 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-13 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color">
            <option value="">DEC</option>
          </select>

          <select className="w-64 px-3 py-3 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-13 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color">
            <option value="">2023 </option>
          </select>

          <button className="px-3 py-3 rounded-md bg-blue-500 text-white">
            Generate Payslip
          </button>
        </div>
      </div>

      <div className="my-3">
        <BrandCardWrapper>
          <div className="flex justify-between items-center border-b border-dark-box border-opacity-5 dark:border-dark-border-color dark:border-opacity-5 px-6 py-4">
            <div>
              <h3 className="text-base leading-6 dark:text-dark-heading-color">
                Employee Payslip
              </h3>
            </div>
            <div className="flex gap-2 flex-wrap items-center w-[51%] justify-end ">
              <select className="w-64 px-2 py-3 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-13 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color">
                <option value="">DEC</option>
              </select>

              <select className="w-64 px-3 py-3 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-13 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color">
                <option value="">2023 </option>
              </select>

              <button className="px-3 py-3 rounded-md bg-blue-500 text-white">
                Export
              </button>

              <button className="px-3 py-3 rounded-md bg-blue-500 text-white">
                Bulk Payment
              </button>
            </div>
          </div>
          <div className="px-6 py-3">
            {/* header  */}
            <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
              <div className="dark:text-white w-[10%]">
                <h3>Employee Id</h3>
              </div>

              <div className="dark:text-white w-[10%]">
                <h3>Name</h3>
              </div>

              <div className="dark:text-white w-[10%]">
                <h3>Payroll Type</h3>
              </div>

              <div className="dark:text-white w-[10%]">
                <h3>Salary</h3>
              </div>
              <div className="dark:text-white w-[10%]">
                <h3>Net Salary</h3>
              </div>
              <div className="dark:text-white w-[10%]">
                <h3>Status </h3>
              </div>
              <div className="dark:text-white w-[10%]">
                <h3>Action </h3>
              </div>
            </div>

            {/* body  */}
            {/* {content} */}
          </div>
        </BrandCardWrapper>
      </div>
    </div>
  );
};

export default PaySlipCard;
