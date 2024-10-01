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
});

const formFields = [
  // ... (rest of your form fields)
  [
    {
      name: "currency",
      title: "Currency*",
      placeholder: "",
      type: "text",
    },
    {
      name: "currency_symbol",
      title: "Currency Symbol*",
      placeholder: "",
      type: "text",
    },
  ],
  [
    {
      name: "number_format",
      title: "Decimal Number Format",
      placeholder: "",
      type: "text",
    },
    {
      name: "float_number",
      title: "Float Number",
      placeholder: "",
      list: ["Comma", "Dot"],
      type: "list",
    },
  ],
  [
    {
      name: "decimal_separator",
      title: "Decimal Separator",
      placeholder: "",
      list: ["Dot", "Comma"],
      type: "list",
    },
    {
      name: "thousands_separator",
      title: "Thousands Separator",
      placeholder: "",
      list: ["Dot", "Comma"],
      type: "list",
    },
  ],
];

const CurrencyCard = () => {
  const initialValues = {
    currency: "", // Initial value for the currency field
    currency_symbol: "", // Initial value for the currency symbol field
    number_format: "", // Initial value for the number format field
    float_number: "", // Initial value for the float number field
    decimal_separator: "", // Initial value for the decimal separator field
    thousands_separator: "", // Initial value for the thousands separator field
    // Radio button states
    currencySymbolPosition: "Pre", // Default to "Pre"
    currencySymbolSpace: "With Space", // Default to "With Space"
    currencySymbolAndName: "With Currency Symbol", // Default to "With Currency Symbol"
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
                <div className="px-6 py-3 flex justify-between" key={rowIndex}>
                  {row.map(
                    (
                      { name, title, placeholder, type = "text", list },
                      rowIndex
                    ) => (
                      <div className="w-[48%] relative" key={rowIndex}>
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
              <div className="flex justify-between px-6">
                <div className="w-[48%]  pr-44">
                  <InputTitle title={"Currency Symbol Position"} />
                  <div className="flex flex-wrap justify-between mt-2">
                    <RadioInput title={"Pre"} />

                    <RadioInput title={"Post"} />
                  </div>
                </div>

                <div className="w-[48%]  pr-44">
                  <InputTitle title={"Currency Symbol Space"} />
                  <div className="flex flex-wrap justify-between mt-2">
                    <RadioInput title={"With Space"} />
                    <RadioInput title={"Without space"} />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6 px-6">
                <div className="w-[48%]  pr-14">
                  <InputTitle title={"Currency Symbol & Name"} />
                  <div className="flex flex-wrap justify-between mt-2">
                    <RadioInput title={"With Currency Symbol"} />
                    <RadioInput title={" With Currency Name"} />
                  </div>
                </div>
                <div className="w-[48%]">
                  <p className="dark:text-dark-text-color text-sm">
                    Preview : 10.000,00USD
                  </p>
                </div>
              </div>
            </div>

            {/* card footer  */}
            <SettingCardFooter title={"Save"} />
          </BrandCardWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default CurrencyCard;
