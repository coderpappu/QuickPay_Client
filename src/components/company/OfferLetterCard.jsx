import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useGetOfferLetterFormatQuery,
  useOfferLetterFormatMutation,
} from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import TextBoxLetter from "./TextBoxLetter";
import TextEditor from "./TextEditor";
const convertToInitialJSON = (data) => {
  // Ensure the data structure matches initialJSON
  if (!data || typeof data !== "object") {
    return {
      root: {
        children: [],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    };
  }

  return {
    root: {
      children: data.root.children || [],
      direction: data.root.direction || "ltr",
      format: data.root.format || "",
      indent: data.root.indent || 0,
      type: data.root.type || "root",
      version: data.root.version || 1,
    },
  };
};

const OfferLetterCard = () => {
  const [editorState, setEditorState] = useState(null); // Store the editor's state
  const [isSaving, setIsSaving] = useState(false); // Track saving status
  const [error, setError] = useState(null); // Store potential errors
  const company_id = useSelector((state) => state.company.companyId);
  const [editorData, setEditorData] = useState(null); // Store the editor's state data
  const [createOfferLetterFormat] = useOfferLetterFormatMutation();

  const { data, isLoading } = useGetOfferLetterFormatQuery(company_id);

  if (isLoading) return "Loading...";

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
          <h2 className="my-2 text-white">Placeholder</h2>
          <div className="rounded-md bg-[#F3F4F6] p-3 dark:bg-dark-box">
            <div className="flex h-auto w-full items-center justify-between">
              <TextBoxLetter title="Applicant Name" varName="applicant_name" />
              <TextBoxLetter title="Company Name" varName="company_name" />
              <TextBoxLetter title="Employee Name" varName="employee_name" />
            </div>
            <div className="flex h-auto w-full items-center justify-between">
              <TextBoxLetter title="Address" varName="address" />
              <TextBoxLetter title="Designation" varName="designation" />
              <TextBoxLetter title="Start Date" varName="start_date" />
            </div>
            <div className="flex h-auto w-full items-center justify-between">
              <TextBoxLetter title="Branch" varName="branch" />
              <TextBoxLetter title="Start Time" varName="start_time" />
              <TextBoxLetter title="End Time" varName="end_time" />
            </div>

            <TextBoxLetter title="Number of Hours" varName="hours" />
          </div>

          <TextEditor
            checkSave={handleEditorData}
            initialJSON={data?.data?.formatData}
          />
        </div>
      </BrandCardWrapper>
    </>
  );
};

export default OfferLetterCard;
