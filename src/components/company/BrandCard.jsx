import React from "react";
import { useState } from "react";
import SettingCardHeader from "./SettingCardHeader";
import SettingCardFooter from "./SettingCardFooter";
import LogoUploadCard from "./LogoUploadCard";
import BrandInput, { InputBox, SelectOptionBox } from "./BrandInput";
import LogoImg from "../../assets/quickPayLogo.png";
import BrandCardWrapper from "./BrandCardWrapper";
import SelectorInput from "./SelectorInput";
import InputTitle from "./InputTitle";
import * as Yup from "yup";

import { Formik, Field, Form, ErrorMessage } from "formik";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  textTitle: Yup.string().required("Title text is required"),
  footerText: Yup.string().required("Footer text is required"),
  language: Yup.string().required("Language is required"),
});

const formFields = [
  // ... (rest of your form fields)
  [
    {
      name: "textTitle",
      title: "Text Title",
      placeholder: "Enter title text",
    },
    {
      name: "footerText",
      title: "Footer Text",
      placeholder: "Enter footer text",
    },
    {
      name: "language",
      title: "Select Language",
    },
  ],
];

const BrandCard = () => {
  const [selectedFiles, setSelectedFiles] = useState({
    file1: null,
    file2: null,
    file3: null,
  });

  const initialValues = {
    // ... (rest of your initial values)
    textTitle: "",
    footerText: "",
    language: "",
  };

  // Handler for file changes, updating the object state
  const handleFileChange = (event, fileKey) => {
    setSelectedFiles((prevState) => ({
      ...prevState,
      [fileKey]: event.target.files[0],
    }));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form Values: ", values);
      }}
    >
      {() => (
        <Form>
          <BrandCardWrapper>
            {/* setting card heading  */}
            <SettingCardHeader
              title="Brand Settings"
              subTitle="Edit your brand details"
            />

            <div className="py-3">
              {/* card content  */}
              <div className="px-6 py-3 flex justify-between ">
                <LogoUploadCard
                  title="Logo Dark"
                  handleFileChange={(event) => handleFileChange(event, "file1")}
                  selectedFile={selectedFiles.file1}
                  LogoImg={LogoImg}
                  name="file1"
                />
                <LogoUploadCard
                  title="Logo Light"
                  handleFileChange={(event) => handleFileChange(event, "file2")}
                  selectedFile={selectedFiles.file2}
                  LogoImg={LogoImg}
                  name="file2"
                />
                <LogoUploadCard
                  title="Favicon"
                  handleFileChange={(event) => handleFileChange(event, "file3")}
                  selectedFile={selectedFiles.file3}
                  LogoImg={LogoImg}
                  name="file3"
                />
              </div>

              {/* title and text section  */}
              {formFields.map((row, rowIndex) => (
                <div className="px-6 py-3 flex justify-between" key={rowIndex}>
                  {row.map(
                    ({ name, title, placeholder, type = "text" }, rowIndex) => (
                      <div className="w-[24%] relative" key={rowIndex}>
                        <InputTitle title={title} />
                        {name == "language" ? (
                          <>
                            <SelectOptionBox values={["Bangla ", "English"]} />
                          </>
                        ) : (
                          <>
                            <InputBox
                              name={name}
                              type={type}
                              placeholder={placeholder}
                            />
                          </>
                        )}

                        <ErrorMessage
                          name={name}
                          component="div"
                          className="text-red-500 text-xs "
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* card footer  */}
            <SettingCardFooter title={"Save"} />
          </BrandCardWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default BrandCard;
