import html2canvas from "html2canvas-pro"; // Updated import
import jsPDF from "jspdf";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {
  useGetbrandQuery,
  useGetEmployeeDetailsQuery,
} from "../../../features/api";
import { DateConverterFromUTC } from "../../../utils/Converter";

const PreviewBonusSlip = ({ slipPreview }) => {
  
  const companyId = useSelector((state) => state.company.companyId);

  const componentRef = useRef();
  const headerRef = useRef();
  const { data: brandDetails } = useGetbrandQuery(companyId);

  const id = slipPreview?.employee_id;

  const { data: employeeData } = useGetEmployeeDetailsQuery(id);

  const handleDownloadPDF = async () => {
    const input = componentRef.current;

    console.log(input);

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
    <div>
      <button onClick={() => handleDownloadPDF()}>print</button>
      <div
        ref={componentRef}
        className="mx-auto max-w-5xl rounded-md bg-white p-6 shadow-md dark:bg-dark-box"
      >
        {/* Header */}
        <div
          ref={headerRef}
          className="mx-auto mb-4 h-auto w-[150px] text-center text-xl font-bold"
        >
          <img src={brandDetails?.data?.lightImageUrl} alt="brand logo" />
        </div>
        <div className="mb-2 flex justify-between text-sm">
          <div>
            <p>
              <strong>ID No : </strong> {slipPreview?.employeeId}
            </p>
            <p>
              <strong>Name :</strong> {slipPreview?.name}
            </p>
            <p>
              <strong>Department : </strong>{" "}
              {employeeData?.data?.EmployeeDepartment?.[0]?.department?.name}
            </p>
            <p>
              <strong>Designation : </strong>{" "}
              {employeeData?.data?.EmployeeDesignation[0]?.designation?.name}
            </p>
            <p>
              <strong>Section : </strong>{" "}
              {employeeData?.data?.EmployeeSection?.[0]?.section?.name}
            </p>
          </div>
          <div className="text-right">
            <p>
              <strong>Status : </strong> {slipPreview?.status}
            </p>
            <p>
              <strong>Payment Date : </strong>{" "}
              {DateConverterFromUTC(slipPreview?.payment_date)}
            </p>

            <p>
              <strong>Month :</strong> {slipPreview?.date}
            </p>
          </div>
        </div>

        {/* Earnings and Deductions Table */}
        <div className="mb-4 border border-dark-card text-sm">
          {/* Header Row */}
          <div className="grid grid-cols-2 border-b border-dark-card font-bold">
            <div className="border-r border-dark-card p-2">Bonus</div>
            <div className="border-r border-dark-card p-2">Amount</div>
          </div>
          {/* Dynamic Rows */}
          {/* Dynamic Rows */}

          <div className="grid grid-cols-2 border-b border-dark-card">
            <div className="border-r border-dark-card p-2">
              {slipPreview?.bonus_name}
            </div>
            <div className="border-r border-dark-card p-2">
              {slipPreview?.amount}
            </div>
          </div>
        </div>

        {/* Net Amount */}
        <div className="flex justify-end text-lg font-bold">
          <p>Total Bonus : {Math.round(slipPreview?.amount)}</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewBonusSlip;
