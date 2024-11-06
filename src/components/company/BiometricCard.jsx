import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import {
  useCreateBiometricSettingMutation,
  useGetCompanyIdQuery,
} from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import { InputBox } from "./BrandInput";
import InputTitle from "./InputTitle";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";

const BiometricCard = () => {
  const { data: company_id } = useGetCompanyIdQuery();

  const [createBiometricSettings] = useCreateBiometricSettingMutation();

  // Initial values for the form fields
  const initialValues = {
    url: "",
    username: "",
    password: "",
    authToken: "", // optional field for auth token
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
    <>
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
                <div className="flex flex-wrap justify-between items-center">
                  <div className="w-[50%] mb-4">
                    <InputTitle title="ZKTeco Api URL" />
                    <InputBox
                      name="url"
                      type="text"
                      placeholder="ZKTeco Api URL"
                    />
                    <ErrorMessage
                      name="url"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[22%] mb-4">
                    <InputTitle title="Username" />
                    <InputBox
                      name="username"
                      type="text"
                      placeholder="Username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[22%] mb-4">
                    <InputTitle title="Password" />
                    <InputBox
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <div className="w-[70%] my-3">
                  <InputTitle title="Auth Token" />
                  <textarea
                    name="authToken"
                    placeholder="Please provide the auth token"
                    className="p-3 w-full bg-light-bg dark:bg-dark-box border-none outline-none rounded-md"
                  />
                  <ErrorMessage
                    name="authToken"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <SettingCardFooter title="Save" />
              </div>
            </BrandCardWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BiometricCard;
