import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useRegisterUserMutation } from "../../features/api";

const UserRegistration = ({ onClose }) => {
  const [register, { isLoading }] = useRegisterUserMutation();
  const [type, setType] = useState("password");

  const handleToggle = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="py-4 md:w-full lg:w-[400px]">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.first_name) {
            errors.first_name = "Required";
          } else if (values.first_name.length < 3) {
            errors.first_name = "Must be at least 3 characters";
          }

          if (!values.last_name) {
            errors.last_name = "Required";
          } else if (values.last_name.length < 2) {
            errors.last_name = "Must be at least 2 characters";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.phone) {
            errors.phone = "Required";
          } else if (values.phone.length !== 11) {
            errors.phone = "Phone number must be 11 digits";
          }

          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Must be at least 6 characters";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await register(values).unwrap();
            toast.success("User registration successfully completed!");
            onClose();
          } catch (error) {
            toast.error("User registration failed!");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {["first_name", "last_name", "email", "phone"].map((field) => (
              <div key={field} className="mb-3">
                <label
                  htmlFor={field}
                  className="text-md capitalize text-[#797979]"
                >
                  {field.replace("_", " ")}
                </label>
                <Field
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field === "email" ? "coder@gmail.com" : ""}
                  className="mb-1 mt-1 h-12 w-full rounded-md border border-[#3686FF] px-2 dark:bg-dark-box"
                />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
            ))}

            <label htmlFor="password" className="text-md text-[#797979]">
              Password
            </label>
            <div className="relative mb-3">
              <Field
                type={type}
                name="password"
                className="h-12 w-full rounded-md border border-[#3686FF] px-2 dark:bg-dark-box"
                placeholder="Enter your password"
              />
              <span
                className="absolute right-3 top-4 cursor-pointer"
                onClick={handleToggle}
              >
                {type === "password" ? <LuEyeOff /> : <LuEye />}
              </span>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-sm text-red-500"
            />

            <button
              className="mt-4 w-full rounded-md bg-[#61638A] px-10 py-2 text-white disabled:opacity-50"
              type="submit"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserRegistration;
