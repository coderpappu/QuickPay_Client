import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionWrapper,
} from "./accordion";
import { Plus } from "lucide-react";
import { ArrowRight } from "lucide-react";
import PaymentInput from "./PaymentInput";
import RadioInput from "./RadioInput";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import SettingCardFooter from "./SettingCardFooter";
const PaymentCard = () => {
  return (
    <>
      <BrandCardWrapper>
        <SettingCardHeader
          title="Payment Settings"
          subTitle="Edit your payment details"
        />
        <div className="my-3 px-6 ">
          <Accordion defaultValue={["item-1", "item-2"]}>
            {/* bank  */}
            <AccordionItem value="item-1">
              <AccordionHeader
                className="bg-dark-bg"
                icon={<ArrowRight size={15} color="#0F172A" />}
              >
                Bank Transfer
                <></>
              </AccordionHeader>
              <AccordionPanel>
                <h2 className="text-sm mb-2">Bank Details</h2>
                <textarea
                  placeholder="write here "
                  className="p-3 w-full bg-light-bg dark:bg-dark-card border-none outline-none rounded-md"
                />
                <p className="text-xs my-2">
                  Example : Bank : bank name . Account Number : 0000 0000
                </p>
              </AccordionPanel>
            </AccordionItem>

            {/* stripe  */}
            <AccordionItem value="item-2">
              <AccordionHeader icon={<ArrowRight size={15} color="#0F172A" />}>
                Stripe
              </AccordionHeader>
              <AccordionPanel>
                <div className="flex w-full justify-between">
                  <div className="w-[48%]">
                    {/* heading  */}
                    <PaymentInput
                      title="Stripe Key"
                      placeholder="Enter stripe key"
                    />
                  </div>

                  <div className="w-[48%]">
                    {/* heading  */}

                    <PaymentInput
                      title="Stripe Secret"
                      placeholder="Enter stripe secret"
                    />
                  </div>
                </div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionHeader icon={<ArrowRight size={15} color="#0F172A" />}>
                Paypal
              </AccordionHeader>
              <AccordionPanel>
                <div className="flex justify-start gap-5 items-center my-5">
                  <RadioInput title="Sandbox" />
                  <RadioInput title="Live" />
                </div>
                <div className="flex w-full justify-between">
                  <div className="w-[48%]">
                    {/* heading  */}
                    <PaymentInput title="Client ID" placeholder="Client id" />
                  </div>

                  <div className="w-[48%]">
                    {/* heading  */}

                    <PaymentInput title="Secret Key" placeholder="Secret key" />
                  </div>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>

        <SettingCardFooter title={"Save"} />
      </BrandCardWrapper>
    </>
  );
};

export default PaymentCard;
