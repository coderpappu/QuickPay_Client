import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import {
  useCreateBiometricSettingMutation,
  useGetBiometricSettingQuery,
} from "../../features/api";
import CardSkeleton from "../../skeletons/card";
import BrandCardWrapper from "./BrandCardWrapper";
import { InputBox } from "./BrandInput";
import InputTitle from "./InputTitle";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";

const BiometricCard = () => {
  const companyId = useSelector((state) => state.company.companyId);

  const [createBiometricSettings] = useCreateBiometricSettingMutation();

  const {
    data: biometricSettings,
    isLoading,
    isError,
  } = useGetBiometricSettingQuery(companyId);

  if (isLoading) return <CardSkeleton />;

  // Initial values for the form fields
  const initialValues = {
    url: biometricSettings?.data?.url || "",
    username: biometricSettings?.data?.username || "",
    password: biometricSettings?.data?.password || "",
    authToken: biometricSettings?.data?.authToken || "", // optional field for auth token
  };

  // Validation schema
  const validationSchema = Yup.object({
    url: Yup.string()
      .url("Please enter a valid URL")
      .required("URL is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    authToken: Yup.string(), // optional field
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          let biometricSettings = await createBiometricSettings({
            ...values,
            company_id,
          }).unwrap();

          toast.success(biometricSettings?.message);
        } catch (error) {
          toast.error(error.message);
        }
      }}
    >
      {() => (
        <Form>
          <BrandCardWrapper>
            <SettingCardHeader
              title="Biometric Settings"
              subTitle="Edit your biometric settings"
            />
            <div className="px-6 py-3">
              <div className="flex flex-wrap items-center justify-between">
                <div className="mb-4 w-[50%]">
                  <InputTitle title="ZKTeco Api URL" />
                  <InputBox
                    name="url"
                    type="text"
                    placeholder="ZKTeco Api URL"
                  />
                  <ErrorMessage
                    name="url"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div className="mb-4 w-[22%]">
                  <InputTitle title="Username" />
                  <InputBox
                    name="username"
                    type="text"
                    placeholder="Username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div className="mb-4 w-[22%]">
                  <InputTitle title="Password" />
                  <InputBox
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
              </div>
              <div className="my-3 w-[70%]">
                <InputTitle title="Auth Token" />
                <Field
                  name="authToken"
                  as="textarea"
                  placeholder="Please provide the auth token"
                  className="w-full rounded-md border-none bg-light-bg p-3 outline-none dark:bg-dark-box dark:text-dark-text-color"
                />
                <ErrorMessage
                  name="authToken"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <SettingCardFooter title="Save" />
            </div>
          </BrandCardWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default BiometricCard;
