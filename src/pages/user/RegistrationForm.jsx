import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";
import { InputBox } from "../../components/company/BrandInput";
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
    <div className="h-full w-full px-3 pt-6 sm:px-10 md:w-[50%] md:px-5 xl:pt-10">
      <p className="2xl:text-md text-[#a8a8a8]">
        Do you have an account?{" "}
        <Link to="/login" className="text-[#61638A]">
          Sign In Now
        </Link>
      </p>
      <h2 className="mb-6 pt-16 text-2xl font-semibold">
        Account{" "}
        <label className="font-bold text-[#3686FF]">Register</label>{" "}
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
              errors.phone = "Required";
            } else if (values.phone.length < 10) {
              errors.phone = "phone number at least 11 characters";
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
              values.password,
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
              <InputBox type="text" name="first_name" placeholder="Pappu" />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-[red]"
              />

              <label htmlFor="" className="text-md text-[#797979]">
                Last Name
              </label>
              <InputBox type="text" name="last_name" placeholder="Dey" />
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-[red]"
              />

              <label htmlFor="" className="text-md text-[#797979]">
                Email Address
              </label>
              <InputBox
                type="email"
                name="email"
                placeholder="coder@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-[red]"
              />

              <label htmlFor="" className="text-md text-[#797979]">
                Phone
              </label>
              <InputBox type="text" name="phone" placeholder="0152536362" />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-[red]"
              />

              <label htmlFor="" className="text-md text-[#797979]">
                Password
              </label>
              <div className="mb-4 flex">
                <InputBox
                  type={type}
                  name="password"
                  autoComplete="current-password"
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
              <Toaster position="bottom right" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
