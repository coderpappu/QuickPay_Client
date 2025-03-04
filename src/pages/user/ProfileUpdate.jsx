// src/pages/ProfileUpdate.js
import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../components/user/InputField";
import { useGetUserQuery, useUpdateUserMutation } from "../../features/api";
import fileUpload from "../../helpers/fileUpload";

import UserValidation from "../../components/validationSchmea/UserValidation";

const ProfileUpdate = () => {
  const [progress, setProgress] = useState(0);
  const { id } = useParams();
  const [update] = useUpdateUserMutation();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUserQuery();

  let content;

  // user data update handler
  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      const downloadURL = await fileUpload({ file: values.file, setProgress });

      const { first_name, last_name, email, phone } = values;

      await update({
        first_name,
        last_name,
        email,
        phone,
        id,
        file: downloadURL,
      });

      navigate("/profile");
    } catch (error) {
      console.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isError && isLoading) content = "Loading..";

  if (isError && !isLoading) toast.error("Server Side Error Occured");

  if (!isError && !isLoading) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { first_name, last_name, phone, email, file } = data?.data;
    content = (
      <div className="h-full w-full px-3 pt-6 sm:px-10 md:w-[50%] md:px-5 xl:pt-10">
        <h2 className="mb-6 pt-16 text-2xl font-semibold">
          Profile <label className="font-bold text-[#3686FF]">Update</label>
        </h2>
        <div className="py-4 md:w-full lg:w-[400px]">
          <Formik
            initialValues={{
              first_name: first_name || "",
              last_name: last_name || "",
              phone: phone || "",
              email: email || "",
              existingFile: file || "",
              file: null,
            }}
            validate={UserValidation}
            onSubmit={handleUpdate}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <InputField
                  label="First Name"
                  name="first_name"
                  type="text"
                  placeholder="Pappu"
                />
                <InputField
                  label="Last Name"
                  name="last_name"
                  type="text"
                  placeholder="Dey"
                />
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="coder@gmail.com"
                />
                <InputField
                  label="Phone"
                  name="phone"
                  type="text"
                  placeholder="0152536362"
                />

                <div>
                  <label htmlFor="file" className="text-md text-[#797979]">
                    Upload Picture
                  </label>

                  {values.existingFile && (
                    <div>
                      <img
                        src={values.existingFile}
                        alt="Profile"
                        className="mb-3 h-32 w-32"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    name="file"
                    className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] px-1"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />

                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-[red]"
                  />
                </div>

                <button
                  className="mt-4 rounded-md bg-[#61638A] px-10 py-2 text-white lg:px-16 lg:py-3"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Update
                </button>
                <Toaster position="bottom right" />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }

  return content;
};

export default ProfileUpdate;
