import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useCreateLeaveApplicationFormatMutation,
  useGetLeaveApplicationFormatQuery,
} from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import TextBoxLetter from "./TextBoxLetter";
import TextEditor from "./TextEditor";

const LeaveApplicationCard = () => {
  const [editorState, setEditorState] = useState(null); // Store the editor's state
  const [isSaving, setIsSaving] = useState(false); // Track saving status
  const [error, setError] = useState(null); // Store potential errors

  const companyId = useSelector((state) => state.company.companyId);

  const [editorData, setEditorData] = useState(null); // Store the editor's state data
  const [createLeaveAppliationFormat] =
    useCreateLeaveApplicationFormatMutation();

  const { data } = useGetLeaveApplicationFormatQuery(companyId);

  // Define handleEditorData as a function that accepts editor state data
  const handleEditorData = (data) => {
    try {
      const leaveApplication = createLeaveAppliationFormat({
        formatData: data,
        company_id: companyId,
      });
      toast.success(leaveApplication?.message);
    } catch (error) {
      toast.error(error.message);
    }
    setEditorData(data);
  };

  return (
    <>
      <BrandCardWrapper>
        <SettingCardHeader
          title="Leave Application Letter Settings"
          subTitle="Edit your joining letter"
        />
        <div className="px-6 py-3">
          <h2 className="my-2 text-white">Palceholder</h2>

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
        {/* <SettingCardFooter title="Update" handleUpdate={handleSave} /> */}
      </BrandCardWrapper>
    </>
  );
};

export default LeaveApplicationCard;
