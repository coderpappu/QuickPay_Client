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
      <div className="w-full md:w-[50%] h-full pt-6 xl:pt-10 px-3 sm:px-10 md:px-5">
        <h2 className="text-2xl font-semibold pt-16 mb-6">
          Profile <label className="text-[#3686FF] font-bold">Update</label>
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
                        className="w-32 h-32 mb-3"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    name="file"
                    className="w-[100%] h-12 border-1 border-[#3686FF] rounded-[5px] mt-1 mb-3 px-1"
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
                  className="px-10 py-2 lg:px-16 lg:py-3 bg-[#61638A] rounded-md text-white mt-4"
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
