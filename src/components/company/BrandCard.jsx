import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import LogoImg from "../../assets/quickPayLogo.png";
import {
  useCreateBrandMutation,
  useGetbrandQuery,
  useGetCompanyDetailsQuery,
  useGetCompanyIdQuery,
} from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import { InputBox, SelectOptionBox } from "./BrandInput";
import InputTitle from "./InputTitle";
import LogoUploadCard from "./LogoUploadCard";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";

// task  : initial state data not set properly when edit is clicked

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  titleText: Yup.string().required("Title text is required"),
  footerText: Yup.string().required("Footer text is required"),
  language: Yup.string().required("Language is required"),
});

const formFields = [
  [
    { name: "titleText", title: "Title Text", placeholder: "Enter title text" },
    {
      name: "footerText",
      title: "Footer Text",
      placeholder: "Enter footer text",
    },
    { name: "language", title: "Select Language" },
  ],
];

const BrandCard = () => {
  const [createBrand] = useCreateBrandMutation();
  const { data: companyId, isLoading: isCompanyIdLoading } =
    useGetCompanyIdQuery();
  const { data: companyData } = useGetCompanyDetailsQuery(companyId);
  const [selectedFiles, setSelectedFiles] = useState({
    file1: "",
    file2: null,
    file3: null,
  });
  // Fetch existing brand details
  const { data: brandData, isLoading, isError } = useGetbrandQuery(companyId); // Assuming this fetches existing brand data

  if (isLoading && !isError) return "Loading...";

  // Set initial values based on fetched brand data
  const initialValues = {
    titleText: brandData?.data?.titleText || "",
    footerText: brandData?.data?.footerText || "",
    language: brandData?.data?.language || "",
  };

  // Handle file changes
  const handleFileChange = (event, fileKey) => {
    setSelectedFiles((prevState) => ({
      ...prevState,
      [fileKey]: event.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Append form fields
    formData.append("titleText", values.titleText);
    formData.append("footerText", values.footerText);
    formData.append("language", values.language);
    formData.append("companyName", companyData?.data?.company_name);
    formData.append("company_id", companyData?.data?.id);

    // Append files
    Object.keys(selectedFiles).forEach((key) => {
      if (selectedFiles[key]) {
        formData.append(key, selectedFiles[key]);
      }
    });

    try {
      let createBrandResponse = await createBrand(formData).unwrap();
      toast.success(createBrandResponse?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize // This allows Formik to reinitialize when initialValues change
    >
      {() => (
        <Form>
          <BrandCardWrapper>
            <SettingCardHeader
              title="Brand Settings"
              subTitle="Edit your brand details"
            />
            <div className="py-3">
              <div className="px-6 py-3 flex justify-between ">
                <LogoUploadCard
                  title="Logo Dark"
                  handleFileChange={(event) => handleFileChange(event, "file1")}
                  selectedFile={selectedFiles.file1}
                  LogoImg={brandData?.data?.darkImageUrl || LogoImg} // Use selected file or default logo image
                  name="file1"
                />
                <LogoUploadCard
                  title="Logo Light"
                  handleFileChange={(event) => handleFileChange(event, "file2")}
                  selectedFile={selectedFiles.file2}
                  LogoImg={brandData?.data?.lightImageUrl || LogoImg}
                  name="file2"
                />
                <LogoUploadCard
                  title="Favicon"
                  handleFileChange={(event) => handleFileChange(event, "file3")}
                  selectedFile={selectedFiles.file3}
                  LogoImg={brandData?.data?.favImageUrl || LogoImg}
                  name="file3"
                />
              </div>
              {formFields.map((row, rowIndex) => (
                <div className="px-6 py-3 flex justify-between" key={rowIndex}>
                  {row.map(({ name, title, placeholder }, rowIndex) => (
                    <div className="w-[24%] relative" key={rowIndex}>
                      <InputTitle title={title} />
                      {name === "language" ? (
                        <SelectOptionBox
                          values={["Bangla ", "English"]}
                          name={name}
                        />
                      ) : (
                        <InputBox
                          name={name}
                          type="text"
                          placeholder={placeholder}
                        />
                      )}
                      <ErrorMessage
                        name={name}
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <SettingCardFooter title={"Save"} />
          </BrandCardWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default BrandCard;
