import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import {
  useCreateEmailSettingMutation,
  useGetCompanyIdQuery,
  useGetEmailSettingQuery,
} from "../../features/api";
import CardSkeleton from "../../skeletons/card";
import BrandCardWrapper from "./BrandCardWrapper";
import { InputBox, SelectOptionBox } from "./BrandInput";
import InputTitle from "./InputTitle";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  driver: Yup.string().required("Mail Driver is required"),
  host: Yup.string().required("Host is required"),
  port: Yup.string().required("Mail Port is required"),
  username: Yup.string().required("Mail Username is required"),
  password: Yup.string().required("Mail Password is required"),
  encryption: Yup.string().required("Mail Encryption is required"),
  address: Yup.string().required("Mail from Address is required"),
  fromName: Yup.string().required("Mail From Name is required"),
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
      name: "fromName",
      title: "Mail From Name",
      placeholder: "Enter mail from name",
      type: "text",
    },
  ],
];

const EmailCard = () => {
  const { data: company_id } = useGetCompanyIdQuery();
  const [createEmailSettings] = useCreateEmailSettingMutation();
  const {
    data: emailSettings,
    isLoading,
    isError,
  } = useGetEmailSettingQuery(company_id);

  if (isLoading && !isError) return <CardSkeleton />;

  const initialValues = {
    driver: emailSettings?.data?.driver || "",
    host: emailSettings?.data?.host || "",
    port: emailSettings?.data?.port || "",
    username: emailSettings?.data?.username || "",
    password: emailSettings?.data?.password || "",
    encryption: emailSettings?.data?.encryption || "",
    address: emailSettings?.data?.address || "",
    fromName: emailSettings?.data?.fromName || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          const emailSetting = await createEmailSettings({
            ...values,
            company_id,
          });
          toast.success(emailSetting?.data?.message);
        } catch (error) {
          toast.error(error.message);
        }
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
