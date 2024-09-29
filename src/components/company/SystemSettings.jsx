import React from "react";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import SettingCardFooter from "./SettingCardFooter";
import InputTitle from "./InputTitle";
import SelectorInput from "./SelectorInput";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  brand: Yup.string().required("Company name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip/Post Code is required"),
  country: Yup.string().required("Country is required"),
  telephone: Yup.string().required("Telephone is required"),
  companyRegNo: Yup.string().required(
    "Company Registration Number is required"
  ),
  companyStartTime: Yup.string().required("Company Start Time is required"),
  companyEndTime: Yup.string().required("Company End Time is required"),
});

// Array of form fields (two fields per row)
const formFields = [
  [
    { name: "brand", title: "Company Name", placeholder: "Enter company name" },
    { name: "address", title: "Address", placeholder: "Enter address" },
  ],
  [
    { name: "city", title: "City", placeholder: "Enter city" },
    { name: "state", title: "State", placeholder: "Enter state" },
  ],
  [
    { name: "zip", title: "Zip/Post Code", placeholder: "Enter zip/post code" },
    { name: "country", title: "Country", placeholder: "Enter country" },
  ],
  [
    { name: "telephone", title: "Telephone", placeholder: "Enter telephone" },
    {
      name: "companyRegNo",
      title: "Company Registration Number",
      placeholder: "Enter company registration number",
    },
  ],
  [
    { name: "companyStartTime", title: "Company Start Time *", type: "time" },
    { name: "companyEndTime", title: "Company End Time *", type: "time" },
  ],
  [
    {
      name: "faxNo",
      title: "Fax No",
      placeholder: "Enter fax number",
      required: false,
    },
    {
      name: "website_Url",
      title: "Website URL",
      placeholder: "https://www.codexdevware.com",
      required: false,
    },
  ],
];

const CompanySettings = () => {
  const initialValues = {
    brand: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    telephone: "",
    companyRegNo: "",
    companyStartTime: "",
    companyEndTime: "",
    faxNo: "",
    timezone: "",
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
            <SettingCardHeader
              title="Company Settings"
              subTitle="Edit your company settings"
            />

            <div className="px-6 py-4">
              {/* Mapping over the formFields array and displaying two fields per row */}
              {formFields.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex flex-wrap justify-between my-3"
                >
                  {row.map(({ name, title, placeholder, type = "text" }) => (
                    <div key={name} className="w-[49%]">
                      <InputTitle title={title} />
                      <Field
                        name={name}
                        type={type}
                        placeholder={placeholder || ""}
                        className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
                      />
                      <ErrorMessage
                        name={name}
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  ))}
                </div>
              ))}

              {/* Timezone Selector */}
              <div className="flex flex-wrap justify-between my-3">
                <div className="w-full">
                  <InputTitle title="Timezone" />
                  <SelectorInput options={["Select Timezone"]} />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <SettingCardFooter title="Save" />
          </BrandCardWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default CompanySettings;
