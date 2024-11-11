import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  useCreateNewCompanyMutation,
  useGetCompanyDetailsQuery,
} from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import { InputBox } from "./BrandInput"; // Ensure this imports your updated InputBox
import InputTitle from "./InputTitle";
import SelectorInput from "./SelectorInput";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";

import { useParams } from "react-router-dom";
import FormSkeleton from "../../skeletons/FormSkeleton";
import { modifyPayload } from "../../utils/modifyPayload";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  company_name: Yup.string().required("Company name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postal_code: Yup.string().notRequired(),
  country: Yup.string().required("Country is required"),
  phone_number: Yup.string().required("Phone number is required"),
  company_registration_no: Yup.string().notRequired(),

  faxNo: Yup.string().notRequired(),
  website_Url: Yup.string().notRequired(),
  timezone: Yup.string().notRequired(),
});

// Array of form fields (two fields per row)
const formFields = [
  [
    { name: "company_name", title: "Name", placeholder: "Enter company name" },
    { name: "address", title: "Address", placeholder: "Enter address" },
  ],
  [
    { name: "city", title: "City", placeholder: "Enter city" },
    { name: "state", title: "State", placeholder: "Enter state" },
  ],
  [
    {
      name: "postal_code",
      title: "Zip/Post Code",
      placeholder: "Enter zip/post code",
    },
    { name: "country", title: "Country", placeholder: "Enter country" },
  ],
  [
    {
      name: "phone_number",
      title: "Phone Number",
      placeholder: "Enter phone number",
    },
    {
      name: "company_registration_no",
      title: "Company Registration Number",
      placeholder: "Enter company registration number",
    },
  ],
  [
    {
      name: "faxNo",
      title: "Fax No",
      placeholder: "Enter fax number",
      required: false,
    },
    {
      name: "date_format",
      title: "Date Format*",
      type: "select",
      options: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"],
    },
  ],
  [
    {
      name: "website_Url",
      title: "Website URL",
      placeholder: "https://www.codexdevware.com",
      required: false,
    },
    {
      name: "timezone",
      title: "Time Zone",
      placeholder: "",
      type: "select",
      options: [
        "Coordinated Universal Time (UTC)",
        // Add other time zones as needed
        // ...
        "Bangladesh Standard Time (BST) - UTC+6",
      ],
    },
  ],
];

const CompanySettings = () => {
  const id = useParams()?.id;

  const [createNewCompany] = useCreateNewCompanyMutation();
  const {
    data: companyDetails,
    isLoading,
    isError,
    error,
  } = useGetCompanyDetailsQuery(id);

  if (isLoading && !isError) return <FormSkeleton />;

  if (!isLoading && isError) return <ErrorMessage message={error?.message} />;

  const initialValues = {
    company_name: companyDetails?.data?.company_name || "",
    address: companyDetails?.data?.address || "",
    city: companyDetails?.data?.city || "",
    state: companyDetails?.data?.state || "",
    postal_code: companyDetails?.data?.postal_code || "",
    country: companyDetails?.data?.country || "",
    phone_number: companyDetails?.data?.phone_number || "",
    company_registration_no:
      companyDetails?.data?.company_registration_no || "",
    date_format: companyDetails?.data?.date_format || "",
    faxNo: companyDetails?.data?.faxNo || "",
    website_Url: companyDetails?.data?.website_url || "",
    timezone: companyDetails?.data?.timezone || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        let modifyValue = modifyPayload(values);

        createNewCompany(values); // Call your mutation here if needed
      }}
    >
      {({ handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
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
                    ({ name, title, placeholder, type = "text", options }) => (
                      <div key={name} className="w-[49%]">
                        <InputTitle title={title} />
                        {/* Conditional rendering based on field type */}
                        {type === "select" ? (
                          <SelectorInput options={options} name={name} />
                        ) : (
                          <InputBox
                            name={name}
                            type={type}
                            placeholder={placeholder || ""}
                          />
                        )}
                        <ErrorMessage
                          name={name}
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>

            <SettingCardFooter title="Save" />
          </BrandCardWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default CompanySettings;
