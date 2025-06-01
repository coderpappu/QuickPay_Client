import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download } from "lucide-react";
import { useState } from "react";

const PayslipDownloadButton = ({ payslipRef, employeeData, generateDate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (!payslipRef.current) return;

    setIsLoading(true);

    try {
      const input = payslipRef.current;
      const pdf = new jsPDF("p", "mm", "a4");

      // Override background colors temporarily for capture
      const elements = input.getElementsByClassName("bg-gray-100");
      const originalBackgrounds = [];

      Array.from(elements).forEach((el) => {
        originalBackgrounds.push(el.style.backgroundColor);
        el.style.backgroundColor = "#f3f4f6"; // Tailwind gray-100 in RGB
      });

      const canvas = await html2canvas(input, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
        // Force all backgrounds and text to safe colors to avoid oklch issues
        onclone: (clonedDoc) => {
          const all = clonedDoc.body.querySelectorAll("*");
          all.forEach((el) => {
            el.style.backgroundColor = "#fff";
            el.style.color = "#000";
          });
        },
      });

      // Restore original backgrounds
      Array.from(elements).forEach((el, i) => {
        el.style.backgroundColor = originalBackgrounds[i];
      });

      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to fit the PDF page while maintaining aspect ratio
      const margin = 10;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image centered on page
      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);

      // Generate filename with employee details and date
      const employeeName =
        employeeData?.name?.replace(/\s+/g, "_") || "employee";
      const employeeId = employeeData?.employeeId || "";
      const date =
        generateDate?.replace(/\s+/g, "_") ||
        new Date().toISOString().split("T")[0];

      const filename = `Payslip_${employeeName}_${employeeId}_${date}.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Download size={18} />
          <span>Download Payslip</span>
        </>
      )}
    </button>
  );
};

export default PayslipDownloadButton;
