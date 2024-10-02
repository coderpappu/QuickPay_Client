import React from "react";
import SettingCardHeader from "./SettingCardHeader";
import SettingCardFooter from "./SettingCardFooter";
import BrandCardWrapper from "./BrandCardWrapper";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { InputBox } from "./BrandInput";
import InputTitle from "./InputTitle";

const BiometricCard = () => {
  return (
    <>
      <BrandCardWrapper>
        {/* setting card heading  */}
        <SettingCardHeader
          title="Biometric Settings"
          subTitle="Edit your biometric settings"
        />
        <div className="px-6 py-3">
          <Formik
            // initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form Values: ", values);
            }}
          >
            {() => (
              <Form>
                <div className="flex flex-wrap justify-between items-center">
                  <div className="w-[50%]">
                    <InputTitle title="ZKTeco Api URL" />
                    <InputBox
                      name="url"
                      type="text"
                      placeholder="ZKTeco Api URL"
                    />
                  </div>
                  <div className="w-[22%]">
                    <InputTitle title="Username" />
                    <InputBox
                      name="username"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <div className="w-[22%]">
                    <InputTitle title="Password" />
                    <InputBox
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="w-[70%] my-3">
                  <InputTitle title="Auth Token" />
                  <textarea
                    placeholder="pleae provide the auth token"
                    className="p-3 w-full bg-light-bg dark:bg-dark-box border-none outline-none rounded-md"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <SettingCardFooter title="Save" />
      </BrandCardWrapper>
    </>
  );
};

export default BiometricCard;
