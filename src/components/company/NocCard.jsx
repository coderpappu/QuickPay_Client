import React from "react";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import SettingCardFooter from "./SettingCardFooter";
import TextBoxLetter from "./TextBoxLetter";
import TextEditor from "./TextEditor";

const NocCard = () => {
  return (
    <>
      <BrandCardWrapper>
        <SettingCardHeader
          title="Experience Letter Settings"
          subTitle="Edit your experience letter"
        />
        <div className="px-6 py-3">
          <h2 className="text-white my-2">Palceholder</h2>
          <div className=" bg-[#F3F4F6] dark:bg-dark-box p-3 rounded-md">
            <div className="w-full h-auto flex justify-between items-center">
              <TextBoxLetter title="Applicant Name" varName="applicant_name" />
              <TextBoxLetter title="Company Name" varName="company_name" />
              <TextBoxLetter title="Employee Name" varName="employee_name" />
            </div>
            <TextBoxLetter title="Designation" varName="designation" />
          </div>

          <TextEditor />
        </div>
        <SettingCardFooter title="Update" />
      </BrandCardWrapper>
    </>
  );
};

export default NocCard;
