import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  useGetCompanyIdQuery,
  useOfferLetterFormatMutation,
} from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import TextBoxLetter from "./TextBoxLetter";
import TextEditor from "./TextEditor";

const OfferLetterCard = () => {
  const [editorState, setEditorState] = useState(null); // Store the editor's state
  const [isSaving, setIsSaving] = useState(false); // Track saving status
  const [error, setError] = useState(null); // Store potential errors
  const { data: company_id } = useGetCompanyIdQuery();

  const [editorData, setEditorData] = useState(null); // Store the editor's state data
  const [createOfferLetterFormat] = useOfferLetterFormatMutation();

  // Define handleEditorData as a function that accepts editor state data
  const handleEditorData = async (data) => {
    try {
      const offerLetter = await createOfferLetterFormat({
        formatData: data,
        company_id,
      }).unwrap();

      toast.success(offerLetter?.message);
    } catch (error) {
      toast.error(error.message);
    }
    setEditorData(data);
  };

  return (
    <>
      <BrandCardWrapper>
        <SettingCardHeader
          title="Offer Letter Settings"
          subTitle="Edit your offer letter"
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

            <TextBoxLetter title="Number of Hours" varName="hours" />
          </div>

          <TextEditor checkSave={handleEditorData} />
        </div>
      </BrandCardWrapper>
    </>
  );
};

export default OfferLetterCard;
