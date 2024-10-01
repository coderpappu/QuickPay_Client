import React from "react";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import SettingCardFooter from "./SettingCardFooter";
import { InputBox } from "./BrandInput";
import { Formik, Field, Form, ErrorMessage } from "formik";
import InputTitle from "./InputTitle";

const ZoomMeetingCard = () => {
  return (
    <BrandCardWrapper>
      <SettingCardHeader
        title="Payment Settings"
        subTitle="Edit your payment details"
      />
      <Formik
        // initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Values: ", values);
        }}
      >
        {() => (
          <Form>
            <div className="px-6 py-3">
              <div className="flex justify-between my-2">
                <div className="w-[48%]">
                  <InputTitle title="Zoom Account ID" />
                  <InputBox
                    name="zood_id"
                    type="text"
                    placeholder="Enter the zoom account id "
                  />
                </div>

                <div className="w-[48%]">
                  <InputTitle title="Zoom Client ID" />
                  <InputBox
                    name="client_id"
                    type="text"
                    placeholder="Enter the zoom client id "
                  />
                </div>
              </div>
              <div className="flex justify-between my-2">
                <div className="w-[48%]">
                  <InputTitle title="Zoom Client Secret Key" />

                  <InputBox
                    name="secret_key"
                    type="text"
                    placeholder="Enter the zoom client secret key"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <SettingCardFooter title="Save" />
    </BrandCardWrapper>
  );
};

export default ZoomMeetingCard;
