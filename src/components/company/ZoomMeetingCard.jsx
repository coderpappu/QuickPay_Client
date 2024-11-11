import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup"; // Import Yup for validation
import {
  useCreateZoomSettingMutation,
  useGetCompanyIdQuery,
  useGetZoomSettingQuery,
} from "../../features/api";
import CardSkeleton from "../../skeletons/card";
import BrandCardWrapper from "./BrandCardWrapper";
import { InputBox } from "./BrandInput";
import InputTitle from "./InputTitle";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";

const ZoomMeetingCard = () => {
  const [createZoomSetting] = useCreateZoomSettingMutation();
  const { data: company_id } = useGetCompanyIdQuery();

  const {
    data: zoomSettings,
    isLoading,
    isError,
  } = useGetZoomSettingQuery(company_id);

  if (isLoading && !isError) return <CardSkeleton />;

  // Initial form values
  const initialValues = {
    zoom_id: zoomSettings?.data?.zoom_id || "",
    client_id: zoomSettings?.data?.client_id || "",
    secret_key: zoomSettings?.data?.secret_key || "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    zoom_id: Yup.string().required("Zoom Account ID is required"),
    client_id: Yup.string().required("Zoom Client ID is required"),
    secret_key: Yup.string().required("Zoom Client Secret Key is required"),
  });

  return (
    <BrandCardWrapper>
      <SettingCardHeader
        title="Payment Settings"
        subTitle="Edit your payment details"
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log("Form Values: ", values);
          await createZoomSetting({ ...values, company_id });
          // Add your form submission logic here
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="px-6 py-3">
              <div className="flex justify-between my-2">
                <div className="w-[48%]">
                  <InputTitle title="Zoom Account ID" />
                  <Field name="zoom_id">
                    {({ field }) => (
                      <InputBox
                        {...field}
                        type="text"
                        placeholder="Enter the zoom account id"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="zoom_id"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="w-[48%]">
                  <InputTitle title="Zoom Client ID" />
                  <Field name="client_id">
                    {({ field }) => (
                      <InputBox
                        {...field}
                        type="text"
                        placeholder="Enter the zoom client id"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="client_id"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
              <div className="flex justify-between my-2">
                <div className="w-[48%]">
                  <InputTitle title="Zoom Client Secret Key" />
                  <Field name="secret_key">
                    {({ field }) => (
                      <InputBox
                        {...field}
                        type="text"
                        placeholder="Enter the zoom client secret key"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="secret_key"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
            </div>
            <SettingCardFooter title="Save" />
          </Form>
        )}
      </Formik>
    </BrandCardWrapper>
  );
};

export default ZoomMeetingCard;
