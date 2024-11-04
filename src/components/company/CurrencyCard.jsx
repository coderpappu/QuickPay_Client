import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  useCreateCurrencySettingMutation,
  useGetCompanyIdQuery,
  useGetCurrencySettingQuery,
} from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import { InputBox, SelectOptionBox } from "./BrandInput";
import InputTitle from "./InputTitle";
import RadioInput from "./RadioInput";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  currency: Yup.string().required("Currency is required"),
  currency_symbol: Yup.string().required("Currency symbol is required"),
});

const formFields = [
  // ... (rest of your form fields)
  [
    {
      name: "currency",
      title: "Currency*",
      placeholder: "",
      type: "text",
    },
    {
      name: "currency_symbol",
      title: "Currency Symbol*",
      placeholder: "",
      type: "text",
    },
  ],
  [
    {
      name: "number_format",
      title: "Decimal Number Format",
      placeholder: "",
      type: "text",
    },
    {
      name: "float_number",
      title: "Float Number",
      placeholder: "",
      list: ["Comma", "Dot"],
      type: "list",
    },
  ],
  [
    {
      name: "decimal_separator",
      title: "Decimal Separator",
      placeholder: "",
      list: ["Dot", "Comma"],
      type: "list",
    },
    {
      name: "thousands_separator",
      title: "Thousands Separator",
      placeholder: "",
      list: ["Dot", "Comma"],
      type: "list",
    },
  ],
];

const CurrencyCard = () => {
  const { data: companyId } = useGetCompanyIdQuery();

  const [createCurrencySetting] = useCreateCurrencySettingMutation();
  const {
    data: currencySettingData,
    isLoading,
    isError,
  } = useGetCurrencySettingQuery(companyId);

  if (isLoading && !isError) return <div>Loading...</div>;

  const initialValues = {
    currency: currencySettingData?.data?.currency || "",
    currency_symbol: currencySettingData?.data?.symbol || "",
    number_format: currencySettingData?.data?.decimal_format || "",
    float_number: currencySettingData?.data?.float_format || "",
    decimal_separator: currencySettingData?.data?.decimal_format || "",
    thousands_separator: currencySettingData?.data?.thousand_separator || "",

    currencySymbolPosition:
      currencySettingData?.data?.currency_position || "Pre",
    currencySymbolSpace:
      currencySettingData?.data?.currency_space || "With Space",
    currencySymbolAndName:
      currencySettingData?.data?.currency_symbol_name || "With Currency Symbol",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await createCurrencySetting({ ...values, companyId });
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
                <div className="px-6 py-3 flex justify-between" key={rowIndex}>
                  {row.map(
                    (
                      { name, title, placeholder, type = "text", list },
                      rowIndex
                    ) => (
                      <div className="w-[48%] relative" key={rowIndex}>
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
                          className="text-red-500 text-xs "
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
              <div className="flex justify-between px-6">
                <div className="w-[48%]  pr-44">
                  <InputTitle title={"Currency Symbol Position"} />
                  <div className="flex flex-wrap justify-between mt-2">
                    <RadioInput
                      title={"Pre"}
                      name={"currencySymbolPosition"}
                      value="Pre"
                    />

                    <RadioInput
                      title={"Post"}
                      name={"currencySymbolPosition"}
                      value="Post"
                    />
                  </div>
                </div>

                <div className="w-[48%]  pr-44">
                  <InputTitle title={"Currency Symbol Space"} />
                  <div className="flex flex-wrap justify-between mt-2">
                    <RadioInput
                      title={"With Space"}
                      name={"currencySymbolSpace"}
                      value="With Space"
                    />
                    <RadioInput
                      title={"Without space"}
                      value={"Without space"}
                      name={"currencySymbolSpace"}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6 px-6">
                <div className="w-[48%]  pr-14">
                  <InputTitle title={"Currency Symbol & Name"} />
                  <div className="flex flex-wrap justify-between mt-2">
                    <RadioInput
                      title={"With Currency Symbol"}
                      value={"With Currency Symbol"}
                      name={"currencySymbolAndName"}
                    />
                    <RadioInput
                      title={" With Currency Name"}
                      value={" With Currency Name"}
                      name={"currencySymbolAndName"}
                    />
                  </div>
                </div>
                <div className="w-[48%]">
                  <p className="dark:text-dark-text-color text-sm">
                    Preview : 10.000,00USD
                  </p>
                </div>
              </div>
            </div>

            {/* card footer  */}
            <SettingCardFooter title={"Save"} />
          </BrandCardWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default CurrencyCard;
