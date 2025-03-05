import html2pdf from "html2pdf.js";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { TfiPrinter } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import "../../Applicaion.css";
import CompanyLogo from "../../assets/xceed-bangladesh-logo.png";
import {
  useGetCompanyIdQuery,
  useGetEmployeeDetailsQuery,
  useGetNocLetterFormatQuery,
} from "../../features/api";
import ListSkeleton from "../../skeletons/ListSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";
import todayDate from "../../utils/TodayDate";

function NOCLetter() {
  let { id } = useParams();

  // Fetching company ID
  const { data: company_id } = useGetCompanyIdQuery();

  const {
    data: employeeDetails,
    isLoading,
    isError,
  } = useGetEmployeeDetailsQuery(id);

  // Fetching leave application format
  const { data: NOCLetterFormat, isLoading: isFormatLoading } =
    useGetNocLetterFormatQuery(company_id);

  if (isLoading && isFormatLoading && !isError) return <ListSkeleton />;

  if (!NOCLetterFormat?.data?.formatData)
    return <ErrorMessage message="We have not found any certificate!" />;

  // Function to calculate time difference in hours and minutes

  const initialApplicationData = {
    company_name: employeeDetails?.data?.[0]?.company?.company_name || "",
    employee_name: employeeDetails?.data?.[0]?.name || "",
    date: todayDate() || "",

    designation:
      employeeDetails?.data?.[0]?.EmployeeDesignation?.[0]?.designation?.name ||
      "",
  };

  // Function to replace placeholders
  const replacePlaceholders = (text) => {
    const placeholderValues = {
      company_name: initialApplicationData?.company_name,
      employee_name: initialApplicationData?.employee_name,
      date: initialApplicationData?.date,

      designation: initialApplicationData?.designation,
    };
    return text.replace(
      /{(\w+)}/g,
      (match, placeholder) => placeholderValues[placeholder] || match,
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
        )),
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
        initialApplicationData?.employee_name + "-" + todayDate() + ".pdf",
    });
  };

  return (
    <div className="m-auto w-[1000px] text-white">
      <div className="flex justify-end">
        <button
          className="mb-2 flex items-center gap-2 rounded-sm bg-green-600 px-3 py-3"
          onClick={() => downloadBtn()}
        >
          {" "}
          <TfiPrinter />
          Download PDF
        </button>
      </div>
      <div
        id="container"
        className="h-auto rounded-sm bg-white p-8 text-black dark:bg-dark-box dark:text-white"
      >
        <div className="mb-8 flex items-center justify-between">
          <img src={CompanyLogo} alt="" className="h-auto w-[180px]" />
        </div>
        <div className="h-[820px]">
          {JSON.parse(NOCLetterFormat?.data?.formatData).root.children.map(
            (child, index) => renderElement(child, index),
          )}
        </div>

        <div className="flex gap-14">
          <div className="flex w-[170px] items-center justify-between">
            <div className="rounded-full bg-blue-500 p-2">
              <FiPhone color="white" />
            </div>{" "}
            <div className="text-sm">
              <p className="text-sm">+8801884-815992</p>
              <p className="text-sm">+8801884-815992</p>
            </div>
          </div>{" "}
          <div className="flex w-[180px] items-center justify-between">
            <div className="rounded-full bg-blue-500 p-2">
              <MdOutlineEmail color="white" />
            </div>{" "}
            <div className="text-sm">
              <p className="text-sm">info@xceedbd.com</p>
            </div>
          </div>
          <div className="mt-3 flex w-[210px] items-center justify-between">
            <div className="rounded-full bg-blue-500 p-2">
              <CiLocationOn color="white" />
            </div>{" "}
            <div>
              <p className="text-sm">Agrabad , Chittagong </p>
              <p className="text-sm">Bangladesh </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NOCLetter;
