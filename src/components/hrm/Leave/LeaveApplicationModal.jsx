import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { TfiPrinter } from "react-icons/tfi";
import CompanyLogo from "../../../assets/xceed-bangladesh-logo.png";
import { DateConverterFromUTC } from "../../../utils/Converter"; // you can create a helper to format date yyyy-mm-dd to dd MMM yyyy
import todayDate from "../../../utils/TodayDate";

const LeaveApplicationModal = ({ leave, formatData, onClose }) => {
  const contentRef = useRef();
  const headerRef = useRef();

  const placeholders = {
    employee_name: leave.Employee?.name,
    company_name: leave.Employee?.company?.company_name,
    branch: leave.Employee?.Company?.branch || "Main",
    designation:
      leave.Employee?.EmployeeDesignation?.[0]?.designation?.name || "",
    start_date: DateConverterFromUTC(leave.start_date),
    end_date: DateConverterFromUTC(leave.end_date),
    leaveDuration: leave.leaveDuration,
    leave_type_name: leave.LeaveType?.name,
    reason: leave.reason,
    paid_status: leave.paid_status,
    current_date: todayDate(),
  };

  const replacePlaceholders = (text) => {
    return text.replace(/{(\w+)}/g, (_, key) => placeholders[key] || "");
  };

  const renderElement = (child, index) => {
    if (!child.children || child.children.length === 0) {
      return <div key={index} style={{ height: "12px" }} />; // render visual space for blank lines
    }

    const Tag = child.type === "heading" ? child.tag.toLowerCase() : "p";
    return (
      <Tag key={index} style={{ margin: "8px 0", whiteSpace: "pre-wrap" }}>
        {child.children.map((text, i) => (
          <span
            key={i}
            style={{
              fontWeight: text.format === 1 ? "bold" : "normal",
              fontStyle: text.format === 2 ? "italic" : "normal",
              whiteSpace: "pre-wrap",
              fontSize: "13px", // Reduce font size here for snapshot and PDF
            }}
          >
            {replacePlaceholders(text.text)}
          </span>
        ))}
      </Tag>
    );
  };

  const handleDownloadPDF = async () => {
    const input = contentRef.current;
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const footerText = "Xceed Bangladesh | +8801884-815992 | info@xceedbd.com";

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    pdf.setFontSize(10);
    pdf.text(footerText, margin, pageHeight - 10);
    pdf.save("Leave_Application.pdf");
  };

  let parsedContent;
  try {
    parsedContent = formatData ? JSON.parse(formatData) : null;
  } catch (err) {
    return (
      <div className="bg-red-100 p-4 text-red-600">
        Invalid JSON format provided in leave template data.
      </div>
    );
  }

  if (!parsedContent) {
    return (
      <div className="bg-yellow-100 p-4 text-yellow-800">
        No template data available for rendering the leave application.
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-[90vh] w-[800px] overflow-auto rounded bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Leave Application Preview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 rounded bg-green-600 px-4 py-2 text-white"
          >
            <TfiPrinter /> Download PDF
          </button>
        </div>
        <div ref={contentRef} className="bg-white p-6 text-black">
          <div ref={headerRef} className="mb-4">
            <img
              src={CompanyLogo}
              alt="Company Logo"
              className="h-auto w-[180px]"
            />
          </div>
          <div className="space-y-3">
            {parsedContent.root?.children?.map((child, i) =>
              renderElement(child, i),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplicationModal;
