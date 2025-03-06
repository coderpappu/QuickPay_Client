import jsPDF from "jspdf";
import React from "react";

const EditorComponent = () => {
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text("Hello, World!", 10, 10);
    doc.save("output.pdf");
  };

  return (
    <div>
      <h1>PDF Generator</h1>
      <button onClick={handleGeneratePDF}>Generate PDF</button>
    </div>
  );
};

export default EditorComponent;
