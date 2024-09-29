import React from "react";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import SettingCardFooter from "./SettingCardFooter";
import InputTitle from "./InputTitle";
import BrandInput from "./BrandInput";
import TextEditor from "./TextEditor";
const SystemSettings = () => {
  return (
    <BrandCardWrapper>
      <SettingCardHeader
        title="System Settings"
        subTitle="Edit your system settings"
      />

      <div className="px-6 py-4">
        {/* input row  */}
        <div className="flex flex-wrap justify-between my-3">
          <div className="w-[49%]">
            <InputTitle title="Customer Prefix" />
            <BrandInput placeText="#CUST" />
          </div>
          <div className="w-[49%]">
            <InputTitle title="Vendor Prefix" />
            <BrandInput placeText="#VEND" />
          </div>
        </div>
        {/* input row  */}
        <div className="flex flex-wrap justify-between my-3">
          <div className="w-[49%]">
            <InputTitle title="Proposal Prefix" />
            <BrandInput placeText="#PROP" />
          </div>
          <div className="w-[49%]">
            <InputTitle title="Invoice Prefix" />
            <BrandInput placeText="#INVO" />
          </div>
        </div>

        {/* input row  */}
        <div className="flex flex-wrap justify-between my-3">
          <div className="w-[49%]">
            <InputTitle title="Bill Prefix" />
            <BrandInput placeText="#BILL" />
          </div>
          <div className="w-[49%]">
            <InputTitle title="Quotation Prefix" />
            <BrandInput placeText="#QUO" />
          </div>
        </div>

        {/* input row  */}
        <div className="flex flex-wrap justify-between my-3">
          <div className="w-[49%]">
            <InputTitle title="Purchase Prefix" />
            <BrandInput placeText="#PUR" />
          </div>
          <div className="w-[49%]">
            <InputTitle title="Pos Prefix" />
            <BrandInput placeText="#QUO" />
          </div>
        </div>

        {/* input row  */}
        <div className="flex flex-wrap justify-between my-3">
          <div className="w-[49%]">
            <InputTitle title="Journal Prefix" />
            <BrandInput placeText="#JUR" />
          </div>
          <div className="w-[49%]">
            <InputTitle title="Expense Prefix" />
            <BrandInput placeText="#EXP" />
          </div>
        </div>

        <div className=" my-3">
          <InputTitle title="Display Shipping in Proposal / Invoice / Bill" />

          <label className="inline-flex items-center cursor-pointer mt-1">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className=" my-3">
          <InputTitle title="Proposal/Invoice/Bill/Purchase/POS Footer Title" />
          <BrandInput />
        </div>
      </div>
      <TextEditor />
      <SettingCardFooter title="Save" />
    </BrandCardWrapper>
  );
};

export default SystemSettings;
