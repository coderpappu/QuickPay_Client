import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";

const RegistrationForm = ({ registerHandler }) => {
  const [password, setPassword] = useState("");
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
    <div className="w-full md:w-[50%]  h-full pt-6 xl:pt-10 px-3 sm:px-10 md:px-5">
      <p className="absolute right-8 lg:right-3 xl:right-16 2xl:right-[15%] 2xl:text-md text-[#a8a8a8]">
        Do you have an account?{" "}
        <Link to="/login" className="text-[#61638A]">
          Sign In Now
        </Link>
      </p>
      <h2 className="text-2xl font-semibold pt-16 mb-6">
        Account <label className="text-[#6D28D9] font-bold">Register</label>{" "}
      </h2>
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

            if (!values.phone) {
              errors.last_name = "Required";
            } else if (values.phone.length < 10) {
              errors.last_name = "phone number at least 11 characters";
            }

            // password
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 6) {
              errors.password = "Password must be at least 6  characters";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            registerHandler(
              values.first_name,
              values.last_name,
              values.email,
              values.phone,
              values.password
            );
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="" className="text-md text-[#797979]">
                First Name
              </label>
              <Field
                type="text"
                name="first_name"
                placeholder="Pappu"
                className="w-[100%] h-12 border-1 border-[#6D28D9]	rounded-[5px] mt-1 mb-3 px-1"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-[red]"
              />

              <label htmlFor="" className="text-md text-[#797979]">
                Last Name
              </label>
              <Field
                type="text"
                name="last_name"
                placeholder="Dey"
                className="w-[100%] h-12 border-1 border-[#6D28D9]	rounded-[5px] mt-1 mb-3 px-1"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-[red]"
              />

              <label htmlFor="" className="text-md text-[#797979]">
                Email Address
              </label>
              <Field
                type="email"
                name="email"
                placeholder="coder@gmail.com"
                className="w-[100%] h-12 border-1 border-[#6D28D9]	rounded-[5px] mt-1 mb-3 px-1"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-[red]"
              />

              <label htmlFor="" className="text-md text-[#797979]">
                Phone
              </label>
              <Field
                type="text"
                name="phone"
                placeholder="0152536362"
                className="w-[100%] h-12 border-1 border-[#6D28D9]	rounded-[5px] mt-1 mb-3 px-1"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-[red]"
              />

              <label htmlFor="" className="text-md text-[#797979]">
                Password
              </label>
              <div className="mb-4 flex">
                <Field
                  type={type}
                  name="password"
                  autoComplete="current-password"
                  className="w-[100%] h-12 border-1 border-[#6D28D9]	rounded-[5px] mt-1 mb-3 px-1"
                  placeholder="12345678"
                />
                <span
                  className="flex justify-around items-center"
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
                className="px-10 py-2 lg:px-16 lg:py-3 bg-[#61638A] rounded-md text-white mt-4"
                type="submit"
                disabled={isSubmitting}
              >
                Register
              </button>
              <Toaster position="bottom right" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
