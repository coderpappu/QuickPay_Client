import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import {
  useGetCompanyIdQuery,
  useGetLeaveApplicationDetailsQuery,
  useGetLeaveApplicationFormatQuery,
} from "../../features/api";
import { useParams } from "react-router-dom";
import formatTimeTo12Hour from "../../utils/timeConverter";
import DatePicker from "../../utils/DatePicker";
function Application() {
  const [letterData, setLetterData] = useState(null);
  const [date, setDate] = useState("10");
  const [name, setEmployeeName] = useState("John Doe");
  const [start_date, setStart_date] = useState("John Doe");
  const [address, setAddress] = useState("Raozan");
  const [appName, setAppName] = useState("My Company");
  let { id } = useParams();

  const [applicationData, setApplicationData] = useState({
    name: "",
    mail: "",
    department: "",
    designation: "",
    start_date: "",
    end_date: "",
    leave_type: "",
    leave_days: "",
    leave_reason: "",
    leave_date: "",
  });

  // Fetching company ID
  const { data: company_id } = useGetCompanyIdQuery();
  const { data: applicationDetails } = useGetLeaveApplicationDetailsQuery(id);

  // Fetching leave application format
  const { data: leaveApplicationFormat, isLoading } =
    useGetLeaveApplicationFormatQuery(company_id);

  // application format load
  useEffect(() => {
    if (!isLoading && leaveApplicationFormat?.data?.formatData) {
      try {
        const parsedData = JSON.parse(leaveApplicationFormat?.data?.formatData);
        setLetterData(parsedData);
      } catch (error) {
        console.error("Error parsing the letter data: ", error);
      }
    } else if (!isLoading && !leaveApplicationFormat?.data?.formatData) {
      console.error("Leave application format data is undefined or empty");
    }
  }, [isLoading, leaveApplicationFormat]);

  // set the data in state
  useEffect(() => {
    setApplicationData((prevData) => ({
      ...prevData,
      name: applicationDetails?.data?.Employee?.name,
      mail: applicationDetails?.data?.Employee?.email,
      start_date: applicationDetails?.data?.start_date,
      end_date: applicationDetails?.data?.end_date,
    }));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!letterData) {
    return <div>Error: Unable to load leave application format data</div>;
  }

  // Function to replace placeholders
  const replacePlaceholders = (text) => {
    const placeholderValues = {
      date,
      name: applicationData?.name,
      days_of_week: applicationData?.mail,
      address,
      start_date: DatePicker(applicationData?.start_date),
      end_date: DatePicker(applicationData?.end_date),
    };
    return text.replace(
      /{(\w+)}/g,
      (match, placeholder) => placeholderValues[placeholder] || match
    );
  };

  // Function to render elements (headings, paragraphs, etc.)
  const renderElement = (child, index) => {
    if (child.type === "heading") {
      const TagName = child.tag.toLowerCase();
      return React.createElement(
        TagName,
        { key: index },
        child.children.map((text) => replacePlaceholders(text.text))
      );
    } else if (child.type === "paragraph") {
      return (
        <p key={index}>
          {child.children.map((text) => replacePlaceholders(text.text))}
        </p>
      );
    }
  };

  // Function to handle PDF download
  const downloadBtn = () => {
    var element = document.getElementById("container");
    html2pdf(element, {
      margin: 10,
    });
  };

  return (
    <div className="text-white">
      <button onClick={() => downloadBtn()}>Download PDF</button>
      <div id="container">
        {letterData.root.children.map((child, index) =>
          renderElement(child, index)
        )}
      </div>
    </div>
  );
}

export default Application;
