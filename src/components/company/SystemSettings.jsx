import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useCreateSystemSettingsMutation } from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import { InputBox, SelectOptionBox } from "./BrandInput";
import InputTitle from "./InputTitle";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  date_format: Yup.string().required("Date format is required"),
  time_format: Yup.string().required("Time format is required"),
});

// Array of form fields (two fields per row)
const formFields = [
  [
    {
      name: "date_format",
      title: "Date Format",
      placeholder: "",
      list: ["dd-mm-yyyy", "mm-dd-yyyy", "yyyy-dd-mm"],
      type: "list",
    },
    {
      name: "time_format",
      title: "Time Format",
      placeholder: "",
      list: ["10.30PM", "10.00pm", "22.30"],
      type: "list",
    },
  ],
];

const CompanySettings = () => {
  const [createSystemSetting] = useCreateSystemSettingsMutation();

  const initialValues = {
    date_format: "",
    time_format: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await createSystemSetting(values);
          toast.success("Settings updated successfully!");
        } catch (error) {
          toast.error("Something went wrong!");
        }
      }}
    >
      {() => (
        <Form>
          <BrandCardWrapper>
            <SettingCardHeader
              title="Company Settings"
              subTitle="Edit your company settings"
            />

            <div className="px-6 py-4">
              {/* Mapping over the formFields array and displaying two fields per row */}
              {formFields.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex flex-wrap justify-between my-3"
                >
                  {row.map(
                    ({ name, title, placeholder, type = "text", list }) => (
                      <div key={name} className="w-[49%]">
                        <InputTitle title={title} />
                        {type == "list" ? (
                          <>
                            <SelectOptionBox values={list} name={name} />
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
                          className="text-red-500 text-sm"
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Save Button */}
            <SettingCardFooter title="Save" />
          </BrandCardWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default CompanySettings;
