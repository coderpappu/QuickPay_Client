import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useUploadImageMutation } from "../../features/api";
import { modifyPayload } from "../../utils/modifyPayload";

const AssetCard = () => {
  const [uploadImage] = useUploadImageMutation();

  const formik = useFormik({
    initialValues: {
      file: null,
      companyName: "",
      employeeName: "",
    },
    validationSchema: Yup.object({
      file: Yup.mixed()
        .required("A file is required")
        .test("fileSize", "The file is too large", (value) => {
          return value && value.size <= 2000000; // max 2MB
        })
        .test("fileFormat", "Unsupported format", (value) => {
          return (
            value &&
            ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
          );
        }),
      companyName: Yup.string().required("Company name is required"),
      employeeName: Yup.string().required("Employee name is required"),
    }),
    onSubmit: async (values) => {
      const formData = modifyPayload(values);

      try {
        const response = await uploadImage(formData).unwrap(); // Use unwrap to handle response
      } catch (error) {
        console.error("Upload error:", error.data || error.message);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full mx-5 mt-5 mb-2 rounded-md flex flex-wrap justify-between"
    >
      <div className="w-[49%] relative p-4 bg-white dark:bg-dark-card rounded-md">
        <h1 className="text-xl font-medium mb-4 dark:text-dark-heading-color">
          Asset Upload
        </h1>

        <div>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyName}
            className="mb-3 p-2 border rounded w-full"
          />
          {formik.errors.companyName && formik.touched.companyName && (
            <div className="text-red-500 text-sm">
              {formik.errors.companyName}
            </div>
          )}

          <input
            type="text"
            name="employeeName"
            placeholder="Employee Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.employeeName}
            className="mb-3 p-2 border rounded w-full"
          />
          {formik.errors.employeeName && formik.touched.employeeName && (
            <div className="text-red-500 text-sm">
              {formik.errors.employeeName}
            </div>
          )}

          <input
            type="file"
            name="file"
            onChange={(event) => {
              const file = event.currentTarget.files[0];
              if (file) {
                formik.setFieldValue("file", file);
              }
            }}
            className="mb-3 p-2 border rounded w-full"
          />
          {formik.errors.file && formik.touched.file && (
            <div className="text-red-500 text-sm">{formik.errors.file}</div>
          )}

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AssetCard;
