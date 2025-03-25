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
    <div className="bg-blue h-full w-full px-3 pt-6 sm:px-10 md:w-[50%] md:px-5 xl:pt-10">
      <h2 className="mb-6 pt-16 text-2xl font-semibold">
        Sign in to{" "}
        <label className="font-bold text-[#4153EF]">Admin</label>{" "}
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
              <label htmlFor="" className="text-md text-slate-400">
                Username or Email Address
              </label>
              <Field
                type="email"
                name="email"
                placeholder="coder@gmail.com"
                className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] bg-slate-100 px-1 text-slate-600"
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
                  className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] bg-slate-100 px-1 text-slate-600"
                  placeholder="12345678"
                />
                <span
                  className="flex cursor-pointer items-center justify-around"
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
                  <input
                    type="checkbox"
                    className="border-[#a8a8a8] bg-slate-100"
                  />{" "}
                  <label className="text-sm text-[#a8a8a8] lg:text-lg">
                    Keep me logged in
                  </label>
                </div>{" "}
                <Link to="#" className="text-sm text-[#61638A] lg:text-lg">
                  Forgot Password
                </Link>
              </div>
              <button
                className="mt-4 w-full rounded-md bg-[#4153EF] px-10 py-2 text-white hover:bg-blue-600 lg:px-16 lg:py-3"
                type="submit"
                disabled={isSubmitting}
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
