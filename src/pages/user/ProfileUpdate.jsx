// src/pages/ProfileUpdate.js
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Toaster } from "react-hot-toast";
import { useGetUserQuery, useUpdateUserMutation } from "../../features/api";
import fileUpload from "../../helpers/fileUpload";
import InputField from "../../components/user/InputField";

import formValidate from "../../components/validationSchmea/UserValidation";
import UserValidation from "../../components/validationSchmea/UserValidation";

const ProfileUpdate = () => {
  const [progress, setProgress] = useState(0);
  const { id } = useParams();
  const [update] = useUpdateUserMutation();
  const navigate = useNavigate();
  const { data } = useGetUserQuery();

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      const downloadURL = await fileUpload({ file: values.file, setProgress });
      console.log(values);
      await update({ ...values, id, file: downloadURL });

      navigate("/profile");
    } catch (error) {
      console.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full md:w-[50%] h-full pt-6 xl:pt-10 px-3 sm:px-10 md:px-5">
      <h2 className="text-2xl font-semibold pt-16 mb-6">
        Profile <label className="text-[#6D28D9] font-bold">Update</label>
      </h2>
      <div className="py-4 md:w-full lg:w-[400px]">
        <Formik
          initialValues={{
            first_name: data?.first_name || "",
            last_name: data?.last_name || "",
            phone: data?.phone || "",
            email: data?.email || "",
            // existingFile: data?.file || "",
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

                {/* {values.existingFile && (
                  <div>
                    <img
                      src={values.existingFile}
                      alt="Profile"
                      className="w-32 h-32 mb-3"
                    />
                  </div>
                )} */}
                <input
                  type="file"
                  name="file"
                  className="w-[100%] h-12 border-1 border-[#ddd] rounded-[5px] mt-1 mb-3 px-1"
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
};

export default ProfileUpdate;
