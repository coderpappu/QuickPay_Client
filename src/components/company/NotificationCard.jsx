import { Field, Form, Formik } from "formik";
import React from "react";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";
import SwitchCard from "./SwitchCard";

const NotificationCard = () => {
  const initialValues = {
    newUser: false,
    newLeave: false,
    complaintResent: false,
    leaveActionSent: false,
    payslipSent: false,
    registrationSent: false,
    terminationSent: false,
    transferSent: false,
    warningSent: false,
  };

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <BrandCardWrapper>
            {/* Setting card heading */}
            <SettingCardHeader
              title="Brand Settings"
              subTitle="Edit your brand details"
            />

            <div className="px-6 py-3">
              <div className="flex justify-between items-center my-2">
                <div className="w-[32%]">
                  <Field
                    name="newUser"
                    component={SwitchCard}
                    title="New User"
                  />
                </div>
                <div className="w-[32%]">
                  <Field
                    name="newLeave"
                    component={SwitchCard}
                    title="New Leave"
                  />
                </div>
                <div className="w-[32%]">
                  <Field
                    name="complaintResent"
                    component={SwitchCard}
                    title="Complaint Resent"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center my-2">
                <div className="w-[32%]">
                  <Field
                    name="leaveActionSent"
                    component={SwitchCard}
                    title="Leave Action Sent"
                  />
                </div>
                <div className="w-[32%]">
                  <Field
                    name="payslipSent"
                    component={SwitchCard}
                    title="Payslip Sent"
                  />
                </div>
                <div className="w-[32%]">
                  <Field
                    name="registrationSent"
                    component={SwitchCard}
                    title="Registration Sent"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center my-2">
                <div className="w-[32%]">
                  <Field
                    name="terminationSent"
                    component={SwitchCard}
                    title="Termination Sent"
                  />
                </div>
                <div className="w-[32%]">
                  <Field
                    name="transferSent"
                    component={SwitchCard}
                    title="Transfer Sent"
                  />
                </div>
                <div className="w-[32%]">
                  <Field
                    name="warningSent"
                    component={SwitchCard}
                    title="Warning Sent"
                  />
                </div>
              </div>
            </div>

            <SettingCardFooter title="Save" />
          </BrandCardWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default NotificationCard;
