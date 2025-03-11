import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useCreateNocLetterFormatMutation,
  useGetNocLetterFormatQuery,
} from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import TextBoxLetter from "./TextBoxLetter";
import TextEditor from "./TextEditor";
const NocCard = () => {
  const [editorState, setEditorState] = useState(null); // Store the editor's state
  const [isSaving, setIsSaving] = useState(false); // Track saving status
  const [error, setError] = useState(null); // Store potential errors
  const company_id = useSelector((state) => state.company.companyId);

  const [editorData, setEditorData] = useState(null); // Store the editor's state data
  const [createNocLetter] = useCreateNocLetterFormatMutation();
  const { data } = useGetNocLetterFormatQuery(company_id);

  // Define handleEditorData as a function that accepts editor state data
  const handleEditorData = async (data) => {
    // Set the received data from the editor
    try {
      const nocLetter = await createNocLetter({
        formatData: data,
        company_id,
      }).unwrap();
      toast.success(nocLetter?.message);
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
              <TextBoxLetter title="Applicant Name" varName="applicant_name" />
              <TextBoxLetter title="Company Name" varName="company_name" />
              <TextBoxLetter title="Employee Name" varName="employee_name" />
            </div>
            <TextBoxLetter title="Designation" varName="designation" />
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

export default NocCard;
