import React, { useState, useEffect } from "react";

function Application() {
  const [letterData, setLetterData] = useState(null);
  const [date, setDate] = useState("10"); // State for the date
  const [employee_name, setEmployeeName] = useState("John Doe"); // Example placeholder
  const [address, setAddress] = useState("Raozan"); // Example placeholder
  const [appName, setAppName] = useState("My Company"); // Example placeholder

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
      // Render heading elements based on the tag property
      const TagName = child.tag.toLowerCase(); // e.g., "h3"
      return React.createElement(
        TagName,
        { key: child.tag },
        child.children.map((text) => replacePlaceholders(text.text))
      );
    } else if (child.type === "paragraph") {
      // Render paragraph elements
      return (
        <p key={child.tag}>
          {child.children.map((text) => replacePlaceholders(text.text))}
        </p>
      );
    }
    // Add more element types as needed (e.g., lists, code blocks)
  };

  const replacePlaceholders = (text) => {
    // Replace placeholders using a regular expression to match any word enclosed in curly braces
    return text.replace(/{(\w+)}/g, (match, placeholder) => {
      // Use a dictionary to map placeholders to their values
      const placeholderValues = {
        date,
        employee_name,
        app_name: appName,
        address,
      };

      // If the placeholder exists in the dictionary, return its value
      if (placeholderValues.hasOwnProperty(placeholder)) {
        return placeholderValues[placeholder];
      } else {
        // If the placeholder is not found, return the original match
        return match;
      }
    });
  };

  return (
    <div className="text-white">
      {/* ... Other inputs for employeeName, appName, etc. ... */}
      {letterData.root.children.map((child, index) => renderElement(child))}
    </div>
  );
}

export default Application;
