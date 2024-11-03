import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useCreateBrandMutation,
  useGetbrandQuery,
  useGetCompanyDetailsQuery,
  useGetCompanyIdQuery,
} from "../../features/api";
import { modifyPayload } from "../../utils/modifyPayload";
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

  // Fetch existing brand details
  const { data: brandData, isLoading, isError } = useGetbrandQuery(companyId); // Assuming this fetches existing brand data

  const initialSelectedFiles = {
    file1: brandData?.data?.darkImageUrl || "",
    file2: brandData?.data?.lightImageUrl || null,
    file3: brandData?.data?.favImageUrl || null,
  };

  // Set initial values based on fetched brand data
  const initialValues = {
    titleText: brandData?.data?.titleText || "",
    footerText: brandData?.data?.footerText || "",
    language: brandData?.data?.language || "",
    darkLogo: brandData?.data?.darkImageUrl || "",
    lightLogo: brandData?.data?.lightImageUrl || "",
    favLogo: brandData?.data?.favImageUrl || "",
  };

  const [selectedFiles, setSelectedFiles] = useState({});

  if (isLoading && !isError) return "Loading...";
  // Handle file changes
  const handleFileChange = (event, fileKey, setFieldValue) => {
    setSelectedFiles((prevState) => ({
      ...prevState,
      [fileKey]: event.target.files[0],
    }));

    setFieldValue(fileKey, event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const formData = new FormData();

    let modifyData = modifyPayload({
      ...values,
      company_id: companyData?.data?.id,
      companyName: companyData?.data?.company_name,
    });

    // console.log(modifyData);

    // Append form fields
    // formData.append("titleText", values.titleText);
    // formData.append("footerText", values.footerText);
    // formData.append("language", values.language);
    // formData.append("darkLogo", values.darkLogo);
    // formData.append("lightLogo", values.lightLogo);
    // formData.append("favLogo", values.favLogo);
    formData.append("companyName", companyData?.data?.company_name);
    formData.append("company_id", companyData?.data?.id);

    // Append files
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        formData.append(key, values[key]);
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
      {({ setFieldValue }) => (
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
                  handleFileChange={(event) =>
                    handleFileChange(event, "darkLogo", setFieldValue)
                  }
                  selectedFile={selectedFiles.file1}
                  name="darkLogo"
                />
                <LogoUploadCard
                  title="Logo Light"
                  handleFileChange={(event) =>
                    handleFileChange(event, "lightLogo", setFieldValue)
                  }
                  selectedFile={selectedFiles.file2}
                  name="lightLogo"
                />
                <LogoUploadCard
                  title="Favicon"
                  handleFileChange={(event) =>
                    handleFileChange(event, "favLogo", setFieldValue)
                  }
                  selectedFile={selectedFiles.file3}
                  name="favLogo"
                />
                <input
                  type="file"
                  name="filecheck"
                  onChange={(event) =>
                    handleFileChange(event, "filecheck", setFieldValue)
                  }
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
