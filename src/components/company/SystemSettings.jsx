import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import {
  useCreateSystemSettingsMutation,
  useGetSystemSettingsQuery,
} from "../../features/api";
import CardSkeleton from "../../skeletons/card";
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
      list: ["MM-DD-YYYY", "DD-MM-YYYY", "YYYY-MM-DD"],
      type: "list",
    },
    {
      name: "time_format",
      title: "Time Format",
      placeholder: "",
      list: ["HH:mm:ss", "hh:mm", "hh:mm A", "hh:mm a"],
      type: "list",
    },
  ],
];

const CompanySettings = () => {
  const [createSystemSetting] = useCreateSystemSettingsMutation();
  const companyId = useSelector((state) => state.company.companyId);
  const {
    data: systemSettingData,
    isLoading,
    isError,
  } = useGetSystemSettingsQuery(companyId);

  if (isLoading && !isError) return <CardSkeleton />;
  if (isError) return "Something went wrong!";
  if (!isLoading && !isError && !systemSettingData?.data)
    return <div>No data found!</div>;

  const initialValues = {
    date_format: systemSettingData?.data?.date_format || "",
    time_format: systemSettingData?.data?.time_format || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await createSystemSetting({ ...values, company_id: companyId });
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
                  className="my-3 flex flex-wrap justify-between"
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
                          className="text-sm text-red-500"
                        />
                      </div>
                    ),
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
