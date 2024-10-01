import React from "react";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import SettingCardFooter from "./SettingCardFooter";
import TextBoxLetter from "./TextBoxLetter";
import TextEditor from "./TextEditor";

const JoiningLetterCard = () => {
  return (
    <>
      <BrandCardWrapper>
        <SettingCardHeader
          title="Payment Settings"
          subTitle="Edit your payment details"
        />
        <div className="px-6 py-3">
          <div className=" bg-dark-box p-3">
            <div className="w-full h-auto flex justify-between items-center">
              <TextBoxLetter title="Applicant Name" varName="applicant_name" />
              <TextBoxLetter title="Company Name" varName="company_name" />
              <TextBoxLetter title="Employee Name" varName="employee_name" />
            </div>
            <div className="w-full h-auto  flex justify-between items-center">
              <TextBoxLetter title="Address" varName="address" />
              <TextBoxLetter title="Designation" varName="designation" />
              <TextBoxLetter title="Start Date" varName="start_date" />
            </div>
            <div className="w-full h-auto  flex justify-between items-center">
              <TextBoxLetter title="Branch" varName="branch" />
              <TextBoxLetter title="Start Time" varName="start_time" />
              <TextBoxLetter title="End Time" varName="end_time" />
            </div>

            <TextBoxLetter title="Number of Hours" varName="hours" />
          </div>

          <TextEditor />
        </div>
        <SettingCardFooter title="Save" />
      </BrandCardWrapper>
    </>
  );
};

export default JoiningLetterCard;
