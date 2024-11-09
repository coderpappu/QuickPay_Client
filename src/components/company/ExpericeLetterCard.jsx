import React, { useState } from "react";
import {
  useCreateExperienceCertificateFormatMutation,
  useGetCompanyIdQuery,
} from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import TextBoxLetter from "./TextBoxLetter";
import TextEditor from "./TextEditor";

const ExperienceLetterCard = () => {
  const [editorState, setEditorState] = useState(null); // Store the editor's state
  const [isSaving, setIsSaving] = useState(false); // Track saving status
  const [error, setError] = useState(null); // Store potential errors
  const { data: company_id } = useGetCompanyIdQuery();

  const [editorData, setEditorData] = useState(null); // Store the editor's state data
  const [createExperienceCertificate] =
    useCreateExperienceCertificateFormatMutation();

  // Define handleEditorData as a function that accepts editor state data
  const handleEditorData = (data) => {
    // Set the received data from the editor
    createExperienceCertificate({ formatData: data, company_id });
    setEditorData(data);
  };

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
          </div>
          <TextEditor checkSave={handleEditorData} />
        </div>
      </BrandCardWrapper>
    </>
  );
};

export default ExperienceLetterCard;
