import React, { useState, useEffect } from "react";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { usePDF } from "react-to-pdf";
import html2pdf from "html2pdf.js";

function Application() {
  const [letterData, setLetterData] = useState(null);
  const [date, setDate] = useState("10");
  const [employee_name, setEmployeeName] = useState("John Doe");
  const [address, setAddress] = useState("Raozan");
  const [appName, setAppName] = useState("My Company");
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  useEffect(() => {
    // Fetch letter data from localStorage
    const data = localStorage.getItem("data");

    if (data) {
      const parsedData = JSON.parse(data);
      setLetterData(parsedData);
    }
  }, []);

  if (!letterData) {
    return <div>Loading...</div>;
  }
  const renderElement = (child) => {
    if (child.type === "heading") {
      const TagName = child.tag.toLowerCase();
      return React.createElement(
        TagName,
        { key: child.tag },
        child.children.map((text) => replacePlaceholders(text.text))
      );
    } else if (child.type === "paragraph") {
      return (
        <p key={child.tag}>
          {child.children.map((text) => replacePlaceholders(text.text))}
        </p>
      );
    }
  };
  const replacePlaceholders = (text) => {
    return text.replace(/{(\w+)}/g, (match, placeholder) => {
      const placeholderValues = {
        date,
        employee_name,
        app_name: appName,
        address,
      };
      if (placeholderValues.hasOwnProperty(placeholder)) {
        return placeholderValues[placeholder];
      } else {
        return match;
      }
    });
  };
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
        {letterData.root.children.map((child, index) => renderElement(child))}
      </div>
    </div>
  );
}

export default Application;
