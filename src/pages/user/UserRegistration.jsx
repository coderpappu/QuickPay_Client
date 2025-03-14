import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useRegisterUserMutation } from "../../features/api";

const UserRegistration = ({ onClose }) => {
  const [register, { data, isError, isLoading }] = useRegisterUserMutation();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(LuEyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(LuEye);
      setType("text");
    } else {
      setIcon(LuEyeOff);
      setType("password");
    }
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
          // first name
          if (!values.first_name) {
            errors.first_name = "Required";
          } else if (values.first_name.length < 3) {
            errors.first_name = "First name Must be at least 3 characters ";
          }
          // Last Name
          if (!values.last_name) {
            errors.last_name = "Required";
          } else if (values.last_name.length < 2) {
            errors.last_name = "Last name Must be at least 2 characters ";
          }
          // email
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          // phone
          if (!values.phone) {
            errors.phone = "Required";
          } else if (values.phone.length < 10) {
            errors.phone = "Phone number must be at least 10 characters";
          }
          // password
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const userData = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone,
            password: values.password,
          };
          try {
            await register(userData).unwrap();

            toast.success("User registration successfully completed!");
            onClose();
          } catch (error) {
            toast.error("User registration fail!");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="first_name" className="text-md text-[#797979]">
              First Name
            </label>
            <Field
              type="text"
              name="first_name"
              placeholder="Pappu"
              className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] px-1 dark:bg-dark-box"
            />
            <ErrorMessage
              name="first_name"
              component="div"
              className="text-[red]"
            />

            <label htmlFor="last_name" className="text-md text-[#797979]">
              Last Name
            </label>
            <Field
              type="text"
              name="last_name"
              placeholder="Dey"
              className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] px-1 dark:bg-dark-box"
            />
            <ErrorMessage
              name="last_name"
              component="div"
              className="text-[red]"
            />

            <label htmlFor="email" className="text-md text-[#797979]">
              Email Address
            </label>
            <Field
              type="email"
              name="email"
              placeholder="coder@gmail.com"
              className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] px-1 dark:bg-dark-box"
            />
            <ErrorMessage name="email" component="div" className="text-[red]" />

            <label htmlFor="phone" className="text-md text-[#797979]">
              Phone
            </label>
            <Field
              type="text"
              name="phone"
              placeholder="0152536362"
              className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] px-1 dark:bg-dark-box"
            />
            <ErrorMessage name="phone" component="div" className="text-[red]" />

            <label htmlFor="password" className="text-md text-[#797979]">
              Password
            </label>
            <div className="mb-4 flex">
              <Field
                type={type}
                name="password"
                autoComplete="current-password"
                className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] px-1 dark:bg-dark-box"
                placeholder="12345678"
              />
              <span
                className="flex items-center justify-around"
                onClick={handleToggle}
              >
                {type !== "password" ? (
                  <LuEye className="absolute mr-10" />
                ) : (
                  <LuEyeOff className="absolute mr-10" />
                )}
              </span>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-[red]"
            />

            <button
              className="mt-4 rounded-md bg-[#61638A] px-10 py-2 text-white lg:px-16 lg:py-3"
              type="submit"
              disabled={isSubmitting}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserRegistration;
