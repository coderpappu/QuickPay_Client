import { Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-hot-toast";
import {
  useCreateNotificationSettingMutation,
  useGetCompanyIdQuery,
  useGetNotificationSettingQuery,
} from "../../features/api";
import CardSkeleton from "../../skeletons/card";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";
import SwitchCard from "./SwitchCard";

const NotificationCard = () => {
  const { data: company_id } = useGetCompanyIdQuery();
  const [createNotification] = useCreateNotificationSettingMutation();
  const {
    data: notificationSettings,
    isLoading,
    isError,
  } = useGetNotificationSettingQuery(company_id);

  if (isLoading && !isError) return <CardSkeleton />;

  const initialValues = {
    newUser: notificationSettings?.data?.newUser || false,
    newLeave: notificationSettings?.data?.newLeave || false,
    complaintResent: notificationSettings?.data?.complaintResent || false,
    leaveActionSent: notificationSettings?.data?.leaveActionSent || false,
    payslipSent: notificationSettings?.data?.payslipSent || false,
    registrationSent: notificationSettings?.data?.registrationSent || false,
    terminationSent: notificationSettings?.data?.terminationSent || false,
    transferSent: notificationSettings?.data?.transferSent || false,
    warningSent: notificationSettings?.data?.warningSent || false,
  };

  const handleSubmit = async (values) => {
    try {
      const notificationSetting = await createNotification({
        ...values,
        company_id,
      }).unwrap();

      toast.success(notificationSetting?.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
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
