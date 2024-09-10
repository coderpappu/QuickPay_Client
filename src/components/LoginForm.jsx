import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";

const LoginForm = ({ handleLogin }) => {
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
      <p className="absolute right-8 lg:right-3 xl:right-16 text-[#a8a8a8]">
        Don’t have an account?{" "}
        <Link to="/registration" className="text-[#61638A]">
          Sign up now
        </Link>
      </p>
      <h2 className="text-2xl font-semibold pt-16 mb-6">
        Sign in to <label className="text-[#6D28D9] font-bold">Employee</label>{" "}
      </h2>

      <div className="py-4 md:w-full lg:w-[400px]">
        <Formik
          initialValues={{ email: "coder@gmail.com", password: "12345678" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 6) {
              errors.password = "Password must be at least 6  characters";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            handleLogin(values.email, values.password);
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="" className="text-md text-[#a8a8a8]">
                Username or Email Address
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
              <label htmlFor="" className="text-md text-[#a8a8a8]">
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
              <div className="flex flex-wrap justify-between py-3">
                <div>
                  {" "}
                  <input type="checkbox" className="border-[#a8a8a8]" />{" "}
                  <label className="text-sm lg:text-lg text-[#a8a8a8]">
                    Keep me logged in
                  </label>
                </div>{" "}
                <Link to="#" className="text-[#61638A] text-sm lg:text-lg">
                  Forgot Password
                </Link>
              </div>
              <button
                className="px-10 py-2 lg:px-16 lg:py-3 bg-[#334155] rounded-md text-white mt-4"
                type="submit"
                disabled={isSubmitting}
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>
        <Link
          to="/employee/login"
          className="text-[#ff1616] text-sm lg:text-lg"
        >
          Employee Login
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
