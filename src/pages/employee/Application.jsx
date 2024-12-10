import html2pdf from "html2pdf.js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Preview, print } from "react-html2pdf";
import { CiLocationOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { TfiPrinter } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import "../../Applicaion.css";
import CompanyLogo from "../../assets/xceed-bangladesh-logo.png";
import {
  useGetCompanyIdQuery,
  useGetLeaveApplicationDetailsQuery,
  useGetLeaveApplicationFormatQuery,
} from "../../features/api";
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
    createDate: "",
    // leave_date: "",
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
        toast.alert("Error parsing the letter data: ", error);
      }
    } else if (!isLoading && !leaveApplicationFormat?.data?.formatData) {
      toast.alert("Error: Unable to load leave application format data");
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

      leave_days: applicationDetails?.data?.leave_days,
      leave_reason: applicationDetails?.data?.reason,
      designation:
        applicationDetails?.data?.Employee?.EmployeeDesignation?.[0]
          ?.designation?.name,
      department:
        applicationDetails?.data?.Employee?.EmployeeDepartment?.[0]?.department
          ?.name,
      leave_type: applicationDetails?.data?.LeaveType?.name,
      createDate: applicationDetails?.data?.created_at,
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
      name: applicationData?.name,
      mail: applicationData?.mail,
      start_date: DatePicker(applicationData?.start_date),
      leave_type: applicationData?.leave_type,
      leave_reason: applicationData?.leave_reason,
      end_date: DatePicker(applicationData?.end_date),
      designation: applicationData?.designation,
      department: applicationData?.department,
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
        child.children.map((text, textIndex) => (
          <span
            key={textIndex}
            style={{
              fontWeight: text.format === 1 ? "bold" : "normal",
              fontStyle: text.format === 2 ? "italic" : "normal",
            }}
          >
            {replacePlaceholders(text.text)}
          </span>
        ))
      );
    } else if (child.type === "paragraph") {
      // Check if paragraph is empty
      if (!child.children || child.children.length === 0) {
        return <br key={index} />; // Render line break for empty paragraph
      }
      return (
        <p key={index}>
          {child.children.map((text, textIndex) => (
            <span
              key={textIndex}
              style={{
                fontWeight: text.format === 1 ? "bold" : "normal",
                fontStyle: text.format === 2 ? "italic" : "normal",
              }}
            >
              {replacePlaceholders(text.text)}
            </span>
          ))}
        </p>
      );
    }
  };

  // Function to handle PDF download
  const downloadBtn = () => {
    var element = document.getElementById("container");
    html2pdf(element, {
      margin: 10,
      filename:
        applicationDetails?.data?.Employee?.name +
        "-" +
        DatePicker(applicationData?.createDate) +
        ".pdf",
    });
  };

  return (
    <div className="text-white w-[1000px] m-auto">
      <div className="flex justify-end">
        <button
          className="bg-green-600 px-3 py-3 rounded-sm mb-2 flex  gap-2 items-center"
          onClick={() => print("a", "jsx-template")}
        >
          {" "}
          <TfiPrinter />
          Download PDF
        </button>
      </div>
      <Preview id={"jsx-template"}>
        <div
          id="container"
          className="dark:bg-dark-box dark:text-white text-black p-8 rounded-sm  h-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <img src={CompanyLogo} alt="" className="w-[180px] h-auto" />
          </div>
          {letterData.root.children.map((child, index) =>
            renderElement(child, index)
          )}

          <div className="mt-[250px] flex  gap-14  ">
            <div className="flex justify-between items-center w-[170px]">
              <div className="p-2 rounded-full bg-blue-500">
                <FiPhone color="white" />
              </div>{" "}
              <div className="text-sm">
                <p className="text-sm">+8801884-815992</p>
                <p className="text-sm">+8801884-815992</p>
              </div>
            </div>{" "}
            <div className="flex justify-between items-center w-[180px]">
              <div className="p-2 rounded-full bg-blue-500">
                <MdOutlineEmail color="white" />
              </div>{" "}
              <div className="text-sm">
                <p className="text-sm">info@xceedbd.com</p>
              </div>
            </div>
            <div className="flex justify-between items-center w-[210px] mt-3">
              <div className="p-2 rounded-full bg-blue-500">
                <CiLocationOn color="white" />
              </div>{" "}
              <div>
                <p className="text-sm">Agrabad , Chittagong </p>
                <p className="text-sm">Bangladesh </p>
              </div>
            </div>
          </div>
        </div>
      </Preview>
    </div>
  );
}

export default Application;
