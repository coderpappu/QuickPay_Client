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
import RadioInput from "./RadioInput";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  currency: Yup.string().required("Currency is required"),
  currency_symbol: Yup.string().required("Currency symbol is required"),
  language: Yup.string().required("Language is required"),
  driver: Yup.string().required("Mail Driver is required"),
  host: Yup.string().required("Host is required"),
  port: Yup.string().required("Mail Port is required"),
  username: Yup.string().required("Mail Username is required"),
  password: Yup.string().required("Mail Password is required"),
  encryption: Yup.string().required("Mail Encryption is required"),
  address: Yup.string().required("Mail from Address is required"),
  from_name: Yup.string().required("Mail From Name is required"),
});

const formFields = [
  // ... (rest of your form fields)
  [
    {
      name: "driver",
      title: "Mail Driver",
      placeholder: "Enter mail driver",
      type: "text",
    },
    {
      name: "host",
      title: "Host",
      placeholder: "Enter mail host",
      type: "text",
    },
    {
      name: "port",
      title: "Mail Port",
      placeholder: "Enter mail port",
      type: "text",
    },
  ],
  [
    {
      name: "username",
      title: "Mail Username",
      placeholder: "Enter mail username",
      type: "text",
    },
    {
      name: "password",
      title: "Mail Password",
      placeholder: "Enter mail password",
      type: "text",
    },
    {
      name: "encryption",
      title: "Mail Encryption",
      placeholder: "Enter mail encryption",
      type: "text",
    },
  ],
  [
    {
      name: "address",
      title: "Mail from Address",
      placeholder: "Enter mail from address",
      type: "text",
    },
    {
      name: "from_name",
      title: "Mail From Name",
      placeholder: "Enter mail from name",
      type: "text",
    },
  ],
];

const EmailCard = () => {
  const initialValues = {
    driver: "",
    host: "",
    port: "",
    username: "",
    password: "",
    encryption: "",
    address: "",
    from_name: "",
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
              title="Currency Settings"
              subTitle="Edit your currency details"
            />

            <div className="py-3">
              {/* title and text section  */}
              {formFields.map((row, rowIndex) => (
                <div
                  className="px-6 py-3 flex justify-start gap-12"
                  key={rowIndex}
                >
                  {row.map(
                    (
                      { name, title, placeholder, type = "text", list },
                      rowIndex
                    ) => (
                      <div className="w-[30%] relative" key={rowIndex}>
                        <InputTitle title={title} />
                        {type == "list" ? (
                          <>
                            <SelectOptionBox values={list} />
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

export default EmailCard;
