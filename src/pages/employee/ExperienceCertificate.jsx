import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef, useState } from "react";
import { TfiPrinter } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import "../../Applicaion.css";
import CompanyLogo from "../../assets/xceed-bangladesh-logo.png";
import {
  useGetCompanyIdQuery,
  useGetEmployeeDetailsQuery,
  useGetExperienceCertificateFormatQuery,
} from "../../features/api";
import ListSkeleton from "../../skeletons/ListSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";
import calculateTotalHours from "../../utils/TimeCalculator";
import formatTimeTo12Hour from "../../utils/timeConverter";
import todayDate from "../../utils/TodayDate";

function ExperienceCertificate() {
  const [letterData, setLetterData] = useState(null);
  const [date, setDate] = useState("10");
  const [name, setEmployeeName] = useState("John Doe");
  const [start_date, setStart_date] = useState("John Doe");
  const [address, setAddress] = useState("Raozan");
  const [appName, setAppName] = useState("My Company");
  let { id } = useParams();
  const headerRef = useRef();
  const componentRef = useRef();
  // Fetching company ID
  const { data: company_id } = useGetCompanyIdQuery();

  const {
    data: employeeDetails,
    isLoading,
    isError,
  } = useGetEmployeeDetailsQuery(id);

  // Fetching leave application format
  const { data: experienceCertificateQuery, isLoading: isFormatLoading } =
    useGetExperienceCertificateFormatQuery(company_id);

  if (isLoading && isFormatLoading && !isError) return <ListSkeleton />;

  if (!experienceCertificateQuery?.data?.formatData)
    return <ErrorMessage message="We have not found any certificate!" />;

  // Function to calculate time difference in hours and minutes

  const initialApplicationData = {
    company_name: employeeDetails?.data?.company?.company_name || "",
    employee_name: employeeDetails?.data?.name || "",
    date: todayDate() || "",
    branch: employeeDetails?.data?.company?.company_name || "",
    designation:
      employeeDetails?.data?.EmployeeDesignation?.[0]?.designation?.name || "",
    start_date: employeeDetails?.data?.joining_date || "",
    total_hours: calculateTotalHours(
      employeeDetails?.data?.EmployeeShift?.[0]?.shift?.start_time,
      employeeDetails?.data?.EmployeeShift?.[0]?.shift?.end_time,
    ),
    start_time:
      employeeDetails?.data?.EmployeeShift?.[0]?.shift?.start_time || "",
    end_time: employeeDetails?.data?.EmployeeShift?.[0]?.shift?.end_time || "",
  };

  // Function to replace placeholders
  const replacePlaceholders = (text) => {
    const placeholderValues = {
      company_name: initialApplicationData?.company_name,
      employee_name: initialApplicationData?.employee_name,
      date: initialApplicationData?.date,
      branch: initialApplicationData?.branch,
      designation: initialApplicationData?.designation,
      start_date: initialApplicationData?.start_date,
      total_hours: initialApplicationData?.total_hours,
      start_time: formatTimeTo12Hour(initialApplicationData?.start_time),
      end_time: formatTimeTo12Hour(initialApplicationData?.end_time),
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
  const handleDownloadPDF = async () => {
    const input = componentRef.current;
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const lineHeight = 7;
    const brSpacing = 3;
    const footerText = "Xceed Bangladesh | +8801884-815992 | info@xceedbd.com";

    if (!input) return;

    // Step 1: Capture the header as an image
    const headerCanvas = await html2canvas(headerRef.current);
    const headerData = headerCanvas.toDataURL("image/png");
    const headerHeight =
      (headerCanvas.height * (pageWidth - 20)) / headerCanvas.width; // Calculate height in mm

    // Step 2: Extract text and <br> markers
    const lines = [];
    const walker = document.createTreeWalker(
      input,
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
      null,
    );

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "BR") {
        lines.push("%%BR%%");
      } else if (
        node.nodeType === Node.TEXT_NODE &&
        node.textContent.trim() !== ""
      ) {
        const textLines = node.textContent
          .split("\n")
          .map((line) => line.trim());
        lines.push(...textLines);
      }
    }

    // Step 3: Generate PDF with header, content, and footer
    let yPosition = margin + headerHeight + 10; // Start below the header
    let currentPage = 1;

    // Add header to the first page
    pdf.addImage(
      headerData,
      "PNG",
      margin,
      margin,
      pageWidth - 20,
      headerHeight,
    );

    lines.forEach((line) => {
      const isBr = line === "%%BR%%";
      const currentSpacing = isBr ? brSpacing : lineHeight;

      if (yPosition + currentSpacing > pageHeight - 20) {
        // Add footer and new page
        pdf.setFontSize(10);
        pdf.text(footerText, margin, pageHeight - 10);
        pdf.addPage();
        currentPage++;
        // Add header to the new page
        pdf.addImage(
          headerData,
          "PNG",
          margin,
          margin,
          pageWidth - 20,
          headerHeight,
        );
        yPosition = margin + headerHeight + 10; // Reset position below header
      }

      if (isBr) {
        yPosition += currentSpacing;
      } else {
        const wrappedLines = pdf.splitTextToSize(line, pageWidth - 20);
        wrappedLines.forEach((wrappedLine) => {
          if (yPosition + currentSpacing > pageHeight - 20) {
            pdf.setFontSize(10);
            pdf.text(footerText, margin, pageHeight - 10);
            pdf.addPage();
            currentPage++;
            pdf.addImage(
              headerData,
              "PNG",
              margin,
              margin,
              pageWidth - 20,
              headerHeight,
            );
            yPosition = margin + headerHeight + 10;
          }
          pdf.setFontSize(12);
          pdf.text(wrappedLine, margin, yPosition);
          yPosition += currentSpacing;
        });
      }
    });

    // Add footer to the last page
    pdf.setFontSize(10);
    pdf.text(footerText, margin, pageHeight - 10);
    pdf.save("Experience_Letter.pdf");
  };

  return (
    <div className="m-auto w-[1000px] text-white">
      <div className="flex justify-end">
        <button
          className="mb-2 flex items-center gap-2 rounded-sm bg-green-600 px-3 py-3"
          onClick={() => handleDownloadPDF()}
        >
          {" "}
          <TfiPrinter />
          Download PDF
        </button>
      </div>
      <div
        ref={componentRef}
        id="container"
        className="h-auto rounded-sm bg-white p-8 text-black dark:bg-dark-box dark:text-white"
      >
        {/* Header with ref */}
        <div ref={headerRef} className="mb-8 flex items-center justify-between">
          <img
            src={CompanyLogo}
            alt="Company Logo"
            className="h-auto w-[180px]"
          />
        </div>
        <div className="h-[820px]">
          {JSON.parse(
            experienceCertificateQuery?.data?.formatData,
          ).root.children.map((child, index) => renderElement(child, index))}
        </div>
      </div>
    </div>
  );
}

export default ExperienceCertificate;
