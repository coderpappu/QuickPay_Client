import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useCreateExperienceCertificateFormatMutation,
  useGetExperienceCertificateFormatQuery,
} from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import TextBoxLetter from "./TextBoxLetter";
import TextEditor from "./TextEditor";
const ExperienceCertificate = () => {
  const [editorState, setEditorState] = useState(null); // Store the editor's state
  const [isSaving, setIsSaving] = useState(false); // Track saving status
  const [error, setError] = useState(null); // Store potential errors
  const company_id = useSelector((state) => state.company.companyId);

  const [editorData, setEditorData] = useState(null); // Store the editor's state data
  const [createExperienceCertificate] =
    useCreateExperienceCertificateFormatMutation();

  const { data: emperienceData } =
    useGetExperienceCertificateFormatQuery(company_id);

  // Define handleEditorData as a function that accepts editor state data
  const handleEditorData = async (data) => {
    // Set the received data from the editor
    try {
      let ExperienceCertificate = await createExperienceCertificate({
        formatData: data,
        company_id,
      }).unwrap();

      toast.success(ExperienceCertificate?.message);
    } catch (error) {
      toast.error(error.message);
    }
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
          <h2 className="my-2 text-white">Palceholder</h2>
          <div className="rounded-md bg-[#F3F4F6] p-3 dark:bg-dark-box">
            <div className="flex h-auto w-full items-center justify-between">
              <TextBoxLetter title="Company Name" varName="company_name" />
              <TextBoxLetter title="Employee Name" varName="employee_name" />
              <TextBoxLetter title="Date of issueance" varName="date" />
            </div>
            <div className="flex h-auto w-full items-center justify-between">
              <TextBoxLetter title="Branch" varName="branch" />
              <TextBoxLetter title="Designation" varName="designation" />
              <TextBoxLetter title="Start Date" varName="start_date" />
            </div>
            <div className="flex h-auto w-full items-center justify-between">
              <TextBoxLetter title="Number of Hours" varName="total_hours" />
              <TextBoxLetter title="Start Time" varName="start_time" />
              <TextBoxLetter title="End Time" varName="end_time" />
            </div>
          </div>
          <TextEditor
            checkSave={handleEditorData}
            initialJSON={emperienceData?.data?.formatData}
          />
        </div>
      </BrandCardWrapper>
    </>
  );
};

export default ExperienceCertificate;
