import React from "react";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import SettingCardFooter from "./SettingCardFooter";
import InputTitle from "./InputTitle";
import SelectorInput from "./SelectorInput";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputBox, SelectOptionBox } from "./BrandInput";

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
    {
      name: "date_formate",
      title: "Date Formate",
      placeholder: "",
      list: ["Jan 1 2002", "dd-mm-yyyy", "mm-dd-yyyy", "yyyy-dd-mm"],
      type: "list",
    },
    {
      name: "time_format",
      title: "Time Format",
      placeholder: "",
      list: ["10.30PM", "10.00pm", "22.30"],
      type: "list",
    },
  ],
];

const CompanySettings = () => {
  const initialValues = {};

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
                  {row.map(
                    ({ name, title, placeholder, type = "text", list }) => (
                      <div key={name} className="w-[49%]">
                        <InputTitle title={title} />
                        {type == "list" ? (
                          <>
                            <SelectOptionBox values={list} name={name} />
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
                          className="text-red-500 text-sm"
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
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
