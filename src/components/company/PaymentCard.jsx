import { ErrorMessage, Field, Form, Formik } from "formik";
import { ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import {
  useCreatePaymentSettingsMutation,
  useGetCompanyIdQuery,
  useGetPaymentSettingsQuery,
} from "../../features/api";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "./accordion";
import BrandCardWrapper from "./BrandCardWrapper";
import PaymentInput from "./PaymentInput";
import RadioInput from "./RadioInput";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  bankDetails: Yup.string().required("Bank details are required"),
  stripeKey: Yup.string().required("Stripe Key is required"),
  stripeSecretKey: Yup.string().required("Stripe Secret is required"),
  paypalMode: Yup.string().required("Please select Paypal Mode"),
  paypalClientId: Yup.string().required("Client ID is required"),
  paypalSecretKey: Yup.string().required("Secret Key is required"),
});

const PaymentCard = () => {
  const { data: companyId } = useGetCompanyIdQuery();

  const [paymentSettings] = useCreatePaymentSettingsMutation();
  const { data: paymentSettingsData, isLoading } =
    useGetPaymentSettingsQuery(companyId);

  if (isLoading) return <p>Loading...</p>;

  const initialValues = {
    bankDetails: paymentSettingsData?.data?.bankDetails || "",
    stripeKey: paymentSettingsData?.data?.stripeKey || "",
    stripeSecretKey: paymentSettingsData?.data?.stripeSecretKey || "",
    paypalMode: paymentSettingsData?.data?.paypalMode || "",
    paypalClientId: paymentSettingsData?.data?.paypalClientId || "",
    paypalSecretKey: paymentSettingsData?.data?.paypalSecretKey || "",
  };

  const handleSubmit = async (values) => {
    await paymentSettings({ ...values, company_id: companyId });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <BrandCardWrapper>
            <SettingCardHeader
              title="Payment Settings"
              subTitle="Edit your payment details"
            />
            <div className="my-3 px-6 ">
              <Accordion defaultValue={["item-1", "item-2"]}>
                {/* Bank Transfer */}
                <AccordionItem value="item-1">
                  <AccordionHeader
                    className="bg-dark-bg"
                    icon={<ArrowRight size={15} color="#0F172A" />}
                  >
                    Bank Transfer
                  </AccordionHeader>
                  <AccordionPanel>
                    <h2 className="text-sm mb-2">Bank Details</h2>
                    <Field
                      as="textarea"
                      name="bankDetails"
                      placeholder="Write here"
                      className="p-3 w-full bg-light-bg dark:bg-dark-card border-none outline-none rounded-md"
                    />
                    <ErrorMessage
                      name="bankDetails"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                    <p className="text-xs my-2">
                      Example: Bank: bank name. Account Number: 0000 0000
                    </p>
                  </AccordionPanel>
                </AccordionItem>

                {/* Stripe */}
                <AccordionItem value="item-2">
                  <AccordionHeader
                    icon={<ArrowRight size={15} color="#0F172A" />}
                  >
                    Stripe
                  </AccordionHeader>
                  <AccordionPanel>
                    <div className="flex w-full justify-between">
                      <div className="w-[48%]">
                        <PaymentInput
                          title="Stripe Key"
                          name="stripeKey"
                          placeholder="Enter stripe key"
                          component={Field}
                        />
                        <ErrorMessage
                          name="stripeKey"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div className="w-[48%]">
                        <PaymentInput
                          title="Stripe Secret"
                          name="stripeSecretKey"
                          placeholder="Enter stripe secret"
                          component={Field}
                        />
                        <ErrorMessage
                          name="stripeSecretKey"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </div>
                  </AccordionPanel>
                </AccordionItem>

                {/* Paypal */}
                <AccordionItem value="item-3">
                  <AccordionHeader
                    icon={<ArrowRight size={15} color="#0F172A" />}
                  >
                    Paypal
                  </AccordionHeader>
                  <AccordionPanel>
                    <div className="flex justify-start gap-5 items-center my-5">
                      <RadioInput
                        title="Sandbox"
                        name="paypalMode"
                        type="radio"
                        value="Sandbox"
                        onClick={() => setFieldValue("paypalMode", "sandbox")}
                      />
                      <RadioInput
                        title="Live"
                        name="paypalMode"
                        type="radio"
                        value="Live"
                        onClick={() => setFieldValue("paypalMode", "live")}
                      />
                      <ErrorMessage
                        name="paypalMode"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="w-[48%]">
                        <PaymentInput
                          title="Client ID"
                          name="paypalClientId"
                          placeholder="Client id"
                          component={Field}
                        />
                        <ErrorMessage
                          name="paypalClientId"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div className="w-[48%]">
                        <PaymentInput
                          title="Secret Key"
                          name="paypalSecretKey"
                          placeholder="Secret key"
                          component={Field}
                        />
                        <ErrorMessage
                          name="paypalSecretKey"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>

            <SettingCardFooter title={"Save"} />
          </BrandCardWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentCard;
