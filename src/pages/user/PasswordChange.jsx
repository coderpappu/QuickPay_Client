/* eslint-disable react/prop-types */
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import * as Yup from "yup";
import InputTitle from "../../components/company/InputTitle";
import { useUpdatePasswordMutation } from "../../features/api";
3;
const PasswordChange = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatePassword] = useUpdatePasswordMutation();

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values) => {
    // Handle form submission
    try {
      await updatePassword(values).unwrap();
      toast.success("User password successfully updated!");
    } catch (error) {
      toast.error("User password update failed!");
    }
  };

  return (
    <Formik
      initialValues={{ oldPassword: "", newPassword: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="rounded-mde mb-2 mt-5 flex w-full flex-wrap justify-between">
          <div className="relative w-[49%] rounded-md bg-white p-4 dark:bg-dark-card">
            <h1 className="mb-4 text-xl font-medium dark:text-dark-heading-color">
              Password Recover
            </h1>
            <InputTitle title="Old Password" />
            <div className="relative">
              <Field
                name="oldPassword"
                type={showOldPassword ? "text" : "password"}
                placeholder="Old Password"
                className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-2 top-3"
              >
                {showOldPassword ? <VscEyeClosed /> : <VscEye />}
              </button>
            </div>
            <ErrorMessage
              name="oldPassword"
              component="div"
              className="text-sm text-red-500"
            />

            <InputTitle title="New Password" />
            <div className="relative">
              <Field
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-2 top-3"
              >
                {showNewPassword ? <VscEyeClosed /> : <VscEye />}
              </button>
            </div>
            <ErrorMessage
              name="newPassword"
              component="div"
              className="text-sm text-red-500"
            />

            <InputTitle title="Confirm Password" />
            <div className="relative">
              <Field
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-3"
              >
                {showConfirmPassword ? <VscEyeClosed /> : <VscEye />}
              </button>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-sm text-red-500"
            />

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-button-bg p-2 text-white"
            >
              Change Password
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordChange;
