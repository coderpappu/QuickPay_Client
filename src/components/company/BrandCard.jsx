import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import LogoImg from "../../assets/quickPayLogo.png";
import {
  useCreateBrandMutation,
  useGetCompanyDetailsQuery,
  useGetCompanyIdQuery,
} from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import { InputBox, SelectOptionBox } from "./BrandInput";
import InputTitle from "./InputTitle";
import LogoUploadCard from "./LogoUploadCard";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";

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
  const [createBrnad] = useCreateBrandMutation();
  const { data: companyId, isLoading: isCompanyIdLoading } =
    useGetCompanyIdQuery();

  const { data: companyData } = useGetCompanyDetailsQuery(companyId);

  const [selectedFiles, setSelectedFiles] = useState({
    file1: null,
    file2: null,
    file3: null,
  });

  const initialValues = {
    titleText: "",
    footerText: "",
    language: "",
  };

  const handleFileChange = (event, fileKey) => {
    setSelectedFiles((prevState) => ({
      ...prevState,
      [fileKey]: event.target.files[0],
    }));
  };

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
      let createBrand = await createBrnad(formData).unwrap();
      console.log(createBrand);
      toast.success(createBrand?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
