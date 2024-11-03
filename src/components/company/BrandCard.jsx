import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
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

  // Fetch existing brand details
  const { data: brandData, isLoading, isError } = useGetbrandQuery(companyId); // Assuming this fetches existing brand data

  // Set initial values based on fetched brand data
  // Set initial values based on fetched brand data
  const initialValues = {
    titleText: brandData?.data?.titleText || "",
    footerText: brandData?.data?.footerText || "",
    language: brandData?.data?.language || "",
    darkLogo: brandData?.data?.darkImageUrl || "",
    lightLogo: brandData?.data?.lightImageUrl || "",
    favLogo: brandData?.data?.favImageUrl || "",
    darkLogoPreview: brandData?.data?.darkImageUrl || "",
    lightLogoPreview: brandData?.data?.lightImageUrl || "",
    favLogoPreview: brandData?.data?.favImageUrl || "",
  };

  if (isLoading && !isError) return "Loading...";

  // Handle file changes
  // Handle file changes to show image preview
  const handleFileChange = (event, fileKey, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      // Set the file object for submission
      setFieldValue(fileKey, file);

      // Create a preview URL for the file and store it in a corresponding preview key
      const previewKey = `${fileKey}Preview`;
      setFieldValue(previewKey, URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const formData = new FormData();

    // let modifyData = modifyPayload({
    //   ...values,
    //   company_id: companyData?.data?.id,
    //   companyName: companyData?.data?.company_name,
    // });

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
      {({ setFieldValue, values }) => (
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
                  selectedFile={values.darkLogoPreview} // Show the preview image
                  name="darkLogo"
                />
                <LogoUploadCard
                  title="Logo Light"
                  handleFileChange={(event) =>
                    handleFileChange(event, "lightLogo", setFieldValue)
                  }
                  selectedFile={values.lightLogoPreview} // Show the preview image
                  name="lightLogo"
                />
                <LogoUploadCard
                  title="Favicon"
                  handleFileChange={(event) =>
                    handleFileChange(event, "favLogo", setFieldValue)
                  }
                  selectedFile={values.favLogoPreview} // Show the preview image
                  name="favLogo"
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
